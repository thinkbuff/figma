import { useEffect, useState } from 'react';

import { FigmaIcon } from '@thinkbuff/figma-react';
import { ScrollArea } from '@thinkbuff/figma-react/scroll-area';
import { Select } from '@thinkbuff/figma-react/select';
import { Toaster } from '@thinkbuff/figma-react/toast';

import { Section } from './demo';
import { ActionIcons, Buttons, TabsDemo, Toggles } from './sections/actions';
import { Checks, Radios } from './sections/choices';
import { Avatars, Badges, Feedback, Icons, Scroll } from './sections/display';
import { Inputs, Selects, ValueFields } from './sections/fields';
import { Dialogs, Menus, Popovers } from './sections/overlays';
import { Sliders, Swatches } from './sections/sliders';

const THEMES = {
  'figma-light': 'Figma light',
  'figma-dark': 'Figma dark',
  figjam: 'FigJam light',
  'figjam-dark': 'FigJam dark',
  devmode: 'Dev Mode light',
  'devmode-dark': 'Dev Mode dark',
  slides: 'Slides light',
  'slides-dark': 'Slides dark',
} as const;

type Theme = keyof typeof THEMES;

const THEME_CLASSES: Record<Theme, string[]> = {
  'figma-light': ['figma-light'],
  'figma-dark': ['figma-dark'],
  figjam: ['figjam'],
  'figjam-dark': ['figjam', 'figma-dark'],
  devmode: ['devmode'],
  'devmode-dark': ['devmode', 'figma-dark'],
  slides: ['slides'],
  'slides-dark': ['slides', 'figma-dark'],
};

const ALL_THEME_CLASSES = [...new Set(Object.values(THEME_CLASSES).flat())];

const SECTIONS = [
  { id: 'button', title: 'Button', render: <Buttons /> },
  { id: 'action-icon', title: 'Action icon', render: <ActionIcons /> },
  { id: 'toggle', title: 'Toggle', render: <Toggles /> },
  { id: 'tabs', title: 'Tabs', render: <TabsDemo /> },
  { id: 'input', title: 'Input', render: <Inputs /> },
  { id: 'select', title: 'Select', render: <Selects /> },
  { id: 'value-field', title: 'Value field', render: <ValueFields /> },
  { id: 'slider', title: 'Slider', render: <Sliders /> },
  { id: 'swatch', title: 'Swatch', render: <Swatches /> },
  { id: 'checkbox', title: 'Checkbox & switch', render: <Checks /> },
  { id: 'radio', title: 'Radio', render: <Radios /> },
  { id: 'menu', title: 'Menu', render: <Menus /> },
  { id: 'dialog', title: 'Dialog', render: <Dialogs /> },
  { id: 'popover', title: 'Popover & tooltip', render: <Popovers /> },
  { id: 'toast', title: 'Toast & visual bell', render: <Feedback /> },
  { id: 'avatar', title: 'Avatar', render: <Avatars /> },
  { id: 'badge', title: 'Badge', render: <Badges /> },
  { id: 'scroll-area', title: 'Scroll area', render: <Scroll /> },
  { id: 'icons', title: 'Icons', render: <Icons /> },
] as const;

function initialTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'figma-dark' : 'figma-light';
}

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.remove(...ALL_THEME_CLASSES);
    document.documentElement.classList.add(...THEME_CLASSES[theme]);
  }, [theme]);

  return (
    <div className="flex h-screen flex-col bg-figma text-figma">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-figma px-4">
        <div className="flex items-center gap-2">
          <FigmaIcon size="4" />
          <h1 className="font-figma-strong text-figma-body-large">figma-react playground</h1>
        </div>
        <Select.Root
          items={THEMES}
          value={theme}
          onValueChange={(value) => setTheme(value as Theme)}
        >
          <Select.Trigger
            aria-label="Theme"
            className="w-36"
          />
          <Select.Content
            alignItemWithTrigger={false}
            side="bottom"
          >
            {Object.keys(THEMES).map((value) => (
              <Select.Item
                key={value}
                value={value}
              >
                {THEMES[value as Theme]}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </header>
      <div className="flex min-h-0 flex-1">
        <ScrollArea className="w-40 shrink-0 border-r border-figma">
          <nav className="flex flex-col gap-0.5 p-3">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-figma-md px-2 py-1 text-figma-secondary hover:bg-figma-secondary hover:text-figma"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ScrollArea>
        <ScrollArea className="min-w-0 flex-1">
          <main className="flex max-w-3xl flex-col gap-6 p-6">
            {SECTIONS.map((section) => (
              <Section
                key={section.id}
                id={section.id}
                title={section.title}
              >
                {section.render}
              </Section>
            ))}
          </main>
        </ScrollArea>
      </div>
      <Toaster />
    </div>
  );
}
