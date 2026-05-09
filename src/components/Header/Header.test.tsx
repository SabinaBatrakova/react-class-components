import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('check that input is show', () => {
    render(<Header onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
  it('shows saved value from localStorage', () => {
    localStorage.setItem('searchValue', 'pikachu');
    render(<Header onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });
});
