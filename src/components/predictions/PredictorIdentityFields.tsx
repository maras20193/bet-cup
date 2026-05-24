import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { PhasePredictionFormValues } from "@/types/predictions"

import { PREDICTOR_DISPLAY_NAME_MAX } from "@/components/predictions/utils/scorePredictionFormConstants"

export const PredictorIdentityFields = () => {
  const { control } = useFormContext<PhasePredictionFormValues>()

  return (
    <div className="space-y-4 pb-2 border-border/80 border-b">
      <p className="font-heading font-semibold text-muted-foreground text-xs uppercase tracking-wide">
        Twoje dane
      </p>
      <FormField
        control={control}
        name="displayName"
        rules={{
          validate: (v) => {
            const t = String(v ?? "").trim()
            if (t.length === 0) return "Podaj imię lub nick."
            if (t.length > PREDICTOR_DISPLAY_NAME_MAX)
              return `Imię lub nick może mieć co najwyżej ${PREDICTOR_DISPLAY_NAME_MAX} znaków.`
            return true
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Imię lub nick
              <span className="text-destructive"> *</span>
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                autoComplete="nickname"
                maxLength={PREDICTOR_DISPLAY_NAME_MAX}
                placeholder="np. Kasia"
                className="h-10"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
