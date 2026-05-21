import type { PhasePredictions } from "@/types/predictions"

const defaultSubmitUrl = "/api/submit"

export class SubmitPhasePredictionsError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "SubmitPhasePredictionsError"
    this.status = status
  }
}

export async function submitPhasePredictions(
  payload: PhasePredictions,
): Promise<void> {
  const url = import.meta.env.VITE_SUBMIT_API_URL ?? defaultSubmitUrl

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  const secret = import.meta.env.VITE_SUBMIT_SECRET
  if (secret) headers["X-Submit-Secret"] = secret

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let message = `Wysyłka nie powiodła się (${res.status})`
    try {
      const data = (await res.json()) as { error?: string }
      if (data.error) message = data.error
    } catch {
      /* ignore */
    }
    throw new SubmitPhasePredictionsError(message, res.status)
  }
}
