import * as React from "react";
import ErrorCard from "../ErrorCard";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    console.log(_);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorCard
          title='Oops'
          subTitle='Something went wrong!'
          description='Error reported to the team, we will look into it. please refresh the page'
          buttonText='Refresh'
          onClick={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}
