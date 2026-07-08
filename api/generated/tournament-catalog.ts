// AUTO-GENERATED snapshot — api/generated/ — do not edit by hand.
// Source of truth: src/data/teams/teams.ts + src/data/matches/**
// Regenerated from the same data as the frontend (buildAllMatches → phase-bundles).
// After editing e.g. round-of-4.ts: npm run api:catalog (also runs on npm run build).

export const tournamentId = "world-cup-2026" as const

export type ApiTeamCatalogEntry = {
  teamId: string
  name: string
}

export type ApiMatchCatalogEntry = {
  matchId: string
  phaseId: string
  phaseLabel: string
  groupId: string | null
  homeTeamId: string | null
  awayTeamId: string | null
  homeName: string | null
  awayName: string | null
  homeSlot: string | null
  awaySlot: string | null
  hasAssignedTeams: boolean
}

export const teamCatalog: readonly ApiTeamCatalogEntry[] = [
  {
    "teamId": "ALGERIA",
    "name": "Algieria"
  },
  {
    "teamId": "ENGLAND",
    "name": "Anglia"
  },
  {
    "teamId": "SAUDI_ARABIA",
    "name": "Arabia Saudyjska"
  },
  {
    "teamId": "ARGENTINA",
    "name": "Argentyna"
  },
  {
    "teamId": "AUSTRALIA",
    "name": "Australia"
  },
  {
    "teamId": "AUSTRIA",
    "name": "Austria"
  },
  {
    "teamId": "BELGIUM",
    "name": "Belgia"
  },
  {
    "teamId": "BOSNIA_HERZEGOVINA",
    "name": "Bośnia i Hercegowina"
  },
  {
    "teamId": "BRAZIL",
    "name": "Brazylia"
  },
  {
    "teamId": "CROATIA",
    "name": "Chorwacja"
  },
  {
    "teamId": "CURACAO",
    "name": "Curaçao"
  },
  {
    "teamId": "CZECHIA",
    "name": "Czechy"
  },
  {
    "teamId": "DR_CONGO",
    "name": "DR Konga"
  },
  {
    "teamId": "EGYPT",
    "name": "Egipt"
  },
  {
    "teamId": "ECUADOR",
    "name": "Ekwador"
  },
  {
    "teamId": "FRANCE",
    "name": "Francja"
  },
  {
    "teamId": "GHANA",
    "name": "Ghana"
  },
  {
    "teamId": "HAITI",
    "name": "Haiti"
  },
  {
    "teamId": "SPAIN",
    "name": "Hiszpania"
  },
  {
    "teamId": "NETHERLANDS",
    "name": "Holandia"
  },
  {
    "teamId": "IRAQ",
    "name": "Irak"
  },
  {
    "teamId": "IRAN",
    "name": "Iran"
  },
  {
    "teamId": "JAPAN",
    "name": "Japonia"
  },
  {
    "teamId": "JORDAN",
    "name": "Jordania"
  },
  {
    "teamId": "CANADA",
    "name": "Kanada"
  },
  {
    "teamId": "QATAR",
    "name": "Katar"
  },
  {
    "teamId": "COLOMBIA",
    "name": "Kolumbia"
  },
  {
    "teamId": "SOUTH_KOREA",
    "name": "Korea Południowa"
  },
  {
    "teamId": "MOROCCO",
    "name": "Maroko"
  },
  {
    "teamId": "MEXICO",
    "name": "Meksyk"
  },
  {
    "teamId": "GERMANY",
    "name": "Niemcy"
  },
  {
    "teamId": "NORWAY",
    "name": "Norwegia"
  },
  {
    "teamId": "NEW_ZEALAND",
    "name": "Nowa Zelandia"
  },
  {
    "teamId": "PANAMA",
    "name": "Panama"
  },
  {
    "teamId": "PARAGUAY",
    "name": "Paragwaj"
  },
  {
    "teamId": "PORTUGAL",
    "name": "Portugalia"
  },
  {
    "teamId": "CAPE_VERDE",
    "name": "Republika Zielonego Przylądka"
  },
  {
    "teamId": "SOUTH_AFRICA",
    "name": "RPA"
  },
  {
    "teamId": "SENEGAL",
    "name": "Senegal"
  },
  {
    "teamId": "SCOTLAND",
    "name": "Szkocja"
  },
  {
    "teamId": "SWITZERLAND",
    "name": "Szwajcaria"
  },
  {
    "teamId": "SWEDEN",
    "name": "Szwecja"
  },
  {
    "teamId": "TUNISIA",
    "name": "Tunezja"
  },
  {
    "teamId": "TURKEY",
    "name": "Turcja"
  },
  {
    "teamId": "URUGUAY",
    "name": "Urugwaj"
  },
  {
    "teamId": "USA",
    "name": "USA"
  },
  {
    "teamId": "UZBEKISTAN",
    "name": "Uzbekistan"
  },
  {
    "teamId": "WALES",
    "name": "Walia"
  },
  {
    "teamId": "IVORY_COAST",
    "name": "Wybrzeże Kości Słoniowej"
  }
] as const

