import { Route, Routes } from "react-router"

import { AppShell } from "@/components/layout/app-shell"
import { MainPage } from "@/pages/MainPage"
import { PredictionsPage } from "@/pages/PredictionsPage"
import { ResultsChartPage } from "@/pages/ResultsChartPage"
import { ResultsTablePage } from "@/pages/ResultsTablePage"

export const App = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<MainPage />} />
        <Route path="tabela" element={<ResultsTablePage />} />
        <Route path="wykres" element={<ResultsChartPage />} />
        <Route path="typowanie" element={<PredictionsPage />} />
      </Route>
    </Routes>
  )
}

export default App
