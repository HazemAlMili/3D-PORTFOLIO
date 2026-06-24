import { Component, ErrorInfo, ReactNode } from "react";
import { CanvasFallback } from "./CanvasFallback";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Canvas error caught by boundary:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return <CanvasFallback />;
    }

    return this.props.children;
  }
}
