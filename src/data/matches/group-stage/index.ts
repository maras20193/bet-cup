import type { Match } from "@/types/match"

export type { Match }

import { groupStageGroupAMatches } from "./group-a"
import { groupStageGroupBMatches } from "./group-b"
import { groupStageGroupCMatches } from "./group-c"
import { groupStageGroupDMatches } from "./group-d"
import { groupStageGroupEMatches } from "./group-e"
import { groupStageGroupFMatches } from "./group-f"
import { groupStageGroupGMatches } from "./group-g"
import { groupStageGroupHMatches } from "./group-h"
import { groupStageGroupIMatches } from "./group-i"
import { groupStageGroupJMatches } from "./group-j"
import { groupStageGroupKMatches } from "./group-k"
import { groupStageGroupLMatches } from "./group-l"

export {
  groupStageGroupAMatches,
  groupStageGroupBMatches,
  groupStageGroupCMatches,
  groupStageGroupDMatches,
  groupStageGroupEMatches,
  groupStageGroupFMatches,
  groupStageGroupGMatches,
  groupStageGroupHMatches,
  groupStageGroupIMatches,
  groupStageGroupJMatches,
  groupStageGroupKMatches,
  groupStageGroupLMatches,
}

export const groupStageAllMatches = [
  ...groupStageGroupAMatches,
  ...groupStageGroupBMatches,
  ...groupStageGroupCMatches,
  ...groupStageGroupDMatches,
  ...groupStageGroupEMatches,
  ...groupStageGroupFMatches,
  ...groupStageGroupGMatches,
  ...groupStageGroupHMatches,
  ...groupStageGroupIMatches,
  ...groupStageGroupJMatches,
  ...groupStageGroupKMatches,
  ...groupStageGroupLMatches,
] satisfies readonly Match[]

export const groupStageMatches = {
  phaseId: "group-stage" as const,
  matches: [...groupStageAllMatches],
}
