import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Button } from '../button';

import * as AlertDialog from './alert-dialog';

type StoryArgs = React.ComponentPropsWithoutRef<typeof AlertDialog.Content> & {
  open?: boolean;
};

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: false,
  },
  render: (args) => {
    const { open: _, ...props } = args;
    const [{ open }, updateArgs] = useArgs();
    return (
      <AlertDialog.Root
        open={open}
        onOpenChange={value => updateArgs({ open: value })}
      >
        <AlertDialog.Trigger asChild>
          <Button variant="outline" color="danger">
            Delete account
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content {...props}>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <AlertDialog.Footer className="justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="outline" color="secondary">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button color="danger">Yes, delete account</Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
