import { createIcon } from './create-icon';

export const MailIcon = createIcon({
  displayName: 'Mail',
  path: (
    <g
      fill="none"
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M4.5 6.25h15a1.25 1.25 0 0 1 1.25 1.25v9a1.25 1.25 0 0 1-1.25 1.25h-15a1.25 1.25 0 0 1-1.25-1.25v-9a1.25 1.25 0 0 1 1.25-1.25z" />
      <path d="M4 7.5l8 6 8-6" />
    </g>
  ),
});
