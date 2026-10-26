/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const CheckmarkIndeterminateIcon = createIcon({
  displayName: 'CheckmarkIndeterminate',
  viewBox: '0 0 16 16',
  path: (
    <path
      fill="var(--color-icon, currentColor)"
      d="M4 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
    />
  ),
});
