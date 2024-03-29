import type { Meta, StoryObj } from '@storybook/react';

import { ActionIcon } from './action-icon';

const meta = {
  title: 'Components/ActionIcon',
  component: ActionIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    disabled: false,
  },
  render: args => (
    <ActionIcon {...args}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          d="M5.5 5.5v-5h1v5h5v1h-5v5h-1v-5h-5v-1h5z"
        >
        </path>
      </svg>
    </ActionIcon>
  ),
} satisfies Meta<typeof ActionIcon>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDataState = {
  argTypes: {
    'data-state': {
      control: 'inline-radio',
      options: ['open', 'closed'],
    },
  },
  args: {
    'data-state': 'open',
  },
};

export default meta;
