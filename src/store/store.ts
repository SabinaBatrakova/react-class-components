import { create } from 'zustand';
import type { Pokemon } from '../types';

interface PokemonStore {
  pokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemon: Pokemon) => void;
}

const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],

  addPokemon: (pokemon: Pokemon) =>
    set((state: { pokemons: Pokemon[] }) => ({
      pokemons: [...state.pokemons, pokemon],
    })),
  removePokemon: (pokemon: Pokemon) =>
    set((state: { pokemons: Pokemon[] }) => ({
      pokemons: state.pokemons.filter((p) => p.url !== pokemon.url),
    })),
}));

export default usePokemonStore;
