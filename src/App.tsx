import { Route, Routes } from "react-router"

import { AppShell } from "@/components/layout/app-shell"
import { DashboardPage } from "@/pages/dashboard-page"
import { PredictionsPage } from "@/pages/predictions-page"

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="typowanie" element={<PredictionsPage />} />
      </Route>
    </Routes>
  )
}

export default App
