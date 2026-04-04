/**
 * useProfile — manages the user's plan and generation count.
 *
 * Run this in Supabase SQL editor before using:
 *
 *   create table if not exists user_profiles (
 *     id               uuid primary key references auth.users(id) on delete cascade,
 *     plan             text    not null default 'free',   -- 'free' | 'monthly' | 'lifetime'
 *     generation_count integer not null default 0,
 *     mockup_count     integer not null default 0,
 *     mockup_reset_at  timestamptz not null default now(),
 *     created_at       timestamptz default now()
 *   );
 *   alter table user_profiles enable row level security;
 *   create policy "own profile select" on user_profiles for select using (auth.uid() = id);
 *   create policy "own profile insert" on user_profiles for insert with check (auth.uid() = id);
 *   create policy "own profile update" on user_profiles for update using (auth.uid() = id);
 *
 *   -- Add mockup columns if table already exists:
 *   alter table user_profiles
 *     add column if not exists mockup_count integer not null default 0,
 *     add column if not exists mockup_reset_at timestamptz not null default now();
 */

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const FREE_LIMIT = 1
export const MOCKUP_LIMIT = 200

export function useProfile(userId) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(Boolean(userId && supabase))

  const load = useCallback(async () => {
    if (!userId || !supabase) { setProfile(null); setLoading(false); return null }
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    let profile
    if (error?.code === 'PGRST116') {
      const { data: created } = await supabase
        .from('user_profiles')
        .insert({ id: userId })
        .select()
        .single()
      profile = created
    } else {
      profile = data
    }

    // Claim any pending Stripe activation (guest checkout → sign-up flow)
    if (profile?.plan === 'free') {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        const { data: claimedPlan } = await supabase.rpc('claim_pending_activation', {
          p_user_id: userId,
          p_email: user.email,
        })
        if (claimedPlan) {
          profile = { ...profile, plan: claimedPlan }
        }
      }
    }

    setProfile(profile)
    setLoading(false)
    return profile
  }, [userId])

  useEffect(() => { load() }, [load])

  const refresh = useCallback(() => load(), [load])

  // Increment the generation counter for this user
  const incrementGeneration = useCallback(async () => {
    if (!userId || !supabase || !profile) return
    const newCount = (profile.generation_count ?? 0) + 1
    setProfile(p => ({ ...p, generation_count: newCount }))
    await supabase
      .from('user_profiles')
      .update({ generation_count: newCount })
      .eq('id', userId)
  }, [userId, profile])

  // Upgrade the user's plan (called by Stripe webhook — exposed for optimistic update if needed)
  const upgradePlan = useCallback(async (plan) => {
    if (!userId || !supabase) return
    setProfile(p => ({ ...p, plan }))
    await supabase
      .from('user_profiles')
      .update({ plan })
      .eq('id', userId)
  }, [userId])

  const isPaid = profile?.plan === 'monthly' || profile?.plan === 'lifetime'
  const isLifetime = profile?.plan === 'lifetime'
  const generationsUsed = profile?.generation_count ?? 0
  const withinLimit = loading || !profile || isPaid || generationsUsed < FREE_LIMIT
  const mockupCount = profile?.mockup_count ?? 0
  const withinMockupLimit = loading || !profile || mockupCount < MOCKUP_LIMIT

  return {
    profile, loading, refresh,
    isPaid, isLifetime, withinLimit, generationsUsed,
    upgradePlan, incrementGeneration,
    mockupCount, withinMockupLimit,
  }
}
