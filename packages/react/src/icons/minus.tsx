import { createIcon } from './create-icon';

export const MinusIcon = createIcon({
  displayName: 'Minus',
  path: (
    <path
      fill="var(--color-icon, currentColor)"
      fillRule="evenodd"
      d="M6 12a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 6 12"
      clipRule="evenodd"
    />
  ),
});
