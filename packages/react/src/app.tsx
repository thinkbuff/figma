import { useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';

import { TooltipProvider, Tooltip } from './components/tooltip';
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from './components/slider';

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
          delayDuration={200}
          content={value}
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
  const [count, setCount] = useState(0);

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
      <h1 className="border border-solid bg-figma bg-figma border-figma-icon hover:text-figma-brand">
        Vite + React
      </h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="min-h-60 min-w-60 flex items-center justify-center bg-figma">
        <Slider />
      </div>
    </TooltipProvider>
  );
}
