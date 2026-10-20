"use client";

import { useSyncExternalStore } from "react";
import { getTimeLeft } from "@/lib/countdown";

export type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  started: string;
};

// The clock is a value that changes outside React. useSyncExternalStore is React's way to read it:
// - subscribe: how to listen for changes (a timer that fires every second)
// - getNowInSeconds: the current value in the browser
// - getServerSnapshot: the value on the server, where there is no "now" (the page is prerendered)
function subscribe(onTick: () => void) {
  const timer = setInterval(onTick, 1000);
  return () => clearInterval(timer);
}

const getNowInSeconds = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

export function Countdown({ target, labels }: { target: string; labels: CountdownLabels }) {
  const nowInSeconds = useSyncExternalStore(subscribe, getNowInSeconds, getServerSnapshot);
  const timeLeft =
    nowInSeconds === null ? null : getTimeLeft(Date.parse(target), nowInSeconds * 1000);

  if (timeLeft?.done) {
    return <p className="font-display text-3xl text-gold-700">{labels.started}</p>;
  }

  const units = [
    { label: labels.days, value: timeLeft?.days },
    { label: labels.hours, value: timeLeft?.hours },
    { label: labels.minutes, value: timeLeft?.minutes },
    { label: labels.seconds, value: timeLeft?.seconds },
  ];

  return (
    <ul className="grid grid-cols-4 gap-2 sm:gap-4">
      {units.map((unit) => (
        <li
          key={unit.label}
          className="rounded-2xl bg-white px-2 py-4 text-center shadow-sm ring-1 ring-gold-200"
        >
          <span className="block font-display text-3xl font-semibold tabular-nums sm:text-5xl">
            {/* "--" until the browser knows the time (server render and first paint) */}
            {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-xs font-medium tracking-wider text-ink-muted uppercase">
            {unit.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
