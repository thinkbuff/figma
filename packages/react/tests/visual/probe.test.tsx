import { describe, expect, it } from 'vitest';

import { renderStory, stories, themes } from './stories';

// Dump computed styles for a story instead of comparing screenshots.
// Usage: VRT_PROBE="Components-Button-Default" pnpm -F @thinkbuff/figma-react probe
const filter = (import.meta.env.VRT_PROBE ?? '').toLowerCase();
const matched = stories.filter((story) => story.id.toLowerCase().includes(filter));

const cssProps = [
  'display',
  'position',
  'width',
  'height',
  'padding',
  'margin',
  'font-size',
  'line-height',
  'font-weight',
  'letter-spacing',
  'color',
  'background-color',
  'border',
  'border-radius',
  'outline',
  'box-shadow',
  'fill',
  'stroke',
] as const;

function dump(el: Element, depth: number, lines: string[]) {
  const style = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const className = (el.getAttribute('class') ?? '').trim().replaceAll(/\s+/g, ' .');
  const scroll = `scroll:${el.scrollLeft.toFixed(1)},${el.scrollTop.toFixed(1)} left:${rect.left.toFixed(1)}`;
  lines.push(
    `${'  '.repeat(depth)}<${el.tagName.toLowerCase()}> .${className} ${rect.width.toFixed(1)}x${rect.height.toFixed(1)} ${scroll}`,
  );
  const props = cssProps.map((prop) => `${prop}:${style.getPropertyValue(prop)}`).join(' ');
  lines.push(`${'  '.repeat(depth + 1)}${props}`);
  for (const child of el.children) {
    dump(child, depth + 1, lines);
  }
}

for (const story of matched) {
  describe(story.id, () => {
    for (const theme of themes) {
      it(theme, async () => {
        const { container } = await renderStory(story);
        document.documentElement.classList.remove(...themes);
        document.documentElement.classList.add(theme);
        await document.fonts.ready;
        const lines: string[] = [];
        const activeEl = document.activeElement;
        if (activeEl && activeEl !== document.body) {
          lines.push(
            `activeElement: <${activeEl.tagName.toLowerCase()}> .${(activeEl.getAttribute('class') ?? '').trim()}`,
          );
        }
        for (const child of container.children) {
          dump(child, 0, lines);
        }
        expect(lines.length).toBeGreaterThan(0);
        console.log(`[${story.id} | ${theme}]\n${lines.join('\n')}\n`);
      });
    }
  });
}

it.runIf(matched.length === 0)('probe usage', () => {
  expect.unreachable(
    `No stories matched VRT_PROBE="${filter}" (${stories.length} stories collected).\n` +
      'usage: VRT_PROBE="<story id substring>" pnpm -F @thinkbuff/figma-react probe',
  );
});
