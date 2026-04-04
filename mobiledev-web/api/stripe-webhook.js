// Required env vars:
//   STRIPE_SECRET_KEY                      — Stripe Dashboard → Developers → API keys → Secret key
//   STRIPE_WEBHOOK_SECRET                  — Stripe Dashboard → Webhooks → signing secret
//   SUPABASE_SERVICE_ROLE_KEY              — Supabase project settings → API → service_role key
//   VITE_SUPABASE_URL                      — Supabase project URL (reuse existing env var)
//   VITE_SUPABASE_ANON_KEY                 — Supabase project anon/public key (used to send OTP emails)
//     (also checked as VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)
//   APP_URL                                — Public app URL for magic-link redirectTo (e.g. https://humble-ui.com)

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: false } }

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  let event = req.body

  if (endpointSecret) {
    const signature = req.headers['stripe-signature']
    try {
      const rawBody = await getRawBody(req)
      event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return res.status(400).send()
    }
  }

  // ── checkout.session.completed ─────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.client_reference_id
    const customerId = session.customer
    const plan = session.mode === 'subscription' ? 'monthly' : 'lifetime'

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[stripe-webhook] Missing Supabase env vars')
      return res.status(500).send()
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })

    // Path A: signed-in checkout — update user_profiles directly
    if (userId) {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          plan,
          ...(customerId ? { stripe_customer_id: customerId } : {}),
        })
        .eq('id', userId)

      if (error) {
        console.error(`[stripe-webhook] Failed to upgrade user ${userId}:`, error.message)
        return res.status(500).send()
      }
      console.log(`[stripe-webhook] Upgraded user ${userId} to ${plan}`)
      return res.status(200).json({ received: true })
    }

    // Path B: guest checkout — store pending activation keyed by email
    const email = session.customer_details?.email?.toLowerCase()
    if (!email) {
      console.warn('[stripe-webhook] checkout.session.completed has no client_reference_id and no customer email — skipping')
      return res.status(200).json({ received: true })
    }

    const { error } = await supabase
      .from('stripe_pending_activations')
      .upsert({ email, plan, stripe_customer_id: customerId ?? null })

    if (error) {
      console.error(`[stripe-webhook] Failed to store pending activation for ${email}:`, error.message)
      return res.status(500).send()
    }
    console.log(`[stripe-webhook] Stored pending activation for ${email} (${plan})`)

    // signInWithOtp via the anon key is the correct way to trigger Supabase to actually
    // send an email. admin.generateLink returns a link but sends no email by design.
    const appUrl = process.env.APP_URL ?? 'https://humble-ui.com'
    const anonKey =
      process.env.SUPABASE_ANON_KEY ??
      process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
      process.env.VITE_SUPABASE_ANON_KEY

    if (!anonKey) {
      console.error('[stripe-webhook] Missing Supabase anon key — cannot send activation email')
    } else {
      const supabasePublic = createClient(supabaseUrl, anonKey, {
        auth: { persistSession: false },
      })
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

    return res.status(200).json({ received: true })
  }

  // ── customer.subscription.deleted ─────────────────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const customerId = event.data.object.customer

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[stripe-webhook] Missing Supabase env vars')
      return res.status(500).send()
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })

    const { error } = await supabase
      .from('user_profiles')
      .update({ plan: 'free' })
      .eq('stripe_customer_id', customerId)

    if (error) {
      console.error(`[stripe-webhook] Failed to downgrade customer ${customerId}:`, error.message)
      return res.status(500).send()
    }
    console.log(`[stripe-webhook] Downgraded customer ${customerId} to free`)
    return res.status(200).json({ received: true })
  }

  console.log(`[stripe-webhook] Unhandled event type: ${event.type}`)
  return res.status(200).json({ received: true })
}
