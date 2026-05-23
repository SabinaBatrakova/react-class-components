import usePokemonStore from './store';

describe('Store', () => {
  beforeEach(() => {
    usePokemonStore.setState({ pokemons: [] });
  });
  it('Check initial state pokemons', () => {
    const state = usePokemonStore.getState();
    expect(state.pokemons).toEqual([]);
  });

  it('Check adding pokemons to massive', () => {
    const pokemon = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };
    usePokemonStore.getState().addPokemon(pokemon);
    const state = usePokemonStore.getState();
    expect(state.pokemons).toContain(pokemon);
  });

  it('Check removining pokemons to massive', () => {
    const pokemon = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };
    usePokemonStore.getState().removePokemon(pokemon);
    const state = usePokemonStore.getState();
    expect(state.pokemons).not.toContain(pokemon);
  });

  it('Check clear pokemons in massive', () => {
    usePokemonStore.getState().clearPokemons();
    const state = usePokemonStore.getState();
    expect(state.pokemons).toEqual([]);
  });
});
