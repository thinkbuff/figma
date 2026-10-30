import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarGroup } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'default',
    shape: 'circle',
    color: 'purple',
    name: 'Ada',
  },
} satisfies Meta<React.ComponentPropsWithRef<typeof Avatar>>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const colors = ['purple', 'blue', 'pink', 'red', 'yellow', 'green', 'grey'] as const;

export const Gallery: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {(['large', 'default', 'small'] as const).map((size) => (
        <div
          key={size}
          className="flex items-center gap-2"
        >
          {colors.map((color) => (
            <Avatar
              key={color}
              {...args}
              size={size}
              color={color}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Square: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <Avatar
          key={color}
          {...args}
          shape="square"
          color={color}
        />
      ))}
    </div>
  ),
};

const photo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23e8def8'/%3E%3Ccircle cx='16' cy='13' r='6' fill='%239747ff'/%3E%3Cpath d='M4 32c1-7 6-10 12-10s11 3 12 10' fill='%239747ff'/%3E%3C/svg%3E";

export const Photo: Story = {
  args: {
    src: photo,
    name: 'Ada Lovelace',
  },
};

/**
 * The spec's Overflow variants — "+N" style avatars.
 */
export const Overflow: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar
        {...args}
        color="overflow-unread"
      >
        +12
      </Avatar>
      <Avatar
        {...args}
        color="overflow-read"
      >
        +8
      </Avatar>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar
        {...args}
        disabled
        color="purple"
      />
      <Avatar
        {...args}
        disabled
        color="overflow-read"
      >
        +8
      </Avatar>
    </div>
  ),
};

export const Content: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar
        {...args}
        color="neutral"
      >
        2
      </Avatar>
      <Avatar
        {...args}
        color="green"
      >
        <span className="icon-[tabler--hand-stop] size-3 text-white"></span>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      <Avatar
        {...args}
        color="purple"
      />
      <Avatar
        {...args}
        color="blue"
      />
      <Avatar
        {...args}
        color="pink"
      />
      <Avatar
        {...args}
        color="green"
      />
    </AvatarGroup>
  ),
};

export default meta;
