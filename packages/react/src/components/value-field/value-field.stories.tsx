/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ValueField } from './index';
import type { RGBA } from './types';

const meta = {
  component: ValueField.Numeric,
  title: 'Components/Value Field',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ValueField.Numeric>;

type NumericStory = StoryObj<typeof ValueField.Numeric>;
type NumericSelectStory = StoryObj<typeof ValueField.NumericSelect>;
type HexStory = StoryObj<typeof ValueField.Hex>;
type Story = StoryObj;

const NUMERIC_SELECT_OPTIONS = [10, 11, 12, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128];

const Numeric: NumericStory = {
  render() {
    return <NumericField />;
  },
  argTypes: {
    value: {
      control: false,
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    precision: {
      control: 'number',
    },
    suffix: {
      control: 'text',
    },
    smallNudge: {
      control: 'number',
    },
    bigNudge: {
      control: 'number',
    },
  },
};

const Hex: HexStory = {
  render() {
    return <HexField />;
  },
};

const NumericSelect: NumericSelectStory = {
  render() {
    return <NumericSelectField initialValue={20} />;
  },
};

const NumericSelectOutOfOptions: NumericSelectStory = {
  render() {
    return <NumericSelectField initialValue={21} />;
  },
};

const NumericSelectHighlightPreview: NumericSelectStory = {
  render() {
    return <NumericSelectPreviewField />;
  },
};

const WithLabel: Story = {
  render() {
    return <LabeledField />;
  },
};

const WithIcon: Story = {
  render() {
    return <IconField />;
  },
};

const MultiInput: Story = {
  render() {
    return <RgbaFields />;
  },
};

const Rgba: Story = {
  render() {
    return <RgbaFields />;
  },
};

const HexWithAlpha: Story = {
  render() {
    return <HexWithAlphaField />;
  },
};

function NumericField() {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Scrubber />
      <ValueField.Numeric
        value={value}
        onChange={setValue}
      />
    </ValueField.Root>
  );
}

function NumericSelectField(props: { initialValue: number }) {
  const [value, setValue] = useState(props.initialValue);

  return (
    <ValueField.NumericSelect
      value={value}
      onChange={setValue}
      options={NUMERIC_SELECT_OPTIONS}
      style={{ width: 296 }}
      min={0}
      precision={0}
    />
  );
}

function NumericSelectPreviewField() {
  const [value, setValue] = useState(20);
  const [highlightedValue, setHighlightedValue] = useState<number>();
  const previewSize = highlightedValue ?? value;

  return (
    <div className="flex flex-col gap-4">
      <ValueField.NumericSelect
        value={value}
        onChange={setValue}
        onItemHighlighted={setHighlightedValue}
        options={NUMERIC_SELECT_OPTIONS}
        style={{ width: 296 }}
        min={0}
        precision={0}
      />
      <div style={{ fontSize: previewSize, lineHeight: 1.2 }}>Preview {previewSize}</div>
    </div>
  );
}

function HexField() {
  const [rgba, setRgba] = useState<RGBA>({ r: 0, g: 0, b: 0, a: 1 });

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Hex
        value={rgba}
        onChange={setRgba}
      />
    </ValueField.Root>
  );
}

function LabeledField() {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Scrubber>
        <ValueField.Label>X</ValueField.Label>
      </ValueField.Scrubber>
      <ValueField.Numeric
        value={value}
        onChange={setValue}
      />
    </ValueField.Root>
  );
}

function IconField() {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Scrubber>
        <ValueField.Label>
          <OpacityIcon />
        </ValueField.Label>
      </ValueField.Scrubber>
      <ValueField.Numeric
        value={value}
        onChange={setValue}
      />
    </ValueField.Root>
  );
}

function RgbaFields() {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  function setRed(r: number) {
    setRgba((rgba) => ({ ...rgba, r }));
  }

  function setGreen(g: number) {
    setRgba((rgba) => ({ ...rgba, g }));
  }

  function setBlue(b: number) {
    setRgba((rgba) => ({ ...rgba, b }));
  }

  function setAlpha(a: number) {
    setRgba((rgba) => ({ ...rgba, a }));
  }

  return (
    <div style={{ width: 160 }}>
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Scrubber />
          <ValueField.Numeric
            value={rgba.r}
            onChange={setRed}
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Scrubber />
          <ValueField.Numeric
            value={rgba.g}
            onChange={setGreen}
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Scrubber />
          <ValueField.Numeric
            value={rgba.b}
            onChange={setBlue}
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 48px' }}>
          <ValueField.Scrubber />
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            precision={2}
            suffix="%"
          />
        </ValueField.Root>
      </ValueField.Multi>
    </div>
  );
}

function HexWithAlphaField() {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  function setAlpha(a: number) {
    setRgba((rgba) => ({ ...rgba, a }));
  }

  return (
    <div style={{ width: 160 }}>
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Hex
            value={rgba}
            onChange={setRgba}
          />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 62px' }}>
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            allowedUnits={['%']}
            precision={2}
          />
          <ValueField.Label>%</ValueField.Label>
        </ValueField.Root>
      </ValueField.Multi>
    </div>
  );
}

function OpacityIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="var(--color-icon)"
      aria-hidden="true"
    >
      <path d="M8 1C7.25 1 6.5 1.25 6 1.75L1.75 6C1.25 6.5 1 7.25 1 8C1 10.9 3.1 13.25 6 13.88V14C6 14.55 6.45 15 7 15H9C9.55 15 10 14.55 10 14V13.88C12.9 13.25 15 10.9 15 8C15 7.25 14.75 6.5 14.25 6L10 1.75C9.5 1.25 8.75 1 8 1Z" />
    </svg>
  );
}

export default meta;
export {
  Hex,
  HexWithAlpha,
  MultiInput,
  Numeric,
  NumericSelect,
  NumericSelectHighlightPreview,
  NumericSelectOutOfOptions,
  Rgba,
  WithIcon,
  WithLabel,
};
