import '../../src/test-utils/styles.css';
import { setProjectAnnotations } from '@storybook/react-vite';

import preview from '../../.storybook/preview';

setProjectAnnotations(preview);

// toMatchScreenshot has no `animations` option — freeze them globally so
// entrance/exit animations never produce one-pixel diffs.
const style = document.createElement('style');
style.textContent = `*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
}`;
document.head.append(style);
