import { Info } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export const PredictionsClosedNotice = () => {
  return (
    <Alert>
      <Info />
      <AlertTitle>Typowanie jest zamknięte</AlertTitle>
      <AlertDescription>
        W tej chwili nie zbieramy typów na żadną fazę turnieju. Wróć
        później — po otwarciu kolejnej fazy znów będzie można wysłać
        prognozy.
      </AlertDescription>
    </Alert>
  )
}
