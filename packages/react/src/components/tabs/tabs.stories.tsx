import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import * as Tabs from './tabs';

const meta = {
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
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    const list = [{
      value: 'all',
      content: 'All comments, mentions, and replies',
    }, {
      value: 'only',
      content: 'Only mentions and replies',
    }, {
      value: 'none',
      content: 'None',
    }];

    return (
      <Tabs.Root
        {...args}
        className="min-w-60"
        value={value}
        onValueChange={tab => updateArgs({ value: tab })}
      >
        <Tabs.List className="h-9 w-full justify-start">
          {list.map(item => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
            >
              {item.value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="flex p-2">
          {list.map(item => (
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
} satisfies Meta<typeof Tabs.Root>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
