import * as Sentry from '@sentry/react'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

export const isSentryConfigured = Boolean(dsn)

// Guard against server-side execution — @sentry/react is browser-only.
// SentryInit.jsx imports this file as a 'use client' component so this
// block only runs in the browser, but the guard keeps it safe if the
// module is accidentally evaluated server-side.
if (dsn && typeof window !== 'undefined') {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
  })
}

export { Sentry }
