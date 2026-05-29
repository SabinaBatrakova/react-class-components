import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let queryClient: QueryClient;

describe('MainPage', () => {
  beforeEach(() => {
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

  it('Check loading pokemons mount', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('check spinner on loading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('handle search', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: 'bulbasaur',
          id: 1,
        }),
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(screen.getByText('Search'));
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
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
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Error: 404')).toBeInTheDocument();
    });
  });
});
