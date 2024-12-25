import { useState } from 'react';

import viteLogo from '/vite.svg';

import { Tooltip } from '@thinkbuff/figma-react/tooltip';
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@thinkbuff/figma-react/slider';
import { Select } from '@thinkbuff/figma-react/select';
import { cn } from '@thinkbuff/figma-react/utils';

import reactLogo from './assets/react.svg';

import './app.css';

function Slider() {
  const [values, setValues] = useState([20]);
  const [showTooltip, toggleTooltip] = useState(false);
  return (
    <SliderRoot
      value={values}
      className="data-[orientation=vertical]:h-60"
      onValueChange={value => setValues(value)}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {values.map((value, index) => (
        <Tooltip
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          defaultOpen={showTooltip}
          open={showTooltip}
          content={<p>{value}</p>}
          delayDuration={200}
          updatePositionStrategy="always"
        >
          <SliderThumb
            onMouseOver={() => toggleTooltip(true)}
            onMouseOut={() => toggleTooltip(false)}
          />
        </Tooltip>
      ))}
    </SliderRoot>
  );
}

export function App() {
  return (
    <>
      <div className={cn('outline-figma-icon', 'outline-figma-border-brand')}>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="border border-solid p-2 bg-figma border-figma hover:text-figma-brand">
        Vite + React + Figma
      </h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="min-h-60 min-w-60 flex flex-col items-center justify-center gap-4 bg-figma">
        <Slider />
        <Select.Root>
          <Select.Trigger placeholder="Select. an option" />
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
              <Select.Label>Auto Layout</Select.Label>
              <Select.Item value="gap">Gap</Select.Item>
              <Select.Item value="horizontal-padding">
                Horizontal padding
              </Select.Item>
              <Select.Item value="vertical-padding">
                Vertical padding
              </Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Item value="fill-width" disabled>
                Fill weight
              </Select.Item>
              <Select.Item value="stroke-width">Stroke weight</Select.Item>
              <Select.Item value="corner-radius">Corner radius</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  );
}
