insert into public.tournaments (id, name, status)
values ('world-cup-2026', 'World Cup 2026', 'in-progress')
on conflict (id) do update
  set name = excluded.name, status = excluded.status;
