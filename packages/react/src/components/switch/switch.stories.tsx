import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Label } from '../label';

import { Switch } from './switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    disabled: false,
    checked: false,
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <Switch
        {...args}
        checked={checked}
        onCheckedChange={value => updateArgs({ checked: value })}
      />
    );
  },
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <div className="flex items-center gap-1">
        <Switch
          id="switch"
          {...args}
          checked={checked}
          onCheckedChange={() => updateArgs({ checked: !checked })}
        />
        <Label htmlFor="switch">Test mode</Label>
      </div>
    );
  },
};

export default meta;
