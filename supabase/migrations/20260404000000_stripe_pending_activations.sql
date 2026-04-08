-- stripe_pending_activations
-- Holds plan purchases made by users who were not signed in at checkout time.
-- The email key comes from Stripe's session.customer_details.email.
-- Rows are claimed and deleted by claim_pending_activation() on first profile load.

create table if not exists stripe_pending_activations (
  email              text        primary key,
  plan               text        not null,          -- 'monthly' | 'lifetime'
  stripe_customer_id text,
  created_at         timestamptz not null default now()
);

-- Deny all direct client access — only the service-role webhook and the
-- security-definer RPC below may touch this table.
alter table stripe_pending_activations enable row level security;


-- claim_pending_activation
-- Called from useProfile after sign-in/sign-up.
-- Atomically applies a pending plan to user_profiles and removes the row.
-- Returns the claimed plan text, or null if nothing was pending.
create or replace function claim_pending_activation(
  p_user_id uuid,
  p_email   text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pending stripe_pending_activations%rowtype;
  v_current_plan text;
begin
  -- Normalise email to lowercase to match Stripe's format
  p_email := lower(p_email);

  -- Look for a pending activation for this email
  select * into v_pending
  from stripe_pending_activations
  where lower(email) = p_email
  limit 1;

  if not found then
    return null;
  end if;

  -- Only apply if current plan is still 'free' (don't downgrade a paid plan)
  select plan into v_current_plan
  from user_profiles
  where id = p_user_id;

  if v_current_plan in ('monthly', 'lifetime') then
    -- Already paid — clean up the pending row anyway
    delete from stripe_pending_activations where lower(email) = p_email;
    return null;
  end if;

  -- Apply the plan
  update user_profiles
  set
    plan               = v_pending.plan,
    stripe_customer_id = v_pending.stripe_customer_id
  where id = p_user_id;

  -- Consume the pending row
  delete from stripe_pending_activations where lower(email) = p_email;

  return v_pending.plan;
end;
$$;
