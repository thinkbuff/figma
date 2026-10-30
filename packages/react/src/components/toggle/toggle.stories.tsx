import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Toggle } from './toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'highlighted', 'secondary'],
      table: {
        defaultValue: { summary: 'highlighted' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    disabled: false,
    pressed: false,
  },
  render: function Render(args) {
    const [{ pressed }, updateArgs] = useArgs();
    return (
      <Toggle
        {...args}
        pressed={pressed}
        onPressedChange={(value) => updateArgs({ pressed: value })}
      >
        <span className="icon-[tabler--dots] size-4"></span>
      </Toggle>
    );
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
  args: {
    pressed: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const IconSwap: Story = {
  args: {
    variant: 'default',
    pressed: true,
  },
};

export const WithStroke: Story = {
  args: {
    variant: 'secondary',
  },
};

export const WithStrokePressed: Story = {
  args: {
    variant: 'secondary',
    pressed: true,
  },
};

export default meta;
