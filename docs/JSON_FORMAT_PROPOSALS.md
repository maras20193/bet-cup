# Propozycja formatu danych JSON (MVP)

Ten dokument opisuje finalną propozycję danych dla `bet-cup` (frontend-only, bez bazy i backendu).

## Struktura katalogów

```text
src/
  config/
    app.config.json
  data/
    matches/
    group-stage.json
    round-of-32.json
    round-of-16.json
    round-of-8.json
    round-of-4.json
    third-place.json
    final.json
    predictions/
    adam-nowak/
      group-stage.json
      round-of-32.json
      round-of-16.json
    kasia-k/
      group-stage.json
      round-of-32.json
```

### Dlaczego tak?

- grupy są w jednym pliku (`group-stage.json`), więc na etapie grupowym dostajesz 1 plik na gracza,
- faza pucharowa jest rozbita etapami czasowymi (`round-of-32`, `round-of-16`, ...),
- każdy gracz ma osobny folder, więc dodawanie danych jest proste i ręczne,
- nie potrzebujemy osobnego `users.json` - kolumny tabeli budujemy na podstawie folderów w `predictions`.

## Konfiguracja globalna

Plik: `src/config/app.config.json`

```json
{
  "tournament": {
    "id": "world-cup-2026",
    "name": "World Cup 2026"
  },
  "scoring": {
    "exactScorePoints": 5,
    "outcomePoints": 3
  },
  "phases": {
    "group-stage": {
      "label": "Faza grupowa",
      "tableVisible": true,
      "formVisible": true
    },
    "round-of-32": {
      "label": "1/32",
      "tableVisible": false,
      "formVisible": false
    },
    "round-of-16": {
      "label": "1/16",
      "tableVisible": false,
      "formVisible": false
    }
  },
  "ui": {
    "colors": {
      "exactHitBg": "#16a34a",
      "outcomeHitBg": "#2563eb",
      "missBg": "#111827"
    }
  }
}
```

## Przykładowe dane

### `src/data/matches/group-stage.json`

```json
{
  "phaseId": "group-stage",
  "matches": [
    {
      "id": "gs-001",
      "groupId": "A",
      "homeTeam": {
        "name": "Polska",
        "code": "PL"
      },
      "awayTeam": {
        "name": "Belgia",
        "code": "BE"
      },
      "kickoffUtc": "2026-06-11T18:00:00Z",
      "result": {
        "home": 2,
        "away": 1
      }
    },
    {
      "id": "gs-002",
      "groupId": "B",
      "homeTeam": {
        "name": "Hiszpania",
        "code": "ES"
      },
      "awayTeam": {
        "name": "Niemcy",
        "code": "DE"
      },
      "kickoffUtc": "2026-06-12T18:00:00Z",
      "result": null
    }
  ]
}
```

### `src/data/predictions/adam-nowak/group-stage.json`

```json
{
  "userId": "adam-nowak",
  "displayName": "Adam N.",
  "phaseId": "group-stage",
  "submittedAt": "2026-06-10T12:00:00Z",
  "predictions": [
    {
      "matchId": "gs-001",
      "home": 2,
      "away": 1
    },
    {
      "matchId": "gs-002",
      "home": 1,
      "away": 1
    }
  ]
}
```

### `src/data/predictions/adam-nowak/round-of-32.json`

```json
{
  "userId": "adam-nowak",
  "displayName": "Adam N.",
  "phaseId": "round-of-32",
  "submittedAt": "2026-06-25T10:00:00Z",
  "predictions": [
    {
      "matchId": "r32-001",
      "home": 1,
      "away": 0
    }
  ]
}
```

## Punktacja

1. Jeśli gracz trafi dokładny wynik (`home` i `away`) -> `exactScorePoints`.
2. W innym przypadku, jeśli trafi stronę (`1`, `X`, `2`) -> `outcomePoints`.
3. W pozostałych przypadkach -> `0`.

## Auto-zapis draftu formularza

Rekomendacja MVP:
- zapis do `localStorage` na `onChange` z debounce `500ms`,
- klucz bez emaila: `draft:{phaseId}:{displayNameSlug}`,
- po submit: kopiuj JSON do schowka i czyść draft.

Przykład:

```text
draft:group-stage:adam-n
```

## Ważna uwaga (frontend-only)

Pliki JSON są częścią aplikacji. Po dodaniu nowych plików do repo trzeba zrobić nowy build/deploy, aby były widoczne na produkcji.
