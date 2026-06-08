import { Skeleton } from "@/components/ui/skeleton"

export function ResultColumnSkeleton() {
  return (
    <div
      className="flex justify-center"
      aria-busy="true"
      aria-label="Ładowanie wyniku"
    >
      <Skeleton className="rounded-full w-12 h-6" />
    </div>
  )
}
