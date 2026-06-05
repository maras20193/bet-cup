import { Route, Routes } from "react-router"

import { AppShell } from "@/components/layout/app-shell"
import { BreadcrumbLayout } from "@/components/layout/breadcrumb-layout"
import { MainPage } from "@/pages/MainPage"
import { PredictionsPage } from "@/pages/PredictionsPage"
import { ResultsChartPage } from "@/pages/ResultsChartPage"
import { RankingPage } from "@/pages/RankingPage"
import { ResultsTablePage } from "@/pages/ResultsTablePage"

export const App = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<MainPage />} />
        <Route element={<BreadcrumbLayout />}>
          <Route path="tabela" element={<ResultsTablePage />} />
          <Route path="wykres" element={<ResultsChartPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="typowanie" element={<PredictionsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
