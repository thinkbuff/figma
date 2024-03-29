import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    disabled: false,
    indeterminate: false,
    checked: false,
  },
  render: (args) => {
    const [{ checked, indeterminate }, updateArgs] = useArgs();

    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value) => {
          if (indeterminate && value) {
            updateArgs({ indeterminate: false, checked: value });
            return;
          }

          updateArgs({ checked: value });
        }}
      />
    );
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof meta>;

export const Uncheck: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  argTypes: {
    indeterminate: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <div className="flex items-center gap-1">
        <Checkbox
          id="checkbox"
          {...args}
          checked={checked}
          onCheckedChange={() => {
            updateArgs({ checked: !checked });
          }}
        />
        <label
          htmlFor="checkbox"
          className="disabled:text-figma-disabled"
        >
          Accept terms and conditions.
        </label>
      </div>
    );
  },
};

export default meta;
