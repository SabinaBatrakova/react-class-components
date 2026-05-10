import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search', () => {
  const mockOnSearch = vi.fn();
  const mocklInitialValue = 'pikachu';

  it('render Search', () => {
    render(<Search onSearch={mockOnSearch} initValue="" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('render Search button', () => {
    render(<Search onSearch={mockOnSearch} initValue="" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('input field show value', () => {
    render(<Search onSearch={mockOnSearch} initValue={mocklInitialValue} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('changing input value? when user types', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} initValue="" />);

    await user.type(screen.getByRole('textbox'), mocklInitialValue);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('click calls onSearch', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} initValue="" />);

    await user.type(screen.getByRole('textbox'), mocklInitialValue);
    await user.click(screen.getByRole('button'));
    expect(mockOnSearch).toHaveBeenCalledWith(mocklInitialValue);
  });
});
