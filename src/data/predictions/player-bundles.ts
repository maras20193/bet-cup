import type {
  PhasePredictions,
  PlayerPredictionBundleInput,
} from "@/types/predictions"
import { parsePhasePredictionsFile } from "@/mappers/predictions"

const phaseFileModules = import.meta.glob<PhasePredictions>("./*/*.json", {
  eager: true,
  import: "default",
})

function playerSlugFromPath(path: string): string | null {
  const match = /^\.\/([^/]+)\/.+\.json$/.exec(path)
  return match?.[1] ?? null
}

function buildPlayerBundles(): PlayerPredictionBundleInput[] {
  const phaseFilesBySlug = new Map<string, PhasePredictions[]>()

  for (const [path, file] of Object.entries(phaseFileModules)) {
    const slug = playerSlugFromPath(path)
    if (!slug) continue

    const parsed = parsePhasePredictionsFile(file)
    const existing = phaseFilesBySlug.get(slug) ?? []
    existing.push(parsed)
    phaseFilesBySlug.set(slug, existing)
  }

  const bundles: PlayerPredictionBundleInput[] = []

  for (const phaseFiles of phaseFilesBySlug.values()) {
    const [first] = phaseFiles
    if (!first) continue

    bundles.push({
      userId: first.userId,
      displayName: first.displayName,
      phaseFiles,
    })
  }

  return bundles.sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "pl")
  )
}

export const playerPredictionBundles: readonly PlayerPredictionBundleInput[] =
  buildPlayerBundles()
