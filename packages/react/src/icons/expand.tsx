/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */
import { createIcon } from './create-icon';

export const ExpandIcon = createIcon({
  displayName: 'Expand',
  path: (
    <path
      fill="var(--color-icon, currentColor)"
      fillRule="evenodd"
      d="m17 7.707-3.146 3.147a.5.5 0 0 1-.708-.708L16.293 7H13.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0zm-6.854 5.44a.5.5 0 0 1 .708.707L7.707 17H10.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793z"
      clipRule="evenodd"
    />
  ),
});
