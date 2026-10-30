import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { render } from 'vitest-browser-react';

const modules = import.meta.glob('../../src/**/*.stories.tsx', { eager: true });

export const themes = {
  'figma-light': ['figma-light'],
  'figma-dark': ['figma-dark'],
  figjam: ['figjam'],
  'figjam-dark': ['figjam', 'figma-dark'],
} as const;

export const allThemeClasses = Object.values(themes).flat();

export type StoryEntry = {
  component: ComponentType;
  id: string;
  layout: string;
};

function kebab(value: string) {
  return value
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll(/[^a-zA-Z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '')
    .toLowerCase();
}

export const stories: StoryEntry[] = [];
for (const mod of Object.values(modules)) {
  const module = mod as { default: Meta };
  const composed = composeStories(module);
  for (const [exportName, component] of Object.entries(composed)) {
    const layout =
      (component as unknown as { parameters?: Record<string, unknown> }).parameters?.layout ??
      module.default.parameters?.layout ??
      'default';
    stories.push({
      component: component as ComponentType,
      id: kebab(`${module.default.title}-${exportName}`),
      layout,
    });
  }
}

// honor the storybook `layout: 'centered'` parameter, which the composed
// story does not apply on its own
export function renderStory(story: StoryEntry) {
  const element = <story.component />;
  return render(
    story.layout === 'centered' ? (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        {element}
      </div>
    ) : (
      element
    ),
  );
}
