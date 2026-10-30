import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckmarkIcon } from '~/icons';

import { Badge, BadgeDot } from './badge';

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
  'figjam',
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
        color="merged"
        size="large"
        icon={<span className="size-1.5 rounded-full bg-figma-icon-success" />}
      >
        Merged
      </Badge>
      <Badge
        {...args}
        variant="light"
        color="archived"
        size="large"
        icon={<span className="size-1.5 rounded-full bg-figma-icon-disabled" />}
      >
        Archived
      </Badge>
    </div>
  ),
};

/**
 * The "Badge small alt" family — subtle fills, no border.
 */
export const Alt: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge
        {...args}
        variant="alt"
        color="default"
      >
        Default
      </Badge>
      <Badge
        {...args}
        variant="alt"
        color="count"
      >
        3
      </Badge>
      <Badge
        {...args}
        variant="alt"
        color="count-inactive"
      >
        12
      </Badge>
      <Badge
        {...args}
        variant="alt"
        color="strong"
      >
        Strong
      </Badge>
    </div>
  ),
};

/**
 * The spec's "Badge Dot" — a 9x9 `bg-default` pill with a 5x5 brand dot.
 */
export const Dot: Story = {
  render: () => <BadgeDot />,
};

/**
 * `size="large"` — 16px badge with 13px text.
 */
export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large badge',
  },
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
