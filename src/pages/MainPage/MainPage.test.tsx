import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';

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
  });

  it('Check loading pokemons mount', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('check spinner on loading', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('handle search', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
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
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Error: 404')).toBeInTheDocument();
    });
  });
});
