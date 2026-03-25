import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
// Support the Supabase-generated key name and the conventional anon key name
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
         ?? import.meta.env.VITE_SUPABASE_ANON_KEY

// When env vars are missing (e.g. no .env file yet) export null so the app
// loads without crashing — auth/save features simply stay hidden.
export const supabase = url && key ? createClient(url, key) : null

/** True only when both VITE_SUPABASE_* env vars are present. */
export const isSupabaseConfigured = Boolean(url && key)
