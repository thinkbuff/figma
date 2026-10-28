import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { ActionIcon } from '../action-icon';
import { Tooltip, TooltipProvider } from '../tooltip';
import { VariableChip } from '../variable-chip';
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
    size: {
      control: 'inline-radio',
      options: ['default', 'large'],
      table: {
        defaultValue: { summary: 'default' },
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

export const Large: Story = {
  args: {
    size: 'large',
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
  render: (args) => (
    <Input {...args}>
      <InputSlot>
        <span className="icon-[tabler--hash] size-3"></span>
      </InputSlot>
    </Input>
  ),
};

export const WithRightIcon: Story = {
  render: (args) => (
    <Input {...args}>
      <InputSlot side="right">
        <span className="icon-[tabler--hash] size-3"></span>
      </InputSlot>
    </Input>
  ),
};

export const WithSlots: Story = {
  args: {
    variant: 'border',
  },
  render: (args) => (
    <Input {...args}>
      <InputSlot side="left">
        <span className="icon-[tabler--search] size-3"></span>
      </InputSlot>
      <InputSlot side="right">
        <ActionIcon
          aria-label="Clear"
          disabled={args.disabled}
          className="mx-1 size-6 text-figma-icon-secondary focus:outline-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="icon-[tabler--x] size-3"></span>
        </ActionIcon>
      </InputSlot>
    </Input>
  ),
};

/**
 * The spec's `State=Variable` — an applied variable renders as a
 * `VariableChip` pill in place of the field text.
 */
export const WithVariable: Story = {
  args: {
    placeholder: undefined,
  },
  render: (args) => (
    <Input
      {...args}
      className="text-transparent"
    >
      <span className="absolute left-2 top-1">
        <VariableChip>Spacing</VariableChip>
      </span>
    </Input>
  ),
};

export const WithTooltip: Story = {
  args: {
    variant: 'border',
    value: 12,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
      <TooltipProvider delay={100}>
        <Tooltip content={<p>Spacing</p>}>
          <div className="relative w-20 flex items-center">
            <Input
              id="spacing"
              {...args}
              value={value}
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => updateArgs({ value: Number(e.currentTarget.value) })}
            >
              <InputSlot side="left">
                <span className="icon-[tabler--spacing-vertical] size-3.5"></span>
              </InputSlot>
            </Input>
          </div>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

export default meta;
