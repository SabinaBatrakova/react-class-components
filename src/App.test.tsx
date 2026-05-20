import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          ],
        }),
    });
  });
  it('loads pokemons on mount', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('shows error when fetch fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Error: 404')).toBeInTheDocument();
    });
  });

  it('search saved value from localstorage on mount', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: 'pikachu',
          id: 25,
        }),
    });
    localStorage.setItem('searchValue', 'pikachu');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });
});
