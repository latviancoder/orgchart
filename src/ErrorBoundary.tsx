import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallback: ReactNode }>,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren<{ fallback: ReactNode }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
