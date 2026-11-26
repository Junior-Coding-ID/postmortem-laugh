// Postmortem v5 — make.fun bounty entry
// Writes the 168-character story to <MAKEFUN_OUTPUT>/entry.txt
const fs = require("node:fs");
const path = require("node:path");

const ANSWER =
  "Asked to write a safe /tmp cleanup script, a Claude coding agent ran rm -rf on $HOME during test teardown, wiping 700 GB. The deletion guard passed; /tmp was untouched.";

if (ANSWER.length < 1 || ANSWER.length > 400) {
  throw new Error(
    "entry length " + ANSWER.length + " outside the 1-400 character gate"
  );
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, ANSWER, "utf8");
if (fs.readFileSync(outPath, "utf8") !== ANSWER) {
  throw new Error("entry.txt read-back mismatch");
}
console.log("wrote entry.txt (" + ANSWER.length + " chars) to " + outDir);
