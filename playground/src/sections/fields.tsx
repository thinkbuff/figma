import { useState } from 'react';

import {
  CloseIcon,
  EyedropperIcon,
  LinkBrokenIcon,
  OpacityIcon,
  SearchIcon,
} from '@thinkbuff/figma-react';
import { ActionIcon } from '@thinkbuff/figma-react/action-icon';
import { Input, InputSlot } from '@thinkbuff/figma-react/input';
import { Select } from '@thinkbuff/figma-react/select';
import { Textarea } from '@thinkbuff/figma-react/textarea';
import { ValueField } from '@thinkbuff/figma-react/value-field';
import { VariableCell, VariableChip } from '@thinkbuff/figma-react/variable-chip';

import { Demo } from '../demo';

type Rgba = { r: number; g: number; b: number; a: number };

function Inputs() {
  return (
    <>
      <Demo label="Input">
        <Input
          placeholder="Default"
          className="w-28"
        />
        <Input
          variant="border"
          placeholder="Border"
          className="w-28"
        />
        <Input
          variant="border"
          size="large"
          placeholder="Large"
          className="w-28"
        />
        <Input
          invalid
          defaultValue="Invalid"
          className="w-28"
        />
        <Input
          disabled
          placeholder="Disabled"
          className="w-28"
        />
      </Demo>
      <Demo label="With slots">
        <Input
          variant="border"
          placeholder="Search"
          className="w-36"
        >
          <InputSlot side="left">
            <SearchIcon size="3.5" />
          </InputSlot>
        </Input>
        <Input
          variant="border"
          defaultValue="Layer name"
          className="w-36"
        >
          <InputSlot side="right">
            <ActionIcon
              aria-label="Clear"
              className="mx-1 size-6 text-figma-icon-secondary focus:outline-transparent"
              onClick={(event) => event.stopPropagation()}
            >
              <CloseIcon size="3" />
            </ActionIcon>
          </InputSlot>
        </Input>
      </Demo>
      <Demo label="With variable">
        <Input
          className="w-28 text-transparent"
          aria-label="Spacing"
        >
          <span className="absolute left-2 top-1">
            <VariableChip>Spacing</VariableChip>
          </span>
        </Input>
      </Demo>
      <Demo
        label="Textarea"
        className="items-start"
      >
        <Textarea
          placeholder="Default"
          className="w-40"
        />
        <Textarea
          invalid
          defaultValue="Invalid"
          className="w-40"
        />
        <Textarea
          disabled
          placeholder="Disabled"
          className="w-40"
        />
      </Demo>
    </>
  );
}

