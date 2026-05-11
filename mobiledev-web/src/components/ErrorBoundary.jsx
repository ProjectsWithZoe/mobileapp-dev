import { Component } from "react";
import { Sentry } from "../lib/sentry";

const ORANGE = "#EA580C"
const AMBER  = "#FB923C"
const BROWN  = "#1C0A02"
const BROWN3 = "#9A6040"
const BG     = "#FFFBF7"
const SURF2  = "#FFF5EC"
const BORDER = "#E8CFBA"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
    Sentry.captureException(error, {
      extra: { componentStack: info.componentStack },
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: BG, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center gap-1.5 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: BROWN3 }}>
              runtime error
            </p>
            <h1 className="text-xl leading-snug" style={{ color: BROWN, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>
              Something went wrong
            </h1>
            <p className="text-sm mt-2" style={{ color: BROWN3 }}>
              An unexpected error occurred. Your work is safe — refresh the page
              or click below to try again.
            </p>
          </div>

          {this.state.error && (
            <details className="text-left">
              <summary className="text-xs cursor-pointer select-none transition-colors" style={{ color: BROWN3 }}>
                Show error detail
              </summary>
              <pre
                className="mt-2 p-3 rounded-xl text-xs whitespace-pre-wrap break-all leading-relaxed overflow-auto max-h-40"
                style={{ backgroundColor: SURF2, border: `1px solid ${BORDER}`, color: '#DC2626' }}
              >
                {this.state.error.message}
              </pre>
            </details>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={this.handleReset}
              className="text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-150 active:scale-95 text-white"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${AMBER})` }}
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-2 rounded-xl font-semibold transition-all duration-150 active:scale-95"
              style={{ border: `1px solid ${BORDER}`, color: BROWN3, background: 'none' }}
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
