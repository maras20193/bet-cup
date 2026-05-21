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

/** Slack incoming webhook body (variant 1: text + blocks with JSON). */
export function buildSlackWebhookBody(payload: PhasePredictionsPayload) {
  const json = JSON.stringify(payload, null, 2)
  const phaseLabel = phaseLabels[payload.phaseId] ?? payload.phaseId

  const summary =
    `*Nowe typy*\n` +
    `• Gracz: *${payload.displayName.trim()}*\n` +
    `• E-mail: ${payload.contactEmail?.trim() || "—"}\n` +
    `• Faza: ${phaseLabel} (\`${payload.phaseId}\`)\n` +
    `• ID: \`${payload.predictionId}\`\n` +
    `• Wysłano: ${payload.submittedAt}\n` +
    `• Meczów: ${payload.predictions.length}`

  const maxJsonChars = 28_000
  const jsonBlock =
    json.length <= maxJsonChars
      ? json
      : `${json.slice(0, maxJsonChars)}\n… (ucięto — pełny JSON za długi dla Slacka)`

  return {
    text: `Nowe typy: ${payload.displayName.trim()} (${phaseLabel})`,
    blocks: [
      { type: "section", text: { type: "mrkdwn", text: summary } },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*JSON (skopiuj do pliku w repo):*\n\`\`\`${jsonBlock}\`\`\``,
        },
      },
    ],
  }
}
