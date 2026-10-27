import { createIcon } from './create-icon';

export const FolderIcon = createIcon({
  displayName: 'Folder',
  path: (
    <path
      fill="none"
      stroke="var(--color-icon, currentColor)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4 17.75V6.5A1.25 1.25 0 0 1 5.25 5.25h4l2 2.5h7.5A1.25 1.25 0 0 1 20 9v8.75a1.25 1.25 0 0 1-1.25 1.25H5.25A1.25 1.25 0 0 1 4 17.75z"
    />
  ),
});
