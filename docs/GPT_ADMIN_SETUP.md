# Custom GPT — wpisywanie wyników z telefonu

Organizator pisze naturalnym językiem (np. „Francja – Korea 2:2, 1/8 finału”). ChatGPT pobiera katalog drużyn i meczów, wybiera właściwy `matchId` i zapisuje wynik w Supabase. Strona odświeża dane bez deploya.

## Wymagania

1. Aplikacja wdrożona na Vercel z zmiennymi:
   - `ADMIN_SECRET` — losowy długi sekret (ten sam w GPT jako API Key)
   - `SUPABASE_URL` — URL projektu Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` — klucz service role (nigdy w frontendzie)
2. W Supabase istnieją wiersze `match_results` dla turnieju (seed: `npm run supabase:seed`).

## 1. Utwórz Custom GPT

1. [chatgpt.com](https://chatgpt.com) → **Explore GPTs** → **Create**.
2. Nazwa np. **Bet Cup — wyniki**.
3. Opis: aktualizacja wyników meczów World Cup 2026 dla znajomych.
4. **Only me** (lub zaufana osoba).

## 2. Actions (OpenAPI)

1. **Configure** → **Actions** → **Create new action**.
2. **Import from URL** albo wklej zawartość pliku [`openapi-admin.yaml`](./openapi-admin.yaml).
3. W `servers[0].url` ustaw produkcyjny adres, np. `https://twoja-apka.vercel.app`.
4. **Authentication:**
   - Typ: **API Key**
   - Auth Type: **Custom**
   - Custom Header Name: `X-Admin-Secret`
   - API Key: wartość `ADMIN_SECRET` z Vercel
5. W schemacie OpenAPI tylko `updateMatchResult` ma `security: AdminSecret`. Endpointy GET są publiczne (`security: []`) — jeśli ChatGPT wymaga auth globalnie, ustaw auth tylko na operacji POST w edytorze Actions.

### Trzy operacje

| operationId | Endpoint | Auth |
|-------------|----------|------|
| `listTeams` | GET `/api/admin/teams` | brak |
| `listMatches` | GET `/api/admin/matches` | brak |
| `updateMatchResult` | POST `/api/admin/match-result` | `X-Admin-Secret` |

## 3. Instructions (wklej do GPT)

```
Jesteś asystentem organizatora turnieju Bet Cup (World Cup 2026). Zapisujesz wyniki meczów przez API — nigdy nie zgaduj matchId.

Przy KAŻDEJ aktualizacji wyniku:
1. Wywołaj listMatches (opcjonalnie listTeams przy niejasnych nazwach).
2. Zmapuj nazwy użytkownika na drużyny z katalogu (np. „Korea” → Korea Południowa).
3. Jeśli użytkownik poda fazę („grupa A”, „pucharowa”, „1/8 finału”) — filtruj po phaseId, phaseLabel lub groupId.
4. Ta sama para drużyn może grać w grupie i w pucharze — wybierz JEDEN matchId z kontekstu fazy.
5. Gdy hasAssignedTeams jest false, mecz ma tylko sloty pucharowe — powiedz, że harmonogram nie ma jeszcze przypisanych drużyn (trzeba zaktualizować repo i deploy) albo poproś o matchId jeśli użytkownik go zna.
6. Wywołaj updateMatchResult z matchId, home, away (liczby całkowite ≥ 0). Kolejność: home = pierwsza drużyna w komunikacie użytkownika (gospodarz w harmonogramie).
7. Potwierdź zapis: mecz, wynik, faza.

Nie wysyłaj nazw drużyn do POST — tylko matchId i wynik.
Odpowiadaj po polsku, krótko.
```

## 4. Test ręczny (curl)

```bash
# Drużyny (publiczne)
curl https://TWOJA-APKA.vercel.app/api/admin/teams

# Mecze (publiczne)
curl https://TWOJA-APKA.vercel.app/api/admin/matches

# Zapis (chroniony)
curl -X POST https://TWOJA-APKA.vercel.app/api/admin/match-result \
  -H "Content-Type: application/json" \
  -H "X-Admin-Secret: TWOJ_ADMIN_SECRET" \
  -d '{"matchId":"gs-a-001","home":1,"away":0}'
```

## 5. Faza pucharowa

- Przed znanymi parami: GET zwraca `homeSlot` / `awaySlot`, `hasAssignedTeams: false`.
- Po losowaniu: uzupełnij `homeId` / `awayId` w `src/data/matches/knockout/`, deploy → katalog API się odświeży.
- Od tego momentu GPT rozpozna pary po nazwach w `listMatches`.

## Dwa kanały aktualizacji

| Kanał | Kiedy |
|-------|--------|
| **Ten GPT (telefon)** | Naturalny język → AI wybiera matchId |
| **Cursor + Supabase MCP (laptop)** | Reguła `.cursor/rules/supabase-match-results.mdc` |

Oba robią `UPDATE` w `match_results`. Frontend tylko czyta.

## Skąd biorą się dane w API (jedno źródło prawdy)

**Nie edytujesz** `api/generated/tournament-catalog.ts` ręcznie — to snapshot wygenerowany z tych samych plików co frontend:

| API | Źródło w repo |
|-----|----------------|
| `GET /api/admin/teams` | `src/data/teams/teams.ts` |
| `GET /api/admin/matches` | `src/data/matches/**` przez `buildAllMatches()` (to samo co `phase-bundles.ts`) |

Logika mapowania: `src/lib/tournament-catalog/buildApiCatalog.ts`.

Pola typu `homeName`, `phaseLabel`, `hasAssignedTeams` to **wyliczenia na potrzeby GPT** (żeby AI nie musiało samo składać nazw) — nie osobna baza danych.

**Przykład:** w `round-of-4.ts` ustawiasz `homeId` / `awayId` → po `npm run api:catalog` (lub deploy) API zwraca już `homeName`, `awayName` i `hasAssignedTeams: true`.

## Po zmianie harmonogramu w repo

```bash
npm run api:catalog   # lokalnie odśwież snapshot (też robi npm run build i npm run dev:vercel)
git commit + deploy
```
