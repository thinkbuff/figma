/**
 * Normalize a Figma DTCG "Export modes" dump into the committed token JSON.
 *
 * Usage: pnpm tokens:import <dir>
 * Recursively reads every `*.tokens.json` in <dir> and writes
 * packages/theme/tokens/{colors/*.json, sizing.json, typography.json}.
 */
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = path.resolve(__dirname, '../tokens');

const COLOR_MODE_FILES: Record<string, string> = {
  Light: 'colors/figma-light.json',
  Dark: 'colors/figma-dark.json',
  'FigJam-Light': 'colors/figjam-light.json',
  'FigJam-Dark': 'colors/figjam-dark.json',
  'DevMode-Light': 'colors/devmode-light.json',
  'DevMode-Dark': 'colors/devmode-dark.json',
  'Slides-Light': 'colors/slides-light.json',
  'Slides-Dark': 'colors/slides-dark.json',
};

type DtcgNode = { [key: string]: unknown };
type DtcgLeaf = {
  $type?: string;
  $value?: unknown;
  $description?: string;
  $extensions?: { 'com.figma.codeSyntax'?: { WEB?: string } };
};

function isLeaf(node: unknown): node is DtcgLeaf {
  return typeof node === 'object' && node !== null && '$value' in node;
}

// $-prefixed keys are metadata EXCEPT `$root`, which Figma emits as a real
// nested token name (e.g. {✦.icon.toolbar.selected.$root}).
function isTokenKey(key: string) {
  return !key.startsWith('$') || key === '$root';
}

function children(node: DtcgNode): [string, DtcgNode][] {
  return Object.entries(node).filter(
    ([key, value]) => isTokenKey(key) && typeof value === 'object' && value !== null,
  ) as [string, DtcgNode][];
}

/**
 * Longest-key match walk: segment names may themselves contain dots.
 */
function resolvePath(root: DtcgNode, dotPath: string): DtcgNode | DtcgLeaf | undefined {
  const segments = dotPath.split('.');
  let node: DtcgNode = root;
  let index = 0;
  while (index < segments.length) {
    let matched = false;
    for (let length = segments.length - index; length > 0; length--) {
      const key = segments.slice(index, index + length).join('.');
      const next = node[key];
      if (typeof next === 'object' && next !== null && isTokenKey(key)) {
        node = next as DtcgNode;
        index += length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      return undefined;
    }
  }
  return node;
}

function resolveValue(root: DtcgNode, value: unknown, seen = new Set<string>()): unknown {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const ref = value.slice(1, -1);
    if (seen.has(ref)) {
      throw new Error(`Circular alias: ${ref}`);
    }
    seen.add(ref);
    const target = resolvePath(root, ref);
    if (!target || !isLeaf(target)) {
      throw new Error(`Unresolved alias: {${ref}} (from ${JSON.stringify(seen)})`);
    }
    return resolveValue(root, target.$value, seen);
  }
  return value;
}

function componentToHex(component: number) {
  return Math.round(component * 255)
    .toString(16)
    .padStart(2, '0');
}

function normalizeColor(value: unknown, context: string): string {
  if (typeof value === 'string') {
    const hex = value.trim().toLowerCase();
    const match = /^#([0-9a-f]{3,8})$/.exec(hex);
    if (match) {
      let digits = match[1];
      if (digits.length === 3 || digits.length === 4) {
        digits = digits
          .split('')
          .map((digit) => digit + digit)
          .join('');
      }
      if (digits.length === 8 && digits.endsWith('ff')) {
        digits = digits.slice(0, 6);
      }
      if (digits.length === 6 || digits.length === 8) {
        return `#${digits}`;
      }
    }
    const rgb = /^rgba?\(([^)]+)\)$/.exec(hex);
    if (rgb) {
      const [r, g, b, a] = rgb[1].split(',').map((part) => parseFloat(part));
      const alpha = Number.isNaN(a) ? 1 : a;
      const hex6 = `#${componentToHex(r / 255)}${componentToHex(g / 255)}${componentToHex(b / 255)}`;
      return alpha >= 1 ? hex6 : `${hex6}${componentToHex(alpha)}`;
    }
    throw new Error(`Unsupported color string "${value}" at ${context}`);
  }
  if (typeof value === 'object' && value !== null) {
    const object = value as Record<string, unknown>;
    if (Array.isArray(object.components)) {
      const [r, g, b] = object.components as number[];
      const alpha = typeof object.alpha === 'number' ? object.alpha : 1;
      const hex6 = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
      return alpha >= 1 ? hex6 : `${hex6}${componentToHex(alpha)}`;
    }
    if (typeof object.hex === 'string') {
      return normalizeColor(object.hex, context);
    }
  }
  throw new Error(`Unsupported color value at ${context}: ${JSON.stringify(value)}`);
}

