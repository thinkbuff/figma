import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import * as Select from './select';

type StoryArgs = React.ComponentPropsWithRef<typeof Select.Content> & {
  disabled?: boolean;
  value?: string | null;
};

const optionWithIconItems: Record<string, React.ReactNode> = {
  none: (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--circle-dot] size-3.5"></span>
      None
    </div>
  ),
  'navigate-to': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--arrow-right] size-3.5"></span>
      Navigate to
    </div>
  ),
  'change-to': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--refresh] size-3.5"></span>
      Change to
    </div>
  ),
  back: (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--arrow-back-up] size-3.5"></span>
      Back
    </div>
  ),
  'set-variable': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--settings-2] size-3.5"></span>
      Set variable
    </div>
  ),
  conditional: (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--arrows-split-2] size-3.5"></span>
      Conditional
    </div>
  ),
  'scroll-to': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--arrow-move-down] size-3.5"></span>
      Scroll to
    </div>
  ),
  'open-link': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--link] size-3.5"></span>
      Open link
    </div>
  ),
  'open-overlay': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--square-half] size-3.5"></span>
      Open overlay
    </div>
  ),
  'swap-overlay': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--replace] size-3.5"></span>
      Swap overlay
    </div>
  ),
  'close-overlay': (
    <div className="flex items-center gap-2">
      <span className="icon-[tabler--square-x] size-3.5"></span>
      Close overlay
    </div>
  ),
};

const meta: Meta = {
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
    alignItemWithTrigger: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    withArrow: {
      if: { arg: 'alignItemWithTrigger', truthy: false },
      control: 'boolean',
    },
    side: {
      if: { arg: 'alignItemWithTrigger', truthy: false },
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        defaultValue: {
          summary: 'top',
          detail:
            'The preferred side of the anchor to render against when open. Only available when alignItemWithTrigger is false.',
        },
      },
    },
    sideOffset: {
      if: { arg: 'alignItemWithTrigger', truthy: false },
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number',
          detail:
            'The distance in pixels from the anchor. Only available when alignItemWithTrigger is false.',
        },
      },
    },
    align: {
      if: { arg: 'alignItemWithTrigger', truthy: false },
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'center' },
        type: {
          summary: 'enum',
          detail:
            'The preferred alignment against the anchor. May change when collisions occur. Only available when alignItemWithTrigger is false.',
        },
      },
    },
    alignOffset: {
      if: { arg: 'alignItemWithTrigger', truthy: false },
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number',
          detail:
            'An offset in pixels from the "start" or "end" alignment options. Only available when alignItemWithTrigger is false.',
        },
      },
    },
  },
  args: {
    disabled: false,
    alignItemWithTrigger: true,
    side: 'top',
    sideOffset: 4,
    align: 'center',
    alignOffset: 0,
    withArrow: true,
  },
  decorators: [
    (Story) => (
      <div className="w-40 p-2">
        <Story />
      </div>
    ),
  ],
  render: function Render({ disabled, ...props }) {
    const [args, updateArgs] = useArgs();

    return (
      <Select.Root
        items={{ blue: 'Blue', red: 'Red', green: 'Green' }}
        disabled={disabled}
        value={args.value}
        onValueChange={(value) => updateArgs({ value })}
      >
        <Select.Trigger
          disabled={disabled}
          placeholder="Select. color"
        />
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
    alignItemWithTrigger: false,
    align: 'center',
  },
};

export const Placeholder: Story = {
  args: {
    value: null,
  },
};

export const CustomTrigger: Story = {
  args: {
    value: 'normal',
  },
  render: function Render({ disabled, ...props }) {
    const [args, updateArgs] = useArgs();

    return (
      <Select.Root
        items={{
          'pass-through': 'Pass through',
          normal: 'Normal',
          darken: 'Darken',
          multiply: 'Multiply',
          'plus-darker': 'Plus darker',
          'color-burn': 'Color burn',
          lighten: 'Lighten',
          screen: 'Screen',
          'plus-lighter': 'Plus lighter',
          'color-dodge': 'Color dodge',
          overlay: 'Overlay',
          'soft-light': 'Soft light',
          'hard-light': 'Hard light',
          difference: 'Difference',
          exclusion: 'Exclusion',
          hue: 'Hue',
          saturation: 'Saturation',
          color: 'Color',
          luminosity: 'Luminosity',
          contrast: 'Contrast',
          invert: 'Invert',
        }}
        disabled={disabled}
        value={args.value}
        onValueChange={(value) => updateArgs({ value })}
      >
        <Select.Trigger disabled={disabled}>
          <span className="icon-[tabler--droplet] h-3 w-8 text-figma-secondary -ml-2"></span>
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
  render: function Render({ disabled, ...props }) {
    const [args, updateArgs] = useArgs();

    return (
      <Select.Root
        items={{
          text: 'Text',
          'fill-width': 'Fill weight',
          width: 'Width',
          height: 'Height',
          gap: 'Gap',
          'horizontal-padding': 'Horizontal padding',
          'vertical-padding': 'Vertical padding',
          'stroke-width': 'Stroke weight',
          'corner-radius': 'Corner radius',
        }}
        disabled={disabled}
        value={args.value}
        onValueChange={(value) => updateArgs({ value })}
      >
        <Select.Trigger
          disabled={disabled}
          placeholder="Select. an option"
        />
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
            <Select.Item value="horizontal-padding">Horizontal padding</Select.Item>
            <Select.Item value="vertical-padding">Vertical padding</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Item
              value="fill-width"
              disabled
            >
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
  render: function Render({ disabled, ...props }) {
    const [args, updateArgs] = useArgs();

    return (
      <Select.Root
        items={optionWithIconItems}
        disabled={disabled}
        value={args.value}
        onValueChange={(value) => updateArgs({ value })}
      >
        <Select.Trigger
          disabled={disabled}
          placeholder="Select. an option"
        />
        <Select.Content {...props}>
          <Select.Group>
            <Select.Item value="none">{optionWithIconItems['none']}</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="navigate-to">{optionWithIconItems['navigate-to']}</Select.Item>
            <Select.Item
              value="change-to"
              disabled
            >
              {optionWithIconItems['change-to']}
            </Select.Item>
            <Select.Item value="back">{optionWithIconItems['back']}</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="set-variable">{optionWithIconItems['set-variable']}</Select.Item>
            <Select.Item value="conditional">{optionWithIconItems['conditional']}</Select.Item>
            <Select.Item value="scroll-to">{optionWithIconItems['scroll-to']}</Select.Item>
            <Select.Item value="open-link">{optionWithIconItems['open-link']}</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Item value="open-overlay">{optionWithIconItems['open-overlay']}</Select.Item>
            <Select.Item value="swap-overlay">{optionWithIconItems['swap-overlay']}</Select.Item>
            <Select.Item value="close-overlay">{optionWithIconItems['close-overlay']}</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  },
};

export default meta;
