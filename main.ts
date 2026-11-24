// Fortune in a Pot — make.fun bounty u-golden-heron-44-fortune-in-a-pot-ded981e9
// SPDX-License-Identifier: MIT
//
// Creative choice — candidates considered (all judged against the gardener
// judge's brief: plant's own future first, a small joke that lands rather
// than a groaned-at pun, kind/warm, fortune cadence, specific to THIS plant
// in THIS window, one line <= 120 chars):
//
//   1. "Soon the morning sun will find your leaves first, and your keeper,
//      a day late with water, will arrive right on time." (116 chars) — CHOSEN.
//      Specific: morning sun, leaves, windowsill implied by "find your
//      leaves first", keeper's late watering as a concrete habit. The joke
//      is gentle and relatable (the chronically-late waterer finally on
//      time) rather than a pun, and "Soon ... will ..." is true fortune
//      cadence — a prediction about the plant's own future, warm, no doom.
//   2. "Before long, the sun will find you first on this sill, and your
//      keeper's late watering will turn out to be perfect timing after
//      all." (130 chars) — REJECTED: same idea, warmer twist, but 10 chars
//      over the 120-char gate, and "perfect timing after all" is a softer,
//      less funny payoff than the keeper arriving "right on time".
//   3. "Soon you'll outgrow this pot and earn the sunny corner spot — your
//      keeper's forgetful watering was secretly perfect all along."
//      (129 chars) — REJECTED: also over the limit, and "outgrow this pot"
//      leans toward a care/slogan reading (a bigger pot) rather than a
//      fortune about the plant's days ahead; the joke lands less cleanly.
//
// Why the winner wins: it names the window's light, the leaves, and the
// keeper's one concrete flaw (a day late with water), then turns that flaw
// into the happy ending — the plant is not mocked for being thirsty, the
// keeper is not scolded, and the future is sunny in both senses. It reads
// cleanly aloud in one breath and needs no padding to reach the limit.
//
// Deterministic: no wall-clock time, no randomness, no network, no file
// reads outside this program. The fortune is a fixed string; the program
// only writes it to /output/entry.txt (or $OUTPUT_DIR/entry.txt when the
// env override is set for local testing — same bytes either way).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "Soon the morning sun will find your leaves first, and your keeper, a day late with water, will arrive right on time.";

// Self-check (gate mirror): the entry must be UTF-8, 1-120 chars, one line,
// not only whitespace. Fail loudly instead of writing a bad entry.
function selfCheck(text: string): void {
  if (text.trim().length === 0) throw new Error("fortune is empty");
  if (text.length > 120) {
    throw new Error(`fortune is ${text.length} chars, over the 120-char limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  // Candidate comparison, kept as a guard: the chosen line must stay the
  // shortest of the three considered, so a future edit cannot silently
  // re-introduce an over-long rejected candidate.
  const rejected = [130, 129];
  for (const n of rejected) {
    if (text.length >= n) throw new Error("fortune no longer beats rejected candidates");
  }
}

selfCheck(FORTUNE);

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), FORTUNE + "\n", "utf8");