function Selects() {
  const [blend, setBlend] = useState<string | null>('normal');
  const [property, setProperty] = useState<string | null>(null);

  return (
    <>
      <Demo label="Blend mode">
        <Select.Root
          items={{
            'pass-through': 'Pass through',
            normal: 'Normal',
            multiply: 'Multiply',
            screen: 'Screen',
            overlay: 'Overlay',
            darken: 'Darken',
            lighten: 'Lighten',
            'color-dodge': 'Color dodge',
            'color-burn': 'Color burn',
            difference: 'Difference',
          }}
          value={blend}
          onValueChange={setBlend}
        >
          <Select.Trigger
            placeholder="Blend mode"
            className="w-36"
          />
          <Select.Content>
            <Select.Group>
              <Select.Item value="pass-through">Pass through</Select.Item>
              <Select.Item value="normal">Normal</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Item value="multiply">Multiply</Select.Item>
              <Select.Item value="screen">Screen</Select.Item>
              <Select.Item value="overlay">Overlay</Select.Item>
              <Select.Item value="darken">Darken</Select.Item>
              <Select.Item value="lighten">Lighten</Select.Item>
              <Select.Item value="color-dodge">Color dodge</Select.Item>
              <Select.Item value="color-burn">Color burn</Select.Item>
              <Select.Item value="difference">Difference</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Demo>
      <Demo label="Grouped, icon, and large">
        <Select.Root
          items={{
            text: 'Text',
            width: 'Width',
            height: 'Height',
            gap: 'Gap',
            'horizontal-padding': 'Horizontal padding',
            'vertical-padding': 'Vertical padding',
            'stroke-width': 'Stroke weight',
            'corner-radius': 'Corner radius',
          }}
          value={property}
          onValueChange={setProperty}
        >
          <Select.Trigger
            placeholder="Select a property"
            className="w-44"
          />
          <Select.Content>
            <Select.Group>
              <Select.Label>String</Select.Label>
              <Select.Item value="text">Text</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Sizing</Select.Label>
              <Select.Item value="width">Width</Select.Item>
              <Select.Item value="height">Height</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Auto layout</Select.Label>
              <Select.Item value="gap">Gap</Select.Item>
              <Select.Item value="horizontal-padding">Horizontal padding</Select.Item>
              <Select.Item value="vertical-padding">Vertical padding</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Item value="stroke-width">Stroke weight</Select.Item>
              <Select.Item value="corner-radius">Corner radius</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root items={{ solid: 'Solid', linear: 'Linear', radial: 'Radial' }}>
          <Select.Trigger
            icon={<EyedropperIcon size="4" />}
            placeholder="Fill"
            className="w-28"
          />
          <Select.Content>
            <Select.Item value="solid">Solid</Select.Item>
            <Select.Item value="linear">Linear</Select.Item>
            <Select.Item value="radial">Radial</Select.Item>
          </Select.Content>
        </Select.Root>
        <Select.Root items={{ solid: 'Solid', linear: 'Linear', radial: 'Radial' }}>
          <Select.Trigger
            size="large"
            icon={<EyedropperIcon size="4" />}
            placeholder="Fill"
            className="w-28"
          />
          <Select.Content>
            <Select.Item value="solid">Solid</Select.Item>
            <Select.Item value="linear">Linear</Select.Item>
            <Select.Item value="radial">Radial</Select.Item>
          </Select.Content>
        </Select.Root>
      </Demo>
    </>
  );
}

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 72, 96];

function ValueFields() {
  const [x, setX] = useState(24);
  const [size, setSize] = useState(16);
  const [opacity, setOpacity] = useState(80);
  const [rgba, setRgba] = useState<Rgba>({ r: 1, g: 0.14, b: 0.74, a: 0.6 });

  return (
    <>
      <Demo label="Numeric fields">
        <ValueField.Root className="w-24">
          <ValueField.Scrubber>
            <ValueField.Label>X</ValueField.Label>
          </ValueField.Scrubber>
          <ValueField.Numeric
            value={x}
            onChange={setX}
          />
        </ValueField.Root>
        <ValueField.Root className="w-24">
          <ValueField.Scrubber>
            <ValueField.Label>
              <OpacityIcon size="4" />
            </ValueField.Label>
          </ValueField.Scrubber>
          <ValueField.Numeric
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={100}
            suffix="%"
            precision={0}
          />
        </ValueField.Root>
        <ValueField.NumericSelect
          value={size}
          onChange={setSize}
          options={FONT_SIZES}
          className="w-24"
          min={0}
          precision={0}
        />
      </Demo>
      <Demo label="Hex and alpha">
        <div className="w-52">
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
                onChange={(a) => setRgba((current) => ({ ...current, a }))}
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
      </Demo>
      <Demo label="Variable chips">
        <VariableChip>24</VariableChip>
        <VariableChip selected>24</VariableChip>
        <VariableChip onSelected>24</VariableChip>
        <VariableChip variant="sunken">24</VariableChip>
        <VariableChip disabled>24</VariableChip>
        <VariableChip
          variant="sunken"
          disabled
        >
          24
        </VariableChip>
        <VariableCell>Value</VariableCell>
        <span className="inline-flex items-center gap-1 text-figma-secondary">
          <LinkBrokenIcon size="4" /> detached
        </span>
      </Demo>
    </>
  );
}

export { Inputs, Selects, ValueFields };
