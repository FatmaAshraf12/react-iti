/* eslint-disable react/prop-types */
import { Component, ReactElement, ErrorInfo } from 'react';

type Props = {
  children: ReactElement;
};

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log(this.state);
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
