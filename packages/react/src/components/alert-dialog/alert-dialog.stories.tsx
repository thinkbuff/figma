import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Button } from '../button';
import * as AlertDialog from './alert-dialog';

type StoryArgs = React.ComponentPropsWithRef<typeof AlertDialog.Content> & {
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
  render: function Render(args) {
    const { open: _, ...props } = args;
    const [{ open }, updateArgs] = useArgs();
    return (
      <AlertDialog.Root
        open={open}
        onOpenChange={(value) => updateArgs({ open: value })}
      >
        <AlertDialog.Trigger
          render={<Button variant="secondary-destructive">Delete account</Button>}
        />
        <AlertDialog.Content {...props}>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialog.Description>
          <AlertDialog.Footer className="justify-end gap-3">
            <AlertDialog.Cancel render={<Button variant="secondary">Cancel</Button>} />
            <AlertDialog.Action
              render={<Button variant="destructive">Yes, delete account</Button>}
            />
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
