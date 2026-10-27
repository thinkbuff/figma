import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    invalid: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    invalid: false,
    disabled: false,
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
