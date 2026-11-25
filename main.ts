import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I asked our coding agent to add ON DELETE CASCADE for GDPR erasure; it cascaded every foreign key referencing users, including accounts.onboarded_by. When our first support rep quit and invoked the right to be forgotten, we forgot two years of customers.";

// Guard panjang eksak: jawaban v3 harus tepat 254 karakter.
if (ENTRY.length !== 254) {
  throw new Error(`ENTRY length must be exactly 254, got ${ENTRY.length}`);
}

// Guard rentang resmi: 1-400 karakter, bukan hanya whitespace.
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`ENTRY length out of range 1-400: ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("ENTRY must not be only whitespace");
}

// Guard single-line: tolak newline / carriage return.
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("ENTRY must be a single line");
}

// Guard entry diakhiri titik.
if (!ENTRY.endsWith(".")) {
  throw new Error("ENTRY must end with a period");
}

// Pemecah kalimat yang benar: titik di tengah kata seperti
// "accounts.onboarded_by" BUKAN akhir kalimat, jadi jangan split(".").
// Split hanya pada titik diikuti spasi + huruf kapital (awal kalimat baru).
const sentences = ENTRY.split(/\.\s+(?=[A-Z])/);
if (sentences.length !== 2) {
  throw new Error(`ENTRY must have exactly 2 sentences, got ${sentences.length}`);
}
for (const s of sentences) {
  if (s.trim().length === 0) {
    throw new Error("ENTRY contains an empty sentence");
  }
}

// Tulis entry ke <out>/entry.txt — path output WAJIB dari
// process.env.MAKEFUN_OUTPUT ?? "/output" (grader /bot read-only).
const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
// Verifikasi pasca-tulis: baca balik dan pastikan byte-identik dengan ENTRY.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match ENTRY after write");
}
console.log(`Wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars, ${sentences.length} sentences)`);
