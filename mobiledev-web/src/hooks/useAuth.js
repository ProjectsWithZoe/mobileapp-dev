import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    // When Supabase is not configured, stay signed out silently
    if (!supabase) return

    // Hydrate from existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Keep state in sync with Supabase auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // signIn: shouldCreateUser:false means Supabase errors if the email has no account,
  // preventing accidental account creation via the sign-in form.
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin

  const signIn = useCallback(async (email) => {
    if (!supabase) throw new Error('Auth is not configured.')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: appUrl, shouldCreateUser: false },
    })
    if (error) throw new Error('No account found for this email. Please sign up first.')
  }, [])

  // signUp: checks for existing account via RPC first, errors if found, otherwise creates.
  const signUp = useCallback(async (email) => {
    if (!supabase) throw new Error('Auth is not configured.')
    const { data: exists, error: checkError } = await supabase.rpc('email_exists', { check_email: email })
    if (checkError) throw checkError
    if (exists) throw new Error('An account with this email already exists. Please sign in instead.')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: appUrl, shouldCreateUser: true },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  return { user, loading, signIn, signUp, signOut }
}
