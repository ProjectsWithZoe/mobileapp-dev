import posthog from 'posthog-js'

const key  = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

export const isPostHogConfigured = Boolean(key)

let initialised = false

/**
 * Initialise PostHog. Called only after the user explicitly accepts analytics
 * cookies — never on page load without consent (PECR / ePrivacy compliance).
 */
export function initPostHog() {
  if (!key || initialised) return
  posthog.init(key, {
    api_host:          host,
    capture_pageview:  true,
    capture_pageleave: true,
    persistence:       'localStorage',
  })
  initialised = true
}

/**
 * Fire-and-forget event capture.
 * Safe to call regardless of whether PostHog is configured or consented —
 * silently no-ops when uninitialised.
 */
export function capture(event, properties) {
  if (!initialised) return
  posthog.capture(event, properties)
}

export { posthog }
