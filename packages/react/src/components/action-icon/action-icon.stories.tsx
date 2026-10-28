import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionIcon } from './action-icon';

const meta = {
  title: 'Components/ActionIcon',
  component: ActionIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      table: {
        defaultValue: { summary: 'small' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'secondary'],
      table: {
        defaultValue: { summary: 'default' },
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
    'aria-label': 'Add',
  },
  render: (args) => (
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
        ></path>
      </svg>
    </ActionIcon>
  ),
} satisfies Meta<typeof ActionIcon>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded = {
  argTypes: {
    'aria-expanded': {
      control: 'boolean',
    },
  },
  args: {
    'aria-expanded': true,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryExpanded = {
  argTypes: {
    'aria-expanded': {
      control: 'boolean',
    },
  },
  args: {
    'aria-expanded': true,
    variant: 'secondary',
  },
};

export default meta;
