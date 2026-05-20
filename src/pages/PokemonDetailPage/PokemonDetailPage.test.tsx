import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonDetailPage from './PokemonDetailPage';

describe('PokemonDetailPage', () => {
  it('render nothing when no details in URL', () => {
    render(
      <MemoryRouter initialEntries={['/?details=25']}>
        <PokemonDetailPage />
      </MemoryRouter>
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
      <MemoryRouter initialEntries={['/?details=25']}>
        <PokemonDetailPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });
});
