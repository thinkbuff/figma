import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Label } from '../label';
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
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    disabled: false,
    indeterminate: false,
    checked: false,
  },
  render: function Render(args) {
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

export const Unchecked: Story = {};

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

export const Variants: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    const variants = ['default', 'muted', 'ghost'] as const;
    return (
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex items-center gap-2"
          >
            <Checkbox
              {...args}
              variant={variant}
              checked={checked}
              onCheckedChange={(value) => updateArgs({ checked: value })}
            />
            <Label>{variant}</Label>
          </div>
        ))}
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <div className="flex w-64 items-start gap-2">
        <Checkbox
          id="checkbox-desc"
          {...args}
          variant="muted"
          checked={checked}
          onCheckedChange={(value) => updateArgs({ checked: value })}
        />
        <div className="flex flex-col">
          <Label htmlFor="checkbox-desc">Off, Normal + Muted</Label>
          <span className="text-figma-body-medium text-figma-secondary">
            Helpful description of the setting which may briefly highlight side effects or
            conditions of the setting.
          </span>
        </div>
      </div>
    );
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
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="checkbox"
          {...args}
          checked={checked}
          onCheckedChange={() => {
            updateArgs({ checked: !checked });
          }}
        />
        <Label htmlFor="checkbox">Accept terms and conditions.</Label>
      </div>
    );
  },
};

export default meta;
