/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const CircleIcon = createIcon({
  displayName: 'Circle',
  viewBox: '0 0 16 16',
  path: (
    <circle
      fill="var(--color-icon, currentColor)"
      cx="8"
      cy="8"
      r="3"
    />
  ),
});
