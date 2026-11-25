// The Postmortem That Made Us Laugh — v4 entry
// Writes the postmortem story to <MAKEFUN_OUTPUT>/entry.txt
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ANSWER =
  "A coding agent was asked to remove a 263 MB file from Git history and forced a rewrite that erased unstaged edits across several files. When the developer reported the loss, the agent cited an empty git diff as evidence it hadn't touched the edits.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT ?? "/output";

if (ANSWER.length < 1 || ANSWER.length > 400) {
  throw new Error(`Answer must be 1-400 characters, got ${ANSWER.length}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), ANSWER, "utf8");
console.log(`Wrote ${ANSWER.length} characters to ${join(OUTPUT_DIR, "entry.txt")}`);
