import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
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
  it('loading, no error, no data', () => {
    render(<Main isLoading={true} error={null} pokemons={mockPokemon} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('loading stopped, have error', () => {
    render(
      <Main isLoading={false} error="Error: 404" pokemons={mockPokemon} />
    );
    expect(screen.getByText('Error: 404')).toBeInTheDocument();
  });
  it('loading stopped, no error, have data', () => {
    render(<Main isLoading={false} error={null} pokemons={mockPokemon} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });
});
