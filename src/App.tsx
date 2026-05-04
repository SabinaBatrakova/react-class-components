import { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import type { AppState } from './types';

class App extends Component {
  state: AppState = {
    pokemons: [],
    isLoading: false,
    error: null,
  };

  componentDidMount(): void {
    this.setState({ isLoading: true });

    const savedSearch = localStorage.getItem('searchValue');

    if (savedSearch) {
      this.handleSearch(savedSearch);
    } else {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pokemons: data.results, isLoading: false });
        });
    }
  }

  handleSearch = (value: string): void => {
    this.setState({ isLoading: true });
    localStorage.setItem('searchValue', value);
    if (!value) {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pokemons: data.results, isLoading: false });
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            pokemons: [
              {
                name: data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
              },
            ],
            isLoading: false,
          });
        });
    }
  };

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header onSearch={this.handleSearch} />
        <Main pokemons={this.state.pokemons} isLoading={this.state.isLoading} />
      </div>
    );
  }
}
export default App;
