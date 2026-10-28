import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { toast } from './toast';
import { Toaster } from './toaster';

const meta: Meta = {
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
    (Story) => (
      <div className="min-h-60">
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            toast('Event has been created', {
              duration: 1_000_000,
            })
          }
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })
          }
        >
          Action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })
          }
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              action: {
                label: 'Action',
                onClick: () => console.log('Action'),
              },
              cancel: {
                label: 'Dismiss',
                onClick: () => console.log('Dismiss'),
              },
            })
          }
        >
          Action + Dismiss
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.success('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.info('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })
          }
        >
          Info
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.warning('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.error('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
              duration: 1_000_000,
              action: {
                label: 'Cancel',
                onClick: () => console.log('Cancel'),
              },
            })
          }
        >
          Error
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            toast.promise(
              new Promise<{ name: string }>((resolve) =>
                setTimeout(() => resolve({ name: 'Figma' }), 2000),
              ),
              {
                loading: 'Loading...',
                description: () => {
                  return 'Monday, January 3rd at 6:00pm';
                },
                success: (data: { name: string }) => {
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
          variant="secondary"
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
      </div>
    );
  },
};

export default meta;
