import usePokemonStore from '../../store/store';
import Flyout from './Flyout';
import { render, screen } from '@testing-library/react';

describe('Flyout', () => {
  it('should not render when no pokemons selected', () => {
    render(<Flyout />);
    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  it('should render when pokemons selected', () => {
    usePokemonStore.setState({
      pokemons: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    });
    render(<Flyout />);
    expect(screen.getByText(/items selected/i)).toBeInTheDocument();
  });

  it('when unselect  all clicked => clear pokemons', () => {
    usePokemonStore.setState({
      pokemons: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    });
    render(<Flyout />);
    screen.getByText('Unselect all').click();
    expect(usePokemonStore.getState().pokemons).toEqual([]);
  });
});