function isExcludedColorPath(joinedPath: string) {
  return (
    joinedPath.startsWith('✦/fullscreen/') ||
    /desktop/i.test(joinedPath) ||
    joinedPath.startsWith('✦/special/code') ||
    (joinedPath.startsWith('✦/special/') && joinedPath.includes('inspect'))
  );
}

type ColorEntry = { value: string; description?: string };

function importColorFile(root: DtcgNode) {
  const published: Record<string, ColorEntry> = {};

  function walk(node: DtcgNode, segments: string[]) {
    for (const [key, child] of children(node)) {
      const path = [...segments, key];
      if (isLeaf(child)) {
        const joined = path.join('/');
        if (isExcludedColorPath(joined)) {
          continue;
        }
        const web = child.$extensions?.['com.figma.codeSyntax']?.WEB ?? '';
        const match = /^var\(--color-([a-zA-Z0-9-]+)\)$/.exec(web);
        if (!match) {
          continue; // primitives (var(--ramp-*)) and unbound tokens: alias resolution only
        }
        const name = match[1];
        const value = normalizeColor(resolveValue(root, child.$value), joined);
        const description =
          typeof child.$description === 'string' && child.$description.trim()
            ? child.$description
            : undefined;
        const existing = published[name];
        if (existing) {
          if (existing.value !== value) {
            throw new Error(
              `Conflicting values for --color-${name}: ${existing.value} vs ${value} (${joined})`,
            );
          }
          if (!existing.description && description) {
            existing.description = description;
          }
        } else {
          published[name] = description ? { value, description } : { value };
        }
      } else {
        walk(child, path);
      }
    }
  }

  walk(root, []);
  return Object.fromEntries(Object.entries(published).sort(([a], [b]) => a.localeCompare(b)));
}

function numberValue(root: DtcgNode, value: unknown, context: string): number {
  const resolved = resolveValue(root, value);
  if (typeof resolved === 'number') {
    return resolved;
  }
  if (typeof resolved === 'object' && resolved !== null) {
    const object = resolved as { value?: unknown };
    if (typeof object.value === 'number') {
      return object.value;
    }
  }
  throw new Error(`Expected a number at ${context}, got ${JSON.stringify(resolved)}`);
}

function importSizingFile(root: DtcgNode) {
  const space: Record<string, number> = {};
  const radius: Record<string, number> = {};
  const radiusNames: Record<string, string> = {
    'radius-none': 'none',
    'radius-small': 'small',
    'radius-medium': 'medium',
    'radius-large': 'large',
    'radius-full': 'full',
  };

  function walk(node: DtcgNode, segments: string[]) {
    for (const [key, child] of children(node)) {
      const path = [...segments, key];
      if (isLeaf(child)) {
        if (/^spacer-\d+$/.test(key)) {
          space[key.replace('spacer-', '')] = numberValue(root, child.$value, path.join('/'));
        } else if (radiusNames[key]) {
          radius[radiusNames[key]] = numberValue(root, child.$value, path.join('/'));
        }
      } else {
        walk(child, path);
      }
    }
  }

  walk(root, []);
  return { space, radius };
}

const TYPOGRAPHY_GROUPS = ['body', 'heading'] as const;

