/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const CloseIcon = createIcon({
  displayName: 'Close',
  path: (
    <path
      stroke="var(--color-icon, currentColor)"
      d="M16.5 7.5L12 12M12 12L7.5 16.5M12 12L7.5 7.5M12 12L16.5 16.5"
      strokeLinecap="round"
    />
  ),
});
