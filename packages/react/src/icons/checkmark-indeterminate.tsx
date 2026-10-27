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
      d="M4 8c0-.27614.22386-.5.5-.5h7c.27614 0 .5.22386.5.5s-.22386.5-.5.5h-7c-.27614 0-.5-.22386-.5-.5Z"
    />
  ),
});
