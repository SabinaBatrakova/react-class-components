import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  const mockPokemon = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };
  const mockOnSelect = vi.fn();

  it('render name pokemon', () => {
    render(<Card pokemon={mockPokemon} onSelect={mockOnSelect} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('render ID pokemon from URL', () => {
    render(<Card pokemon={mockPokemon} onSelect={mockOnSelect} />);
    expect(screen.getByText('25')).toBeInTheDocument();
  });
  it('calls onSelect when clicked', () => {
    render(<Card pokemon={mockPokemon} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Pikachu'));
    expect(mockOnSelect).toHaveBeenCalledWith('25');
  });
});
