import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Required env vars (server-side only — no NEXT_PUBLIC_ prefix):
//   STRIPE_SECRET_KEY
//   STRIPE_WEBHOOK_SECRET
//   SUPABASE_SERVICE_ROLE_KEY
//   SUPABASE_URL  (or falls back to NEXT_PUBLIC_SUPABASE_URL)
//   SUPABASE_ANON_KEY (or falls back to NEXT_PUBLIC_SUPABASE_ANON_KEY)
//   APP_URL

export const runtime = 'nodejs'

export async function POST(req) {
  const stripe          = new Stripe(process.env.STRIPE_SECRET_KEY)
  const endpointSecret  = process.env.STRIPE_WEBHOOK_SECRET
  const supabaseUrl     = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  const rawBody  = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event
  try {
    event = endpointSecret
      ? stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
      : JSON.parse(rawBody)
  } catch (err) {
    console.warn('[stripe-webhook] Signature verification failed:', err.message)
    return new Response('Bad signature', { status: 400 })
  }

  // ── checkout.session.completed ──────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session    = event.data.object
    const userId     = session.client_reference_id
    const customerId = session.customer
    const plan       = session.mode === 'subscription' ? 'monthly' : 'lifetime'

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[stripe-webhook] Missing Supabase env vars')
      return new Response('Config error', { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })

    // Path A: signed-in checkout — update user_profiles directly
    if (userId) {
      const { error } = await supabase
        .from('user_profiles')
        .update({ plan, ...(customerId ? { stripe_customer_id: customerId } : {}) })
        .eq('id', userId)

      if (error) {
        console.error(`[stripe-webhook] Failed to upgrade user ${userId}:`, error.message)
        return new Response('DB error', { status: 500 })
      }
      console.log(`[stripe-webhook] Upgraded user ${userId} to ${plan}`)
      return Response.json({ received: true })
    }

    // Path B: guest checkout — store pending activation keyed by email
    const email = session.customer_details?.email?.toLowerCase()
    if (!email) {
      console.warn('[stripe-webhook] No client_reference_id and no customer email — skipping')
      return Response.json({ received: true })
    }

    const { error } = await supabase
      .from('stripe_pending_activations')
      .upsert({ email, plan, stripe_customer_id: customerId ?? null })

    if (error) {
      console.error(`[stripe-webhook] Failed to store pending activation for ${email}:`, error.message)
      return new Response('DB error', { status: 500 })
    }
    console.log(`[stripe-webhook] Stored pending activation for ${email} (${plan})`)

    // Send magic-link OTP so the user can create an account
    const appUrl  = process.env.APP_URL ?? 'https://humble-ui.com'
    const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!anonKey) {
      console.error('[stripe-webhook] Missing Supabase anon key — cannot send activation email')
    } else {
      const supabasePublic = createClient(supabaseUrl, anonKey, { auth: { persistSession: false } })
      const { error: otpError } = await supabasePublic.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: appUrl },
      })
      if (otpError) {
        console.error(`[stripe-webhook] Failed to send OTP to ${email}:`, otpError.message)
      } else {
        console.log(`[stripe-webhook] Activation OTP sent to ${email}`)
      }
    }

    return Response.json({ received: true })
  }

  // ── customer.subscription.deleted ───────────────────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const customerId = event.data.object.customer

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[stripe-webhook] Missing Supabase env vars')
      return new Response('Config error', { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    const { error } = await supabase
      .from('user_profiles')
      .update({ plan: 'free' })
      .eq('stripe_customer_id', customerId)

    if (error) {
      console.error(`[stripe-webhook] Failed to downgrade customer ${customerId}:`, error.message)
      return new Response('DB error', { status: 500 })
    }
    console.log(`[stripe-webhook] Downgraded customer ${customerId} to free`)
    return Response.json({ received: true })
  }

  console.log(`[stripe-webhook] Unhandled event type: ${event.type}`)
  return Response.json({ received: true })
}
