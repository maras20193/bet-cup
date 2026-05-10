import type { ReactNode } from "react"

export type MatchGroupSectionProps = {
  title: string | null
  children: ReactNode
}

export const MatchGroupSection = ({
  title,
  children,
}: MatchGroupSectionProps) => {
  return (
    <div className="space-y-3">
      {title ? (
        <p className="font-heading font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  )
}
