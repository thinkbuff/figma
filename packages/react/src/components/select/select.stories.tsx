import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import * as Select from './select';

type StoryArgs = React.ComponentPropsWithoutRef<typeof Select.Content> &
  Pick<
    React.ComponentProps<typeof Select.Trigger>,
    | 'disabled'
    | 'value'
  >;

const meta = {
  title: 'Components/Select',
  component: Select.Content,
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
        defaultValue: { summary: 'false' },
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
        defaultValue: { summary: 'true' },
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
      <Select.Root
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <Select.Trigger disabled={disabled} placeholder="Select. color" />
        <Select.Content {...props}>
          <Select.Item value="blue">Blue</Select.Item>
          <Select.Item value="red">Red</Select.Item>
          <Select.Item value="green">Green</Select.Item>
        </Select.Content>
      </Select.Root>
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
      <Select.Root
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <Select.Trigger disabled={disabled}>
          <span className="i-tabler-droplet h-3 w-8 text-figma-secondary -ml-2"></span>
          <Select.Value placeholder="Select. an option" />
        </Select.Trigger>
        <Select.Content {...props}>
          <Select.Group>
            <Select.Item value="pass-through">Pass through</Select.Item>
            <Select.Item value="normal">Normal</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="darken">Darken</Select.Item>
            <Select.Item value="multiply">Multiply</Select.Item>
            <Select.Item value="plus-darker">Plus darker</Select.Item>
            <Select.Item value="color-burn">Color burn</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="lighten">Lighten</Select.Item>
            <Select.Item value="screen">Screen</Select.Item>
            <Select.Item value="plus-lighter">Plus lighter</Select.Item>
            <Select.Item value="color-dodge">Color dodge</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="overlay">Overlay</Select.Item>
            <Select.Item value="soft-light">Soft light</Select.Item>
            <Select.Item value="hard-light">Hard light</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="difference">Difference</Select.Item>
            <Select.Item value="exclusion">Exclusion</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="hue">Hue</Select.Item>
            <Select.Item value="saturation">Saturation</Select.Item>
            <Select.Item value="color">Color</Select.Item>
            <Select.Item value="luminosity">Luminosity</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="contrast">Contrast</Select.Item>
            <Select.Item value="invert">Invert</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
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
      <Select.Root
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <Select.Trigger disabled={disabled} placeholder="Select. an option" />
        <Select.Content {...props}>
          <Select.Group>
            <Select.Label>String</Select.Label>
            <Select.Item value="text">Text</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Sizing</Select.Label>
            <Select.Item value="width">Width</Select.Item>
            <Select.Item value="height">Height</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Auto Layout</Select.Label>
            <Select.Item value="gap">Gap</Select.Item>
            <Select.Item value="horizontal-padding">
              Horizontal padding
            </Select.Item>
            <Select.Item value="vertical-padding">Vertical padding</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Item value="fill-width" disabled>
              Fill weight
            </Select.Item>
            <Select.Item value="stroke-width">Stroke weight</Select.Item>
            <Select.Item value="corner-radius">Corner radius</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
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
      <Select.Root
        disabled={disabled}
        value={args.value}
        onValueChange={value => updateArgs({ value })}
      >
        <Select.Trigger disabled={disabled} placeholder="Select. an option" />
        <Select.Content {...props}>
          <Select.Group>
            <Select.Item asChild value="none">
              <div className="flex items-center gap-2">
                <span className="i-tabler-circle-dot size-3.5"></span>
                None
              </div>
            </Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item asChild value="navigate-to">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrow-right size-3.5"></span>
                Navigate to
              </div>
            </Select.Item>
            <Select.Item asChild disabled value="change-to">
              <div className="flex items-center gap-2">
                <span className="i-tabler-refresh size-3.5"></span>
                Change to
              </div>
            </Select.Item>
            <Select.Item asChild value="back">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrow-back-up size-3.5"></span>
                Back
              </div>
            </Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item asChild value="set-variable">
              <div className="flex items-center gap-2">
                <span className="i-tabler-settings-2 size-3.5"></span>
                Set variable
              </div>
            </Select.Item>
            <Select.Item asChild value="conditional">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrows-split-2 size-3.5"></span>
                Conditional
              </div>
            </Select.Item>
            <Select.Item asChild value="scroll-to">
              <div className="flex items-center gap-2">
                <span className="i-tabler-arrow-move-down size-3.5"></span>
                Scroll to
              </div>
            </Select.Item>
            <Select.Item asChild value="open-link">
              <div className="flex items-center gap-2">
                <span className="i-tabler-link size-3.5"></span>
                Open link
              </div>
            </Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item asChild value="open-overlay">
              <div className="flex items-center gap-2">
                <span className="i-tabler-square-half size-3.5"></span>
                Open overlay
              </div>
            </Select.Item>
            <Select.Item asChild value="swap-overlay">
              <div className="flex items-center gap-2">
                <span className="i-tabler-replace size-3.5"></span>
                Swap overlay
              </div>
            </Select.Item>
            <Select.Item asChild value="close-overlay">
              <div className="flex items-center gap-2">
                <span className="i-tabler-square-x size-3.5"></span>
                Close overlay
              </div>
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  },
};

export default meta;
