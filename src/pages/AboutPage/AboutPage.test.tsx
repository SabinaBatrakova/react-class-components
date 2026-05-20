import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';
import { BrowserRouter } from 'react-router-dom';

describe('AboutPage', () => {
  it('display RS School link', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );
    expect(screen.getByText('RS School')).toBeInTheDocument();
  });

  it('display name author', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Sabina Batrakova')).toBeInTheDocument();
  });
});
