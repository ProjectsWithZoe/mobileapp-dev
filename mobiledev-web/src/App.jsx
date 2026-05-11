import { lazy, Suspense, useState } from 'react'
import './App.css'
import { useAuth } from './hooks/useAuth'
import { getStripeLink } from './lib/stripe'
import { track } from '@vercel/analytics'

import example1 from './assets/example1.png'
import example2 from './assets/example2.png'
import example3 from './assets/example3.png'
import example4 from './assets/example4.png'

const LandingPage     = lazy(() => import('./components/LandingPage'))
const PromptGenerator = lazy(() => import('./components/ComplexGenerator'))
const AuthModal       = lazy(() => import('./components/AuthModal'))
const PaymentSuccess  = lazy(() => import('./components/PaymentSuccess'))
const CookieBanner    = lazy(() => import('./components/CookieBanner'))

const EXAMPLES = [example1, example2, example3, example4]

const BG     = "#FFFBF7"
const BORDER = "#E8CFBA"
const BROWN3 = "#9A6040"

// ─── SKELETONS ────────────────────────────────────────────────────────────────
function AppSkeleton() {
  return (
    <div className="min-h-screen animate-pulse" style={{ backgroundColor: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BORDER }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BORDER }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BORDER }} />
          </div>
          <div className="h-3 w-36 rounded" style={{ backgroundColor: BORDER }} />
        </div>
        <div className="h-3 w-12 rounded" style={{ backgroundColor: BORDER }} />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-7 w-52 rounded-lg" style={{ backgroundColor: BORDER }} />
            <div className="h-4 w-72 rounded" style={{ backgroundColor: BORDER }} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl" style={{ backgroundColor: BORDER }} />
            ))}
          </div>
          <div className="h-20 rounded-xl" style={{ backgroundColor: BORDER }} />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 h-14 rounded-xl" style={{ backgroundColor: BORDER }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl" style={{ backgroundColor: BORDER }} />
            ))}
          </div>
          <div className="h-12 rounded-xl" style={{ backgroundColor: BORDER }} />
        </div>
        <div className="h-[500px] rounded-2xl" style={{ backgroundColor: BORDER }} />
      </div>
    </div>
  )
}

// ─── EXAMPLES GALLERY (signed-in view only) ───────────────────────────────────
function ExamplesGallery() {
  return (
    <div className="px-4 py-12" style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-semibold mb-1 text-center" style={{ color: BROWN3 }}>
          Example outputs
        </p>
        <p className="text-xs text-center mb-6" style={{ color: BROWN3 }}>
          Built with prompts generated above
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {EXAMPLES.map((src, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <img
                src={src}
                alt={`Example app output ${i + 1}`}
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { user, loading, signIn, signUp } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode]           = useState('signin')
  const [isDemoMode, setIsDemoMode]       = useState(false)

  const openAuth = (mode) => { setAuthMode(mode); setShowAuthModal(true) }

  if (window.location.pathname === '/success') {
    return (
      <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: BG }} />}>
        <PaymentSuccess />
      </Suspense>
    )
  }

  if (loading) return <AppSkeleton />

  if (!user) {
    if (isDemoMode) {
      return (
        <Suspense fallback={<AppSkeleton />}>
          <PromptGenerator
            demoMode
            onDemoSignUp={() => openAuth('signup')}
            onExitDemo={() => setIsDemoMode(false)}
          />
          {showAuthModal && (
            <Suspense fallback={null}>
              <AuthModal
                onClose={() => setShowAuthModal(false)}
                onSignIn={authMode === 'signup' ? signUp : signIn}
                mode={authMode}
              />
            </Suspense>
          )}
          <Suspense fallback={null}><CookieBanner /></Suspense>
        </Suspense>
      )
    }

    return (
      <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: BG }} />}>
        <LandingPage
          onSignIn={() => openAuth('signin')}
          onGetStarted={() => openAuth('signup')}
          onDemo={() => openAuth('signup')}
          onSubscribe={(plan) => {
            const link = getStripeLink(plan, user)
            if (link) {
              track('stripe_redirect', { plan })
              window.location.href = link
            }
          }}
        />
        {showAuthModal && (
          <Suspense fallback={null}>
            <AuthModal
              onClose={() => setShowAuthModal(false)}
              onSignIn={authMode === 'signup' ? signUp : signIn}
              mode={authMode}
            />
          </Suspense>
        )}
        <Suspense fallback={null}><CookieBanner /></Suspense>
      </Suspense>
    )
  }

  return (
    <div className="flex flex-col">
      <Suspense fallback={<AppSkeleton />}>
        <PromptGenerator />
      </Suspense>
      <ExamplesGallery />
      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
    </div>
  )
}
