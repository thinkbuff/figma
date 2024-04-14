import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const TAGS = Array.from({ length: 50 }).map(
      (_, i, a) => `v1.2.0-beta.${a.length - i}`,
    );
    return (
      <ScrollArea
        className="h-60 w-40 border rounded border-solid border-figma"
        {...args}
      >
        <div className="w-full flex flex-col p-2">
          <div className="h-6 inline-flex items-center font-medium font-size-13">
            Tags
          </div>
          {TAGS.map(tag => (
            <div
              className="h-8 inline-flex items-center border-t font-size-12 border-figma text-figma"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

export default meta;
