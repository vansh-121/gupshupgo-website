import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/** Walks up from the working directory until `src/index.css` is found. */
function locateCss(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    const candidate = resolve(dir, "src/index.css");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("readTokens: could not locate src/index.css");
}

const CSS_PATH = locateCss();

let cachedCss: string | null = null;

function css(): string {
  if (cachedCss === null) cachedCss = readFileSync(CSS_PATH, "utf8");
  return cachedCss;
}

/**
 * Extracts the body of the first block declared with `selector`, brace-matched
 * so nested blocks do not terminate it early.
 */
function extractBlock(source: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const opening = new RegExp(`(?:^|[\\s,{}])${escaped}\\s*\\{`, "m");
  const match = opening.exec(source);
  if (!match) {
    throw new Error(`readTokens: selector "${selector}" not found in src/index.css`);
  }

  const start = match.index + match[0].length;
  let depth = 1;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, i);
    }
  }

  throw new Error(`readTokens: unterminated block for selector "${selector}"`);
}

/**
 * Parses the custom properties declared under `themeSelector` in
 * `src/index.css`. jsdom loads no CSS, so token assertions read the stylesheet
 * that actually ships instead of the DOM.
 *
 * Values are trimmed and whitespace-collapsed; hex values are lower-cased by
 * callers if needed (the raw casing from the file is preserved here).
 */
export function readTokens(themeSelector: string): Record<string, string> {
  const body = extractBlock(css(), themeSelector);
  const tokens: Record<string, string> = {};

  const declaration = /(--[\w-]+)\s*:\s*([^;{}]+);/g;
  let match: RegExpExecArray | null;
  while ((match = declaration.exec(body)) !== null) {
    tokens[match[1]] = match[2].trim().replace(/\s+/g, " ");
  }

  return tokens;
}

/** Convenience wrappers for the two shipped themes. */
export const readLightTokens = () => readTokens(":root");
export const readDarkTokens = () => readTokens(".dark");
