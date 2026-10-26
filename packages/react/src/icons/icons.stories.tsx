import type { Meta, StoryObj } from '@storybook/react-vite';

import * as Icons from './index';

const icons = Object.entries(Icons)
  .filter(([name]) => name.endsWith('Icon'))
  .map(([name, Icon]) => ({ name, Icon: Icon as React.ComponentType }));

const meta = {
  title: 'Icons/Set',
  parameters: {
    layout: 'padded',
  },
  render: function Render() {
    return (
      <div className="icon-figma grid w-140 grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-figma-md py-3 hover:bg-figma-secondary"
          >
            <Icon />
            <span className="text-figma-secondary">{name.replace(/Icon$/, '')}</span>
          </div>
        ))}
      </div>
    );
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
