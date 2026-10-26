/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const AlignTopIcon = createIcon({
  displayName: 'AlignTop',
  path: (
    <>
      <path
        fill="var(--color-icon, currentColor)"
        fillRule="evenodd"
        d="M10 17.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-8.5A.75.75 0 0 1 8.75 8h.5a.75.75 0 0 1 .75.75zm5-4a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75z"
        clipRule="evenodd"
      />
      <path
        fill="var(--color-icon-tertiary)"
        d="M17.5 6a.5.5 0 0 0 0-1h-12a.5.5 0 0 0 0 1z"
      />
    </>
  ),
});
