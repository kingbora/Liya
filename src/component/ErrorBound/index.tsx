import React, { ErrorInfo } from 'react';

interface ErrorBoundProps {
  children: React.ReactNode;
  renderError?: (error: any) => React.ReactElement;
}
interface ErrorBoundState {
  hasError?: boolean;
  error?: any;
}

export default class extends React.PureComponent<
  ErrorBoundProps,
  ErrorBoundState
> {
  constructor(props: ErrorBoundProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.error(error, errorInfo);
    }

    // collect erorr data
  }

  render() {
    if (this.state.hasError) {
      const render = this.props.renderError;
      if (__DEV__ && render) {
        return render(this.state.error);
      } else {
        return null;
      }
    } else {
      return this.props.children;
    }
  }
}
