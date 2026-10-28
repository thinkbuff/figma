import { describe, expect, it } from 'vitest';

import devmodeLight from '../../theme/tokens/colors/devmode-light.json';
import figjamDark from '../../theme/tokens/colors/figjam-dark.json';
import figjamLight from '../../theme/tokens/colors/figjam-light.json';
import figmaDark from '../../theme/tokens/colors/figma-dark.json';
import figmaLight from '../../theme/tokens/colors/figma-light.json';
import slidesDark from '../../theme/tokens/colors/slides-dark.json';

const ALL_CLASSES = ['figma-light', 'figma-dark', 'figjam', 'devmode', 'slides'];

function brand() {
  return getComputedStyle(document.body).getPropertyValue('--figma-color-bg-brand');
}

function clear() {
  document.documentElement.classList.remove(...ALL_CLASSES);
  document.body.classList.remove(...ALL_CLASSES);
}

describe('editor theme selectors', () => {
  it('resolves --figma-color-bg-brand per editor + mode class combination', async () => {
    document.body.style.margin = '0';
    const cases: [string[], string][] = [
      [[], figmaLight['bg-brand'].value],
      [['figma-dark'], figmaDark['bg-brand'].value],
      [['figjam'], figjamLight['bg-brand'].value],
      [['figma-dark', 'figjam'], figjamDark['bg-brand'].value],
      [['devmode'], devmodeLight['bg-brand'].value],
      [['figma-dark', 'slides'], slidesDark['bg-brand'].value],
    ];
    for (const [classes, expected] of cases) {
      clear();
      document.documentElement.classList.add(...classes);
      expect(brand()).toBe(expected);
    }
    clear();
  });
});
