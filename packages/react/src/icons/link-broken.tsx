import { createIcon } from './create-icon';

export const LinkBrokenIcon = createIcon({
  displayName: 'LinkBroken',
  path: (
    <g
      fill="none"
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      strokeWidth="1"
    >
      <path d="M9.8 5.2a2.7 2.7 0 0 1 4 4" />
      <path d="M6.2 10.8a2.7 2.7 0 0 1-4-4" />
      <path d="M4.2 4.2l1.4 1.4" />
      <path d="M10.4 10.4l1.4 1.4" />
    </g>
  ),
});
