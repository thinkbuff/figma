export const SharedFoundationVariables = {
  '--figma-font-family-default':
    '"Inter", ui-sans-serif, system-ui, -apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif, "SFProLocalRange"',
  '--figma-font-family-code':
    '"SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
  '--figma-font-weight-default': '450',
  '--figma-font-weight-strong': '550',
  // Typography scale is ordered by rendered size, not semantic importance.
  // `sm` stays mapped to 11px to match create-figma-plugin and existing `text-figma-sm` usage.
  '--figma-font-size-xs': '.625rem', // 10px
  '--figma-line-height-xs': '.875rem', // 14px
  '--figma-letter-spacing-xs': '.00344rem',
  '--figma-font-size-sm': '.6875rem', // 11px
  '--figma-line-height-sm': '1rem', // 16px
  '--figma-letter-spacing-sm': '.00344rem', // 0.055px
  '--figma-font-size-md': '.75rem', // 12px
  '--figma-line-height-md': '1.25rem', // 20px
  '--figma-letter-spacing-md': '-.00125rem',
  '--figma-font-size-lg': '.8125rem', // 13px
  '--figma-line-height-lg': '1.375rem', // 22px
  '--figma-letter-spacing-lg': '-.002rem', // -0.032px
  '--figma-radius-sm': '.125rem', // 2px
  '--figma-radius-md': '.3125rem', // 5px
  '--figma-radius-lg': '.8125rem', // 13px
  '--figma-radius-full': '9999px',
  '--figma-space-0': '0', // 0px
  '--figma-space-0\\.5': '.125rem', // 2px
  '--figma-space-1': '.25rem', // 4px
  '--figma-space-1\\.5': '.375rem', // 6px
  '--figma-space-2': '.5rem', // 8px
  '--figma-space-2\\.5': '.75rem', // 12px
  '--figma-space-3': '1rem', // 16px
  '--figma-space-4': '1.5rem', // 24px
  '--figma-space-5': '1.25rem', // 20px
  '--figma-space-6': '1.75rem', // 28px
  '--figma-space-7': '2rem', // 32px
  '--figma-border-width-1': '1px',
  '--figma-border-width-4': '.25rem', // 4px
  '--figma-duration-100': '100ms',
  '--figma-duration-200': '200ms',
  '--figma-duration-300': '300ms',
  '--figma-opacity-disabled': '0.3',
  '--figma-opacity-50': '0.5',
  '--figma-z-index-1': '1',
  '--figma-z-index-2': '2',
  '--figma-z-index-dropdown': '10',
  '--figma-z-index-modal': '50',
  '--figma-z-index-tooltip': '100',
  '--figma-shadow-tooltip': '0 1px 3px 0 #0000001a, 0 5px 12px 0 #00000021, 0 0 0.5px 0 #00000026',
  '--figma-shadow-menu': '0 2px 5px 0 #00000026, 0 10px 16px 0 #0000001f, 0 0 0.5px 0 #0000001f',
  '--figma-shadow-modal': '0 2px 5px 0 #00000026, 0 10px 24px 0 #0000002e, 0 0 0.5px 0 #00000014',
  '--figma-shadow-slider':
    '0 1px 3px 0 #0000001a, 0 3px 8px 0 #0000001a, 0 0 0.5px 0 #0000002e, inset 0 0 0 0.5px #0000001a',
} as const;

export type SharedFoundationVariableKey = keyof typeof SharedFoundationVariables;
