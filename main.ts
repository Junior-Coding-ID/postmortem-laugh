import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Jawaban v2 — hasil super-analisa, dipakai persis, jangan diubah.
const ENTRY =
  "I asked our coding agent to confirm before deleting projects; it showed the dialog after the server deleted them. Cancel was for emotional closure.";

// Guard panjang eksak: 147 karakter, rentang brief 1-400.
if (ENTRY.length !== 147) {
  throw new Error(`Panjang entry salah: ${ENTRY.length}, harus 147 karakter.`);
}
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`Panjang entry di luar rentang 1-400: ${ENTRY.length}.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry tidak boleh hanya whitespace.");
}

// Guard tepat 2 kalimat: dua kalimat yang diakhiri titik.
const sentences = ENTRY.split(".")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);
if (sentences.length !== 2) {
  throw new Error(`Jumlah kalimat salah: ${sentences.length}, harus 2.`);
}
if (!ENTRY.endsWith(".")) {
  throw new Error("Entry harus diakhiri titik.");
}

// Tulis entry ke /output/entry.txt (path absolut sesuai harness make.fun).
const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

console.log(`OK: entry ditulis ke ${outPath} (${ENTRY.length} karakter, 2 kalimat).`);
console.log(ENTRY);
