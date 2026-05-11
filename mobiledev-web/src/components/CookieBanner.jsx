import { useState, useEffect } from 'react'
import { initPostHog } from '../lib/posthog'

const CONSENT_KEY = 'humble_cookie_consent'
const ORANGE = '#EA580C'
const AMBER  = '#FB923C'
const BROWN  = '#1C0A02'
const BROWN3 = '#9A6040'
const BG     = '#FFFBF7'
const SURF   = '#FFFFFF'
const BORDER = '#E8CFBA'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
    if (consent === 'accepted') initPostHog()
  }, [])

  const dismiss = (choice) => {
    localStorage.setItem(CONSENT_KEY, choice)
    if (choice === 'accepted') initPostHog()
    setLeaving(true)
    setTimeout(() => setVisible(false), 350)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position:   'fixed',
        bottom:     0,
        left:       0,
        right:      0,
        zIndex:     9999,
        padding:    '0 16px 16px',
        fontFamily: "'Inter', system-ui, sans-serif",
        transform:  leaving ? 'translateY(110%)' : 'translateY(0)',
        opacity:    leaving ? 0 : 1,
        transition: 'transform 350ms cubic-bezier(.4,0,.2,1), opacity 350ms ease',
        animation:  leaving ? 'none' : 'slideUp 400ms cubic-bezier(.4,0,.2,1)',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div
        style={{
          maxWidth:        '760px',
          margin:          '0 auto',
          backgroundColor: SURF,
          border:          `1px solid ${BORDER}`,
          borderRadius:    '16px',
          padding:         '18px 20px',
          display:         'flex',
          alignItems:      'center',
          gap:             '20px',
          boxShadow:       '0 -4px 40px rgba(92,46,10,0.12)',
          flexWrap:        'wrap',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width:           '36px',
            height:          '36px',
            borderRadius:    '10px',
            backgroundColor: `${ORANGE}15`,
            border:          `1px solid ${ORANGE}30`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '18px',
            flexShrink:      0,
          }}
        >
          🍪
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{ color: BROWN, fontSize: '12px', fontWeight: 600, marginBottom: '3px' }}>
            We use cookies
          </p>
          <p style={{ color: BROWN3, fontSize: '11px', lineHeight: 1.6, margin: 0 }}>
            We use essential cookies to keep you signed in, and optional analytics cookies (PostHog)
            to understand how the product is used.{' '}
            <a
              href="/cookie-policy.html"
              style={{ color: ORANGE, textDecoration: 'none' }}
            >
              Cookie Policy
            </a>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
          <button
            onClick={() => dismiss('rejected')}
            style={{
              backgroundColor: 'transparent',
              border:          `1px solid ${BORDER}`,
              color:           BROWN3,
              fontFamily:      "'Inter', system-ui, sans-serif",
              fontSize:        '11px',
              fontWeight:      600,
              padding:         '9px 16px',
              borderRadius:    '10px',
              cursor:          'pointer',
              transition:      'border-color 150ms, color 150ms',
              whiteSpace:      'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = BROWN }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = BROWN3 }}
          >
            Reject non-essential
          </button>
          <button
            onClick={() => dismiss('accepted')}
            style={{
              background:  `linear-gradient(135deg, ${ORANGE}, ${AMBER})`,
              border:      'none',
              color:       '#fff',
              fontFamily:  "'Inter', system-ui, sans-serif",
              fontSize:    '11px',
              fontWeight:  600,
              padding:     '9px 16px',
              borderRadius:'10px',
              cursor:      'pointer',
              transition:  'opacity 150ms',
              whiteSpace:  'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
