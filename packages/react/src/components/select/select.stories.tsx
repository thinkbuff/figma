import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import {
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from './select';

type StoryArgs = React.ComponentPropsWithoutRef<typeof SelectContent> &
  Pick<
    React.ComponentProps<typeof SelectTrigger>,
    | 'disabled'
    | 'value'
  >;

const meta = {
  title: 'Components/Select',
  component: SelectContent,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
      },
    },
    value: {
      control: 'text',
    },
    position: {
      control: 'inline-radio',
      options: ['item-aligned', 'popper'],
      table: {
        defaultValue: { summary: 'item-aligned' },
        type: {
          summary: 'enum',
        },
      },
    },
    withArrow: {
      if: { arg: 'position', eq: 'popper' },
      control: 'boolean',
    },
    side: {
      if: { arg: 'position', eq: 'popper' },
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        defaultValue: {
          summary: 'top',
          detail:
            'The preferred side of the anchor to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled. Only available when position is set to popper.',
        },
      },
    },
    sideOffset: {
      if: { arg: 'position', eq: 'popper' },
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number',
          detail: 'The distance in pixels from the anchor. Only available when position is set to popper.',
        },
      },
    },
    align: {
      if: { arg: 'position', eq: 'popper' },
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'center' },
        type: {
          summary: 'enum',
          detail: 'The preferred alignment against the anchor. May change when collisions occur. Only available when position is set to popper.',
        },
      },
    },
    alignOffset: {
      if: { arg: 'position', eq: 'popper' },
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number',
          detail:
            'An offset in pixels from the "start" or "end" alignment options. Only available when position is set to popper.',
        },
      },
    },
    avoidCollisions: {
      if: { arg: 'position', eq: 'popper' },
      table: {
        type: {
          summary: 'boolean',
          detail:
            'When true, overrides the side andalign preferences to prevent collisions with boundary edges. Only available when position is set to popper.',
        },
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    disabled: false,
    position: 'item-aligned',
    side: 'top',
    sideOffset: 4,
    align: 'center',
    alignOffset: 0,
    avoidCollisions: true,
    withArrow: true,
  },
  decorators: [
    Story => (
      <div className="w-40 p-2">
        <Story />
      </div>
    ),
  ],
  render: ({ disabled, ...props }) => {
    const [args, updateArgs] = useArgs();

    return (
      <SelectRoot
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <SelectTrigger disabled={disabled} placeholder="Select color" />
        <SelectContent {...props}>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="green">Green</SelectItem>
        </SelectContent>
      </SelectRoot>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'blue',
  },
};

export const Popover: Story = {
  args: {
    value: 'blue',
    position: 'popper',
    align: 'center',
  },
};

export const Placeholder: Story = {
  args: {
    value: '',
  },
};

export const CustomTrigger: Story = {
  args: {
    value: 'normal',
  },
  render: ({ disabled, ...props }) => {
    const [args, updateArgs] = useArgs();

    return (
      <SelectRoot
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <SelectTrigger disabled={disabled}>
          <span className="i-tabler-droplet h-3 w-8 text-figma-secondary -ml-2"></span>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent {...props}>
          <SelectGroup>
            <SelectItem value="pass-through">Pass through</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem value="darken">Darken</SelectItem>
            <SelectItem value="multiply">Multiply</SelectItem>
            <SelectItem value="plus-darker">Plus darker</SelectItem>
            <SelectItem value="color-burn">Color burn</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem value="lighten">Lighten</SelectItem>
            <SelectItem value="screen">Screen</SelectItem>
            <SelectItem value="plus-lighter">Plus lighter</SelectItem>
            <SelectItem value="color-dodge">Color dodge</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem value="overlay">Overlay</SelectItem>
            <SelectItem value="soft-light">Soft light</SelectItem>
            <SelectItem value="hard-light">Hard light</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem value="difference">Difference</SelectItem>
            <SelectItem value="exclusion">Exclusion</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem value="hue">Hue</SelectItem>
            <SelectItem value="saturation">Saturation</SelectItem>
            <SelectItem value="color">Color</SelectItem>
            <SelectItem value="luminosity">Luminosity</SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem value="contrast">Contrast</SelectItem>
            <SelectItem value="invert">Invert</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};

export const WithLabel: Story = {
  args: {
    value: 'text',
  },
  render: ({ disabled, ...props }) => {
    const [args, updateArgs] = useArgs();

    return (
      <SelectRoot
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <SelectTrigger disabled={disabled} placeholder="Select an option" />
        <SelectContent {...props}>
          <SelectGroup>
            <SelectLabel>String</SelectLabel>
            <SelectItem value="text">Text</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Sizing</SelectLabel>
            <SelectItem value="width">Width</SelectItem>
            <SelectItem value="height">Height</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Auto Layout</SelectLabel>
            <SelectItem value="gap">Gap</SelectItem>
            <SelectItem value="horizontal-padding">
              Horizontal padding
            </SelectItem>
            <SelectItem value="vertical-padding">Vertical padding</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectItem value="fill-width" disabled>
              Fill weight
            </SelectItem>
            <SelectItem value="stroke-width">Stroke weight</SelectItem>
            <SelectItem value="corner-radius">Corner radius</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};

export const OptionWithIcon: Story = {
  args: {
    value: 'back',
  },
  render: ({ disabled, ...props }) => {
    const [args, updateArgs] = useArgs();

    return (
      <SelectRoot
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <SelectTrigger disabled={disabled} placeholder="Select an option" />
        <SelectContent {...props}>
          <SelectGroup>
            <SelectItem asChild value="none">
              <div className="flex items-center gap-2">
                <span className="i-tabler-circle-dot size-3.5"></span>
                None
              </div>
            </SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem asChild value="navigate-to">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrow-right size-3.5"></span>
                Navigate to
              </div>
            </SelectItem>
            <SelectItem asChild disabled value="change-to">
              <div className="flex items-center gap-2">
                <span className="i-tabler-refresh size-3.5"></span>
                Change to
              </div>
            </SelectItem>
            <SelectItem asChild value="back">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrow-back-up size-3.5"></span>
                Back
              </div>
            </SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem asChild value="set-variable">
              <div className="flex items-center gap-2">
                <span className="i-tabler-settings-2 size-3.5"></span>
                Set variable
              </div>
            </SelectItem>
            <SelectItem asChild value="conditional">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrows-split-2 size-3.5"></span>
                Conditional
              </div>
            </SelectItem>
            <SelectItem asChild value="scroll-to">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrow-move-down size-3.5"></span>
                Scroll to
              </div>
            </SelectItem>
            <SelectItem asChild value="open-link">
              <div className="flex items-center gap-2">
                <span className="i-tabler-link size-3.5"></span>
                Open link
              </div>
            </SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectItem asChild value="open-overlay">
              <div className="flex items-center gap-2">
                <span className="i-tabler-square-half size-3.5"></span>
                Open overlay
              </div>
            </SelectItem>
            <SelectItem asChild value="swap-overlay">
              <div className="flex items-center gap-2">
                <span className="i-tabler-replace size-3.5"></span>
                Swap overlay
              </div>
            </SelectItem>
            <SelectItem asChild value="close-overlay">
              <div className="flex items-center gap-2">
                <span className="i-tabler-square-x size-3.5"></span>
                Close overlay
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};

export default meta;
