import type { VercelRequest, VercelResponse } from "@vercel/node"

import { adminReadCorsHeaders, applyCorsHeaders } from "../lib/admin-cors.js"
import {
  readAdminSecret,
  validateUpdateMatchResultPayload,
} from "../lib/match-result-payload.js"
import { updateMatchResultInSupabase } from "../lib/supabase-admin.js"
import { isKnownMatchId } from "../generated/tournament-catalog.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cors = adminReadCorsHeaders()

  if (req.method === "OPTIONS") {
    applyCorsHeaders(res, cors)
    return res.status(204).end()
  }

  applyCorsHeaders(res, cors)

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    return res.status(503).json({
      error: "Admin API is not configured (ADMIN_SECRET)",
    })
  }

  if (readAdminSecret(req.headers) !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const body = req.body
  if (!validateUpdateMatchResultPayload(body)) {
    return res.status(400).json({
      error: "Invalid payload. Required: matchId (string), home, away (integers >= 0).",
    })
  }

  if (!isKnownMatchId(body.matchId)) {
    return res.status(404).json({
      error: `Unknown matchId: ${body.matchId}`,
    })
  }

  const result = await updateMatchResultInSupabase(body)
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error })
  }

  return res.status(200).json(result)
}
