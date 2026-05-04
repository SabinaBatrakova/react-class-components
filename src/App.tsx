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
    this.setState({ isLoading: true, error: null });
    localStorage.setItem('searchValue', value);
    if (!value) {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pokemons: data.results, isLoading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
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
        })
        .catch((error) => {
          this.setState({ error: error.message, isLoading: false });
        });
    }
  };

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header onSearch={this.handleSearch} />
        <Main
          pokemons={this.state.pokemons}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
      </div>
    );
  }
}
export default App;
