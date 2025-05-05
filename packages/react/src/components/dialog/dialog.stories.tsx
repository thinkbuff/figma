import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Root as Portal } from '@radix-ui/react-portal';

import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { ActionIcon } from '../action-icon';
import { toast, Toaster } from '../toast';

import * as Dialog from './dialog';

type StoryArgs = React.ComponentPropsWithRef<typeof Dialog.Content> & {
  modal?: boolean;
  open?: boolean;
};

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    modal: true,
    open: false,
  },
  decorators: [
    Story => (
      <>
        <Story />
        <Portal>
          <Toaster className="pointer-events-auto" />
        </Portal>
      </>
    ),
  ],
  render: (args) => {
    const { open: _, modal, ...props } = args;
    const [{ open }, updateArgs] = useArgs();
    return (
      <Dialog.Root modal={modal} open={open} onOpenChange={value => updateArgs({ open: value })}>
        <Dialog.Trigger asChild>
          <Button variant="outline">Edit profile</Button>
        </Dialog.Trigger>
        <Dialog.Content
          {...props}
          onPointerDownOutside={(event) => {
            if (event.target instanceof Element && event.target.closest('[data-sonner-toast]')) {
              event.preventDefault();
            }
          }}
        >
          <Dialog.Header className="justify-between">
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Close asChild>
              <ActionIcon className="-mr-2 -mt-2">
                <span className="i-mdi-window-close size-4"></span>
              </ActionIcon>
            </Dialog.Close>
          </Dialog.Header>
          <Dialog.Description>Make changes to your profile here. Click save when you&apos;re done.</Dialog.Description>
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Eleven"
                variant="border"
                wrapperProps={{
                  className: 'col-span-3',
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@eteplus"
                variant="border"
                wrapperProps={{
                  className: 'col-span-3',
                }}
              />
            </div>
          </div>
          <Dialog.Footer className="justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="outline" color="secondary">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                toast.success('Profile has been updated', {
                  duration: 6000,
                  closeButton: true,
                });
              }}
            >
              Save changes
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
