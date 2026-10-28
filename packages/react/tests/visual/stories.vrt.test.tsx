import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';

import { allThemeClasses, renderStory, stories, themes } from './stories';

async function shot(name: string) {
  await document.fonts.ready;
  await expect(page).toMatchScreenshot(name, {
    comparatorName: 'pixelmatch',
    comparatorOptions: { allowedMismatchedPixels: 0, threshold: 0.2 },
  });
}

for (const story of stories) {
  describe(String(story.id), () => {
    for (const [theme, classes] of Object.entries(themes)) {
      it(String(theme), async () => {
        expect.hasAssertions();
        await renderStory(story);
        // the preview decorator already applied globals.theme; pin the
        // requested theme on <html> after render so it always wins
        document.documentElement.classList.remove(...allThemeClasses);
        document.documentElement.classList.add(...classes);
        await shot(`${story.id}-${theme}`);
      });
    }
  });
}
