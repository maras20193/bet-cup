import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { buildAllMatches, filterMatchesByPhases } from "@/mappers/matches"

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
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
