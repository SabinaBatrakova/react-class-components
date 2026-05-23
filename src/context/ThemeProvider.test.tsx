import { render, screen } from '@testing-library/react';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>test</div>
      </ThemeProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
