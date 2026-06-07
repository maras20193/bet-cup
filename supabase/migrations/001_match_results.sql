-- Turnieje (metadane; na start jeden rekord)
create table public.tournaments (
  id         text primary key,
  name       text not null,
  status     text not null check (status in ('not-started', 'in-progress', 'finished')),
  created_at timestamptz not null default now()
);

-- Wyniki meczów: wiersz per mecz od startu; null = mecz jeszcze bez wyniku
create table public.match_results (
  tournament_id text not null references public.tournaments(id) on delete cascade,
  match_id      text not null,
  home          int,
  away          int,
  updated_at    timestamptz not null default now(),
  primary key (tournament_id, match_id),
  constraint match_results_scores_valid check (
    (home is null and away is null)
    or (home is not null and away is not null and home >= 0 and away >= 0)
  )
);

create index match_results_tournament_id_idx
  on public.match_results (tournament_id);

-- RLS: publiczny odczyt, brak zapisu z anon key
alter table public.tournaments enable row level security;
alter table public.match_results enable row level security;

create policy "tournaments_public_read"
  on public.tournaments for select
  using (true);

create policy "match_results_public_read"
  on public.match_results for select
  using (true);

-- Brak INSERT/UPDATE/DELETE dla anon/authenticated
-- Zapis tylko przez Supabase Studio (service role) lub SQL Editor
