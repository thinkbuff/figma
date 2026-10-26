import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<'icon-color'>({
  extend: {
    theme: {
      text: [
        'figma-xs',
        'figma-sm',
        'figma-md',
        'figma-lg',
        'figma-body-small',
        'figma-body-medium',
        'figma-body-large',
        'figma-heading-small',
        'figma-heading-medium',
        'figma-heading-large',
      ],
      font: ['figma', 'figma-code'],
    },
    classGroups: {
      'font-weight': [{ font: ['figma-default', 'figma-strong'] }],
      'icon-color': [{ icon: [(classPart: string) => classPart.startsWith('figma')] }],
    },
  },
});

/**
 * Merge classes
 *
 * @param inputs
 *
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
