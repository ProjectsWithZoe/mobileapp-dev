/**
 * POST /api/log-demo-prompt
 *
 * Server-side insert for unauthenticated demo users.
 * Uses the Supabase service role key (bypasses RLS) so we can insert
 * a row with user_id = null — which the anon key + RLS cannot do.
 *
 * Required env vars (set in Vercel dashboard / .env):
 *   SUPABASE_SERVICE_ROLE_KEY  — from Supabase → Project Settings → API
 *   VITE_SUPABASE_URL          — already present for the frontend
 */

import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    app_idea,
    use_case,
    palette_name,
    complexity,
    extra_context,
    prompt_text,
  } = req.body ?? {}

  if (!app_idea || !use_case || !palette_name || !complexity || !prompt_text) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('[log-demo-prompt] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    // Return 200 so the client doesn't surface an error to the demo user
    return res.status(200).json({ ok: true })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  const { error } = await supabase.from('generated_prompts').insert({
    user_id: null,
    app_idea,
    use_case,
    palette_name,
    complexity,
    extra_context: extra_context ?? '',
    prompt_text,
  })

  if (error) {
    console.error('[log-demo-prompt] insert failed:', error.message)
    return res.status(500).json({ error: 'Insert failed' })
  }

  return res.status(200).json({ ok: true })
}
