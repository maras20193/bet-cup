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

function displayNameFromPhaseFiles(
  phaseFiles: readonly PhasePredictions[],
): string {
  const groupStage = phaseFiles.find((f) => f.phaseId === "group-stage")
  if (groupStage) return groupStage.displayName

  const earliest = [...phaseFiles].sort((a, b) =>
    a.submittedAt.localeCompare(b.submittedAt),
  )[0]
  return earliest?.displayName ?? "Gracz"
}

function buildPlayerBundles(): PlayerPredictionBundleInput[] {
  const phaseFilesByPlayerId = new Map<string, PhasePredictions[]>()

  for (const [path, file] of Object.entries(phaseFileModules)) {
    const playerId = playerSlugFromPath(path)
    if (!playerId) continue

    const parsed = parsePhasePredictionsFile(file)
    const existing = phaseFilesByPlayerId.get(playerId) ?? []
    existing.push(parsed)
    phaseFilesByPlayerId.set(playerId, existing)
  }

  const bundles: PlayerPredictionBundleInput[] = []

  for (const [playerId, phaseFiles] of phaseFilesByPlayerId) {
    bundles.push({
      playerId,
      displayName: displayNameFromPhaseFiles(phaseFiles),
      phaseFiles,
    })
  }

  return bundles.sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "pl"),
  )
}

export const playerPredictionBundles: readonly PlayerPredictionBundleInput[] =
  buildPlayerBundles()
