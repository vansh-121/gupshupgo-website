#!/usr/bin/env node
/**
 * Chunk size budget check.
 *
 * Walks dist/assets and fails (exit 1) when any emitted .js chunk exceeds
 * MAX_CHUNK_BYTES. Prints the size of every chunk so regressions are visible
 * in CI logs.
 */
import { readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_CHUNK_BYTES = 300000;

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const assetsDir = join(projectRoot, 'dist', 'assets');

/** Recursively collect .js files under a directory. */
async function collectJsFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectJsFiles(full);
      if (nested) files.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

function formatKb(bytes) {
  return `${(bytes / 1000).toFixed(1)} kB`;
}

const files = await collectJsFiles(assetsDir);

if (files === null) {
  console.error(
    `Chunk budget check failed: ${relative(projectRoot, assetsDir)} not found. Run the build first.`
  );
  process.exit(1);
}

if (files.length === 0) {
  console.error(
    `Chunk budget check failed: no .js chunks found in ${relative(projectRoot, assetsDir)}.`
  );
  process.exit(1);
}

const sized = [];
for (const file of files) {
  const { size } = await stat(file);
  sized.push({ path: relative(projectRoot, file), size });
}
sized.sort((a, b) => b.size - a.size);

const overBudget = sized.filter((entry) => entry.size > MAX_CHUNK_BYTES);

console.log(`Chunk budget: ${formatKb(MAX_CHUNK_BYTES)} per .js chunk`);
for (const entry of sized) {
  const flag = entry.size > MAX_CHUNK_BYTES ? 'OVER ' : '  ok ';
  console.log(`${flag} ${formatKb(entry.size).padStart(10)}  ${entry.path}`);
}

if (overBudget.length > 0) {
  console.error(
    `\n${overBudget.length} chunk(s) exceed the ${formatKb(MAX_CHUNK_BYTES)} budget.`
  );
  process.exit(1);
}

console.log(`\nAll ${sized.length} chunk(s) within budget.`);
