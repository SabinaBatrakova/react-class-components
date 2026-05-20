import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnNext = vi.fn();
  const mockOnPrev = vi.fn();

  it('renders page number', () => {
    render(<Pagination page={1} onNext={mockOnNext} onPrev={mockOnPrev} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onNext when Next clicked', () => {
    render(<Pagination page={1} onNext={mockOnNext} onPrev={mockOnPrev} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it('calls onPrev when Prev clicked', () => {
    render(<Pagination page={2} onNext={mockOnNext} onPrev={mockOnPrev} />);
    fireEvent.click(screen.getByText('Prev'));
    expect(mockOnPrev).toHaveBeenCalled();
  });
});
