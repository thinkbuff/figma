import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import * as Tabs from './tabs';

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'inline-radio',
      options: ['all', 'only', 'none'],
    },
  },
  args: {
    value: 'all',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const list = [
      {
        value: 'all',
        content: 'All comments, mentions, and replies',
      },
      {
        value: 'only',
        content: 'Only mentions and replies',
      },
      {
        value: 'none',
        content: 'None',
      },
    ];

    return (
      <Tabs.Root
        {...args}
        className="min-w-60"
        value={value}
        onValueChange={(tab) => updateArgs({ value: tab })}
      >
        <Tabs.List className="h-9 w-full justify-start">
          {list.map((item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
            >
              {item.value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="flex p-2">
          {list.map((item) => (
            <Tabs.Content
              key={item.value}
              value={item.value}
            >
              {item.content}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    );
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overflow: Story = {
  argTypes: { value: { control: false } },
  render: (args) => (
    <Tabs.Root
      {...args}
      className="w-48"
      defaultValue="first"
    >
      <Tabs.List
        scrollable
        className="h-9"
      >
        {['first', 'second', 'third', 'fourth'].map((v) => (
          <Tabs.Trigger
            key={v}
            value={v}
          >
            {v} tab
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  ),
};

export default meta;
