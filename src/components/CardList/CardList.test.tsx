import { render, screen } from '@testing-library/react';
import CardList from './CardList';

describe('CardList', () => {
  const mockPokemon = [
    {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ];

  it('render name pokemon', () => {
    render(<CardList pokemons={mockPokemon} isLoading={false} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });
  it('not render name pokemon, when massive empty', () => {
    render(<CardList pokemons={[]} isLoading={false} />);
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });
});
