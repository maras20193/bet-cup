import { ResultsRanking } from "@/components/results/ranking/ResultsRanking"
import { cn } from "@/lib/utils"

export const RankingPage = () => {
  return (
    <div className={cn("mx-auto mt-1 mb-4 max-w-[1400px]")}>
      <ResultsRanking />
    </div>
  )
}
