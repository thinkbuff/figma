import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['figma-xs', 'figma-sm', 'figma-md', 'figma-lg'],
      font: ['figma', 'figma-code'],
    },
    classGroups: {
      'font-weight': [{ font: ['figma-default', 'figma-strong'] }],
    },
  },
});

/**
 * Merge classes
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
