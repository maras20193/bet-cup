export type UpdateMatchResultPayload = {
  matchId: string
  home: number
  away: number
}

export function validateUpdateMatchResultPayload(
  body: unknown,
): body is UpdateMatchResultPayload {
  if (!body || typeof body !== "object") return false

  const b = body as Record<string, unknown>

  if (typeof b.matchId !== "string" || !b.matchId.trim()) return false
  if (typeof b.home !== "number" || typeof b.away !== "number") return false
  if (!Number.isInteger(b.home) || !Number.isInteger(b.away)) return false
  if (b.home < 0 || b.away < 0) return false

  return true
}

export function readAdminSecret(
  headers: Record<string, string | string[] | undefined>,
): string | undefined {
  const header = headers["x-admin-secret"]
  return Array.isArray(header) ? header[0] : header
}