function importTypographyFile(root: DtcgNode) {
  const family: Record<string, string> = {};
  const weight: Record<string, number> = {};
  const styles: Record<
    string,
    { fontSize: number; lineHeight: number; letterSpacing: number; fontWeight: number }
  > = {};

  const font = root.font as DtcgNode | undefined;
  for (const [key, child] of children((font?.family ?? {}) as DtcgNode)) {
    const resolved = resolveValue(root, isLeaf(child) ? child.$value : undefined);
    if (typeof resolved === 'string') {
      family[key] = resolved;
    }
  }
  for (const [key, child] of children((font?.weight ?? {}) as DtcgNode)) {
    if (isLeaf(child)) {
      weight[key] = numberValue(root, child.$value, `font/weight/${key}`);
    }
  }

  function collectStyle(node: DtcgNode, styleKey: string) {
    function read(property: string) {
      const leaf = node[property];
      if (!isLeaf(leaf)) {
        throw new Error(`Style ${styleKey} is missing ${property}`);
      }
      return leaf.$value;
    }
    const fontSize = numberValue(root, read('fontSize'), styleKey);
    const lineHeight = numberValue(root, read('lineHeight'), styleKey);
    const fontWeight = numberValue(root, read('fontWeight'), styleKey);
    const letterSpacingRaw = resolveValue(root, read('letterSpacing'));
    let percent: number;
    if (typeof letterSpacingRaw === 'number') {
      percent = letterSpacingRaw;
    } else if (
      typeof letterSpacingRaw === 'object' &&
      letterSpacingRaw !== null &&
      typeof (letterSpacingRaw as { value?: unknown }).value === 'number'
    ) {
      percent = (letterSpacingRaw as { value: number }).value;
    } else {
      throw new Error(`Style ${styleKey} has non-numeric letterSpacing`);
    }
    styles[styleKey] = {
      fontSize,
      lineHeight,
      letterSpacing: Number((percent / 100).toFixed(5)),
      fontWeight,
    };
  }

  for (const group of TYPOGRAPHY_GROUPS) {
    const groupNode = root[group] as DtcgNode | undefined;
    if (!groupNode) {
      continue;
    }
    for (const [size, sizeNode] of children(groupNode)) {
      collectStyle(sizeNode, `${group}-${size}`);
      const strong = sizeNode.strong as DtcgNode | undefined;
      if (strong && !isLeaf(strong)) {
        collectStyle(strong, `${group}-${size}-strong`);
      }
    }
  }

  return { family, weight, styles };
}

async function collectExportFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectExportFiles(fullPath)));
    } else if (entry.name.endsWith('.tokens.json')) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

async function writeTokenFile(relativePath: string, data: unknown) {
  const filePath = path.join(TOKENS_DIR, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`wrote ${relativePath}`);
}

export { importColorFile, importSizingFile, importTypographyFile };

async function main() {
  const directory = process.argv[2];
  if (!directory) {
    throw new Error('Usage: pnpm tokens:import <dir>');
  }
  const files = await collectExportFiles(path.resolve(directory));
  if (files.length === 0) {
    throw new Error(`No *.tokens.json files found in ${directory}`);
  }

  for (const file of files) {
    const root = JSON.parse(await readFile(file, 'utf8')) as DtcgNode;
    const extensions = root.$extensions as { 'com.figma.modeName'?: string } | undefined;
    const mode = extensions?.['com.figma.modeName'];
    if (!mode) {
      throw new Error(`${path.basename(file)}: missing $extensions["com.figma.modeName"]`);
    }
    if (COLOR_MODE_FILES[mode]) {
      await writeTokenFile(COLOR_MODE_FILES[mode], importColorFile(root));
    } else if (mode === 'Default') {
      await writeTokenFile('sizing.json', importSizingFile(root));
    } else if (mode === 'Mode 1') {
      await writeTokenFile('typography.json', importTypographyFile(root));
    } else {
      throw new Error(`${path.basename(file)}: unknown mode name "${mode}"`);
    }
  }
}

const invokedAsScript =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (invokedAsScript) {
  await main();
}
