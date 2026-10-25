import { composeStory } from '@storybook/react-vite';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import * as alertDialogStories from '../../src/components/alert-dialog/alert-dialog.stories';
import * as dialogStories from '../../src/components/dialog/dialog.stories';
import * as dropdownMenuStories from '../../src/components/dropdown-menu/dropdown-menu.stories';
import * as popoverStories from '../../src/components/popover/popover.stories';
import * as selectStories from '../../src/components/select/select.stories';
import * as sheetStories from '../../src/components/sheet/sheet.stories';
import * as tooltipStories from '../../src/components/tooltip/tooltip.stories';

const themes = ['figma-light', 'figma-dark', 'figjam'] as const;

type StoriesModule = { default: unknown } & Record<string, unknown>;
type StoryComponent = ReturnType<typeof composeStory>;

// the overlay stories drive their `open` prop through useArgs, so forced-open
// args render the open state statically — no interaction needed
function openOverlay(
  module: StoriesModule,
  exportName = 'Default',
  args: Record<string, unknown> = {},
) {
  const story = module[exportName] as { args?: Record<string, unknown> };
  return composeStory(
    { ...story, args: { ...story.args, ...args } } as never,
    module.default as never,
  );
}

const overlays: Record<string, { story: StoryComponent; open: () => Promise<void> }> = {
  dialog: {
    story: openOverlay(dialogStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByRole('dialog')).toBeVisible();
    },
  },
  'alert-dialog': {
    story: openOverlay(alertDialogStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByRole('alertdialog')).toBeVisible();
    },
  },
  sheet: {
    story: openOverlay(sheetStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByRole('dialog')).toBeVisible();
    },
  },
  popover: {
    story: openOverlay(popoverStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByText('Dimensions')).toBeVisible();
    },
  },
  'dropdown-menu': {
    story: openOverlay(dropdownMenuStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByRole('menu')).toBeVisible();
    },
  },
  'dropdown-menu-submenu': {
    story: openOverlay(dropdownMenuStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByRole('menu')).toBeVisible();
      await userEvent.hover(page.getByRole('menuitem', { name: 'More Tools' }));
      await expect.element(page.getByRole('menuitem', { name: /Save Page As/ })).toBeVisible();
    },
  },
  select: {
    story: openOverlay(selectStories),
    open: async () => {
      await userEvent.click(page.getByRole('combobox'));
      await expect.element(page.getByRole('listbox')).toBeVisible();
    },
  },
  tooltip: {
    story: openOverlay(tooltipStories, 'Default', { open: true }),
    open: async () => {
      await expect.element(page.getByText('Open settings')).toBeVisible();
    },
  },
};

for (const [name, { story: Story, open }] of Object.entries(overlays)) {
  describe(String(name), () => {
    for (const theme of themes) {
      it(String(theme), async () => {
        await render(<Story />);
        document.documentElement.classList.remove(...themes);
        document.documentElement.classList.add(theme);
        await open();
        await document.fonts.ready;
        await expect(page).toMatchScreenshot(`${name}-open-${theme}`, {
          comparatorName: 'pixelmatch',
          comparatorOptions: { allowedMismatchedPixelRatio: 0.001, threshold: 0.2 },
        });
      });
    }
  });
}
