export interface Race {
  meet: string;
  /** ISO date, e.g. 2017-08-19 */
  date: string;
  /** Display string as typed on the result sheet: "19:28.50", "1:16:53" */
  time: string;
  place: number;
  url?: string;
}

export interface RaceEvent {
  id: string;
  label: string;
  races: Race[];
}

export interface Team {
  id: string;
  label: string;
  logo?: string;
  events: RaceEvent[];
}

/** "19:28.50" | "1:16:53" | "20:26.6" -> seconds */
export function parseTime(t: string): number {
  return t.split(':').reduce((acc, part) => acc * 60 + parseFloat(part), 0);
}

/** seconds -> "M:SS.ss" (or "H:MM:SS" for >= 1 hour) */
export function formatTime(s: number): string {
  if (s >= 3600) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}:${String(m).padStart(2, '0')}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  }
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toFixed(2).padStart(5, '0')}`;
}

export function personalBest(races: Race[]): Race | undefined {
  return races.reduce<Race | undefined>(
    (best, r) => (!best || parseTime(r.time) < parseTime(best.time) ? r : best),
    undefined
  );
}