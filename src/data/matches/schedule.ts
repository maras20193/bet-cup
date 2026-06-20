import { teams } from "@/data/teams/teams"
import { buildAllMatches } from "@/mappers/matches"
import { parseKickoffLocal } from "@/lib/match-schedule/parseKickoff"

function utc(
  day: number,
  hour: number,
  minute = 0,
  month = 6,
  year = 2026
): string {
  return new Date(Date.UTC(year, month - 1, day, hour, minute, 0)).toISOString()
}

const matchKickoffsById = {
  // Grupa A
  "gs-a-001": utc(11, 19, 0), // Meksyk – RPA
  "gs-a-002": utc(12, 2, 0), // Korea Południowa – Czechy
  "gs-a-003": utc(19, 1, 0), // Meksyk – Korea Południowa
  "gs-a-004": utc(25, 1, 0), // RPA – Korea Południowa
  "gs-a-005": utc(25, 1, 0), // Czechy – Meksyk
  "gs-a-006": utc(18, 16, 0), // Czechy – RPA

  // Grupa B
  "gs-b-001": utc(12, 19, 0), // Kanada – Bośnia i Hercegowina
  "gs-b-002": utc(13, 19, 0), // Katar – Szwajcaria
  "gs-b-003": utc(18, 22, 0), // Kanada – Katar
  "gs-b-004": utc(24, 19, 0), // Szwajcaria – Kanada
  "gs-b-005": utc(24, 19, 0), // Bośnia i Hercegowina – Katar
  "gs-b-006": utc(18, 19, 0), // Szwajcaria – Bośnia i Hercegowina

  // Grupa C
  "gs-c-001": utc(13, 22, 0), // Brazylia – Maroko
  "gs-c-002": utc(14, 1, 0), // Haiti – Szkocja
  "gs-c-003": utc(19, 22, 0), // Szkocja – Maroko
  "gs-c-004": utc(20, 1, 0), // Brazylia – Haiti
  "gs-c-005": utc(24, 22, 0), // Maroko – Haiti
  "gs-c-006": utc(24, 22, 0), // Szkocja – Brazylia

  // Grupa D
  "gs-d-001": utc(13, 1, 0), // USA – Paragwaj
  "gs-d-002": utc(14, 4, 0), // Australia – Turcja
  "gs-d-003": utc(19, 19, 0), // USA – Australia
  "gs-d-004": utc(26, 2, 0), // Paragwaj – Australia
  "gs-d-005": utc(26, 2, 0), // Turcja – USA
  "gs-d-006": utc(20, 3, 0), // Turcja – Paragwaj

  // Grupa E
  "gs-e-001": utc(14, 17, 0), // Niemcy – Curacao
  "gs-e-002": utc(14, 23, 0), // WKS – Ekwador
  "gs-e-003": utc(20, 20, 0), // Niemcy – WKS
  "gs-e-004": utc(21, 0, 0), // Ekwador – Curacao
  "gs-e-005": utc(25, 20, 0), // Curacao – WKS
  "gs-e-006": utc(25, 20, 0), // Ekwador – Niemcy

  // Grupa F
  "gs-f-001": utc(14, 20, 0), // Holandia – Japonia
  "gs-f-002": utc(15, 2, 0), // Szwecja – Tunezja
  "gs-f-003": utc(20, 17, 0), // Holandia – Szwecja
  "gs-f-004": utc(21, 4, 0), // Tunezja – Japonia
  "gs-f-005": utc(25, 23, 0), // Japonia – Szwecja
  "gs-f-006": utc(25, 23, 0), // Tunezja – Holandia

  // Grupa G
  "gs-g-001": utc(15, 19, 0), // Belgia – Egipt
  "gs-g-002": utc(16, 1, 0), // Iran – Nowa Zelandia
  "gs-g-003": utc(21, 19, 0), // Belgia – Iran
  "gs-g-004": utc(22, 1, 0), // Nowa Zelandia – Egipt
  "gs-g-005": utc(27, 3, 0), // Egipt – Iran
  "gs-g-006": utc(27, 3, 0), // Nowa Zelandia – Belgia

  // Grupa H
  "gs-h-001": utc(15, 16, 0), // Hiszpania – Republika Zielonego Przylądka
  "gs-h-002": utc(15, 22, 0), // Arabia Saudyjska – Urugwaj
  "gs-h-003": utc(21, 16, 0), // Hiszpania – Arabia Saudyjska
  "gs-h-004": utc(21, 22, 0), // Urugwaj – Republika Zielonego Przylądka
  "gs-h-005": utc(27, 0, 0), // Republika Zielonego Przylądka – Arabia Saudyjska
  "gs-h-006": utc(27, 0, 0), // Urugwaj – Hiszpania

  // Grupa I
  "gs-i-001": utc(16, 19, 0), // Francja – Senegal
  "gs-i-002": utc(16, 22, 0), // Irak – Norwegia
  "gs-i-003": utc(22, 21, 0), // Francja – Irak
  "gs-i-004": utc(23, 0, 0), // Norwegia – Senegal
  "gs-i-005": utc(26, 19, 0), // Norwegia – Francja
  "gs-i-006": utc(26, 19, 0), // Senegal – Irak

  // Grupa J
  "gs-j-001": utc(17, 1, 0), // Argentyna – Algieria
  "gs-j-002": utc(17, 4, 0), // Austria – Jordania
  "gs-j-003": utc(22, 17, 0), // Argentyna – Austria
  "gs-j-004": utc(23, 3, 0), // Jordania – Algieria
  "gs-j-005": utc(28, 2, 0), // Algieria – Austria
  "gs-j-006": utc(28, 2, 0), // Jordania – Argentyna

  // Grupa K
  "gs-k-001": utc(17, 17, 0), // Portugalia – DR Konga
  "gs-k-002": utc(18, 2, 0), // Uzbekistan – Kolumbia
  "gs-k-003": utc(23, 17, 0), // Portugalia – Uzbekistan
  "gs-k-004": utc(24, 2, 0), // Kolumbia – DR Konga
  "gs-k-005": utc(27, 23, 30), // DR Konga – Uzbekistan
  "gs-k-006": utc(27, 23, 30), // Kolumbia – Portugalia

  // Grupa L
  "gs-l-001": utc(17, 20, 0), // Anglia – Chorwacja
  "gs-l-002": utc(17, 23, 0), // Ghana – Panama
  "gs-l-003": utc(23, 20, 0), // Anglia – Ghana
  "gs-l-004": utc(23, 23, 0), // Panama – Chorwacja
  "gs-l-005": utc(27, 21, 0), // Chorwacja – Ghana
  "gs-l-006": utc(27, 21, 0), // Panama – Anglia

  // 1/16 finału
  "r32-001": utc(28, 19, 0), // 2A – 2B
  "r32-002": utc(29, 17, 0), // 1C – 2F
  "r32-003": utc(29, 20, 30), // 1E – 3ABCDF
  "r32-004": utc(30, 1, 0), // 1F – 2C
  "r32-005": utc(30, 17, 0), // 2E – 2I
  "r32-006": utc(30, 21, 0), // 1I – 3CDFGH
  "r32-007": utc(1, 1, 0, 7), // 1A – 3CEFHI
  "r32-008": utc(1, 16, 0, 7), // 1L – 3EHIJK
  "r32-009": utc(1, 20, 0, 7), // 1G – 3AEHIJ
  "r32-010": utc(2, 0, 0, 7), // 1D – 3BEFIJ
  "r32-011": utc(2, 19, 0, 7), // 1H – 2J
  "r32-012": utc(2, 23, 0, 7), // 2K – 2L
  "r32-013": utc(3, 3, 0, 7), // 1B – 3EFGIJ
  "r32-014": utc(3, 18, 0, 7), // 2D – 2G
  "r32-015": utc(3, 22, 0, 7), // 1J – 2H
  "r32-016": utc(4, 1, 30, 7), // 1K – 3DEIJL

  // 1/8 finału
  "r16-001": utc(4, 17, 0, 7), // 2A/2B – 1F/2C
  "r16-002": utc(4, 21, 0, 7), // 1E/3ABCDF – 1I/3CDFGH
  "r16-003": utc(5, 20, 0, 7), // 1C/2F – 2E/2I
  "r16-004": utc(6, 0, 0, 7), // 1A/3CEFHI – 1L/3EHIJK
  "r16-005": utc(6, 19, 0, 7), // 2K/2L – 1H/2J
  "r16-006": utc(7, 0, 0, 7), // 1D/3BEFIJ – 1G/3AEHIJ
  "r16-007": utc(7, 16, 0, 7), // 1J/2H – 2D/2G
  "r16-008": utc(7, 20, 0, 7), // 1B/3EFGIJ – 1K/3DEIJL

  // Ćwierćfinały
  "r8-001": utc(9, 20, 0, 7), // #1 – #2
  "r8-002": utc(10, 19, 0, 7), // #5 – #6
  "r8-003": utc(11, 21, 0, 7), // #3 – #4
  "r8-004": utc(12, 1, 0, 7), // #7 – #8

  // Półfinały
  "r4-001": utc(14, 19, 0, 7), // #1 – #2
  "r4-002": utc(15, 19, 0, 7), // #3 – #4

  // Mecz o 3. miejsce
  "third-001": utc(18, 21, 0, 7),

  // Finał
  "final-001": utc(19, 19, 0, 7),
} as const satisfies Record<string, string>

