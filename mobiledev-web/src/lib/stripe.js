export function getStripeLink(plan, user) {
  const base = plan === 'monthly'
    ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK
    : process.env.NEXT_PUBLIC_STRIPE_LIFETIME_LINK
  if (!base) return null
  const url = new URL(base)
  if (user?.id)    url.searchParams.set('client_reference_id', user.id)
  if (user?.email) url.searchParams.set('prefilled_email', user.email)
  return url.toString()
}
