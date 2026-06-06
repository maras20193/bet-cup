export const routePaths = {
  table: "tabela",
  chart: "wykres",
  ranking: "ranking",
  predictions: "typowanie",
} as const

export const routes = {
  home: "/",
  table: `/${routePaths.table}`,
  chart: `/${routePaths.chart}`,
  ranking: `/${routePaths.ranking}`,
  predictions: `/${routePaths.predictions}`,
} as const
