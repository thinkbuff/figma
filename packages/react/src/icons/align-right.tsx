/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const AlignRightIcon = createIcon({
  displayName: 'AlignRight',
  path: (
    <>
      <path
        fill="var(--color-icon, currentColor)"
        fillRule="evenodd"
        d="M6.75 10A.75.75 0 0 1 6 9.25v-.5A.75.75 0 0 1 6.75 8h8.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75zm4 5a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75z"
        clipRule="evenodd"
      />
      <path
        fill="var(--color-icon-tertiary)"
        d="M18 17.5a.5.5 0 0 0 1 0v-12a.5.5 0 0 0-1 0z"
      />
    </>
  ),
});
