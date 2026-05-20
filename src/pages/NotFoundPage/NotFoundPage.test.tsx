import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { BrowserRouter } from 'react-router-dom';

describe('NotFoundPage', () => {
  it('display link about return to the main page', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Return to the main page')).toBeInTheDocument();
  });

  it('display 404 problem', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(screen.getByText('404 - page not found')).toBeInTheDocument();
  });
});
