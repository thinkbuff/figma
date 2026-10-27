import type { Meta, StoryObj } from '@storybook/react-vite';

import { CircleIcon, DrawIcon } from '~/icons';

import * as VisualBell from './visual-bell';

const meta = {
  title: 'Components/VisualBell',
  component: VisualBell.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    color: 'default',
  },
} satisfies Meta<React.ComponentPropsWithRef<typeof VisualBell.Root>>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <VisualBell.Root {...args}>
      <VisualBell.Label icon={<CircleIcon size="4" />}>Default messaging bell</VisualBell.Label>
      <VisualBell.Actions>
        <VisualBell.Action>Action</VisualBell.Action>
        <VisualBell.Action>Action</VisualBell.Action>
      </VisualBell.Actions>
      <VisualBell.Dismiss />
    </VisualBell.Root>
  ),
};

export const MessageOnly: Story = {
  render: (args) => (
    <VisualBell.Root {...args}>
      <VisualBell.Label>Message only</VisualBell.Label>
    </VisualBell.Root>
  ),
};

export const ExplicitDismiss: Story = {
  render: (args) => (
    <VisualBell.Root {...args}>
      <VisualBell.Label>Message with explicit dismiss</VisualBell.Label>
      <VisualBell.Dismiss />
    </VisualBell.Root>
  ),
};

export const Danger: Story = {
  args: {
    color: 'danger',
  },
  render: Default.render,
};

export const Spotlight: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {(['brand', 'success', 'component', 'danger'] as const).map((color) => (
        <VisualBell.Root
          key={color}
          color={color}
        >
          <VisualBell.Label icon={<DrawIcon size="4" />}>
            Spotlight on Tim Van Damme
          </VisualBell.Label>
          <VisualBell.Actions>
            <VisualBell.Action>Follow</VisualBell.Action>
          </VisualBell.Actions>
          <VisualBell.Dismiss />
        </VisualBell.Root>
      ))}
    </div>
  ),
};

export default meta;
