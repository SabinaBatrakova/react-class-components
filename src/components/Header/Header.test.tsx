import { render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('check that input is show', () => {
    render(
      <BrowserRouter>
        <Header onSearch={mockOnSearch} />
      </BrowserRouter>
    );
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
  it('shows saved value from localStorage', () => {
    localStorage.setItem('searchValue', 'pikachu');
    render(
      <BrowserRouter>
        <Header onSearch={mockOnSearch} />
      </BrowserRouter>
    );
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });
});
