import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';

import * as Popover from './popover';

type StoryArgs = React.ComponentPropsWithoutRef<typeof Popover.Content> & {
  modal?: boolean;
  open?: boolean;
};

const meta = {
  title: 'Components/Popover',
  component: Popover.Content,
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
    modal: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
          detail:
            'The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.',
        },
      },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      table: {
        type: {
          summary: 'enum',
          detail: 'The preferred alignment against the anchor. May change when collisions occur.',
        },
        defaultValue: { summary: 'center' },
      },
    },
    alignOffset: {
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number',
          detail:
            'An offset in pixels from the "start" or "end" alignment options.',
        },
      },
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        type: {
          summary: 'enum',
          detail:
            'The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled.',
        },
        defaultValue: {
          summary: 'top',
        },
      },
    },
    sideOffset: {
      control: {
        type: 'number',
      },
      table: {
        type: {
          summary: 'number',
          detail: 'The distance in pixels from the trigger.',
        },
      },
    },
    avoidCollisions: {
      table: {
        type: {
          summary: 'boolean',
          detail:
            'When true, overrides the side andalign preferences to prevent collisions with boundary edges.',
        },
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    modal: false,
    open: false,
    align: 'center',
    alignOffset: 0,
    side: 'bottom',
    sideOffset: 4,
    avoidCollisions: true,
  },
  render: (args) => {
    const { open: _, modal, ...props } = args;
    const [{ open }, updateArgs] = useArgs();

    return (
      <Popover.Root
        modal={modal}
        defaultOpen={false}
        open={open}
        onOpenChange={value => updateArgs({ open: value })}
      >
        <Popover.Trigger asChild>
          <Button variant="outline">Open</Button>
        </Popover.Trigger>
        <Popover.Content {...props} className="w-60 p-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h3 className="font-medium leading-none">Dimensions</h3>
            </div>
            <div className="grid gap-1">
              <div className="grid grid-cols-3 items-center gap-1">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-1">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-1">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-1">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  className="col-span-2"
                />
              </div>
            </div>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
