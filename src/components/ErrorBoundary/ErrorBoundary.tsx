import { Component } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center h-screen text-blue-600 font-bold">
          Something wrong...
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
