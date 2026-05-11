import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const ORANGE = "#EA580C"
const AMBER  = "#FB923C"
const BROWN  = "#1C0A02"
const BROWN3 = "#9A6040"
const BG     = "#FFFBF7"
const BORDER = "#E8CFBA"

const MAX_POLLS      = 5
const POLL_INTERVAL_MS = 1500

export default function PaymentSuccess() {
  const [plan, setPlan]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [exhausted, setExhausted] = useState(false)
  const [noSession, setNoSession] = useState(false)
  const pollCount = useRef(0)
  const timer     = useRef(null)

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

  if (noSession) {
    return (
      <Screen>
        <Icon>✉️</Icon>
        <Kicker>Payment received</Kicker>
        <h1 className="text-xl mb-2" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>Check your email</h1>
        <p className="text-sm mb-6" style={{ color: BROWN3 }}>We sent an activation link to the email you used at checkout. Click it to create your account and start building.</p>
      </Screen>
    )
  }

  if (loading) {
    return (
      <Screen>
        <div className="w-8 h-8 border-2 rounded-full animate-spin mb-6" style={{ borderColor: BORDER, borderTopColor: ORANGE }} />
        <p className="text-sm" style={{ color: BROWN3 }}>Confirming your payment…</p>
      </Screen>
    )
  }

  if (exhausted) {
    return (
      <Screen>
        <Icon>⏳</Icon>
        <h1 className="text-xl mb-2" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>Still activating…</h1>
        <p className="text-sm mb-6" style={{ color: BROWN3 }}>
          Your payment was received. Plan activation usually takes a few seconds —
          refresh in a moment to see your updated plan.
        </p>
        <button
          className="inline-block px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors text-white active:scale-95"
          style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </Screen>
    )
  }

  if (plan === 'monthly') {
    return (
      <Screen>
        <Icon>✅</Icon>
        <Kicker>Payment successful</Kicker>
        <h1 className="text-2xl mb-1" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>Monthly Plan</h1>
        <p className="text-sm mb-8" style={{ color: BROWN3 }}>Renews automatically · cancel any time</p>
        <a href="/" className="inline-block px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors text-white active:scale-95" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}>
          Go to app
        </a>
      </Screen>
    )
  }

  if (plan === 'lifetime') {
    return (
      <Screen>
        <Icon>🎉</Icon>
        <Kicker>Payment successful</Kicker>
        <h1 className="text-2xl mb-1" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>Lifetime Access</h1>
        <p className="text-sm mb-8" style={{ color: BROWN3 }}>One-time purchase · no renewal</p>
        <a href="/" className="inline-block px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors text-white active:scale-95" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}>
          Go to app
        </a>
      </Screen>
    )
  }

  return (
    <Screen>
      <Icon>✅</Icon>
      <h1 className="text-xl mb-2" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>Payment received</h1>
      <p className="text-sm mb-6" style={{ color: BROWN3 }}>Your account is being updated.</p>
      <a href="/" className="inline-block px-6 py-2.5 text-sm font-semibold rounded-lg text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}>
        Go to app
      </a>
    </Screen>
  )
}

function Screen({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: BG, fontFamily: "'Inter', system-ui, sans-serif" }}
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
    <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: ORANGE }}>
      {children}
    </p>
  )
}
