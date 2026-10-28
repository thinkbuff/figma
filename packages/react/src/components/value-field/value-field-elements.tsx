/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import * as React from 'react';

import { cn, createContext } from '~/utils';

type ValueFieldScrubTarget = {
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  startScrub: () => void;
  scrub: (movementX: number, event: PointerEvent) => void;
};

type ValueFieldContext = {
  disabled?: boolean;
  /**
   * Whether the field is rendered inside `ValueField.Multi`. Root/Base read this
   * to swap the standalone chrome for the in-multi cell styling, replacing the
   * descendant-selector overrides from the reference CSS.
   */
  inMulti?: boolean;
  scrubbing: boolean;
  scrubTargetsRef: React.RefObject<ValueFieldScrubTarget[]>;
  registerScrubTarget: (target: ValueFieldScrubTarget | null) => () => void;
  setScrubbing: (scrubbing: boolean) => void;
};

const [ValueFieldProvider, useValueFieldContext] = createContext<ValueFieldContext | null>(
  'ValueFieldProvider',
  null,
);

interface RootProps extends React.ComponentPropsWithRef<'label'> {
  disabled?: boolean;
}

function Root({ className, disabled, ref, children, ...props }: RootProps) {
  const context = useValueFieldContext('Root');
  const providerValue = useValueFieldProviderValue(disabled, context);

  return (
    <ValueFieldProvider {...providerValue}>
      <label
        ref={ref}
        className={cn(
          'relative flex h-6 items-center',
          'font-figma text-figma-body-medium font-figma-default',
          'text-figma',
          context?.inMulti
            ? [
                '-mt-px grow min-w-0',
                'rounded-none bg-transparent outline-0',
                'first:rounded-l-figma-md last:rounded-r-figma-md',
                'not-first:border-l not-first:border-figma-bg',
              ]
            : [
                'rounded-figma-md overflow-clip',
                'bg-figma-secondary',
                'outline-1 -outline-offset-1 outline-solid outline-transparent',
                'not-data-disabled:hover:outline-figma-border',
                'focus-within:outline-figma-border-selected',
                'data-disabled:bg-figma data-disabled:outline-figma-border-disabled',
              ],
          'data-disabled:text-figma-disabled',
          className,
        )}
        data-disabled={providerValue.disabled ? '' : undefined}
        data-scrubbing={providerValue.scrubbing ? '' : undefined}
        {...props}
      >
        {children}
      </label>
    </ValueFieldProvider>
  );
}

interface MultiProps extends React.ComponentPropsWithRef<'div'> {
  disabled?: boolean;
}

function Multi({ className, disabled, ref, ...props }: MultiProps) {
  const context = useValueFieldContext('Multi');
  const providerValue = useValueFieldProviderValue(disabled, context, true);

  return (
    <ValueFieldProvider {...providerValue}>
      <div
        ref={ref}
        className={cn(
          'relative flex h-6',
          'rounded-figma-md border border-transparent bg-figma-secondary',
          'after:absolute after:-inset-px after:rounded-[inherit] after:border',
          'after:border-transparent after:-outline-offset-1 after:pointer-events-none',
          'not-data-disabled:hover:after:border-figma-border',
          'focus-within:after:outline-1 focus-within:after:outline-solid focus-within:after:outline-figma-border-selected',
          'data-disabled:bg-figma data-disabled:after:border-figma-border-disabled',
          className,
        )}
        data-disabled={providerValue.disabled ? '' : undefined}
        data-scrubbing={providerValue.scrubbing ? '' : undefined}
        {...props}
      />
    </ValueFieldProvider>
  );
}

type LabelProps = React.ComponentPropsWithRef<'span'>;

function Label({ className, ref, ...props }: LabelProps) {
  const context = useValueFieldContext('Label');

  return (
    <span
      ref={ref}
      className={cn(
        'flex size-6 shrink-0 items-center justify-center self-stretch',
        'text-figma-secondary icon-figma-secondary',
        // A leading label's input sits flush against the cell — the spec pads
        // text to the icon cell edge, not past it. In a Multi cell the input's
        // own 4px inset supplies the inter-cell gap instead.
        // Suffix labels sit narrower; labels nested in a Scrubber keep size-6.
        // The parent <label> element is the Root.
        context?.inMulti ? '' : '[&+input]:pl-0',
        '[label>&]:last:w-5',
        'data-disabled:text-figma-disabled data-disabled:icon-figma-disabled',
        className,
      )}
      data-disabled={context?.disabled ? '' : undefined}
      {...props}
    />
  );
}

Root.displayName = 'ValueField.Root';
Label.displayName = 'ValueField.Label';
Multi.displayName = 'ValueField.Multi';

function useValueFieldProviderValue(
  disabled: boolean | undefined,
  context: ValueFieldContext | null,
  inMulti = false,
) {
  const [scrubbing, setScrubbing] = React.useState(false);
  const scrubTargetsRef = React.useRef<ValueFieldScrubTarget[]>([]);
  const inheritedDisabled = disabled || context?.disabled ? true : undefined;
  const inMultiValue = inMulti || context?.inMulti ? true : undefined;

  const registerScrubTarget = React.useCallback((target: ValueFieldScrubTarget | null) => {
    if (!target) {
      return () => {};
    }

    scrubTargetsRef.current = [
      ...scrubTargetsRef.current.filter((item) => item !== target),
      target,
    ];

    return () => {
      scrubTargetsRef.current = scrubTargetsRef.current.filter((item) => item !== target);
    };
  }, []);

  return React.useMemo(
    () => ({
      disabled: inheritedDisabled,
      inMulti: inMultiValue,
      scrubbing,
      scrubTargetsRef,
      registerScrubTarget,
      setScrubbing,
    }),
    [inMultiValue, inheritedDisabled, registerScrubTarget, scrubbing],
  );
}

export { Label, Multi, Root, useValueFieldContext };
export type { LabelProps, MultiProps, RootProps, ValueFieldContext, ValueFieldScrubTarget };
