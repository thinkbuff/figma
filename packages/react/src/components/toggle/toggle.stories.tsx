import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Toggle } from './toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
  render: (args) => {
    const [{ pressed }, updateArgs] = useArgs();
    return (
      <Toggle
        {...args}
        pressed={pressed}
        onPressedChange={value => updateArgs({ pressed: value })}
      >
        <span className="i-tabler-dots size-4"></span>
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

export default meta;