function assertCompleteSchedule(
  kickoffs: Record<string, string>
): Record<string, string> {
  for (const match of buildAllMatches()) {
    if (!kickoffs[match.id]) {
      throw new Error(`Missing kickoff schedule for match ${match.id}`)
    }
  }
  return kickoffs
}

export const matchKickoffs: Record<string, string> =
  assertCompleteSchedule(matchKickoffsById)

if (import.meta.env.DEV) {
  const schedule = buildAllMatches()
    .map((match) => {
      const kickoffAt = matchKickoffs[match.id]
      return {
        id: match.id,
        phase: match.phaseId,
        match: `${match.homeId ? teams[match.homeId].name : (match.homeSlot ?? "TBD")} – ${match.awayId ? teams[match.awayId].name : (match.awaySlot ?? "TBD")}`,
        kickoffAt,
        local: parseKickoffLocal(kickoffAt).format("YYYY-MM-DD HH:mm"),
      }
    })
    .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt))

  console.log("[match schedule]", schedule)
  console.table(schedule)
}

export function applyMatchSchedule<T extends { id: string }>(
  match: T
): T & { kickoffAt: string } {
  const kickoffAt = matchKickoffs[match.id]
  if (!kickoffAt) {
    throw new Error(`Missing kickoff schedule for match ${match.id}`)
  }
  return { ...match, kickoffAt }
}
