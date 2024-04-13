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
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              duration: 1_000_000,
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
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })}
        >
          Action
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              action: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.promise(
              new Promise<{ name: string }>(resolve =>
                setTimeout(() => resolve({ name: 'Figma' }), 2000),
              ),
              {
                loading: 'Loading...',
                description: () => {
                  return 'Monday, January 3rd at 6:00pm';
                },
                success: (data) => {
                  return `${data.name} toast has been added`;
                },
                error: 'Error',
              },
            );
          }}
        >
          Promise
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.loading('Loading toast...', {
              duration: 2000,
              description: 'Monday, January 3rd at 6:00pm',
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            });
          }}
        >
          Loading
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 6000,
              closeButton: true,
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            });
          }}
        >
          CloseButton
        </Button>
      </div>
    );
  },
};

export default meta;
