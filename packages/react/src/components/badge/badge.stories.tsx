import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckmarkIcon } from '~/icons';

import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'light',
    color: 'default',
    size: 'default',
    children: 'Badge',
  },
} satisfies Meta<React.ComponentPropsWithRef<typeof Badge>>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const colors = [
  'default',
  'brand',
  'component',
  'danger',
  'warning',
  'success',
  'selected',
] as const;

export const Gallery: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4">
      {colors.map((color) => (
        <div
          key={color}
          className="flex items-center gap-2"
        >
          <Badge
            {...args}
            variant="strong"
            color={color}
          />
          <Badge
            {...args}
            variant="light"
            color={color}
          />
        </div>
      ))}
    </div>
  ),
};

export const BranchingAndMerging: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      <Badge
        {...args}
        variant="light"
        color="success"
        icon={<span className="size-1.5 rounded-full bg-figma-icon-success" />}
      >
        Merged
      </Badge>
      <Badge
        {...args}
        variant="light"
        color="default"
        className="border-figma-border bg-transparent text-figma-tertiary"
        icon={<span className="size-1.5 rounded-full bg-figma-icon-disabled" />}
      >
        Archived
      </Badge>
      <Badge
        {...args}
        variant="light"
        color="success"
        size="small"
        icon={<span className="size-1 rounded-full bg-figma-icon-success" />}
      >
        Merged
      </Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge
        {...args}
        variant="light"
        color="selected"
        icon={
          <CheckmarkIcon
            size="3"
            className="icon-figma-selected"
          />
        }
      >
        Selected
      </Badge>
      <Badge
        {...args}
        variant="light"
        color="brand"
      >
        Beta feedback
        <span className="icon-[mdi--open-in-new] size-3 icon-figma-brand"></span>
      </Badge>
    </div>
  ),
};

export default meta;
