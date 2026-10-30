import { useState } from 'react';

import { Checkbox } from '@thinkbuff/figma-react/checkbox';
import { Label } from '@thinkbuff/figma-react/label';
import { Radio } from '@thinkbuff/figma-react/radio';
import { Switch } from '@thinkbuff/figma-react/switch';

import { Demo } from '../demo';

function Checks() {
  const [checked, setChecked] = useState(true);
  const [switched, setSwitched] = useState(true);

  return (
    <>
      <Demo label="Checkbox">
        {(['default', 'muted', 'ghost'] as const).map((variant) => (
          <div
            key={variant}
            className="flex items-center gap-2"
          >
            <Checkbox
              id={`checkbox-${variant}`}
              variant={variant}
              checked={checked}
              onCheckedChange={setChecked}
            />
            <Label htmlFor={`checkbox-${variant}`}>{variant}</Label>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Checkbox
            id="checkbox-mixed"
            indeterminate
          />
          <Label htmlFor="checkbox-mixed">indeterminate</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="checkbox-disabled"
            disabled
          />
          <Label htmlFor="checkbox-disabled">disabled</Label>
        </div>
      </Demo>
      <Demo label="Switch">
        <div className="flex items-center gap-1">
          <Switch
            id="switch-on"
            checked={switched}
            onCheckedChange={setSwitched}
          />
          <Label htmlFor="switch-on">Test mode</Label>
        </div>
        <div className="flex items-center gap-1">
          <Switch
            id="switch-mixed"
            indeterminate
          />
          <Label htmlFor="switch-mixed">Mixed</Label>
        </div>
        <div className="flex items-center gap-1">
          <Switch
            id="switch-disabled"
            disabled
          />
          <Label htmlFor="switch-disabled">Disabled</Label>
        </div>
      </Demo>
    </>
  );
}

function Radios() {
  const [notify, setNotify] = useState('all');
  const [align, setAlign] = useState('left');

  const options = [
    { value: 'all', label: 'All comments, mentions, and replies' },
    { value: 'only', label: 'Only mentions and replies' },
    { value: 'none', label: 'None' },
  ];

  return (
    <>
      <Demo
        label="Radio group"
        className="items-start"
      >
        <Radio.Group
          className="gap-3"
          value={notify}
          onValueChange={(value) => setNotify(value as string)}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2"
            >
              <Radio.GroupItem
                id={`radio-${option.value}`}
                value={option.value}
              />
              <Label htmlFor={`radio-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </Radio.Group>
        <Radio.Group
          inline
          className="gap-3"
          value={notify}
          onValueChange={(value) => setNotify(value as string)}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2"
            >
              <Radio.GroupItem
                id={`radio-inline-${option.value}`}
                value={option.value}
              />
              <Label htmlFor={`radio-inline-${option.value}`}>{option.value}</Label>
            </div>
          ))}
        </Radio.Group>
      </Demo>
      <Demo label="Button variant">
        <Radio.Group
          className="w-56 gap-2"
          value={align}
          onValueChange={(value) => setAlign(value as string)}
        >
          {['left', 'center', 'right'].map((option) => (
            <Radio.GroupItem
              key={option}
              value={option}
              variant="button"
            >
              {option}
            </Radio.GroupItem>
          ))}
          <Radio.GroupItem
            value="disabled"
            variant="button"
            disabled
          >
            Disabled
          </Radio.GroupItem>
        </Radio.Group>
      </Demo>
    </>
  );
}

export { Checks, Radios };
