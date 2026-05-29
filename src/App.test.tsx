import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let queryClient: QueryClient;
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

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });
  it('loads pokemons on mount', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
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
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
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
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });
});
