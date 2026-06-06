# TODO - plan realizacji `bet-cup`

## MVP (kolejność wdrażania)

- [x] 1. Zainicjować projekt `Vite + React + TypeScript`.
- [x] 2. Dodać i skonfigurować `Tailwind CSS`, `shadcn/ui`, `React Router`.
- [x] 3. Przygotować strukturę katalogów: `src/config`, `src/data` (mecze z `result` + `teams` w TS, `predictions` pod JSON od graczy).
- [x] 4. Zdefiniować `src/config/app.config.ts` (punktacja, flagi etapów, kolory).
- [x] 5. Dodać przykładowe dane meczów z `result` (TS) oraz przykładowe typy graczy (JSON w `predictions`).
- [x] 6. Napisać parsery i mapowanie JSON -> model domenowy (mecze, gracze, punkty).
- [x] 7. Zaimplementować logikę punktacji (dokładny wynik vs strona 1/X/2).
- [x] 8. Zbudować layout aplikacji (sidebar + widoki: `Wyniki`, `Typowanie`).
- [x] 9. Zaimplementować tabelę wyników z sekcjami etapów i kolorowaniem komórek.
- [x] 10. Dodać lokalną mapę kodów krajów -> flagi (na start emoji).
- [x] 11. Zbudować wykres słupkowy punktów (`Recharts`).
- [x] 12. Zbudować formularz typowania (`react-hook-form` + `zod`).
- [x] 13. Dodać auto-zapis draftu formularza do `localStorage` (debounce + restore).
- [x] 14. Dodać akcję submit: wygenerowanie i kopiowanie JSON do schowka.
- [x] 15. Po submit czyścić draft i pokazać status powodzenia.
- [x] 16. Dodać obsługę flag `tableVisible` / `formVisible` dla etapów.
- [x] 17. Wdrożyć tryb jasny/ciemny.
- [x] 18. Dopracować responsywność tabeli (łatwe przewijanie i czytelność na mobile).
- [x] 19. Dodać podstawowe testy logiki punktacji i mapowania danych.
- [x] 20. Wdrożyć aplikację na `Vercel`.

## Backlog (po MVP)

- [ ] Integracja wysyłki mailowej (np. EmailJS/Formspree/Resend).
- [ ] Rozbicie wykresu na punkty: dokładne vs strona.
- [ ] Filtrowanie tabeli po etapie i graczu.
- [ ] Panel admina do ręcznej edycji wyników (z autoryzacją).
- [ ] Automatyczne pobieranie wyników rzeczywistych z API.
- [ ] Obsługa wielu turniejów + archiwum.
- [ ] Motywy kolorystyczne per turniej.

## Ideas for future

- [ ] Multi-turniej: `src/config/tournaments/<tournament-id>.config.ts` (osobny config na każdy turniej).
- [ ] Globalny plik `src/config/app.ts` z `activeTournamentId` i metadanymi archiwum.
- [ ] Wspólny kontrakt typów dla configów turniejowych (`TournamentConfig`) + walidacja przy starcie aplikacji.
