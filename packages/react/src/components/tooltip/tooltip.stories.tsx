import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { ActionIcon } from '../action-icon';

import { Tooltip, TooltipProvider } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    container: {
      table: {
        disable: true,
      },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    alignOffset: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number', detail: 'An offset in pixels from the "start" or "end" alignment options.' },
      },
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        defaultValue: {
          summary: 'top',
          detail:
            'The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled.',
        },
      },
    },
    sideOffset: {
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number', detail: 'The distance in pixels from the trigger.' },
      },
    },
    avoidCollisions: {
      table: {
        type: {
          summary: 'boolean',
          detail: 'When true, overrides the side andalign preferences to prevent collisions with boundary edges.',
        },
        defaultValue: { summary: true },
      },
    },
    withArrow: {
      table: {
        type: {
          summary: 'boolean',
          detail: 'Whether the tooltip should have an arrow',
        },
        defaultValue: { summary: true },
      },
    },
    content: {
      table: {
        type: {
          summary: 'React.ReactNode',
          detail: 'The content of the tooltip',
        },
      },
    },
  },

  args: {
    open: false,
    align: 'center',
    alignOffset: 0,
    side: 'top',
    sideOffset: 4,
    avoidCollisions: true,
    withArrow: true,
  },
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Open settings',
  },
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();

    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip
          {...args}
          open={open}
          onOpenChange={(value) => {
            updateArgs({ open: value });
          }}
        >
          <ActionIcon>
            <span className="i-tabler-adjustments-alt size-4"></span>
          </ActionIcon>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export default meta;
