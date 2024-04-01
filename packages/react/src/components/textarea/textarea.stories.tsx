import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'border'],
      table: {
        defaultValue: { summary: 'border' },
      },
    },
    invalid: {
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    variant: 'default',
    invalid: false,
    disabled: false,
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Border: Story = {
  args: {
    variant: 'border',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export default meta;
