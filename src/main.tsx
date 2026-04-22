import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { demoPlayerPredictionBundles } from "@/data/predictions"
import { buildAllMatches, filterMatchesByPhases } from "@/mappers/matches"
import { buildMatchPredictionsTableRows } from "@/mappers/matchPredictionsTable"

if (import.meta.env.DEV) {
  const allMatches = buildAllMatches()
  console.log("[matches] all", allMatches)
  console.log(
    "[matches] group-stage only",
    filterMatchesByPhases(allMatches, ["group-stage"])
  )
  console.log(
    "[matches] round-of-4 only",
    filterMatchesByPhases(allMatches, ["round-of-4"])
  )
  console.log(
    "[matchPredictionsTable] rows",
    buildMatchPredictionsTableRows({
      matches: allMatches,
      players: demoPlayerPredictionBundles,
    })
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
