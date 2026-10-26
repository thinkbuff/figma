/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const ChevronLeftIcon = createIcon({
  displayName: 'ChevronLeft',
  path: (
    <path
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      d="M12.879 9.879L10.757 12L12.88 14.121"
    />
  ),
});
