import type { VercelRequest, VercelResponse } from "@vercel/node"

import { adminReadCorsHeaders, applyCorsHeaders } from "../lib/admin-cors.js"
import { teamCatalog } from "../generated/tournament-catalog.js"

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cors = adminReadCorsHeaders()

  if (req.method === "OPTIONS") {
    applyCorsHeaders(res, cors)
    return res.status(204).end()
  }

  applyCorsHeaders(res, cors)

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  return res.status(200).json(teamCatalog)
}
