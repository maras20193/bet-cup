# bet-cup ⚽🏆

Prosta aplikacja webowa do obstawiania meczów Mistrzostw Świata / Europy w zamkniętej grupie znajomych.

## O projekcie

`bet-cup` to szybki projekt frontendowy (bez backendu i bazy danych), gdzie:
- gracze typują wyniki meczów,
- organizator ręcznie zarządza danymi,
- tabela i wykres pokazują aktualny ranking punktów.

## Główne funkcje (MVP)

- 📊 **Tabela wyników** z podziałem na etapy turnieju i kolorowaniem trafień.
- 📈 **Wykres słupkowy** sumarycznych punktów graczy.
- 📝 **Formularz typowania** z auto-zapisem draftu i wysyłką na Slack (Vercel API).
- ⚙️ **Globalny config** punktacji, flag widoczności etapów i kolorów UI.
- 📱 **Responsywny interfejs** (mobile-first).

## Dokumentacja

- Opis projektu: `docs/PROJECT_DESCRIPTION.md`
- Stack technologiczny: `docs/TECH_STACK.md`
- Plan prac (MVP + backlog): `docs/TODO.md`
- Format danych (TS + JSON typów): `docs/JSON_FORMAT_PROPOSALS.md`
- Slack + Vercel: `docs/SLACK_VERCEL_SETUP.md`

## Założenia techniczne

- Aplikacja działa jako frontend statyczny.
- Dane organizatora (mecze z polem `result`, drużyny) w TypeScript pod `src/data`.
- Typy od graczy jako JSON w `src/data/predictions`.
- Organizator ręcznie edytuje te pliki w repozytorium.
- Na start obsługujemy jeden turniej.

## Uruchamianie

```bash
npm install
npm run dev          # sam frontend (bez /api)
npm run dev:vercel   # frontend + POST /api/submit (Slack)
```

Wysyłka typów: skonfiguruj Slack i zmienne na Vercel — `docs/SLACK_VERCEL_SETUP.md`.

## Status

Aktualnie przygotowywana jest dokumentacja i kontrakty danych pod MVP.
