import type { VercelRequest, VercelResponse } from "@vercel/node"

import {
  buildSlackWebhookBody,
  validatePhasePredictionsPayload,
} from "./lib/phase-predictions.js"

function corsHeaders(origin: string | undefined): Record<string, string> {
  const allowed = process.env.ALLOWED_ORIGIN
  const allowOrigin =
    !allowed || allowed === "*" ? (origin ?? "*") : origin === allowed ? origin : allowed

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Submit-Secret",
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", corsHeaders(origin)["Access-Control-Allow-Origin"])
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Submit-Secret")
    return res.status(204).end()
  }

  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v))

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const submitSecret = process.env.SUBMIT_SECRET
  if (submitSecret) {
    const header = req.headers["x-submit-secret"]
    const provided = Array.isArray(header) ? header[0] : header
    if (provided !== submitSecret) {
      return res.status(401).json({ error: "Unauthorized" })
    }
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    return res.status(503).json({
      error: "Slack webhook is not configured (SLACK_WEBHOOK_URL)",
    })
  }

  const body = req.body
  if (!validatePhasePredictionsPayload(body)) {
    return res.status(400).json({ error: "Invalid payload" })
  }

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildSlackWebhookBody(body)),
  })

  if (!slackRes.ok) {
    const detail = await slackRes.text()
    console.error("Slack webhook failed", slackRes.status, detail)
    return res.status(502).json({ error: "Slack delivery failed" })
  }

  return res.status(200).json({ ok: true })
}
