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
  throwError: boolean;
};

export interface MainProps {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

export interface CardListProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

export interface CardProps {
  pokemon: Pokemon;
}

export interface SearchProps {
  onSearch: (value: string) => void;
  initValue: string;
}

export interface SearchState {
  searchValue: string;
}

export interface HeaderProps {
  onSearch: (term: string) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
