import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // NEXT_PUBLIC_APP_URL is set at build time; fall back to origin at runtime.
  const getAppUrl = () =>
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://humble-ui.com')

  // signIn: shouldCreateUser:false errors if the email has no account,
  // preventing accidental account creation via the sign-in form.
  const signIn = useCallback(async (email) => {
    if (!supabase) throw new Error('Auth is not configured.')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: getAppUrl(), shouldCreateUser: false },
    })
    if (error) throw new Error('No account found for this email. Please sign up first using the Free Demo button.')
  }, [])

  // signUp: checks for existing account via RPC first, errors if found, otherwise creates.
  const signUp = useCallback(async (email) => {
    if (!supabase) throw new Error('Auth is not configured.')
    const { data: exists, error: checkError } = await supabase.rpc('email_exists', { check_email: email })
    if (checkError) throw checkError
    if (exists) throw new Error('An account with this email already exists. Please sign in instead.')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: getAppUrl(), shouldCreateUser: true },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  return { user, loading, signIn, signUp, signOut }
}
