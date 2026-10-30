import { createIcon } from './create-icon';

export const LinkBrokenIcon = createIcon({
  displayName: 'LinkBroken',
  path: (
    <g
      fill="none"
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      strokeWidth="1.5"
    >
      <path d="M14.7 7.8a4.05 4.05 0 0 1 6 6" />
      <path d="M9.3 16.2a4.05 4.05 0 0 1-6-6" />
      <path d="M6.3 6.3l2.1 2.1" />
      <path d="M15.6 15.6l2.1 2.1" />
    </g>
  ),
});
