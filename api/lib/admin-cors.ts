export function adminReadCorsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
  }
}

export function applyCorsHeaders(
  res: { setHeader: (name: string, value: string) => void },
  headers: Record<string, string>,
): void {
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value))
}