export const matchCatalog: readonly ApiMatchCatalogEntry[] = [
  {
    "matchId": "gs-a-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "A",
    "homeTeamId": "MEXICO",
    "awayTeamId": "SOUTH_AFRICA",
    "homeName": "Meksyk",
    "awayName": "RPA",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-a-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "A",
    "homeTeamId": "SOUTH_KOREA",
    "awayTeamId": "CZECHIA",
    "homeName": "Korea Południowa",
    "awayName": "Czechy",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-a-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "A",
    "homeTeamId": "MEXICO",
    "awayTeamId": "SOUTH_KOREA",
    "homeName": "Meksyk",
    "awayName": "Korea Południowa",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-a-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "A",
    "homeTeamId": "SOUTH_AFRICA",
    "awayTeamId": "SOUTH_KOREA",
    "homeName": "RPA",
    "awayName": "Korea Południowa",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-a-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "A",
    "homeTeamId": "CZECHIA",
    "awayTeamId": "MEXICO",
    "homeName": "Czechy",
    "awayName": "Meksyk",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-a-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "A",
    "homeTeamId": "CZECHIA",
    "awayTeamId": "SOUTH_AFRICA",
    "homeName": "Czechy",
    "awayName": "RPA",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-b-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "B",
    "homeTeamId": "CANADA",
    "awayTeamId": "BOSNIA_HERZEGOVINA",
    "homeName": "Kanada",
    "awayName": "Bośnia i Hercegowina",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-b-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "B",
    "homeTeamId": "QATAR",
    "awayTeamId": "SWITZERLAND",
    "homeName": "Katar",
    "awayName": "Szwajcaria",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-b-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "B",
    "homeTeamId": "CANADA",
    "awayTeamId": "QATAR",
    "homeName": "Kanada",
    "awayName": "Katar",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-b-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "B",
    "homeTeamId": "SWITZERLAND",
    "awayTeamId": "CANADA",
    "homeName": "Szwajcaria",
    "awayName": "Kanada",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-b-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "B",
    "homeTeamId": "BOSNIA_HERZEGOVINA",
    "awayTeamId": "QATAR",
    "homeName": "Bośnia i Hercegowina",
    "awayName": "Katar",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-b-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "B",
    "homeTeamId": "BOSNIA_HERZEGOVINA",
    "awayTeamId": "SWITZERLAND",
    "homeName": "Bośnia i Hercegowina",
    "awayName": "Szwajcaria",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-c-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "C",
    "homeTeamId": "BRAZIL",
    "awayTeamId": "MOROCCO",
    "homeName": "Brazylia",
    "awayName": "Maroko",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-c-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "C",
    "homeTeamId": "HAITI",
    "awayTeamId": "SCOTLAND",
    "homeName": "Haiti",
    "awayName": "Szkocja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-c-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "C",
    "homeTeamId": "SCOTLAND",
    "awayTeamId": "MOROCCO",
    "homeName": "Szkocja",
    "awayName": "Maroko",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-c-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "C",
    "homeTeamId": "BRAZIL",
    "awayTeamId": "HAITI",
    "homeName": "Brazylia",
    "awayName": "Haiti",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-c-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "C",
    "homeTeamId": "MOROCCO",
    "awayTeamId": "HAITI",
    "homeName": "Maroko",
    "awayName": "Haiti",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-c-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "C",
    "homeTeamId": "SCOTLAND",
    "awayTeamId": "BRAZIL",
    "homeName": "Szkocja",
    "awayName": "Brazylia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-d-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "D",
    "homeTeamId": "USA",
    "awayTeamId": "PARAGUAY",
    "homeName": "USA",
    "awayName": "Paragwaj",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-d-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "D",
    "homeTeamId": "AUSTRALIA",
    "awayTeamId": "TURKEY",
    "homeName": "Australia",
    "awayName": "Turcja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-d-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "D",
    "homeTeamId": "USA",
    "awayTeamId": "AUSTRALIA",
    "homeName": "USA",
    "awayName": "Australia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-d-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "D",
    "homeTeamId": "PARAGUAY",
    "awayTeamId": "AUSTRALIA",
    "homeName": "Paragwaj",
    "awayName": "Australia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-d-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "D",
    "homeTeamId": "TURKEY",
    "awayTeamId": "USA",
    "homeName": "Turcja",
    "awayName": "USA",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-d-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "D",
    "homeTeamId": "PARAGUAY",
    "awayTeamId": "TURKEY",
    "homeName": "Paragwaj",
    "awayName": "Turcja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-e-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "E",
    "homeTeamId": "GERMANY",
    "awayTeamId": "CURACAO",
    "homeName": "Niemcy",
    "awayName": "Curaçao",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-e-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "E",
    "homeTeamId": "IVORY_COAST",
    "awayTeamId": "ECUADOR",
    "homeName": "Wybrzeże Kości Słoniowej",
    "awayName": "Ekwador",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-e-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "E",
    "homeTeamId": "GERMANY",
    "awayTeamId": "IVORY_COAST",
    "homeName": "Niemcy",
    "awayName": "Wybrzeże Kości Słoniowej",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-e-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "E",
    "homeTeamId": "ECUADOR",
    "awayTeamId": "CURACAO",
    "homeName": "Ekwador",
    "awayName": "Curaçao",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-e-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "E",
    "homeTeamId": "CURACAO",
    "awayTeamId": "IVORY_COAST",
    "homeName": "Curaçao",
    "awayName": "Wybrzeże Kości Słoniowej",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-e-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "E",
    "homeTeamId": "ECUADOR",
    "awayTeamId": "GERMANY",
    "homeName": "Ekwador",
    "awayName": "Niemcy",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-f-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "F",
    "homeTeamId": "NETHERLANDS",
    "awayTeamId": "JAPAN",
    "homeName": "Holandia",
    "awayName": "Japonia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-f-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "F",
    "homeTeamId": "SWEDEN",
    "awayTeamId": "TUNISIA",
    "homeName": "Szwecja",
    "awayName": "Tunezja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-f-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "F",
    "homeTeamId": "NETHERLANDS",
    "awayTeamId": "SWEDEN",
    "homeName": "Holandia",
    "awayName": "Szwecja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-f-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "F",
    "homeTeamId": "TUNISIA",
    "awayTeamId": "JAPAN",
    "homeName": "Tunezja",
    "awayName": "Japonia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-f-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "F",
    "homeTeamId": "JAPAN",
    "awayTeamId": "SWEDEN",
    "homeName": "Japonia",
    "awayName": "Szwecja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-f-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "F",
    "homeTeamId": "TUNISIA",
    "awayTeamId": "NETHERLANDS",
    "homeName": "Tunezja",
    "awayName": "Holandia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-g-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "G",
    "homeTeamId": "BELGIUM",
    "awayTeamId": "EGYPT",
    "homeName": "Belgia",
    "awayName": "Egipt",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-g-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "G",
    "homeTeamId": "IRAN",
    "awayTeamId": "NEW_ZEALAND",
    "homeName": "Iran",
    "awayName": "Nowa Zelandia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-g-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "G",
    "homeTeamId": "BELGIUM",
    "awayTeamId": "IRAN",
    "homeName": "Belgia",
    "awayName": "Iran",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-g-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "G",
    "homeTeamId": "NEW_ZEALAND",
    "awayTeamId": "EGYPT",
    "homeName": "Nowa Zelandia",
    "awayName": "Egipt",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-g-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "G",
    "homeTeamId": "EGYPT",
    "awayTeamId": "IRAN",
    "homeName": "Egipt",
    "awayName": "Iran",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-g-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "G",
    "homeTeamId": "NEW_ZEALAND",
    "awayTeamId": "BELGIUM",
    "homeName": "Nowa Zelandia",
    "awayName": "Belgia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-h-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "H",
    "homeTeamId": "SPAIN",
    "awayTeamId": "CAPE_VERDE",
    "homeName": "Hiszpania",
    "awayName": "Republika Zielonego Przylądka",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-h-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "H",
    "homeTeamId": "SAUDI_ARABIA",
    "awayTeamId": "URUGUAY",
    "homeName": "Arabia Saudyjska",
    "awayName": "Urugwaj",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-h-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "H",
    "homeTeamId": "SPAIN",
    "awayTeamId": "SAUDI_ARABIA",
    "homeName": "Hiszpania",
    "awayName": "Arabia Saudyjska",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-h-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "H",
    "homeTeamId": "URUGUAY",
    "awayTeamId": "CAPE_VERDE",
    "homeName": "Urugwaj",
    "awayName": "Republika Zielonego Przylądka",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-h-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "H",
    "homeTeamId": "CAPE_VERDE",
    "awayTeamId": "SAUDI_ARABIA",
    "homeName": "Republika Zielonego Przylądka",
    "awayName": "Arabia Saudyjska",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-h-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "H",
    "homeTeamId": "URUGUAY",
    "awayTeamId": "SPAIN",
    "homeName": "Urugwaj",
    "awayName": "Hiszpania",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-i-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "I",
    "homeTeamId": "FRANCE",
    "awayTeamId": "SENEGAL",
    "homeName": "Francja",
    "awayName": "Senegal",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-i-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "I",
    "homeTeamId": "IRAQ",
    "awayTeamId": "NORWAY",
    "homeName": "Irak",
    "awayName": "Norwegia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-i-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "I",
    "homeTeamId": "FRANCE",
    "awayTeamId": "IRAQ",
    "homeName": "Francja",
    "awayName": "Irak",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-i-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "I",
    "homeTeamId": "SENEGAL",
    "awayTeamId": "NORWAY",
    "homeName": "Senegal",
    "awayName": "Norwegia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-i-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "I",
    "homeTeamId": "FRANCE",
    "awayTeamId": "NORWAY",
    "homeName": "Francja",
    "awayName": "Norwegia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-i-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "I",
    "homeTeamId": "SENEGAL",
    "awayTeamId": "IRAQ",
    "homeName": "Senegal",
    "awayName": "Irak",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-j-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "J",
    "homeTeamId": "ARGENTINA",
    "awayTeamId": "ALGERIA",
    "homeName": "Argentyna",
    "awayName": "Algieria",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-j-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "J",
    "homeTeamId": "AUSTRIA",
    "awayTeamId": "JORDAN",
    "homeName": "Austria",
    "awayName": "Jordania",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-j-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "J",
    "homeTeamId": "ARGENTINA",
    "awayTeamId": "AUSTRIA",
    "homeName": "Argentyna",
    "awayName": "Austria",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-j-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "J",
    "homeTeamId": "JORDAN",
    "awayTeamId": "ALGERIA",
    "homeName": "Jordania",
    "awayName": "Algieria",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-j-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "J",
    "homeTeamId": "ALGERIA",
    "awayTeamId": "AUSTRIA",
    "homeName": "Algieria",
    "awayName": "Austria",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-j-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "J",
    "homeTeamId": "JORDAN",
    "awayTeamId": "ARGENTINA",
    "homeName": "Jordania",
    "awayName": "Argentyna",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-k-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "K",
    "homeTeamId": "PORTUGAL",
    "awayTeamId": "DR_CONGO",
    "homeName": "Portugalia",
    "awayName": "DR Konga",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-k-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "K",
    "homeTeamId": "UZBEKISTAN",
    "awayTeamId": "COLOMBIA",
    "homeName": "Uzbekistan",
    "awayName": "Kolumbia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-k-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "K",
    "homeTeamId": "PORTUGAL",
    "awayTeamId": "UZBEKISTAN",
    "homeName": "Portugalia",
    "awayName": "Uzbekistan",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-k-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "K",
    "homeTeamId": "COLOMBIA",
    "awayTeamId": "DR_CONGO",
    "homeName": "Kolumbia",
    "awayName": "DR Konga",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-k-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "K",
    "homeTeamId": "DR_CONGO",
    "awayTeamId": "UZBEKISTAN",
    "homeName": "DR Konga",
    "awayName": "Uzbekistan",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-k-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "K",
    "homeTeamId": "COLOMBIA",
    "awayTeamId": "PORTUGAL",
    "homeName": "Kolumbia",
    "awayName": "Portugalia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-l-001",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "L",
    "homeTeamId": "ENGLAND",
    "awayTeamId": "CROATIA",
    "homeName": "Anglia",
    "awayName": "Chorwacja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-l-002",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "L",
    "homeTeamId": "GHANA",
    "awayTeamId": "PANAMA",
    "homeName": "Ghana",
    "awayName": "Panama",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-l-003",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "L",
    "homeTeamId": "ENGLAND",
    "awayTeamId": "GHANA",
    "homeName": "Anglia",
    "awayName": "Ghana",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-l-004",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "L",
    "homeTeamId": "PANAMA",
    "awayTeamId": "CROATIA",
    "homeName": "Panama",
    "awayName": "Chorwacja",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-l-005",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "L",
    "homeTeamId": "CROATIA",
    "awayTeamId": "GHANA",
    "homeName": "Chorwacja",
    "awayName": "Ghana",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "gs-l-006",
    "phaseId": "group-stage",
    "phaseLabel": "Faza grupowa",
    "groupId": "L",
    "homeTeamId": "PANAMA",
    "awayTeamId": "ENGLAND",
    "homeName": "Panama",
    "awayName": "Anglia",
    "homeSlot": null,
    "awaySlot": null,
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-001",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "SOUTH_AFRICA",
    "awayTeamId": "CANADA",
    "homeName": "RPA",
    "awayName": "Kanada",
    "homeSlot": "2A",
    "awaySlot": "2B",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-002",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "BRAZIL",
    "awayTeamId": "JAPAN",
    "homeName": "Brazylia",
    "awayName": "Japonia",
    "homeSlot": "1C",
    "awaySlot": "2F",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-003",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "GERMANY",
    "awayTeamId": "PARAGUAY",
    "homeName": "Niemcy",
    "awayName": "Paragwaj",
    "homeSlot": "1E",
    "awaySlot": "3 z ABCDF",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-004",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "NETHERLANDS",
    "awayTeamId": "MOROCCO",
    "homeName": "Holandia",
    "awayName": "Maroko",
    "homeSlot": "1F",
    "awaySlot": "2C",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-005",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "IVORY_COAST",
    "awayTeamId": "NORWAY",
    "homeName": "Wybrzeże Kości Słoniowej",
    "awayName": "Norwegia",
    "homeSlot": "2E",
    "awaySlot": "2I",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-006",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "FRANCE",
    "awayTeamId": "SWEDEN",
    "homeName": "Francja",
    "awayName": "Szwecja",
    "homeSlot": "1I",
    "awaySlot": "3 z CDFGH",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-007",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "MEXICO",
    "awayTeamId": "ECUADOR",
    "homeName": "Meksyk",
    "awayName": "Ekwador",
    "homeSlot": "1A",
    "awaySlot": "3 z CEFHI",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-008",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "ENGLAND",
    "awayTeamId": "DR_CONGO",
    "homeName": "Anglia",
    "awayName": "DR Konga",
    "homeSlot": "1L",
    "awaySlot": "3 z EHIJK",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-009",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "BELGIUM",
    "awayTeamId": "SENEGAL",
    "homeName": "Belgia",
    "awayName": "Senegal",
    "homeSlot": "1G",
    "awaySlot": "3 z AEHIJ",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-010",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "USA",
    "awayTeamId": "BOSNIA_HERZEGOVINA",
    "homeName": "USA",
    "awayName": "Bośnia i Hercegowina",
    "homeSlot": "1D",
    "awaySlot": "3 z BEFIJ",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-011",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "SPAIN",
    "awayTeamId": "AUSTRIA",
    "homeName": "Hiszpania",
    "awayName": "Austria",
    "homeSlot": "1H",
    "awaySlot": "2J",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-012",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "PORTUGAL",
    "awayTeamId": "CROATIA",
    "homeName": "Portugalia",
    "awayName": "Chorwacja",
    "homeSlot": "2K",
    "awaySlot": "2L",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-013",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "SWITZERLAND",
    "awayTeamId": "ALGERIA",
    "homeName": "Szwajcaria",
    "awayName": "Algieria",
    "homeSlot": "1B",
    "awaySlot": "3 z EFGIJ",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-014",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "AUSTRALIA",
    "awayTeamId": "EGYPT",
    "homeName": "Australia",
    "awayName": "Egipt",
    "homeSlot": "2D",
    "awaySlot": "2G",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-015",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "ARGENTINA",
    "awayTeamId": "CAPE_VERDE",
    "homeName": "Argentyna",
    "awayName": "Republika Zielonego Przylądka",
    "homeSlot": "1J",
    "awaySlot": "2H",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r32-016",
    "phaseId": "round-of-32",
    "phaseLabel": "1/16 finału",
    "groupId": null,
    "homeTeamId": "COLOMBIA",
    "awayTeamId": "GHANA",
    "homeName": "Kolumbia",
    "awayName": "Ghana",
    "homeSlot": "1K",
    "awaySlot": "3 z DEIJL",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-001",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "CANADA",
    "awayTeamId": "MOROCCO",
    "homeName": "Kanada",
    "awayName": "Maroko",
    "homeSlot": "2A / 2B",
    "awaySlot": "1F / 2C",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-002",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "PARAGUAY",
    "awayTeamId": "FRANCE",
    "homeName": "Paragwaj",
    "awayName": "Francja",
    "homeSlot": "1E / 3ABCDF",
    "awaySlot": "1I / 3CDFGH",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-003",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "BRAZIL",
    "awayTeamId": "NORWAY",
    "homeName": "Brazylia",
    "awayName": "Norwegia",
    "homeSlot": "1C / 2F",
    "awaySlot": "2E / 2I",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-004",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "MEXICO",
    "awayTeamId": "ENGLAND",
    "homeName": "Meksyk",
    "awayName": "Anglia",
    "homeSlot": "1A / 3CEFHI",
    "awaySlot": "1L / 3EHIJK",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-005",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "PORTUGAL",
    "awayTeamId": "SPAIN",
    "homeName": "Portugalia",
    "awayName": "Hiszpania",
    "homeSlot": "2K / 2L",
    "awaySlot": "1H / 2J",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-006",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "USA",
    "awayTeamId": "BELGIUM",
    "homeName": "USA",
    "awayName": "Belgia",
    "homeSlot": "1D / 3BEFIJ",
    "awaySlot": "1G / 3AEHIJ",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-007",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "ARGENTINA",
    "awayTeamId": "EGYPT",
    "homeName": "Argentyna",
    "awayName": "Egipt",
    "homeSlot": "1J / 2H",
    "awaySlot": "2D / 2G",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r16-008",
    "phaseId": "round-of-16",
    "phaseLabel": "1/8 finału",
    "groupId": null,
    "homeTeamId": "SWITZERLAND",
    "awayTeamId": "COLOMBIA",
    "homeName": "Szwajcaria",
    "awayName": "Kolumbia",
    "homeSlot": "1B / 3EFGIJ",
    "awaySlot": "1K / 3DEIJL",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r8-001",
    "phaseId": "round-of-8",
    "phaseLabel": "Ćwierćfinały",
    "groupId": null,
    "homeTeamId": "FRANCE",
    "awayTeamId": "MOROCCO",
    "homeName": "Francja",
    "awayName": "Maroko",
    "homeSlot": "#1 (1/8)",
    "awaySlot": "#2 (1/8)",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r8-002",
    "phaseId": "round-of-8",
    "phaseLabel": "Ćwierćfinały",
    "groupId": null,
    "homeTeamId": "SPAIN",
    "awayTeamId": "BELGIUM",
    "homeName": "Hiszpania",
    "awayName": "Belgia",
    "homeSlot": "#5 (1/8)",
    "awaySlot": "#6 (1/8)",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r8-003",
    "phaseId": "round-of-8",
    "phaseLabel": "Ćwierćfinały",
    "groupId": null,
    "homeTeamId": "NORWAY",
    "awayTeamId": "ENGLAND",
    "homeName": "Norwegia",
    "awayName": "Anglia",
    "homeSlot": "#3 (1/8)",
    "awaySlot": "#4 (1/8)",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r8-004",
    "phaseId": "round-of-8",
    "phaseLabel": "Ćwierćfinały",
    "groupId": null,
    "homeTeamId": "ARGENTINA",
    "awayTeamId": "SWITZERLAND",
    "homeName": "Argentyna",
    "awayName": "Szwajcaria",
    "homeSlot": "#7 (1/8)",
    "awaySlot": "#8 (1/8)",
    "hasAssignedTeams": true
  },
  {
    "matchId": "r4-001",
    "phaseId": "round-of-4",
    "phaseLabel": "Półfinały",
    "groupId": null,
    "homeTeamId": null,
    "awayTeamId": null,
    "homeName": null,
    "awayName": null,
    "homeSlot": "#1 (ćwierćfinał)",
    "awaySlot": "#2 (ćwierćfinał)",
    "hasAssignedTeams": false
  },
  {
    "matchId": "r4-002",
    "phaseId": "round-of-4",
    "phaseLabel": "Półfinały",
    "groupId": null,
    "homeTeamId": null,
    "awayTeamId": null,
    "homeName": null,
    "awayName": null,
    "homeSlot": "#3 (ćwierćfinał)",
    "awaySlot": "#4 (ćwierćfinał)",
    "hasAssignedTeams": false
  },
  {
    "matchId": "third-001",
    "phaseId": "third-place",
    "phaseLabel": "Mecz o 3. miejsce",
    "groupId": null,
    "homeTeamId": null,
    "awayTeamId": null,
    "homeName": null,
    "awayName": null,
    "homeSlot": "Przegrany półfinału 1",
    "awaySlot": "Przegrany półfinału 2",
    "hasAssignedTeams": false
  },
  {
    "matchId": "final-001",
    "phaseId": "final",
    "phaseLabel": "Finał",
    "groupId": null,
    "homeTeamId": null,
    "awayTeamId": null,
    "homeName": null,
    "awayName": null,
    "homeSlot": "Zwycięzca półfinału 1",
    "awaySlot": "Zwycięzca półfinału 2",
    "hasAssignedTeams": false
  }
] as const

const matchIds = new Set(matchCatalog.map((m) => m.matchId))

export function isKnownMatchId(matchId: string): boolean {
  return matchIds.has(matchId)
}
