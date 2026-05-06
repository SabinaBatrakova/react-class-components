import { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import type { AppState } from './types';

class App extends Component {
  prevSearch: string = '';
  state: AppState = {
    pokemons: [],
    isLoading: false,
    error: null,
    throwError: false,
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
    const trimmedValue = value.trim();
    if (this.prevSearch === trimmedValue) {
      return;
    } else {
      this.prevSearch = trimmedValue;
      localStorage.setItem('searchValue', trimmedValue);
    }

    this.setState({ isLoading: true, error: null });

    if (!trimmedValue) {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ pokemons: data.results, isLoading: false });
        })
        .catch((error) => {
          this.setState({ error: error.message, isLoading: false });
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${trimmedValue}`)
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
    if (this.state.throwError) {
      throw new Error('Test error');
    }
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header onSearch={this.handleSearch} />
        <Main
          pokemons={this.state.pokemons}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
        <button
          className="fixed bottom-4 right-4 px-4 py-2 bg-amber-600 text-white rounded-3xl cursor-pointer hover:bg-amber-700"
          onClick={() => this.setState({ throwError: true })}
        >
          Test Error
        </button>
      </div>
    );
  }
}
export default App;
