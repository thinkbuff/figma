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
      options: ['solid', 'outline', 'link'],
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
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    disabled: false,
  },
  render: args => <Button {...args}>Figma</Button>,
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

export const WithIcon: Story = {
  render: args => (
    <Button {...args}>
      <svg
        className="mr-1"
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M3.5 3.5V0h1v3.5H8v1H4.5V8h-1V4.5H0v-1h3.5z"
        >
        </path>
      </svg>
      Design File
    </Button>
  ),
};

export const WithSpinner: Story = {
  render: args => (
    <Button {...args}>
      <span className="i-tabler:loader-2 mx-2 size-4 animate-spin"></span>
    </Button>
  ),
};

export default meta;
