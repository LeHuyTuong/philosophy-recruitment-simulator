import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProductNavbar from '@/components/hireme/ProductNavbar';
import { productNavItems } from '@/data/productNavItems';

describe('ProductNavbar', () => {
  it('renders all product modules and emits selection', async () => {
    const onSelect = vi.fn();
    render(<ProductNavbar currentPage="landing" onSelect={onSelect} />);

    for (const item of productNavItems) {
      expect(screen.getByRole('button', { name: new RegExp(item.label) })).toBeInTheDocument();
    }

    await userEvent.click(screen.getByTestId('product-nav-presentation-slides'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'presentation-slides' }));
  });
});
