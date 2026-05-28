import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonDetailPage from './PokemonDetailPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let queryClient: QueryClient;

describe('PokemonDetailPage', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('render nothing when no details in URL', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/?details=25']}>
          <PokemonDetailPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  it('shows pokemon info after loading', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: 'pikachu',
          height: 4,
          sprites: { front_default: 'img.png' },
          abilities: [{ ability: { name: 'static' } }],
        }),
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/?details=25']}>
          <PokemonDetailPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });
});
