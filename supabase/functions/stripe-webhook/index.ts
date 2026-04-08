import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Verify Stripe webhook signature using native Web Crypto (no Stripe SDK needed).
// Implements HMAC-SHA256 as described at https://stripe.com/docs/webhooks/signatures
async function verifyStripeSignature(
  body: string,
  header: string,
  secret: string,
): Promise<boolean> {
  const encoder = new TextEncoder()

  // Parse "t=timestamp,v1=sig1,v1=sig2,..."
  const parts: Record<string, string[]> = {}
  for (const part of header.split(',')) {
    const eq = part.indexOf('=')
    const k = part.slice(0, eq).trim()
    const v = part.slice(eq + 1).trim()
    if (!parts[k]) parts[k] = []
    parts[k].push(v)
  }

  const timestamp = parts['t']?.[0]
  const signatures = parts['v1'] ?? []
  if (!timestamp || signatures.length === 0) return false

  // Reject webhooks outside the 5-minute tolerance window to prevent replay attacks
  const now = Math.floor(Date.now() / 1000)
  const ts = parseInt(timestamp, 10)
  if (isNaN(ts) || Math.abs(now - ts) > 300) return false

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const mac = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${timestamp}.${body}`),
  )

  const computed = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return signatures.some((sig) => sig === computed)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return new Response('Missing stripe-signature', { status: 400 })

  const body = await req.text()
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return new Response('Webhook validation not configured', { status: 500 })
  }

  const valid = await verifyStripeSignature(body, sig, webhookSecret)
  if (!valid) {
    console.error('Webhook signature verification failed')
    return new Response('Bad signature', { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const event: any = JSON.parse(body)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId: string | null = session.client_reference_id ?? null
    const customerId: string | null = session.customer ?? null
    const plan: string = session.mode === 'subscription' ? 'monthly' : 'lifetime'

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // ── Path A: signed-in checkout — update user_profiles directly ──
    if (userId) {
      const { error } = await supabase
        .from('user_profiles')
        .update({ plan, ...(customerId ? { stripe_customer_id: customerId } : {}) })
        .eq('id', userId)

      if (error) {
        console.error('Failed to update user plan:', error.message)
        return new Response('DB error', { status: 500 })
      }

      console.log(`Updated user ${userId} to plan: ${plan}`)
      return new Response('ok', { status: 200 })
    }

    // ── Path B: guest checkout — store pending activation + send activation email ──
    const email: string | undefined = session.customer_details?.email?.toLowerCase()
    if (!email) {
      console.warn('No client_reference_id and no customer email — skipping')
      return new Response('ok', { status: 200 })
    }

    const { error: upsertError } = await supabase
      .from('stripe_pending_activations')
      .upsert({ email, plan, stripe_customer_id: customerId })

    if (upsertError) {
      console.error(`Failed to store pending activation for ${email}:`, upsertError.message)
      return new Response('DB error', { status: 500 })
    }

    console.log(`Stored pending activation for ${email} (${plan})`)

    const appUrl = Deno.env.get('APP_URL') ?? 'https://humble-ui.com'

    // Try magic link first (works for existing Supabase users).
    // Fall back to invite if the user doesn't exist yet.
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: appUrl },
    })

    if (linkError) {
      console.warn(`generateLink failed for ${email} (${linkError.message}) — trying invite`)
      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: appUrl,
      })
      if (inviteError) {
        console.error(`Failed to send invite to ${email}:`, inviteError.message)
      } else {
        console.log(`Invite email sent to ${email}`)
      }
    } else {
      console.log(`Magic link sent to ${email} (user id: ${linkData?.user?.id ?? 'unknown'})`)
    }
  }

  return new Response('ok', { status: 200 })
})
