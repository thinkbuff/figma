import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';

const modules = import.meta.glob('../../src/components/**/*.stories.tsx', { eager: true });

const themes = ['figma-light', 'figma-dark', 'figjam'] as const;

type StoryEntry = {
  component: ReturnType<typeof composeStories>[string];
  id: string;
};

const stories: StoryEntry[] = [];
for (const mod of Object.values(modules)) {
  const module = mod as { default: Meta };
  const composed = composeStories(module);
  for (const [exportName, component] of Object.entries(composed)) {
    const id = `${module.default.title}-${exportName}`.replaceAll(/[^a-zA-Z0-9-_]+/g, '-');
    stories.push({ component, id });
  }
}

async function shot(name: string) {
  await document.fonts.ready;
  await expect(page).toMatchScreenshot(name, {
    comparatorName: 'pixelmatch',
    comparatorOptions: { allowedMismatchedPixelRatio: 0.001, threshold: 0.2 },
  });
}

for (const story of stories) {
  describe(story.id, () => {
    for (const theme of themes) {
      it(theme, async () => {
        await render(<story.component />);
        // the preview decorator already applied globals.theme; pin the
        // requested theme on <html> after render so it always wins
        document.documentElement.classList.remove(...themes);
        document.documentElement.classList.add(theme);
        await shot(`${story.id}-${theme}`);
      });
    }
  });
}
