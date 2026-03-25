import * as Sentry from '@sentry/react'

const dsn = import.meta.env.VITE_SENTRY_DSN

export const isSentryConfigured = Boolean(dsn)

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,   // "development" | "production"
    integrations: [
      Sentry.browserTracingIntegration(), // performance traces (page loads, navigation)
    ],
    // Capture all traces in dev so you can inspect them immediately;
    // dial back to 20% in production to stay inside the free-tier quota.
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  })
}

export { Sentry }
