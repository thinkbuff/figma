import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkBrokenIcon } from '~/icons';
import { cn } from '~/utils';

import { VariableChip } from './variable-chip';

const meta = {
  title: 'Components/VariableChip',
  component: VariableChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '24',
  },
} satisfies Meta<React.ComponentPropsWithRef<typeof VariableChip>>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function Field({
  state = 'default',
  detach,
  children,
}: {
  state?: 'default' | 'hover' | 'focus';
  detach?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex h-6 w-36 items-center gap-1 rounded-figma-md bg-figma-secondary pl-2 pr-1',
        '-outline-offset-1 outline-1 outline-solid',
        state === 'focus'
          ? 'outline-figma-border-selected'
          : state === 'hover'
            ? 'outline-figma-border'
            : 'outline-transparent',
      )}
    >
      <span className="w-4 shrink-0 text-center text-figma-sm leading-figma-sm text-figma-secondary">
        X
      </span>
      {children}
      <LinkBrokenIcon
        className={cn('ml-auto size-4 shrink-0 icon-figma', !detach && 'invisible')}
      />
    </div>
  );
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Field>
        <VariableChip>24</VariableChip>
      </Field>
      <Field
        state="hover"
        detach
      >
        <VariableChip>24</VariableChip>
      </Field>
      <Field>
        <VariableChip selected>24</VariableChip>
      </Field>
      <Field>
        <VariableChip onSelected>24</VariableChip>
      </Field>
      <Field>
        <VariableChip variant="sunken">24</VariableChip>
      </Field>
      <Field>
        <VariableChip
          variant="sunken"
          disabled
        >
          24
        </VariableChip>
      </Field>
      <Field>
        <VariableChip disabled>24</VariableChip>
      </Field>
      <Field>
        <VariableChip variant="sunken">24</VariableChip>
      </Field>
    </div>
  ),
};

export const InFocusedField: Story = {
  render: () => (
    <Field
      state="focus"
      detach
    >
      <VariableChip selected>24</VariableChip>
    </Field>
  ),
};

export default meta;
