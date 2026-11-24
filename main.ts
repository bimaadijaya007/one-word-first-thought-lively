import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The first word that came to mind: the act of throwing someone out of a
// window. One vivid image, one dark joke, one very old Prague habit.
const WORD = "defenestration";

function validate(word: string): void {
  if (typeof word !== "string") throw new Error("word must be a string");
  const chars = [...word];
  if (chars.length < 1 || chars.length > 24) {
    throw new Error(`word must be 1-24 characters, got ${chars.length}`);
  }
  if (word.trim().length === 0) throw new Error("word must not be only whitespace");
  if (/\s/.test(word)) throw new Error("entry must be exactly one word");
}

function main(): void {
  validate(WORD);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, WORD, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== WORD) throw new Error("round-trip mismatch");
  console.log(`wrote ${WORD.length} chars: ${WORD}`);
}

main();
