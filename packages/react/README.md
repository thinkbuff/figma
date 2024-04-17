# @thinkbuff/figma-react

A React UI component library for creating Figma plugins and widgets.

## Installation

```bash
pnpm add @thinkbuff/figma-react

```

We also rely on a few dependencies, so make sure they are also installed.

```bash
pnpm add @thinkbuff/figma-theme unocss @unocss/preset-rem-to-px unocss-preset-animations -D
```

## Vite Config

Set up your `vite.config.ts` file, by importing UnoCSS and passing it the location of the config file.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
});
```

## UnoCSS Config

Create a `unocss.config.ts` file with all the required presets and transformers.

```ts
// unocss.config.ts
import { defineConfig, presetUno, presetIcons, transformerVariantGroup } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import presetAnimations from 'unocss-preset-animations';
import { presetFigmaTheme } from '@thinkbuff/figma-theme/unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [
        'src/**/*.tsx',
        /(.*)figma-react(.*)\.(c|m)?(js)(x?)$/
      ],
    },
  },
  presets: [
    presetUno({
      dark: {
        light: '.figma-light',
        dark: '.figma-dark',
      },
    }),
    presetFigmaTheme(),
    presetAnimations(),
    presetRemToPx(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
  ],
  transformers: [transformerVariantGroup()],
});
```

Add virtual:uno.css to your main entry:

```ts
// main.ts
import 'virtual:uno.css';
```

## Usage

```tsx
import { TooltipProvider, Tooltip } from '@thinkbuff/figma-react/tooltip';

<TooltipProvider>
  <Tooltip>
    <ActionIcon>
      <span className="i-tabler-adjustments-alt size-4"></span>
    </ActionIcon>
  </Tooltip>
</TooltipProvider>
```
