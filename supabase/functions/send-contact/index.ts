const ALLOWED_ORIGINS = [
  'http://localhost:5174',
  'http://localhost:4173',
  'https://humble-ui.vercel.app',
  'https://humble-ui.co.uk',
]

function corsHeaders(req: Request) {
  const origin = req.headers.get('origin') ?? ''
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders(req) })
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
