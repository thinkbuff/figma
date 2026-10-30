import type { Meta, StoryObj } from '@storybook/react-vite';

import { PlayIcon } from '~/icons';

import * as ActionIconSplit from './action-icon-split';

const meta = {
  title: 'Components/ActionIconSplit',
  component: ActionIconSplit.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'large'],
      table: {
        defaultValue: { summary: 'small' },
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
  },
  render: (args) => (
    <ActionIconSplit.Root {...args}>
      <ActionIconSplit.Button aria-label="Run">
        <PlayIcon />
      </ActionIconSplit.Button>
      <ActionIconSplit.Chevron aria-label="More options" />
    </ActionIconSplit.Root>
  ),
} satisfies Meta<typeof ActionIconSplit.Root>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Expanded: Story = {
  render: (args) => (
    <ActionIconSplit.Root {...args}>
      <ActionIconSplit.Button aria-label="Run">
        <PlayIcon />
      </ActionIconSplit.Button>
      <ActionIconSplit.Chevron
        aria-label="More options"
        aria-expanded="true"
      />
    </ActionIconSplit.Root>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export default meta;
