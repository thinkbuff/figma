import { useState } from 'react';

import viteLogo from '/vite.svg';

import { TooltipProvider, Tooltip } from '@thinkbuff/figma-react/tooltip';
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@thinkbuff/figma-react/slider';

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
    <TooltipProvider>
      <div className="outline-figma-icon">
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
      <div className="min-h-60 min-w-60 flex items-center justify-center bg-figma">
        <Slider />
      </div>
    </TooltipProvider>
  );
}
