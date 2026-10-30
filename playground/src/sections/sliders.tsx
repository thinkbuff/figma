import { useState } from 'react';

import {
  Slider,
  SliderRoot,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@thinkbuff/figma-react/slider';
import { Swatch } from '@thinkbuff/figma-react/swatch';
import { Tooltip } from '@thinkbuff/figma-react/tooltip';

import { Demo } from '../demo';

type SliderProps = React.ComponentPropsWithRef<typeof Slider>;

function SliderDemo(props: SliderProps) {
  const [value, setValue] = useState(props.defaultValue ?? props.value ?? [50]);
  return (
    <div className={props.orientation === 'vertical' ? 'h-full' : 'w-52'}>
      <Slider
        {...props}
        value={value}
        onValueChange={(next) => setValue(next as number[])}
      />
    </div>
  );
}

function TooltipSlider() {
  const [values, setValues] = useState([20]);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-52">
      <SliderRoot
        value={values}
        onValueChange={(next) => setValues(next as number[])}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        {values.map((value, index) => (
          <Tooltip
            // oxlint-disable-next-line react/no-array-index-key
            key={index}
            open={showTooltip}
            content={<p>{value}</p>}
            delay={200}
          >
            <SliderThumb
              onMouseOver={() => setShowTooltip(true)}
              onMouseOut={() => setShowTooltip(false)}
            />
          </Tooltip>
        ))}
      </SliderRoot>
    </div>
  );
}

function Sliders() {
  return (
    <>
      <Demo label="Basic">
        <SliderDemo defaultValue={[50]} />
        <SliderDemo defaultValue={[0]} />
        <SliderDemo defaultValue={[0, 60]} />
        <SliderDemo defaultValue={[20, 60]} />
        <SliderDemo
          defaultValue={[50]}
          disabled
        />
        <div className="flex h-40 items-center gap-4">
          <SliderDemo
            orientation="vertical"
            defaultValue={[50]}
          />
          <SliderDemo
            orientation="vertical"
            defaultValue={[0]}
          />
          <SliderDemo
            orientation="vertical"
            defaultValue={[0, 60]}
          />
        </div>
      </Demo>
      <Demo label="Hints and delta">
        <SliderDemo
          defaultValue={[50]}
          hints={[0, 25, 50, 75, 100]}
        />
        <SliderDemo
          defaultValue={[62]}
          hints={[0, 25, 50, 75, 100]}
          baseValue={50}
        />
        <SliderDemo
          defaultValue={[50]}
          modified
        />
      </Demo>
      <Demo label="Color">
        <SliderDemo
          variant="hue"
          defaultValue={[210]}
          max={360}
        />
        <SliderDemo
          variant="opacity"
          fill="#9747ff"
          defaultValue={[60]}
        />
        <SliderDemo
          variant="gradient"
          fill="linear-gradient(to right, rgba(151, 71, 255, 0), #9747ff)"
          thumbFills={['rgba(151, 71, 255, 0.4)', '#9747ff']}
          defaultValue={[20, 80]}
        />
      </Demo>
      <Demo label="Composed with tooltip">
        <TooltipSlider />
      </Demo>
    </>
  );
}

function Swatches() {
  return (
    <>
      <Demo label="Fills">
        <Swatch fill="#ff24bd" />
        <Swatch fill="rgba(255, 36, 189, 0.4)" />
        <Swatch fill="linear-gradient(90deg, #ff24bd, #007be5)" />
        <Swatch fill="conic-gradient(#f24822, #ffcd29, #14ae5c, #007be5, #9747ff, #f24822)" />
        <Swatch fill="repeating-linear-gradient(45deg, #1e1e1e 0 4px, #ffcd29 4px 8px)" />
      </Demo>
      <Demo label="Opacity and circle">
        <Swatch
          type="opacity"
          fill="#ff24bd"
        />
        <Swatch
          type="opacity"
          fill="linear-gradient(90deg, #ff24bd, #007be5)"
        />
        <Swatch
          shape="circle"
          fill="#ff24bd"
        />
        <Swatch
          shape="circle"
          fill="conic-gradient(#f24822, #ffcd29, #14ae5c, #007be5, #9747ff, #f24822)"
        />
      </Demo>
    </>
  );
}

export { Sliders, Swatches };
