/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import type { ClassValue } from 'clsx';

import { cn } from './cn';

type ClassName<State> = string | ((state: State) => string | undefined) | undefined;

function addClassName(className: string | undefined, ...values: ClassValue[]): string;
function addClassName<State>(
  className: ClassName<State>,
  ...values: ClassValue[]
): ClassName<State>;
/**
 * Merges component classes into a `className` prop while preserving the
 * callback form (`(state) => string`) that Base UI parts accept.
 */
function addClassName<State>(
  className: ClassName<State>,
  ...values: ClassValue[]
): ClassName<State> {
  if (typeof className === 'function') {
    return (state) => cn(values, className(state));
  }

  return cn(values, className);
}

export type { ClassName };
export { addClassName };
