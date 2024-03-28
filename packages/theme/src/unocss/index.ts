import { definePreset } from 'unocss';

import { generateCSSVariables } from '../colors';
import { THEME_BASE_CSS } from '../constants';

import { rules } from './rules';

export interface PresetFigmaOptions {
  /**
   * Whether to generate preflights for the figma theme
   * @default 'figma'
   */
  preflight?: 'figma' | 'figjam' | 'all' | false;
}

/**
 * Figma theme css rules for unocss preset
 */
export const presetFigma = definePreset((options: PresetFigmaOptions = {}) => {
  const { preflight = 'figma' } = options;
  return {
    name: 'unocss-preset-figma',
    rules,
    preflights: typeof preflight === 'string' && ['figma', 'figjam', 'all'].includes(preflight)
      ? [
          {
            layer: 'preflights',
            async getCSS() {
              if (preflight === 'all') {
                return [generateCSSVariables('figma'), generateCSSVariables('figjam'), THEME_BASE_CSS].join('\n');
              }

              return [generateCSSVariables(preflight), THEME_BASE_CSS].join('\n');
            },
          },
        ]
      : [],
  };
});

export default presetFigma;
