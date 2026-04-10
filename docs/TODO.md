# TODO - plan realizacji `bet-cup`

## MVP (kolejność wdrażania)

- [x] 1. Zainicjować projekt `Vite + React + TypeScript`.
- [x] 2. Dodać i skonfigurować `Tailwind CSS`, `shadcn/ui`, `React Router`.
- [ ] 3. Przygotować strukturę katalogów: `config`, `data/matches`, `data/predictions`.
- [ ] 4. Zdefiniować `config/app.config.json` (punktacja, flagi etapów, kolory).
- [ ] 5. Dodać przykładowe dane meczów (`group-a`, `group-b`) oraz typów graczy.
- [ ] 6. Napisać parsery i mapowanie JSON -> model domenowy (mecze, gracze, punkty).
- [ ] 7. Zaimplementować logikę punktacji (dokładny wynik vs strona 1/X/2).
- [ ] 8. Zbudować layout aplikacji (sidebar + widoki: `Wyniki`, `Typowanie`).
- [ ] 9. Zaimplementować tabelę wyników z sekcjami etapów i kolorowaniem komórek.
- [ ] 10. Dodać lokalną mapę kodów krajów -> flagi (na start emoji).
- [ ] 11. Zbudować wykres słupkowy punktów (`Recharts`).
- [ ] 12. Zbudować formularz typowania (`react-hook-form` + `zod`).
- [ ] 13. Dodać auto-zapis draftu formularza do `localStorage` (debounce + restore).
- [ ] 14. Dodać akcję submit: wygenerowanie i kopiowanie JSON do schowka.
- [ ] 15. Po submit czyścić draft i pokazać status powodzenia.
- [ ] 16. Dodać obsługę flag `tableVisible` / `formVisible` dla etapów.
- [ ] 17. Wdrożyć tryb jasny/ciemny.
- [ ] 18. Dopracować responsywność tabeli (łatwe przewijanie i czytelność na mobile).
- [ ] 19. Dodać podstawowe testy logiki punktacji i mapowania danych.
- [ ] 20. Wdrożyć aplikację na `Vercel`.

## Backlog (po MVP)

- [ ] Integracja wysyłki mailowej (np. EmailJS/Formspree/Resend).
- [ ] Rozbicie wykresu na punkty: dokładne vs strona.
- [ ] Filtrowanie tabeli po etapie i graczu.
- [ ] Panel admina do ręcznej edycji wyników (z autoryzacją).
- [ ] Automatyczne pobieranie wyników rzeczywistych z API.
- [ ] Obsługa wielu turniejów + archiwum.
- [ ] Motywy kolorystyczne per turniej.
