// Required env vars:
//   STRIPE_SECRET_KEY     — from Stripe Dashboard → Developers → API keys → Secret key
//   STRIPE_WEBHOOK_SECRET — from Stripe Dashboard → Webhooks → signing secret
//                           If testing with the CLI, find it by running 'stripe listen'

import Stripe from 'stripe'

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

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
      // handlePaymentIntentSucceeded(paymentIntent)
      break
    }
    case 'payment_method.attached': {
      const paymentMethod = event.data.object
      // handlePaymentMethodAttached(paymentMethod)
      break
    }
    default:
      console.log(`Unhandled event type ${event.type}.`)
  }

  res.status(200).send()
}
