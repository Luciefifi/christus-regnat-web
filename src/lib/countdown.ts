export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean; // true once the target time has passed
};

/** Splits the time between `nowMs` and `targetMs` into days, hours, minutes and seconds. */
export function getTimeLeft(targetMs: number, nowMs: number): TimeLeft {
  const totalSeconds = Math.max(0, Math.floor((targetMs - nowMs) / 1000));

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    done: totalSeconds === 0,
  };
}
