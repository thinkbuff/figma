import { useState } from 'react';

import {
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  EllipsisIcon,
  MinusIcon,
  PlayIcon,
  PlusIcon,
  TextAlignJustifiedIcon,
} from '@thinkbuff/figma-react';
import { ActionIcon } from '@thinkbuff/figma-react/action-icon';
import { ActionIconSplit } from '@thinkbuff/figma-react/action-icon-split';
import { Button } from '@thinkbuff/figma-react/button';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlText,
} from '@thinkbuff/figma-react/segmented-control';
import { Tabs } from '@thinkbuff/figma-react/tabs';
import { Toggle } from '@thinkbuff/figma-react/toggle';
import { ToggleGroup, ToggleGroupItem, ToggleGroupText } from '@thinkbuff/figma-react/toggle-group';

import { Demo } from '../demo';

const buttonVariants = [
  'primary',
  'secondary',
  'destructive',
  'secondary-destructive',
  'inverse',
  'success',
  'figjam',
  'link',
  'link-danger',
  'ghost',
] as const;

function Buttons() {
  return (
    <>
      <Demo label="Variants">
        {buttonVariants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
          >
            {variant}
          </Button>
        ))}
      </Demo>
      <Demo label="Sizes and icon">
        <Button size="large">Large</Button>
        <Button
          size="wide"
          variant="secondary"
        >
          Wide
        </Button>
        <Button
          variant="secondary"
          icon={<PlusIcon size="4" />}
        >
          With icon
        </Button>
        <Button disabled>Disabled</Button>
      </Demo>
    </>
  );
}

function ActionIcons() {
  return (
    <>
      <Demo label="Action icon">
        <ActionIcon aria-label="Add">
          <PlusIcon size="3" />
        </ActionIcon>
        <ActionIcon
          aria-label="Add"
          variant="secondary"
        >
          <PlusIcon size="3" />
        </ActionIcon>
        <ActionIcon
          aria-label="Add"
          size="medium"
        >
          <PlusIcon size="3" />
        </ActionIcon>
        <ActionIcon
          aria-label="Open"
          aria-expanded="true"
        >
          <EllipsisIcon size="3" />
        </ActionIcon>
        <ActionIcon
          aria-label="Add"
          disabled
        >
          <PlusIcon size="3" />
        </ActionIcon>
      </Demo>
      <Demo label="Split action icon">
        <ActionIconSplit.Root>
          <ActionIconSplit.Button aria-label="Run">
            <PlayIcon size="3" />
          </ActionIconSplit.Button>
          <ActionIconSplit.Chevron aria-label="More options" />
        </ActionIconSplit.Root>
        <ActionIconSplit.Root size="large">
          <ActionIconSplit.Button aria-label="Run">
            <PlayIcon size="4" />
          </ActionIconSplit.Button>
          <ActionIconSplit.Chevron aria-label="More options" />
        </ActionIconSplit.Root>
      </Demo>
    </>
  );
}

const alignOptions = [
  { value: 'left', label: 'Align left', icon: <AlignLeftIcon size="4" /> },
  { value: 'center', label: 'Align center', icon: <AlignHorizontalCenterIcon size="4" /> },
  { value: 'right', label: 'Align right', icon: <AlignRightIcon size="4" /> },
  { value: 'justify', label: 'Align justify', icon: <TextAlignJustifiedIcon size="4" /> },
];

function Toggles() {
  const [pressed, setPressed] = useState(false);
  const [format, setFormat] = useState<string[]>(['bold']);

  return (
    <>
      <Demo label="Toggle">
        <Toggle
          aria-label="More options"
          pressed={pressed}
          onPressedChange={setPressed}
        >
          <EllipsisIcon size="4" />
        </Toggle>
        <Toggle
          aria-label="More options"
          variant="secondary"
          pressed={pressed}
          onPressedChange={setPressed}
        >
          <EllipsisIcon size="4" />
        </Toggle>
        <Toggle
          aria-label="More options"
          variant="default"
          pressed={pressed}
          onPressedChange={setPressed}
        >
          <EllipsisIcon size="4" />
        </Toggle>
      </Demo>
      <Demo label="Toggle group">
        <ToggleGroup
          multiple
          value={format}
          onValueChange={setFormat}
        >
          <ToggleGroupItem
            value="bold"
            aria-label="Bold"
          >
            <span className="font-figma-strong">B</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Italic"
          >
            <span className="italic">I</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Underline"
          >
            <span className="underline">U</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['minimalist']}>
          <ToggleGroupItem value="minimalist">
            <ToggleGroupText>Minimalist</ToggleGroupText>
          </ToggleGroupItem>
          <ToggleGroupItem value="modern">
            <ToggleGroupText>Modern</ToggleGroupText>
          </ToggleGroupItem>
          <ToggleGroupItem value="retro">
            <ToggleGroupText>Retro</ToggleGroupText>
          </ToggleGroupItem>
        </ToggleGroup>
      </Demo>
      <Demo label="Segmented control">
        <SegmentedControl defaultValue="left">
          {alignOptions.map((option) => (
            <SegmentedControlItem
              key={option.value}
              value={option.value}
              aria-label={option.label}
            >
              {option.icon}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
        <div className="w-42">
          <SegmentedControl
            fullWidth
            defaultValue="auto"
          >
            <SegmentedControlItem
              value="auto"
              aria-label="Auto"
            >
              <MinusIcon size="4" />
            </SegmentedControlItem>
            {['17', '17', '17'].map((label, i) => (
              <SegmentedControlItem
                key={i}
                value={`v${i}`}
              >
                <SegmentedControlText>{label}</SegmentedControlText>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </div>
      </Demo>
    </>
  );
}

function TabsDemo() {
  const tabs = [
    { value: 'all', content: 'All comments, mentions, and replies' },
    { value: 'only', content: 'Only mentions and replies' },
    { value: 'none', content: 'None' },
  ];

  return (
    <>
      <Demo
        label="Default"
        className="flex-col items-stretch gap-4"
      >
        <Tabs.Root
          defaultValue="all"
          className="w-72"
        >
          <Tabs.List className="h-9 w-full justify-start">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
              >
                {tab.value}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div className="flex p-2 text-figma-secondary">
            {tabs.map((tab) => (
              <Tabs.Content
                key={tab.value}
                value={tab.value}
              >
                {tab.content}
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </Demo>
      <Demo
        label="Scrollable"
        className="flex-col items-stretch gap-4"
      >
        <Tabs.Root
          defaultValue="first"
          className="w-48"
        >
          <Tabs.List
            scrollable
            className="h-9"
          >
            {['first', 'second', 'third', 'fourth'].map((value) => (
              <Tabs.Trigger
                key={value}
                value={value}
              >
                {value} tab
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Demo>
    </>
  );
}

export { ActionIcons, Buttons, TabsDemo, Toggles };
