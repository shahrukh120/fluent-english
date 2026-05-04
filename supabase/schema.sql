-- Run this entire file ONCE in Supabase Dashboard → SQL Editor → New query.
-- It creates the two tables, locks them down with RLS, and grants read access
-- only to the founder's email.

-- 1. Demo session requests (no payment) ────────────────────
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  preferred_at timestamptz,           -- the date+time the user picked
  issues text
);

-- 2. Paid enrollments ──────────────────────────────────────
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  country text,
  state text,
  profile text,                       -- 'Student' | 'Working Professional' | 'Other'
  profession text,
  college text,
  course_field text,
  year text,
  english_level text,
  programme text,
  duration text,
  amount integer,                     -- in INR (rupees, not paise)
  payment_id text unique,             -- razorpay payment_xxxx
  order_id text                       -- razorpay order_xxxx
);

-- 3. Lock the tables — only the founder's email can read ─
alter table public.demo_requests enable row level security;
alter table public.enrollments  enable row level security;

drop policy if exists "founder reads demos" on public.demo_requests;
create policy "founder reads demos"
  on public.demo_requests
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'contact.fluentenglishedu@gmail.com');

drop policy if exists "founder reads enrollments" on public.enrollments;
create policy "founder reads enrollments"
  on public.enrollments
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'contact.fluentenglishedu@gmail.com');

-- Founder can also delete rows from the admin panel.
drop policy if exists "founder deletes demos" on public.demo_requests;
create policy "founder deletes demos"
  on public.demo_requests
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'contact.fluentenglishedu@gmail.com');

drop policy if exists "founder deletes enrollments" on public.enrollments;
create policy "founder deletes enrollments"
  on public.enrollments
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'contact.fluentenglishedu@gmail.com');

-- The serverless functions write rows using the service-role key, which bypasses
-- RLS — so we don't need INSERT policies. Anonymous users cannot read OR write.

-- 4. Helpful indexes for the admin tables ──────────────────
create index if not exists demo_requests_created_at_idx on public.demo_requests (created_at desc);
create index if not exists enrollments_created_at_idx   on public.enrollments  (created_at desc);
