# Format danych (MVP)

Dane **organizatora** (mecze, wyniki, słownik drużyn) są w **TypeScript** — czytelność w IDE, mniej literówek, typy (`TeamId` itd.).

**Typy od graczy** (wklejka z formularza) zostają w **JSON** w `src/data/predictions/...`.

## Struktura katalogów

```text
src/
  config/
    app.config.ts
  data/
    teams/
      teams.ts
    matches/
      types.ts
      group-stage/
        types.ts
        group-a.ts
        group-b.ts
        index.ts
      round-of-4.ts
    predictions/
      <userId>/
        group-stage.json
```

## Dlaczego tak?

- `teams` używa kluczy semantycznych (`POLAND`, `GERMANY`, …) — od razu widać drużynę; pole `code` to ISO pod flagi/API.
- Mecze i wyniki w jednym miejscu: każdy mecz ma `result: { home, away } | null` (`null` = brak jeszcze wyniku).
- JSON tylko tam, gdzie dane przychodzą ze schowka od gracza.
- Kolumny tabeli budujemy z folderów w `predictions` (bez `users.json`).

## Konfiguracja globalna (TS)

Plik: `src/config/app.config.ts`

```ts
export const appConfig = {
  tournament: {
    id: "world-cup-2026",
    name: "World Cup 2026",
  },
  scoring: {
    exactScorePoints: 5,
    outcomePoints: 3,
  },
  phases: {
    "group-stage": {
      label: "Faza grupowa",
      tableVisible: true,
      formVisible: true,
    },
  },
  ui: {
    colors: {
      exactHitBg: "#16a34a",
      outcomeHitBg: "#2563eb",
      missBg: "#111827",
    },
  },
} as const
```

## Przykładowe dane (organizator — TS)

### `src/data/teams/teams.ts`

```ts
export const teams = {
  POLAND: { code: "PL", name: "Polska", flag: "🇵🇱" },
  BELGIUM: { code: "BE", name: "Belgia", flag: "🇧🇪" },
} as const

export type TeamId = keyof typeof teams
```

### `src/data/matches/types.ts`

```ts
export type MatchResult = { home: number; away: number } | null
```

### `src/data/matches/group-stage/`

- `group-a.ts` / `group-b.ts` — mecze danej grupy.
- `index.ts` — składa `groupStageMatches` (`phaseId` + połączone tablice).

```ts
// group-a.ts (fragment)
export const groupStageGroupAMatches = [
  {
    id: "gs-a-001",
    groupId: "A",
    homeId: "POLAND",
    awayId: "BELGIUM",
    result: { home: 2, away: 1 },
  },
]
```

### `src/data/matches/round-of-4.ts`

Sloty pucharowe (`1A`, `2B`) to `homeRef` / `awayRef`, nie wpisy w `teams`:

```ts
{
  id: "r4-001",
  homeRef: { type: "group-rank", groupId: "A", place: 1 },
  awayRef: { type: "group-rank", groupId: "B", place: 2 },
  result: null,
}
```

## Typy od graczy (JSON)

### `src/data/predictions/adam-nowak/group-stage.json`

```json
{
  "userId": "adam-nowak",
  "displayName": "Adam N.",
  "phaseId": "group-stage",
  "submittedAt": "2026-06-10T12:00:00Z",
  "predictions": [
    {
      "matchId": "gs-a-001",
      "home": 2,
      "away": 1
    }
  ]
}
```

## Punktacja

1. Jeśli gracz trafi dokładny wynik (`home` i `away`) -> `exactScorePoints`.
2. W innym przypadku, jeśli trafi stronę (`1`, `X`, `2`) -> `outcomePoints`.
3. W pozostałych przypadkach -> `0`.

## Auto-zapis draftu formularza

- `localStorage`, debounce ~500ms,
- klucz: `draft:{phaseId}:{displayNameSlug}`,
- po submit: kopiuj JSON do schowka i czyść draft.

## Ważna uwaga (frontend-only)

Nowe pliki w `src/` wymagają builda/deployu, żeby były widoczne na produkcji.
