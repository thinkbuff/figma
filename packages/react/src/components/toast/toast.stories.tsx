import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';

import { Toaster } from './toaster';
import { toast } from './toast';

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              duration: 1_000_000,
              dismissible: false,
            })}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              dismissible: false,
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })}
        >
          Action
        </Button>
      </div>
    );
  },
};

export default meta;
