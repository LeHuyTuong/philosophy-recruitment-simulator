import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProductNavbar from '@/components/hireme/ProductNavbar';

describe('ProductNavbar', () => {
  it('renders compact product navigation and emits direct selections', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<ProductNavbar currentPage="landing" onSelect={onSelect} />);

    expect(screen.getByTestId('nav-brand')).toHaveTextContent('HireMe Lab');
    expect(screen.getByRole('button', { name: 'Trải nghiệm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lớp học' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Slide' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Học liệu' })).toBeInTheDocument();
    // 'Mở rộng' (extensions) removed from main nav by product cleanup
    expect(screen.queryByText('Flow tuyển dụng mô phỏng dành cho sinh viên.')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('product-nav-presentation-slides'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'presentation-slides' }));
  });

  it('opens classroom and learning dropdowns from compact triggers', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<ProductNavbar currentPage="landing" onSelect={onSelect} />);

    await user.click(screen.getByTestId('nav-group-classroom'));
    const classroomMenu = screen.getByTestId('product-nav-menu-classroom');
    expect(within(classroomMenu).getByRole('menuitem', { name: /Dashboard lớp/ })).toBeInTheDocument();
    expect(within(classroomMenu).getByRole('menuitem', { name: /Kết quả DB/ })).toBeInTheDocument();

    await user.click(within(classroomMenu).getByRole('menuitem', { name: /Dashboard lớp/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'class-dashboard' }));

    await user.click(screen.getByTestId('nav-group-learning'));
    const learningMenu = screen.getByTestId('product-nav-menu-learning');
    expect(within(learningMenu).getByRole('menuitem', { name: 'Trường phái' })).toBeInTheDocument();
    expect(within(learningMenu).getByRole('menuitem', { name: 'Tiêu chí đánh giá' })).toBeInTheDocument();
    expect(within(learningMenu).getByRole('menuitem', { name: 'AI Usage' })).toBeInTheDocument();
  });

  it('opens a compact mobile menu', async () => {
    const user = userEvent.setup();

    render(<ProductNavbar currentPage="landing" onSelect={vi.fn()} />);

    await user.click(screen.getByTestId('mobile-menu-button'));
    expect(screen.getByTestId('product-nav-mobile-menu')).toBeInTheDocument();
    expect(screen.getByTestId('product-nav-group-learning')).toHaveTextContent('Học liệu');
  });
});
