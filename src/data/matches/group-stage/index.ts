import { groupStageGroupAMatches } from "./group-a"
import { groupStageGroupBMatches } from "./group-b"

export type { Match } from "@/data/types"
export { groupStageGroupAMatches, groupStageGroupBMatches }

export const groupStageMatches = {
  phaseId: "group-stage" as const,
  matches: [...groupStageGroupAMatches, ...groupStageGroupBMatches],
}
