import Stripe from 'https://esm.sh/stripe@17?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2025-04-30.basil' as Stripe.LatestApiVersion,
  httpClient: Stripe.createFetchHttpClient(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return new Response('Missing stripe-signature', { status: 400 })

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      Stripe.createSubtleCryptoProvider()
    )
  } catch (err) {
    console.error('Signature verification failed:', err)
    return new Response('Bad signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id
    const plan = session.mode === 'subscription' ? 'monthly' : 'lifetime'

    if (!userId) {
      console.error('No client_reference_id on session:', session.id)
      return new Response('Missing client_reference_id', { status: 400 })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase
      .from('user_profiles')
      .update({ plan })
      .eq('id', userId)

    if (error) {
      console.error('Failed to update user plan:', error)
      return new Response('DB error', { status: 500 })
    }

    console.log(`Updated user ${userId} to plan: ${plan}`)
  }

  return new Response('ok', { status: 200 })
})
