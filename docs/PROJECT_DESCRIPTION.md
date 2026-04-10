# Opis projektu `bet-cup`

## Cel

Celem aplikacji jest umożliwienie obstawiania wyników meczów turnieju piłkarskiego (World Cup / Euro) w zamkniętej grupie znajomych.

Projekt jest prowadzony przez organizatora, który ręcznie zarządza danymi i pilnuje poprawności wyników.

## Zakres MVP

### 1) Tabela wyników

- Wiersze: mecze.
- Kolumny: gracze.
- Pierwsza kolumna: mecz (`homeTeam vs awayTeam`) + flaga kraju.
- W kolumnach graczy: typowany wynik.
- Nad kolumną gracza: suma punktów.
- Sekcje tabeli oddzielone nagłówkami etapów (np. `Grupa A`, `Grupa B`).
- Kolorowanie komórek:
  - trafiony dokładny wynik,
  - trafiona strona (1/X/2),
  - brak punktów.

### 2) Wykres punktów

- Wykres słupkowy pokazujący sumaryczne punkty graczy.
- Dane liczone na podstawie tych samych JSON-ów co tabela.

### 3) Formularz typowania

- Formularz etapowy (na start grupy + kolejne fazy).
- Zapis draftu do `localStorage`.
- Submit na MVP: kopiowanie JSON do schowka.
- Po submit: czyszczenie draftu.

## Logika punktacji

- Dokładny wynik: domyślnie `5` punktów.
- Trafiona strona (1/X/2): domyślnie `3` punkty.
- Wszystko konfigurowalne globalnie w `src/config/app.config.ts`.

## Etapy turnieju i widoczność

Widoczność jest sterowana flagami per etap:
- osobno dla tabeli (`tableVisible`),
- osobno dla formularza (`formVisible`).

Dzięki temu można przygotować kolejne etapy wcześniej i pokazać je dopiero we właściwym momencie.

## Zarządzanie danymi

- Brak backendu i bazy danych.
- Dane meczów i typów trzymane w plikach JSON.
- Kolumny graczy budowane na podstawie folderów w `src/data/predictions`.
- Na starcie przykładowy zakres: tylko `Grupa A` i `Grupa B` (4 drużyny w każdej).

## UI/UX

- Mobile-first, prosty i czytelny interfejs.
- Layout:
  - stały sidebar z nawigacją,
  - widok z tabelą i wykresem,
  - osobny widok formularza.
- Wspierany tryb jasny/ciemny.
