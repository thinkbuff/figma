import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { ActionIcon } from '../action-icon';
import * as DropdownMenu from './dropdown-menu';

type StoryArgs = React.ComponentPropsWithRef<typeof DropdownMenu.Content> & {
  modal?: boolean;
  open?: boolean;
};

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
          detail: 'An offset in pixels from the "start" or "end" alignment options.',
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
        type: { summary: 'number', detail: 'The distance in pixels from the trigger.' },
      },
    },
  },
  args: {
    modal: true,
    open: false,
    align: 'center',
    alignOffset: 0,
    side: 'top',
    sideOffset: 9,
  },
  render: function Render(args) {
    const { open: _, modal, ...props } = args;
    const [{ open }, updateArgs] = useArgs();
    return (
      <DropdownMenu.Root
        modal={modal}
        defaultOpen={false}
        open={open}
        onOpenChange={(value) => updateArgs({ open: value })}
      >
        <DropdownMenu.Trigger
          render={
            <ActionIcon>
              <span className="icon-[tabler--menu-2] size-4"></span>
            </ActionIcon>
          }
        />
        <DropdownMenu.Content
          {...props}
          className="min-w-60"
        >
          <DropdownMenu.Item>
            New Tab <span className="ml-auto">⌘+T</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            New Window <span className="ml-auto">⌘+N</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item disabled>
            New Private Window <span className="ml-auto">⇧+⌘+N</span>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More Tools</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="min-w-40">
              <DropdownMenu.Item>
                Save Page As <span className="ml-auto">⌘+S</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>Create Shortcut</DropdownMenu.Item>
              <DropdownMenu.Item>Name Window</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem>
            Show Bookmarks <span className="ml-auto">⌘+B</span>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem checked>Show Full URLs</DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup value="pedro">
            <DropdownMenu.Label>People</DropdownMenu.Label>
            <DropdownMenu.RadioItem value="pedro">Eleven Zhang</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="colm">Jerry Zhang</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  },
} satisfies Meta<StoryArgs>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: 'bottom',
  },
};

export default meta;
