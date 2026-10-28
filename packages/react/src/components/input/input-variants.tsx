import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'w-full',
    'text-figma-body-medium',
    'text-figma',
    'fill-figma-icon',
    'cursor-default',
    'bg-figma-secondary',
    'bg-clip-border',
    'outline-solid',
    'outline-1',
    '-outline-offset-1',
    'outline-transparent',
    'rounded-figma-md',
    'placeholder:text-figma-tertiary',
    'focus:outline-figma-border-selected',
  ],
  {
    variants: {
      variant: {
        default: ['not-disabled:not-focus:hover:outline-figma-border'],
        border: ['outline-figma-border'],
      },
      invalid: {
        true: ['fill-figma-icon-danger', 'outline-figma-border-danger'],
        false: '',
      },
      disabled: {
        true: [
          'cursor-not-allowed',
          'text-figma-disabled',
          'fill-figma-icon-disabled',
          'bg-figma',
          'outline-figma-border-disabled',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        invalid: true,
        disabled: false,
        className: ['focus:outline-figma-border-danger'],
      },
    ],
    defaultVariants: {
      variant: 'default',
      invalid: false,
      disabled: false,
    },
  },
);

export type InputVariantsProps = VariantProps<typeof inputVariants>;
