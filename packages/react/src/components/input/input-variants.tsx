import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'w-full',
    'text-figma-sm leading-figma-sm',
    'text-figma',
    'fill-figma-icon',
    'cursor-default',
    'bg-figma',
    'bg-clip-border',
    'border',
    'outline-solid',
    'outline-1',
    '-outline-offset-2',
    'outline-transparent',
    'rounded-figma-sm',
    'placeholder:text-figma-tertiary',
    'focus:border-figma-selected focus:outline-figma-border-selected',
  ],
  {
    variants: {
      variant: {
        default: ['border-transparent', 'not-focus:hover:border-figma'],
        border: ['border-figma'],
      },
      invalid: {
        true: ['fill-figma-icon-danger', 'border-figma-danger'],
        false: '',
      },
      disabled: {
        true: ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled'],
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        disabled: true,
        className: [
          'border-transparent',
          'focus:border-transparent focus:outline-transparent',
          'not-focus:hover:border-transparent',
        ],
      },
      {
        variant: 'border',
        disabled: true,
        className: [
          'border-figma-disabled',
          'focus:border-figma-disabled focus:outline-transparent',
        ],
      },
      {
        disabled: false,
        invalid: true,
        className: [
          'focus:border-figma-danger focus:outline-figma-transparent',
          'not-focus:hover:border-figma-danger',
        ],
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
