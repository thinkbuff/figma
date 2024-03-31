import type { Meta, StoryObj } from '@storybook/react';

import { ActionIcon } from '../action-icon';

import { Input, InputSlot } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'border'],
      table: {
        defaultValue: { summary: 'border' },
      },
    },
    invalid: {
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    variant: 'default',
    invalid: false,
    disabled: false,
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Border: Story = {
  args: {
    variant: 'border',
  },
};

export const WithLeftIcon: Story = {
  render: args => (
    <Input {...args}>
      <InputSlot>
        <span className="i-tabler-hash size-3"></span>
      </InputSlot>
    </Input>
  ),
};

export const WithRightIcon: Story = {
  render: args => (
    <Input {...args}>
      <InputSlot side="right">
        <span className="i-tabler-hash size-3"></span>
      </InputSlot>
    </Input>
  ),
};

export const WithSlots: Story = {
  args: {
    variant: 'border',
  },
  render: args => (
    <Input {...args}>
      <InputSlot side="left">
        <span className="i-tabler-search size-3"></span>
      </InputSlot>
      <InputSlot side="right">
        <ActionIcon disabled={args.disabled} className="mx-1 size-6 text-figma-icon-secondary">
          <span className="i-tabler-x size-3"></span>
        </ActionIcon>
      </InputSlot>
    </Input>
  ),
};

export default meta;
