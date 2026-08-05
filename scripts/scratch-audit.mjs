import fs from 'node:fs';
import path from 'node:path';

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(e.name) && !/\.test\./.test(e.name)) files.push(p);
  }
})('src');

for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  const hits = [];
  lines.forEach((line, i) => {
    if (/\bcn\(/.test(line)) {
      hits.push(lines.slice(i, i + 8).map((l, j) => `${i + 1 + j}: ${l}`).join('\n'));
    }
  });
  if (hits.length) console.log('=== ' + f + '\n' + hits.join('\n---\n'));
}
