import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { ActionIcon } from '../action-icon';
import { Tooltip, TooltipProvider } from '../tooltip';

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
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
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
        <ActionIcon
          disabled={args.disabled}
          className="mx-1 size-6 text-figma-icon-secondary focus:outline-transparent"
          onClick={e => e.stopPropagation()}
        >
          <span className="i-tabler-x size-3"></span>
        </ActionIcon>
      </InputSlot>
    </Input>
  ),
};

export const WithTooltip: Story = {
  args: {
    variant: 'border',
    value: 12,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip content={<p>Spacing</p>}>
          <div className="relative w-20 flex items-center">
            <Input
              id="spacing"
              {...args}
              value={value}
              onFocus={e => e.currentTarget.select()}
              onChange={e => updateArgs({ value: Number(e.currentTarget.value) })}
            >
              <InputSlot side="left">
                <span className="i-tabler-spacing-vertical size-3.5"></span>
              </InputSlot>
            </Input>
          </div>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export default meta;
