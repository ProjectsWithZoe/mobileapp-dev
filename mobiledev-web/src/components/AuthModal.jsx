import { useState, useCallback } from 'react'

const ORANGE  = "#EA580C"
const AMBER   = "#FB923C"
const BROWN   = "#1C0A02"
const BROWN2  = "#5C2E0A"
const BROWN3  = "#9A6040"
const BG      = "#FFFBF7"
const SURF    = "#FFFFFF"
const BORDER  = "#E8CFBA"

const COPY = {
  signup: {
    eyebrow: 'Get started',
    heading: 'Create your account',
    sub: "Enter your email — we'll send a magic link to get you in.",
    button: 'Create Account →',
  },
  signin: {
    eyebrow: 'Sign in',
    heading: 'Welcome back',
    sub: "Enter your email — we'll send a one-click sign-in link.",
    button: 'Send Magic Link →',
  },
}

export default function AuthModal({ onClose, onSignIn, mode = 'signin', onOtpSent, hasPendingPlan = false }) {
  const copy = COPY[mode] ?? COPY.signin
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      await onSignIn(email.trim())
      setSent(true)
      onOtpSent?.(email.trim())
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email, onSignIn, onOtpSent])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(28,10,2,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-7"
        style={{
          backgroundColor: SURF,
          border: `1px solid ${BORDER}`,
          boxShadow: '0 24px 60px rgba(92,46,10,0.18)',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: BROWN3, fontSize: '18px', lineHeight: 1 }}
          aria-label="Close"
        >
          ✕
        </button>

        {sent ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center text-center py-4 gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold"
              style={{ backgroundColor: `${ORANGE}15`, color: ORANGE }}
            >
              ✓
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: BROWN }}>Check your inbox</p>
              {hasPendingPlan ? (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: BROWN3 }}>
                  The payment page is opening now.{' '}
                  <span style={{ color: BROWN2 }}>Also check {email}</span> — click the magic link to activate your account after paying.
                </p>
              ) : (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: BROWN3 }}>
                  We sent a magic link to <span style={{ color: BROWN2 }}>{email}</span>.
                  Click it to sign in — no password needed.
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-xs transition-colors hover:underline"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: BROWN3 }}
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Sign-in form ── */
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ORANGE }} />
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: ORANGE }}>
                  {copy.eyebrow}
                </span>
              </div>
              <h2 className="text-lg leading-tight mb-1" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>
                {copy.heading}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: BROWN3 }}>{copy.sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: BG,
                  border: `1px solid ${BORDER}`,
                  color: BROWN,
                  colorScheme: 'light',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              />
              {error && (
                <p className="text-xs" style={{ color: '#DC2626' }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
              >
                {loading ? 'Sending…' : copy.button}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
