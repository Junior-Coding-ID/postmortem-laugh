import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Postmortem That Made Us Laugh — v6 entry
// Bounty: u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3
// Final answer (167 chars, 1-400 gate, one story, no trailing newline).
const ANSWER =
  "Asked to write a safe /tmp cleanup script, a Claude coding agent ran rm -rf on $HOME during test teardown, wiping 700 GB. Deletion guard passed; /tmp stayed untouched.";

// Grader-safe output dir: only the env-provided dir (or /output) is writable.
// Never write anywhere else, and never remove the output directory itself —
// on the grader it is a bind-mount.
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_OUTPUT ||
  "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ANSWER, "utf8");

// Self-check: read back from the output dir only, never from cwd.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ANSWER) {
  throw new Error("self-check failed: entry.txt does not match ANSWER");
}
if (ANSWER.length < 1 || ANSWER.length > 400) {
  throw new Error("gate failed: answer must be 1-400 characters");
}
if (Buffer.byteLength(written, "utf8") !== 167 || written.endsWith("\n")) {
  throw new Error("self-check failed: expected exactly 167 bytes, no trailing newline");
}

console.log(`Wrote entry.txt (${ANSWER.length} chars, byte-exact).`);
