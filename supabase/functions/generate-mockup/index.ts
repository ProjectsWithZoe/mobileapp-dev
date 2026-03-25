import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const MOCKUP_LIMIT = 60


Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    })
  }

  // Auth — require Supabase JWT
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return json({ error: 'Unauthorized' }, 401)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return json({ error: 'Unauthorized' }, 401)

  // Fetch profile (use service role to be able to update)
  const adminSupabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: profile, error: profileError } = await adminSupabase
    .from('user_profiles')
    .select('plan, mockup_count, mockup_reset_at')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) return json({ error: 'Profile not found' }, 404)

  // Lifetime only
  if (profile.plan !== 'lifetime') {
    return json({ error: 'Mockup generation is a Lifetime plan feature.' }, 403)
  }

  // Reset monthly count if needed
  const resetAt = new Date(profile.mockup_reset_at)
  const now = new Date()
  let mockupCount = profile.mockup_count ?? 0
  if (resetAt.getFullYear() !== now.getFullYear() || resetAt.getMonth() !== now.getMonth()) {
    mockupCount = 0
    await adminSupabase
      .from('user_profiles')
      .update({ mockup_count: 0, mockup_reset_at: now.toISOString() })
      .eq('id', user.id)
  }

  if (mockupCount >= MOCKUP_LIMIT) {
    return json({ error: `Monthly mockup limit reached (${MOCKUP_LIMIT}/month). Resets on the 1st.` }, 429)
  }

  // Parse request body
  const { prompt } = await req.json()
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
    return json({ error: 'A valid prompt is required.' }, 400)
  }

  // Call Claude Sonnet for high-quality visual mockup
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': Deno.env.get('ANTHROPIC_API_KEY')!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 8000,
      system: prompt,
      messages: [{
        role: 'user',
        content: `Generate a complete, visually stunning React component that renders a live UI mockup matching the requirements above.

Critical rules — the code will be executed directly in a browser sandbox:
- NO import or export statements whatsoever
- React and all hooks are available as globals. Destructure at the top: const { useState, useEffect, useRef, useCallback, useMemo } = React;
- Name the main component exactly "App": function App() { ... }
- Use Tailwind CSS classes for ALL styling (Tailwind CDN is pre-loaded)
- Include realistic placeholder data, multiple sections, and interactive states (hover, click, toggle)
- Use Tailwind animate-*, transition-*, and transform utilities for micro-animations and polish
- Lucide icons are NOT available — use emoji or inline SVG for icons
- No external image URLs — use CSS gradients or colored divs as placeholders
- Make it look production-quality: proper typography hierarchy, spacing, shadows, color usage
- Include at least 3–5 interactive UI states (e.g. active nav item, expanded section, button press)

Return ONLY the raw JavaScript/JSX code. No markdown fences, no explanation, no comments about what you're doing.`,
      }],
    }),
  })

  if (!anthropicRes.ok) {
    const err = await anthropicRes.text()
    console.error('Anthropic error:', err)
    return json({ error: 'Failed to generate mockup. Please try again.' }, 502)
  }

  const result = await anthropicRes.json()
  const code = result.content?.[0]?.text ?? ''

  // Increment mockup count
  await adminSupabase
    .from('user_profiles')
    .update({ mockup_count: mockupCount + 1 })
    .eq('id', user.id)

  return json({ code, mockupCount: mockupCount + 1 }, 200)
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
