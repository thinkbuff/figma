import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '../../utils';

import { Separator } from './separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'vertical' },
        type: {
          summary: 'enum',
          detail: 'The orientation of the separator.',
        },
      },
    },
    decorative: {
      table: {
        type: {
          summary: 'boolean',
          detail:
            'When true, signifies that it is purely visual, carries no semantic meaning, and ensures it is not present in the accessibility tree.',
        },
      },
    },
  },
  args: {
    orientation: 'vertical',
    decorative: true,
  },
  render: ({ orientation, decorative }) => {
    return (
      <div className="size-60 flex items-center justify-center">
        <div
          className={cn('flex items-center gap-2', {
            'flex-col': orientation === 'horizontal',
            'h-4 flex-row': orientation === 'vertical',
          })}
        >
          <span>Blog</span>
          <Separator decorative={decorative} orientation={orientation} />
          <span>Docs</span>
          <Separator decorative={decorative} orientation={orientation} />
          <span>Community</span>
        </div>
      </div>
    );
  },
} satisfies Meta<typeof Separator>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
