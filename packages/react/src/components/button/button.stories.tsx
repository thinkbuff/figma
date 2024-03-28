import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'outline', 'ghost', 'link'],
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    disabled: false,
  },
  render: args => <Button {...args}>Label</Button>,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
  },
};

export default meta;
