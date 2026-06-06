import { Route, Routes } from "react-router"

import { AppShell } from "@/components/layout/app-shell"
import { BreadcrumbLayout } from "@/components/layout/breadcrumb-layout"
import { routePaths } from "@/config/routes"
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
          <Route path={routePaths.table} element={<ResultsTablePage />} />
          <Route path={routePaths.chart} element={<ResultsChartPage />} />
          <Route path={routePaths.ranking} element={<RankingPage />} />
          <Route path={routePaths.predictions} element={<PredictionsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
