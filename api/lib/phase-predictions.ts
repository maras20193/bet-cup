const phaseIds = [
  "group-stage",
  "round-of-32",
  "round-of-16",
  "round-of-8",
  "round-of-4",
  "third-place",
  "final",
] as const

type PhaseId = (typeof phaseIds)[number]

const allowedPhaseIds = new Set<string>(phaseIds)

export type PhasePredictionsPayload = {
  predictionId: string
  displayName: string
  contactEmail?: string
  phaseId: PhaseId
  submittedAt: string
  predictions: { matchId: string; home: number; away: number }[]
}

function isPhaseId(value: string): value is PhaseId {
  return allowedPhaseIds.has(value)
}

export function validatePhasePredictionsPayload(
  body: unknown,
): body is PhasePredictionsPayload {
  if (!body || typeof body !== "object") return false

  const p = body as Record<string, unknown>

  if (typeof p.predictionId !== "string" || !p.predictionId.trim()) return false
  if (typeof p.displayName !== "string" || !p.displayName.trim()) return false
  if (typeof p.phaseId !== "string" || !isPhaseId(p.phaseId)) return false
  if (typeof p.submittedAt !== "string" || !p.submittedAt.trim()) return false
  if (p.contactEmail !== undefined && typeof p.contactEmail !== "string")
    return false
  if (!Array.isArray(p.predictions) || p.predictions.length === 0) return false

  for (const row of p.predictions) {
    if (!row || typeof row !== "object") return false
    const r = row as Record<string, unknown>
    if (typeof r.matchId !== "string" || !r.matchId.trim()) return false
    if (
      typeof r.home !== "number" ||
      typeof r.away !== "number" ||
      !Number.isInteger(r.home) ||
      !Number.isInteger(r.away) ||
      r.home < 0 ||
      r.away < 0
    ) {
      return false
    }
  }

  return true
}

const phaseLabels: Record<PhaseId, string> = {
  "group-stage": "Faza grupowa",
  "round-of-32": "1/16 finału",
  "round-of-16": "1/8 finału",
  "round-of-8": "Ćwierćfinały",
  "round-of-4": "Półfinały",
  "third-place": "Mecz o 3. miejsce",
  final: "Finał",
}

/** Block Kit plain_text max length per section. */
const SLACK_PLAIN_TEXT_MAX = 3000

function plainTextSection(text: string) {
  return {
    type: "section" as const,
    text: {
      type: "plain_text" as const,
      text: text.slice(0, SLACK_PLAIN_TEXT_MAX),
      emoji: true,
    },
  }
}

/** Split long text into Slack-sized plain_text sections. */
function chunkPlainTextSections(
  body: string,
  headerForFirst: string,
  headerForRest: (part: number) => string,
): ReturnType<typeof plainTextSection>[] {
  const sections: ReturnType<typeof plainTextSection>[] = []
  let offset = 0
  let part = 1

  while (offset < body.length) {
    const header = part === 1 ? headerForFirst : headerForRest(part)
    const maxBody = SLACK_PLAIN_TEXT_MAX - header.length
    const slice = body.slice(offset, offset + maxBody)
    sections.push(plainTextSection(header + slice))
    offset += maxBody
    part += 1
  }

  return sections
}

/** Slack incoming webhook body (plain_text blocks — avoids mrkdwn invalid_blocks). */
export function buildSlackWebhookBody(payload: PhasePredictionsPayload) {
  const json = JSON.stringify(payload)
  const phaseLabel = phaseLabels[payload.phaseId] ?? payload.phaseId
  const displayName = payload.displayName.trim()
  const email = payload.contactEmail?.trim() || "—"

  const summary = [
    "Nowe typy",
    `Gracz: ${displayName}`,
    `E-mail: ${email}`,
    `Faza: ${phaseLabel} (${payload.phaseId})`,
    `ID: ${payload.predictionId}`,
    `Wysłano: ${payload.submittedAt}`,
    `Meczów: ${payload.predictions.length}`,
  ].join("\n")

  const jsonSections = chunkPlainTextSections(
    json,
    "JSON (skopiuj wszystkie części po kolei do jednego pliku):\n",
    (part) => `JSON cd. (część ${part}):\n`,
  )

  return {
    text: `Nowe typy: ${displayName} (${phaseLabel})`,
    blocks: [plainTextSection(summary), { type: "divider" as const }, ...jsonSections],
  }
}
