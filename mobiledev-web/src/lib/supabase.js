import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// When env vars are missing (e.g. no .env.local yet) export null so the app
// loads without crashing — auth/save features simply stay hidden.
export const supabase = url && key ? createClient(url, key) : null

/** True only when both NEXT_PUBLIC_SUPABASE_* env vars are present. */
export const isSupabaseConfigured = Boolean(url && key)
