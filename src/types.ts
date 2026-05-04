export interface Pokemon {
  name: string;
  url: string;
}

export type ApiAnswer = {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
};

export type AppState = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
};

export interface MainProps {
  pokemons: Pokemon[];
}

export interface CardListProps {
  pokemons: Pokemon[];
}

export interface CardProps {
  pokemon: Pokemon;
}
