import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { Countdown } from "./countdown";

const labels = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  started: "It has begun!",
};
const target = "2026-11-29T18:00:00+02:00";

// Fake timers let the test control the clock: set "now", then move time forward instantly
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const boxes = () => screen.getAllByRole("listitem").map((li) => li.textContent);

describe("Countdown", () => {
  it("shows the time left and ticks every second", () => {
    vi.setSystemTime(Date.parse(target) - (1 * 86_400 + 2 * 3_600 + 3 * 60 + 5) * 1000);
    render(<Countdown target={target} labels={labels} />);

    expect(boxes()).toEqual(["01Days", "02Hours", "03Minutes", "05Seconds"]);

    act(() => vi.advanceTimersByTime(1000));
    expect(boxes()).toEqual(["01Days", "02Hours", "03Minutes", "04Seconds"]);
  });

  it("shows the started message once the target has passed", () => {
    vi.setSystemTime(Date.parse(target) + 1000);
    render(<Countdown target={target} labels={labels} />);

    expect(screen.getByText("It has begun!")).toBeTruthy();
  });
});
