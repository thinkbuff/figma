import { page, type Locator, type UserEventClickOptions } from 'vitest/browser';

/**
 * Whether an element is in the "on" state.
 *
 * Works across underlying primitive implementations that express the state
 * via `aria-pressed` (toggle-style) or `aria-checked` (radio-style).
 */
export function isOn(element: Element): boolean {
  return (
    element.getAttribute('aria-pressed') === 'true' ||
    element.getAttribute('aria-checked') === 'true'
  );
}

/**
 * Locate a toggle-group item by its accessible name regardless of the role
 * the underlying primitive assigns to it (`button` or `radio`).
 */
export function getToggleable(name: string | RegExp): Locator {
  return page.getByRole('button', { name }).or(page.getByRole('radio', { name }));
}

/**
 * Extract the first argument a mock was last called with.
 */
export function firstArg<T = unknown>(fn: { mock: { calls: unknown[][] } }): T {
  const call = fn.mock.calls.at(-1);
  if (!call) {
    throw new Error('mock was not called');
  }
  return call[0] as T;
}

/**
 * Click a locator while skipping actionability checks (e.g. for elements
 * with `pointer-events: none`).
 */
export function clickForce(locator: Locator) {
  return locator.click({ force: true } as UserEventClickOptions);
}

/**
 * Perform a real click at the given position relative to the element's
 * top-left corner. Useful for simulating "outside" pointer interactions.
 */
export function clickAt(locator: Locator, x: number, y: number) {
  return locator.click({ force: true, position: { x, y } } as UserEventClickOptions);
}

/**
 * Click outside of any overlay content, near the top-left corner of the page.
 */
export function clickOutside() {
  return clickAt(page.elementLocator(document.body), 4, 4);
}

/**
 * Whether an element is actually rendered on screen — visible and larger
 * than a pixel. Visually-hidden accessibility helpers clip themselves to
 * a tiny area, which `checkVisibility()` alone does not detect.
 */
export function isRendered(element: Element): boolean {
  const rect = (element as HTMLElement).getBoundingClientRect();
  return (element as HTMLElement).checkVisibility() && rect.width > 1 && rect.height > 1;
}

/**
 * Whether at least one element matched by the locator is rendered.
 * Useful when a locator can match both visible and visually-hidden elements.
 */
export function anyVisible(locator: Locator): boolean {
  return locator.elements().some((element) => isRendered(element));
}

/**
 * Whether no element matched by the locator is rendered.
 */
export function noneVisible(locator: Locator): boolean {
  return locator.elements().every((element) => !isRendered(element));
}

/**
 * Dispatch a keydown event to the focused element through the DOM.
 *
 * Real CDP key events are preferred via `userEvent.keyboard`, but Radix
 * roving-focus groups stop responding to them once a real pointer click
 * has happened in the page — this exercises the same React handlers.
 */
export function pressKey(key: string, options: KeyboardEventInit = {}) {
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key, ...options }),
  );
}
