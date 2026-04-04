import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const MAX_POLLS = 5
const POLL_INTERVAL_MS = 1500

export default function PaymentSuccess() {
  const [plan, setPlan] = useState(null)       // 'monthly' | 'lifetime' | 'free' | null
  const [loading, setLoading] = useState(true)
  const [exhausted, setExhausted] = useState(false)
  const [noSession, setNoSession] = useState(false)
  const pollCount = useRef(0)
  const timer = useRef(null)

  useEffect(() => {
    if (!supabase) {
      setNoSession(true)
      setLoading(false)
      return
    }

    async function fetchPlan() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        setNoSession(true)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('plan')
        .eq('id', session.user.id)
        .single()

      if (error || !data) {
        setLoading(false)
        return
      }

      if (data.plan !== 'free') {
        setPlan(data.plan)
        setLoading(false)
        return
      }

      // Plan still 'free' — webhook hasn't fired yet, start polling
      pollCount.current += 1
      if (pollCount.current >= MAX_POLLS) {
        setPlan('free')
        setExhausted(true)
        setLoading(false)
        return
      }

      timer.current = setTimeout(fetchPlan, POLL_INTERVAL_MS)
    }

    fetchPlan()

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  // ── No session ────────────────────────────────────────────────────────────
  if (noSession) {
    return (
      <Screen>
        <Icon>🔒</Icon>
        <h1 className="text-xl font-semibold text-white mb-2">Log in to view your plan</h1>
        <p className="text-gray-400 text-sm mb-6">Sign in to see your activated plan and access the app.</p>
        <a href="/" className="inline-block px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">Log in</a>
      </Screen>
    )
  }

  // ── Loading / polling ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <Screen>
        <div className="w-8 h-8 border-2 border-gray-600 border-t-emerald-400 rounded-full animate-spin mb-6" />
        <p className="text-gray-400 text-sm">Confirming your payment…</p>
      </Screen>
    )
  }

  // ── Webhook still pending after all retries ───────────────────────────────
  if (exhausted) {
    return (
      <Screen>
        <Icon>⏳</Icon>
        <h1 className="text-xl font-semibold text-white mb-2">Still activating…</h1>
        <p className="text-gray-400 text-sm mb-6">
          Your payment was received. Plan activation usually takes a few seconds —
          refresh in a moment to see your updated plan.
        </p>
        <button
          className="inline-block px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </Screen>
    )
  }

  // ── Monthly ───────────────────────────────────────────────────────────────
  if (plan === 'monthly') {
    return (
      <Screen>
        <Icon>✅</Icon>
        <Kicker>Payment successful</Kicker>
        <h1 className="text-2xl font-semibold text-white mb-1">Monthly Plan</h1>
        <p className="text-gray-400 text-sm mb-8">Renews automatically · cancel any time</p>
        <a href="/" className="inline-block px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">Go to app</a>
      </Screen>
    )
  }

  // ── Lifetime ──────────────────────────────────────────────────────────────
  if (plan === 'lifetime') {
    return (
      <Screen>
        <Icon>🎉</Icon>
        <Kicker>Payment successful</Kicker>
        <h1 className="text-2xl font-semibold text-white mb-1">Lifetime Access</h1>
        <p className="text-gray-400 text-sm mb-8">One-time purchase · no renewal</p>
        <a href="/" className="inline-block px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">Go to app</a>
      </Screen>
    )
  }

  // ── Fallback (unexpected state) ───────────────────────────────────────────
  return (
    <Screen>
      <Icon>✅</Icon>
      <h1 className="text-xl font-semibold text-white mb-2">Payment received</h1>
      <p className="text-gray-400 text-sm mb-6">Your account is being updated.</p>
      <a href="/" className="btn-primary">Go to app</a>
    </Screen>
  )
}

// ── Shared layout primitives ──────────────────────────────────────────────────

function Screen({ children }) {
  return (
    <div
      className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <div className="max-w-sm w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  )
}

function Icon({ children }) {
  return <div className="text-4xl mb-4 select-none">{children}</div>
}

function Kicker({ children }) {
  return (
    <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
      {children}
    </p>
  )
}
