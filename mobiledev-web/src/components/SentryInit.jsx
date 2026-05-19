'use client'
// Importing sentry.js here ensures Sentry.init() runs client-side only.
// This file is rendered as a leaf in the Server Component root layout,
// so @sentry/react never executes in the Node.js build environment.
import '../lib/sentry'
export default function SentryInit() { return null }
