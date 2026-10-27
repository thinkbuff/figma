import { createIcon } from './create-icon';

export const PageIcon = createIcon({
  displayName: 'Page',
  path: (
    <g
      fill="none"
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M14 4H7a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5V8.5L14 4z" />
      <path d="M14 4v4.5h4.5" />
    </g>
  ),
});
