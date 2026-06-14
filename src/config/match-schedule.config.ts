export const matchScheduleConfig = {
  /** Mecz uznany za „trwający” od kickoffu do kickoff + liveWindowHours (UI). */
  liveWindowHours: 3,
  /**
   * Okno stripa wstecz od teraz — mecze z kickoffem wcześniejszym niż
   * `now - timeAfterMatchStartedHours` nie trafiają do listy.
   */
  timeAfterMatchStartedHours: 3,
} as const
