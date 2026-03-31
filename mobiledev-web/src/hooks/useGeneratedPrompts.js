/**
 * useGeneratedPrompts — auto-logs every prompt generation to Supabase.
 *
 * Run this in Supabase SQL editor before using:
 *
 *   create table if not exists generated_prompts (
 *     id            uuid primary key default gen_random_uuid(),
 *     user_id       uuid references auth.users(id) on delete cascade,  -- nullable for demo users
 *     app_idea      text not null,
 *     use_case      text not null,
 *     palette_name  text not null,
 *     complexity    text not null,
 *     extra_context text not null default '',
 *     prompt_text   text not null,
 *     created_at    timestamptz not null default now()
 *   );
 *
 *   alter table generated_prompts enable row level security;
 *
 *   -- Authenticated users can insert/read their own rows
 *   create policy "own prompts insert" on generated_prompts
 *     for insert with check (auth.uid() = user_id);
 *
 *   create policy "own prompts select" on generated_prompts
 *     for select using (auth.uid() = user_id);
 *
 *   -- Service role (used by api/log-demo-prompt.js) bypasses RLS automatically.
 *   -- No extra policy needed for demo inserts.
 *
 * If the table already exists with user_id NOT NULL, run:
 *   alter table generated_prompts alter column user_id drop not null;
 */

import { useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useGeneratedPrompts(userId) {
  /**
   * Authenticated insert — uses the user's own Supabase session.
   * Skips silently when Supabase is unconfigured or no userId present.
   */
  const insertPrompt = useCallback(async ({
    app_idea,
    use_case,
    palette_name,
    complexity,
    extra_context,
    prompt_text,
  }) => {
    if (!supabase || !userId) return

    const { error } = await supabase.from('generated_prompts').insert({
      user_id: userId,
      app_idea,
      use_case,
      palette_name,
      complexity,
      extra_context: extra_context ?? '',
      prompt_text,
    })

    if (error) {
      // Non-fatal — log but don't surface to the user
      console.error('[useGeneratedPrompts] insert failed:', error.message)
    }
  }, [userId])

  /**
   * Demo insert — POSTs to the server-side function which uses the
   * Supabase service role key. Stores user_id = null.
   * Fire-and-forget: failures are logged, never shown to the user.
   */
  const logDemoPrompt = useCallback(async ({
    app_idea,
    use_case,
    palette_name,
    complexity,
    extra_context,
    prompt_text,
  }) => {
    try {
      await fetch('/api/log-demo-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_idea,
          use_case,
          palette_name,
          complexity,
          extra_context: extra_context ?? '',
          prompt_text,
        }),
      })
    } catch (err) {
      console.error('[logDemoPrompt] request failed:', err)
    }
  }, [])

  return { insertPrompt, logDemoPrompt }
}
