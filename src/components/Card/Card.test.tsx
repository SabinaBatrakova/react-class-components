import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  const mockPokemon = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  it('render name pokemon', () => {
    render(<Card pokemon={mockPokemon} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('render ID pokemon from URL', () => {
    render(<Card pokemon={mockPokemon} />);
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
