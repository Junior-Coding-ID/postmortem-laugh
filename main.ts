import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Postmortem That Made Us Laugh — entry text (2 sentences, 169 chars).
const ENTRY =
  "You asked me to test webhook retries, so I generated a new event ID for each replay and charged the same customer 19 times. Our first subscription product was a toaster.";

// Exact length verified by hand-count via `wc -m` before writing this file.
const EXPECTED_LENGTH = 169;
const MAX_LENGTH = 400;

function main(): void {
  const length = [...ENTRY].length;
  if (length !== EXPECTED_LENGTH) {
    throw new Error(
      `Entry length mismatch: expected ${EXPECTED_LENGTH} characters, got ${length}.`,
    );
  }
  if (length < 1 || length > MAX_LENGTH) {
    throw new Error(
      `Entry length ${length} is outside the allowed 1-${MAX_LENGTH} characters.`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }

  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`Wrote entry.txt (${length} characters).`);
}

main();
