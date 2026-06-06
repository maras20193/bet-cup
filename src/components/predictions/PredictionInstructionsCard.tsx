import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export type PredictionInstructionsCardProps = {
  exactScorePoints: number
  outcomePoints: number
}

export const PredictionInstructionsCard = ({
  exactScorePoints,
  outcomePoints,
}: PredictionInstructionsCardProps) => {
  return (
    <Card className="bg-muted/30 mx-auto border-border/80 max-w-[1200px]">
      <CardContent className="space-y-4 text-foreground text-sm">
        <div>
          <p className="mb-2 font-medium text-foreground">Punktacja</p>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside">
            <li>
              Dokładny wynik -{" "}
              <span className="font-medium text-foreground">
                {exactScorePoints} pkt
              </span>
              .
            </li>
            <li>
              Poprawny wynik (zwycięzca lub remis), ale bez trafienia dokładnego
              wyniku -{" "}
              <span className="font-medium text-foreground">
                {outcomePoints} pkt
              </span>
              .
            </li>
          </ul>
        </div>
        <Separator />
        <div className="space-y-2 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Faza grupowa: </span>
            Mecz kończy się po 90 minutach.
          </p>
          <p>
            <span className="font-medium text-foreground">
              Faza pucharowa:{" "}
            </span>
            Wynik liczy się po pełnym czasie gry, łącznie z dogrywką. Remis jest
            dozwolony. Jeśli po dogrywce nadal jest remis i o awansie zadecydują
            rzuty karne, oficjalny wynik meczu to remis.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
