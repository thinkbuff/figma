# @thinkbuff/figma-react

A React UI component library for creating Figma plugins and widgets.

## Installation

```bash
pnpm add @thinkbuff/figma-react
```

The components are styled with Tailwind CSS v4, which is required as a peer dependency. The theme package ships as a regular dependency — no separate install needed.

```bash
pnpm add tailwindcss @tailwindcss/vite -D
```

## Vite Config

Set up your `vite.config.ts` file with the Tailwind CSS plugin.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## CSS Setup

Create a CSS entry file that imports Tailwind and the component library styles. The published `styles.css` includes the theme CSS and an `@source` directive pointing at the built components, so every utility class the components use is generated in your bundle.

```css
/* styles.css */
@import 'tailwindcss';
@import '@thinkbuff/figma-react/styles.css';
```

Import it once in your main entry:

```ts
// main.ts
import './styles.css';
```

## Theming

The theme is scoped by a class on `html`: `figma-light` (the default when no class is set), `figma-dark`, or `figjam`. `dark:` variants follow `.figma-dark`.

```ts
// e.g. follow the plugin UI theme
document.documentElement.className = 'figma-dark';
```

## Usage

```tsx
import { TooltipProvider, Tooltip } from '@thinkbuff/figma-react/tooltip';

<TooltipProvider>
  <Tooltip>
    <ActionIcon>
      <MyIcon />
    </ActionIcon>
  </Tooltip>
</TooltipProvider>
```

## License

[MIT](./LICENSE) — third-party attributions are listed in [NOTICE.md](./NOTICE.md).
