import type { Meta, StoryObj } from '@storybook/react';

import { ActionIcon } from '../action-icon';

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: TooltipContent,
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
  },
  render: args => (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <ActionIcon>
            <span className="i-tabler-adjustments-alt size-4"></span>
          </ActionIcon>
        </TooltipTrigger>
        <TooltipContent {...args}>
          <p>Open settings</p>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  args: {
    align: 'center',
    alignOffset: 0,
    side: 'top',
    sideOffset: 4,
    avoidCollisions: true,
  },
} satisfies Meta<typeof TooltipContent>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
