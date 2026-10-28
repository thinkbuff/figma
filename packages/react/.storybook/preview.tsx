import type { Preview } from '@storybook/react-vite';

// @ts-ignore -- wildcard css declaration lives in tests/test-utils/styles.d.ts
import '../tests/test-utils/styles.css';
// @ts-ignore -- wildcard css declaration lives in tests/test-utils/styles.d.ts
import './preview.css';

const themes = [
  { value: 'figma-light', title: 'Figma (Light)', classes: ['figma-light'] },
  { value: 'figma-dark', title: 'Figma (Dark)', classes: ['figma-dark'] },
  { value: 'figjam', title: 'FigJam (Light)', classes: ['figjam'] },
  { value: 'figjam-dark', title: 'FigJam (Dark)', classes: ['figjam', 'figma-dark'] },
  { value: 'devmode', title: 'Dev Mode (Light)', classes: ['devmode'] },
  { value: 'devmode-dark', title: 'Dev Mode (Dark)', classes: ['devmode', 'figma-dark'] },
  { value: 'slides', title: 'Slides (Light)', classes: ['slides'] },
  { value: 'slides-dark', title: 'Slides (Dark)', classes: ['slides', 'figma-dark'] },
] as const;

const ALL_THEME_CLASSES = [...new Set(themes.flatMap(({ classes }) => classes))];

type Theme = (typeof themes)[number]['value'];

function setTheme(theme: Theme) {
  const selected = themes.find(({ value }) => value === theme);
  document.documentElement.classList.remove(...ALL_THEME_CLASSES);
  document.documentElement.classList.add(...(selected?.classes ?? []));
}

const preview: Preview = {
  globalTypes: {
    theme: {
      defaultValue: 'figma-light',
      toolbar: {
        icon: 'mirror',
        items: [...themes],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ['render'],
    },
    docs: {
      toc: true,
      story: {
        inline: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      setTheme(theme);
      return <Story />;
    },
  ],
};

export default preview;
