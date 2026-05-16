import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type SectionProps = {
  layout?: "default" | "fill"
  className?: string
  children: ReactNode
}

export function Section({
  layout = "default",
  className,
  children,
}: SectionProps) {
  return (
    <section
      className={cn(
        "bg-card shadow-sm p-4 border border-border rounded-xl",
        "dark:border-white/10 dark:bg-zinc-950 dark:shadow-none",
        layout === "fill"
          ? "flex min-h-0 flex-1 flex-col gap-4 overflow-hidden"
          : "space-y-4",
        className,
      )}
    >
      {children}
    </section>
  )
}
