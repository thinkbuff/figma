// UI3 elevation scale, copied from figma-kit tokens/shadow.css.
// Emitted inside the per-theme blocks (NOT @theme) so `var(--figma-elevation-*)`
// resolves against the nearest .figma-light/.figma-dark/.figjam scope.
export const LightElevationCSSVariables = {
  '--figma-elevation-100': '0px 0px 0.5px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.15)',
  '--figma-elevation-200':
    '0px 0px 0.5px rgba(0, 0, 0, 0.18), 0px 3px 8px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1)',
  '--figma-elevation-300':
    '0px 0px 0.5px rgba(0, 0, 0, 0.15), 0px 5px 12px rgba(0, 0, 0, 0.13), 0px 1px 3px rgba(0, 0, 0, 0.1)',
  '--figma-elevation-400':
    '0px 0px 0.5px rgba(0, 0, 0, 0.12), 0px 10px 16px rgba(0, 0, 0, 0.12), 0px 2px 5px rgba(0, 0, 0, 0.15)',
  '--figma-elevation-500':
    '0px 0px 0.5px rgba(0, 0, 0, 0.08), 0px 10px 24px rgba(0, 0, 0, 0.18), 0px 2px 5px rgba(0, 0, 0, 0.15)',
} as const;

export const DarkElevationCSSVariables = {
  '--figma-elevation-100':
    '0px 0px 0.5px rgba(0, 0, 0, 0.5), 0px 1px 3px rgba(0, 0, 0, 0.4), inset 0px 0.5px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 0.5px rgba(255, 255, 255, 0.3)',
  '--figma-elevation-200':
    '0px 3px 8px rgba(0, 0, 0, 0.35), 0px 1px 3px rgba(0, 0, 0, 0.5), inset 0px 0.5px 0px rgba(255, 255, 255, 0.08), inset 0px 0px 0.5px rgba(255, 255, 255, 0.3)',
  '--figma-elevation-300':
    '0px 5px 12px rgba(0, 0, 0, 0.35), 0px 1px 3px rgba(0, 0, 0, 0.5), inset 0px 0.5px 0px rgba(255, 255, 255, 0.08), inset 0px 0px 0.5px rgba(255, 255, 255, 0.3)',
  '--figma-elevation-400':
    '0px 10px 16px rgba(0, 0, 0, 0.35), 0px 2px 5px rgba(0, 0, 0, 0.35), inset 0px 0.5px 0px rgba(255, 255, 255, 0.08), inset 0px 0px 0.5px rgba(255, 255, 255, 0.35)',
  '--figma-elevation-500':
    '0px 10px 24px rgba(0, 0, 0, 0.45), 0px 3px 5px rgba(0, 0, 0, 0.35), inset 0px 0.5px 0px rgba(255, 255, 255, 0.08), inset 0px 0px 0.5px rgba(255, 255, 255, 0.35)',
} as const;

// Legacy shadow vars stay theme-scoped so var(--figma-elevation-*) resolves per theme.
export const LegacyElevationShadowVariables = {
  '--figma-shadow-tooltip': 'var(--figma-elevation-300)',
  '--figma-shadow-menu': 'var(--figma-elevation-400)',
  '--figma-shadow-modal': 'var(--figma-elevation-500)',
} as const;
