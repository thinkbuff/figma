import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { ActionIcon } from '../action-icon';

import * as Sheet from './sheet';

type StoryArgs = React.ComponentPropsWithRef<typeof Sheet.Content> & {
  modal?: boolean;
  open?: boolean;
};

const meta = {
  title: 'Components/Sheet',
  component: Sheet.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        type: {
          summary: 'enum',
          detail:
            'Indicate the edge of the screen where the component will appear',
        },
        defaultValue: {
          summary: 'bottom',
        },
      },
    },
  },
  args: {
    modal: true,
    open: false,
    side: 'bottom',
  },
  render: (args) => {
    const { open: _, modal, ...props } = args;
    const [{ open }, updateArgs] = useArgs();
    return (
      <Sheet.Root
        open={open}
        modal={modal}
        onOpenChange={value => updateArgs({ open: value })}
      >
        <Sheet.Trigger asChild>
          <Button>Open</Button>
        </Sheet.Trigger>
        <Sheet.Content {...props}>
          <Sheet.Header className="justify-between">
            <Sheet.Title>Edit profile</Sheet.Title>
            <Sheet.Close asChild>
              <ActionIcon className="-mr-2">
                <span className="i-mdi-window-close size-4"></span>
              </ActionIcon>
            </Sheet.Close>
          </Sheet.Header>
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value="Eleven"
                variant="border"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value="@eteplus"
                variant="border"
                className="col-span-3"
              />
            </div>
          </div>
          <Sheet.Footer className="justify-end">
            <Sheet.Close asChild>
              <Button type="submit" className="h-7">
                Save changes
              </Button>
            </Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
