# Wysyłka typów → Slack (Vercel)

Formularz wysyła `POST /api/submit`. Funkcja serwerowa na Vercel przekazuje dane na Slack Incoming Webhook (wiadomość + JSON w bloku kodu).

## 1. Slack

1. [api.slack.com/apps](https://api.slack.com/apps) → Create App → **Incoming Webhooks** → włącz.
2. **Add New Webhook to Workspace** → wybierz kanał (np. `#mundial-typy`).
3. Skopiuj URL webhooka.

Test (PowerShell):

```powershell
$body = '{"text":"Test z bet-cup"}'
Invoke-RestMethod -Uri "TWÓJ_WEBHOOK_URL" -Method Post -ContentType "application/json; charset=utf-8" -Body $body
```

## 2. Zmienne na Vercel

W projekcie: **Settings → Environment Variables** (Production + Preview):

| Nazwa | Wymagane | Opis |
|--------|----------|------|
| `SLACK_WEBHOOK_URL` | tak | URL z Slacka |
| `ALLOWED_ORIGIN` | nie | np. `https://bet-cup.vercel.app` — CORS; puste = `*` |
| `SUBMIT_SECRET` | nie | Jeśli ustawione, front musi mieć `VITE_SUBMIT_SECRET` z tą samą wartością |

**Nie** dodawaj `SLACK_WEBHOOK_URL` jako `VITE_*` — trafiłby do przeglądarki.

## 3. Deploy

```bash
npm install
npx vercel          # pierwsze podpięcie projektu
npx vercel --prod   # produkcja
```

Pliki: `api/submit.ts`, `vercel.json` (SPA + API).

## 4. Lokalny dev z API

Sam `npm run dev` (Vite) **nie** uruchamia `/api`. Użyj:

```bash
npm run dev:vercel
```

(wymaga `npm i -g vercel` lub `npx vercel dev`)

Ustaw w `.env.local` (opcjonalnie):

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

Vercel CLI wczytuje `.env.local` dla funkcji serwerowych.

## 5. Po wysłaniu (organizator)

1. Wiadomość na Slacku → skopiuj JSON z bloku kodu.
2. Zapisz jako `src/data/predictions/<slug>/group-stage.json`.
3. `npm run build` i deploy.
