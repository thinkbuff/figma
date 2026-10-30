import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<'icon-color'>({
  extend: {
    theme: {
      text: [
        'figma-body-small',
        'figma-body-small-strong',
        'figma-body-medium',
        'figma-body-medium-strong',
        'figma-body-large',
        'figma-body-large-strong',
        'figma-heading-small',
        'figma-heading-medium',
        'figma-heading-large',
        'figma-heading-display',
      ],
      font: ['figma', 'figma-code', 'figma-display'],
    },
    classGroups: {
      'font-weight': [{ font: ['figma-default', 'figma-medium', 'figma-strong', 'figma-heavy'] }],
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
