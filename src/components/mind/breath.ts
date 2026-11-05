// Shared state between the breathing guide (UI) and the particle field (WebGL).
export const breathBus: { start: number | null } = { start: null };

export const STEP_MS = 4000; // box breathing: 4 s per step
export const CYCLES = 4;
export const GUIDE_MS = STEP_MS * 4 * CYCLES;

export type Phase = "inhale" | "holdIn" | "exhale" | "holdOut";
const PHASES: Phase[] = ["inhale", "holdIn", "exhale", "holdOut"];

export function guidedBreath(elapsed: number) {
  const t = Math.max(0, elapsed) % (STEP_MS * 4);
  const step = Math.floor(t / STEP_MS);
  const k = (t % STEP_MS) / STEP_MS;
  const ease = 0.5 - 0.5 * Math.cos(k * Math.PI);
  const value = step === 0 ? ease : step === 1 ? 1 : step === 2 ? 1 - ease : 0;
  return { phase: PHASES[step], value, secondsLeft: Math.ceil((STEP_MS - (t % STEP_MS)) / 1000), done: elapsed >= GUIDE_MS };
}
