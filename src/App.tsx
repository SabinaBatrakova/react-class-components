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

    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemons: data.results, isLoading: false });
      });
  }

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <Main pokemons={this.state.pokemons} />
      </div>
    );
  }
}
export default App;
