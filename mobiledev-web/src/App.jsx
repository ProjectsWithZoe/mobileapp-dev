import { lazy, Suspense, useState } from 'react'
import './App.css'
import { useAuth } from './hooks/useAuth'
import { getStripeLink } from './lib/stripe'
import { Analytics } from "@vercel/analytics/next"

// RunTracker example screenshots — static images, no JS bundle cost
import example1 from './assets/example1.png'
import example2 from './assets/example2.png'
import example3 from './assets/example3.png'
import example4 from './assets/example4.png'

// Code-split: each route is a separate chunk
const LandingPage    = lazy(() => import('./components/LandingPage'))
const PromptGenerator = lazy(() => import('./components/ComplexGenerator'))
const AuthModal       = lazy(() => import('./components/AuthModal'))

const EXAMPLES = [example1, example2, example3, example4]

// ─── SKELETONS ────────────────────────────────────────────────────────────────
function AppSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 animate-pulse" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-800" />
            <div className="w-3 h-3 rounded-full bg-gray-800" />
            <div className="w-3 h-3 rounded-full bg-gray-800" />
          </div>
          <div className="h-3 w-36 bg-gray-800 rounded" />
        </div>
        <div className="h-3 w-12 bg-gray-800 rounded" />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-7 w-52 bg-gray-800 rounded-lg" />
            <div className="h-4 w-72 bg-gray-800 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded-xl" />
            ))}
          </div>
          <div className="h-20 bg-gray-800 rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 h-14 bg-gray-800 rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-800 rounded-xl" />
            ))}
          </div>
          <div className="h-12 bg-gray-800 rounded-xl" />
        </div>
        <div className="h-[500px] bg-gray-800 rounded-2xl" />
      </div>
    </div>
  )
}

// ─── EXAMPLES GALLERY (signed-in view only) ───────────────────────────────────
function ExamplesGallery() {
  return (
    <div className="bg-gray-950 border-t border-gray-800 px-4 py-12"
         style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-1 text-center">
          Example outputs
        </p>
        <p className="text-gray-700 text-xs text-center mb-6">
          Built with prompts generated above
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {EXAMPLES.map((src, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-200 hover:scale-[1.02]"
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
  const [authMode, setAuthMode] = useState('signin')

  const openAuth = (mode) => { setAuthMode(mode); setShowAuthModal(true) }

  // While Supabase resolves the existing session, show skeleton to prevent
  // a flash of the landing page for already-signed-in users.
  if (loading) return <AppSkeleton />

  // ── Not signed in → landing page ──
  if (!user) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
        <Analytics/>
        <LandingPage
          onSignIn={() => openAuth('signin')}
          onGetStarted={() => openAuth('signup')}
          onSubscribe={(plan) => {
            const link = getStripeLink(plan, user)
            if (link) { window.location.href = link } else { openAuth('signup') }
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
      </Suspense>
    )
  }

  // ── Signed in → prompt generator ──
  return (
    <div className="flex flex-col">
      <Suspense fallback={<AppSkeleton />}>
      <Analytics/>
        <PromptGenerator />
      </Suspense>
      <ExamplesGallery />
    </div>
  )
}
