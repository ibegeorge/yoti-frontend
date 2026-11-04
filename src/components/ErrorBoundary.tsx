import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("YOTI rendering error", error, info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <div className="confirmation panel" role="alert">
          <h1>Let’s try again. / Réessayons.</h1>
          <p>
            The demo could not display this view. Reload to reset fictional
            session data.
            <br />
            La démo n’a pas pu afficher cette vue. Rechargez pour réinitialiser
            les données fictives.
          </p>
          <button
            className="button primary"
            onClick={() => window.location.reload()}
          >
            Reload / Recharger
          </button>
        </div>
      );
    return this.props.children;
  }
}
