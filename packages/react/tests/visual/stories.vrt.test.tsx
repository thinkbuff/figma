import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { stories, themes } from './stories';

async function shot(name: string) {
  await document.fonts.ready;
  await expect(page).toMatchScreenshot(name, {
    comparatorName: 'pixelmatch',
    comparatorOptions: { allowedMismatchedPixels: 0, threshold: 0.2 },
  });
}

for (const story of stories) {
  describe(String(story.id), () => {
    for (const theme of themes) {
      it(String(theme), async () => {
        expect.hasAssertions();
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
