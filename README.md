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
- 📝 **Formularz typowania** z auto-zapisem draftu i kopiowaniem JSON do schowka.
- ⚙️ **Globalny config** punktacji, flag widoczności etapów i kolorów UI.
- 📱 **Responsywny interfejs** (mobile-first).

## Dokumentacja

- Opis projektu: `docs/PROJECT_DESCRIPTION.md`
- Stack technologiczny: `docs/TECH_STACK.md`
- Plan prac (MVP + backlog): `docs/TODO.md`
- Format danych JSON: `docs/JSON_FORMAT_PROPOSALS.md`

## Założenia techniczne

- Aplikacja działa jako frontend statyczny.
- Dane trzymamy w plikach JSON w repozytorium.
- Organizator ręcznie dodaje/aktualizuje pliki z danymi.
- Na start obsługujemy jeden turniej.

## Planowane uruchamianie projektu

```bash
npm install
npm run dev
```

## Status

Aktualnie przygotowywana jest dokumentacja i kontrakty danych pod MVP.
