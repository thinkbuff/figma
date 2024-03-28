import React from 'react';
import type { Preview } from '@storybook/react';
import 'virtual:uno.css';
import './preview.css';

const themes = [
  { value: 'figma-light', title: 'Figma (Light)' },
  { value: 'figma-dark', title: 'Figma (Dark)' },
  { value: 'figjam', title: 'FigJam' },
] as const;

type Theme = typeof themes[number]['value'];

function setTheme(theme: Theme) {
  for (const theme of themes) {
    document.documentElement.classList.remove(theme.value);
  }
  document.documentElement.classList.add(theme);
}

const preview: Preview = {
  globalTypes: {
    theme: {
      defaultValue: 'figma-light',
      toolbar: {
        icon: 'mirror',
        items: themes,
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
      exclude: ['asChild'],
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
