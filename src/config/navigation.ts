export const navItems = [
  { to: "/", label: "Strona główna", end: true as const },
  { to: "/tabela", label: "Tabela wyników", end: false as const },
  { to: "/wykres", label: "Wykres punktów", end: false as const },
  { to: "/typowanie", label: "Typowanie", end: false as const },
] as const

/** Linki z landing page (bez strony głównej). */
export const mainPageLinks = navItems.filter((item) => item.to !== "/")
