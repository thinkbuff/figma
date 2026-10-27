import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { VariableChip } from '~/components/variable-chip/variable-chip';

describe('VariableChip', () => {
  it('renders the elevated pill by default', async () => {
    const { container } = await render(<VariableChip>24</VariableChip>);
    const chip = container.firstElementChild as HTMLElement;
    expect(chip.className).toContain('bg-figma');
    expect(chip.className).toContain('border-figma');
    expect(chip).toHaveTextContent('24');
  });

  it('renders the selected ring state', async () => {
    const { container } = await render(<VariableChip selected>24</VariableChip>);
    const chip = container.firstElementChild as HTMLElement;
    expect(chip.className).toContain('bg-figma-selected');
    expect(chip.className).toContain('border-figma-border-selected');
    expect(chip.getAttribute('data-selected')).toBe('true');
  });

  it('renders the solid on-selected state', async () => {
    const { container } = await render(<VariableChip onSelected>24</VariableChip>);
    const chip = container.firstElementChild as HTMLElement;
    expect(chip.className).toContain('bg-figma-onselected');
    expect(chip.getAttribute('data-on-selected')).toBe('true');
  });

  it('renders the sunken variant', async () => {
    const { container } = await render(<VariableChip variant="sunken">24</VariableChip>);
    const chip = container.firstElementChild as HTMLElement;
    expect(chip.className).toContain('bg-figma-secondary');
  });

  it('renders the disabled text color', async () => {
    const { container } = await render(<VariableChip disabled>24</VariableChip>);
    const chip = container.firstElementChild as HTMLElement;
    expect(chip.className).toContain('text-figma-disabled');
    expect(chip.getAttribute('data-disabled')).toBe('true');
  });
});
