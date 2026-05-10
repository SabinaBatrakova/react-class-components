import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const BrokenComponent = () => {
    throw new Error('Test error');
  };

  it('show children when have not error', () => {
    render(
      <ErrorBoundary>
        <div>Hi</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  it('show "Something wrong..." when error appierance', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something wrong...')).toBeInTheDocument();
  });
});
