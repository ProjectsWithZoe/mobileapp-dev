import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// In-memory rate limiter: 5 requests per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

const ALLOWED_ORIGINS = [
  'https://humble-ui.vercel.app',
  'https://humble-ui.co.uk',
  'https://humble-ui.com',
]

function corsHeaders(req: Request) {
  const origin = req.headers.get('origin') ?? ''
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders(req) })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please wait a minute.' }), {
      status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
  }

  let name: string, email: string, message: string
  try {
    ;({ name, email, message } = await req.json())
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'name, email and message are required' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
  }

  // Save to database
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { error: dbError } = await supabase.from('contact_submissions').insert({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  })

  if (dbError) {
    console.error('Supabase insert error:', dbError)
  }

  // Send email notification via Resend
  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) {
    console.error('RESEND_API_KEY secret is not set')
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Humble-UI Contact <contact@humble-ui.co.uk>',
      to: [Deno.env.get('CONTACT_TO_EMAIL') ?? 'support@humble-ui.co.uk'],
      reply_to: email.trim(),
      subject: `Message from ${name.trim()} via Humble-UI`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
  })
})
