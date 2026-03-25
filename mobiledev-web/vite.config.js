import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Headers safe for all environments — no CSP here because:
//   • `npm run dev`     → Vite HMR + @vitejs/plugin-react inject inline scripts
//   • Production CSP   → handled by vercel.json / public/_headers at the edge
const NON_CSP_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Full CSP only for `vite preview` which serves the compiled bundle
// (no HMR inline scripts, so script-src 'self' is safe here)
const PREVIEW_HEADERS = {
  ...NON_CSP_HEADERS,
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://*.supabase.co https://*.posthog.com https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; '),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
  server: {
    headers: NON_CSP_HEADERS,   // dev — no CSP, Vite needs inline scripts
  },
  preview: {
    headers: PREVIEW_HEADERS,   // local prod preview — full CSP safe on built bundle
  },
})
