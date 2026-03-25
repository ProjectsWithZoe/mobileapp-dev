import { useState, useCallback } from 'react'

const COPY = {
  signup: {
    eyebrow: 'Get started',
    heading: 'Create your account',
    sub: 'Enter your email — we\'ll send a magic link to get you in.',
    button: 'Create Account →',
  },
  signin: {
    eyebrow: 'Sign in',
    heading: 'Welcome back',
    sub: 'Enter your email — we\'ll send a one-click sign-in link.',
    button: 'Send Magic Link →',
  },
}

export default function AuthModal({ onClose, onSignIn, mode = 'signin' }) {
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
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email, onSignIn])

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-sm rounded-2xl border border-gray-800 p-6"
        style={{ backgroundColor: '#0d1117', fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {sent ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center text-center py-4 gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: '#6C63FF20', color: '#6C63FF' }}
            >
              ✓
            </div>
            <div>
              <p className="text-white font-bold text-sm">Check your inbox</p>
              <p className="text-gray-500 text-xs mt-1">
                We sent a magic link to <span className="text-gray-300">{email}</span>.
                Click it to sign in — no password needed.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Sign-in form ── */
          <>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#6C63FF' }} />
                <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{copy.eyebrow}</span>
              </div>
              <h2 className="text-white font-bold text-lg leading-tight">{copy.heading}</h2>
              <p className="text-gray-500 text-xs mt-1">{copy.sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm"
              />
              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#6C63FF', color: 'white' }}
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
