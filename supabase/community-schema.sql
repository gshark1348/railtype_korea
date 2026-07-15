-- RAILTYPE KOREA public community records
-- Run this once in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.public_runs (
  id uuid primary key default gen_random_uuid(),
  client_run_id text not null unique check (char_length(client_run_id) between 1 and 80),
  nickname text not null check (char_length(nickname) between 1 and 16),
  line smallint not null check (line between 1 and 99),
  course_name text not null check (char_length(course_name) between 1 and 40),
  direction_name text not null check (char_length(direction_name) between 1 and 40),
  route_name text not null check (char_length(route_name) between 1 and 80),
  duration_ms integer not null check (duration_ms between 100 and 7200000),
  accuracy numeric(5,2) not null check (accuracy between 0 and 100),
  errors integer not null default 0 check (errors between 0 and 10000),
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists public_runs_completed_at_idx
  on public.public_runs (completed_at desc);
create index if not exists public_runs_line_duration_idx
  on public.public_runs (line, duration_ms asc);

alter table public.public_runs enable row level security;

-- Everyone can read the public scoreboard.
drop policy if exists "Public runs are readable" on public.public_runs;
create policy "Public runs are readable"
  on public.public_runs
  for select
  to anon, authenticated
  using (true);

-- Anonymous browser users may submit only rows satisfying table constraints.
-- For a large public launch, replace direct inserts with an Edge Function,
-- rate limiting and CAPTCHA/Turnstile validation.
drop policy if exists "Anonymous users can submit runs" on public.public_runs;
create policy "Anonymous users can submit runs"
  on public.public_runs
  for insert
  to anon, authenticated
  with check (true);

-- No public update or delete policy is intentionally provided.
