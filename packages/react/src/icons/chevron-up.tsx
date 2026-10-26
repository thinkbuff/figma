/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const ChevronUpIcon = createIcon({
  displayName: 'ChevronUp',
  path: (
    <path
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      d="M14.121 12.879L12 10.757L9.87903 12.88"
    />
  ),
});
