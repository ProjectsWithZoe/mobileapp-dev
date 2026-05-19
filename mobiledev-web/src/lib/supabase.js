import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** True only when both NEXT_PUBLIC_SUPABASE_* env vars are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const createClient = () =>
  createBrowserClient(supabaseUrl, supabaseKey);

// Singleton for client-side hooks. Null when env vars are absent (graceful degradation).
export const supabase = isSupabaseConfigured ? createClient() : null;

