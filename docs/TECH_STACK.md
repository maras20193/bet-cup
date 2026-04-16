# Stack technologiczny (MVP)

## Core

- `React` + `TypeScript`
- `Vite` (szybki frontend, prosty deploy)
- `React Router` (routing aplikacji)

## UI

- `Tailwind CSS`
- `shadcn/ui`
- `lucide-react` (ikony)

## Formularze i walidacja

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

## Dane i stan

- Dane organizatora w TS (`src/config`, `src/data` — mecze z `result`, `teams`)
- Typy graczy jako JSON w `src/data/predictions`
- Funkcje mapujące dane -> model aplikacyjny
- `TanStack Query` (cache/selectory dla danych frontendowych)
- `localStorage` (draft formularza)

## Wizualizacja

- `Recharts` (wykres słupkowy punktów)

## Narzędzia developerskie

- `ESLint`
- `Prettier`
- `npm`

## Hosting

- `Vercel` (planowany deploy)

## Uwagi architektoniczne

- Projekt działa bez backendu i bez bazy danych.
- Zmiany w `src/` wymagają nowego builda/deployu.
- Wysyłka mailowa jest poza MVP (na MVP: kopiowanie JSON do schowka).
