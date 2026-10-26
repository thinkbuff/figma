import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';

const modules = import.meta.glob('../../src/components/**/*.stories.tsx', { eager: true });

export const themes = ['figma-light', 'figma-dark', 'figjam'] as const;

export type StoryEntry = {
  component: ReturnType<typeof composeStories>[string];
  id: string;
};

export const stories: StoryEntry[] = [];
for (const mod of Object.values(modules)) {
  const module = mod as { default: Meta };
  const composed = composeStories(module);
  for (const [exportName, component] of Object.entries(composed)) {
    const id = `${module.default.title}-${exportName}`.replaceAll(/[^a-zA-Z0-9-_]+/g, '-');
    stories.push({ component, id });
  }
}
