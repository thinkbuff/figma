import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'h-8',
    'px-3',
    'inline-flex',
    'items-center',
    'justify-center',
    'shrink-0',
    'rounded-1.5',
    'font-size-11',
    'truncate',
    'font-medium',
    'border-none',
    'cursor-default',
    'transition-colors',
    'outline-solid',
    'outline-1',
    '-outline-offset-1',
    'outline-transparent',
    'bg-transparent',
    'bg-clip-border',
    'not-disabled:focus-visible:(outline-2 -outline-offset-2)',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        solid: [
          'focus:not-focus-visible:(outline-0 outline-transparent)',
          'disabled:(text-figma-ondisabled bg-figma-disabled)',
          'disabled:hover:bg-figma-disabled',
          'disabled:active:(bg-figma-disabled outline-transparent)',
          'disabled:focus-visible:outline-transparent',
        ],
        outline: [
          'disabled:(text-figma-disabled bg-transparent outline-figma-text-disabled)',
          'disabled:hover:bg-transparent',
          'disabled:active:bg-transparent',
        ],
        link: [
          'hover:underline',
          'disabled:(text-figma-disabled no-underline)',
        ],
      },
      color: {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'btn-success',
        warning: 'btn-warning',
        danger: 'btn-danger',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        className: [
          'text-figma-onbrand',
          'bg-figma-brand',
          'hover:bg-figma-brand-hover',
          'active:bg-figma-brand-pressed',
          'focus-visible:outline-figma-border-brand-strong',
          'data-[state=open]:bg-figma-brand-pressed',
        ],
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: [
          'text-figma',
          'bg-figma-secondary',
          'hover:bg-figma-tertiary',
          'active:bg-figma-tertiary',
          'focus-visible:outline-figma-border-brand-strong',
          'data-[state=open]:bg-figma-brand-pressed',
        ],
      },
      {
        variant: 'solid',
        color: 'success',
        className: [
          'text-figma-onsuccess',
          'bg-figma-success',
          'hover:bg-figma-success-hover',
          'active:bg-figma-success-pressed',
          'focus-visible:outline-figma-border-success-strong',
          'data-[state=open]:bg-figma-success-pressed',
        ],
      },
      {
        variant: 'solid',
        color: 'warning',
        className: [
          'text-figma-onwarning',
          'bg-figma-warning',
          'hover:bg-figma-warning-hover',
          'active:bg-figma-warning-pressed',
          'focus-visible:outline-figma-border-warning-strong',
          'data-[state=open]:bg-figma-warning-pressed',
        ],
      },
      {
        variant: 'solid',
        color: 'danger',
        className: [
          'text-figma-ondanger',
          'bg-figma-danger',
          'hover:bg-figma-danger-hover',
          'active:bg-figma-danger-pressed',
          'focus-visible:outline-figma-border-danger-strong',
          'data-[state=open]:bg-figma-danger-pressed',
        ],
      },
      {
        variant: 'outline',
        color: 'primary',
        className: [
          'text-figma-brand',
          'outline-figma-text-brand',
          'hover:bg-figma-brand-tertiary',
          'active:bg-figma-brand-tertiary',
          'focus-visible:outline-figma-border-brand-strong',
          'data-[state=open]:bg-figma-brand-tertiary',
        ],
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: [
          'text-figma',
          'outline-figma-text',
          'hover:bg-figma-pressed',
          'active:bg-figma-pressed',
          'focus-visible:outline-figma-border-brand-strong',
          'data-[state=open]:bg-figma-pressed',
        ],
      },
      {
        variant: 'outline',
        color: 'success',
        className: [
          'text-figma-success',
          'outline-figma-text-success',
          'hover:bg-figma-success-tertiary',
          'active:bg-figma-success-tertiary',
          'focus-visible:outline-figma-border-success-strong',
          'data-[state=open]:bg-figma-success-tertiary',
        ],
      },
      {
        variant: 'outline',
        color: 'warning',
        className: [
          'text-figma-warning',
          'outline-figma-text-warning',
          'hover:bg-figma-warning-tertiary',
          'active:bg-figma-warning-tertiary',
          'focus-visible:outline-figma-border-warning-strong',
          'data-[state=open]:bg-figma-warning-tertiary',
        ],
      },
      {
        variant: 'outline',
        color: 'danger',
        className: [
          'text-figma-danger',
          'outline-figma-text-danger',
          'hover:bg-figma-danger-tertiary',
          'active:bg-figma-danger-tertiary',
          'focus-visible:outline-figma-border-danger-strong',
          'data-[state=open]:bg-figma-danger-tertiary',
        ],
      },
      {
        variant: 'link',
        color: 'primary',
        className: ['text-figma-brand-secondary'],
      },
      {
        variant: 'link',
        color: 'secondary',
        className: ['text-figma'],
      },
      {
        variant: 'link',
        color: 'success',
        className: ['text-figma-success'],
      },
      {
        variant: 'link',
        color: 'warning',
        className: ['text-figma-warning'],
      },
      {
        variant: 'link',
        color: 'danger',
        className: ['text-figma-danger'],
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
    },
  },
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
