import posthog from 'posthog-js'

const key  = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

export const isPostHogConfigured = Boolean(key)

if (key) {
  posthog.init(key, {
    api_host:           host,
    capture_pageview:   true,   // automatic pageview on init
    capture_pageleave:  true,   // fires when user navigates away
    persistence:        'localStorage',
  })
}

/**
 * Fire-and-forget event capture.
 * Safe to call regardless of whether PostHog is configured —
 * silently no-ops when VITE_PUBLIC_POSTHOG_KEY is absent.
 */
export function capture(event, properties) {
  if (!key) return
  posthog.capture(event, properties)
}

export { posthog }
