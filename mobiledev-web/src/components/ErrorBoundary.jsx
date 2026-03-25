import { Component } from "react";
import { Sentry } from "../lib/sentry";

/**
 * Top-level error boundary — catches any render/lifecycle error in its subtree
 * and shows a styled fallback instead of a blank white screen.
 *
 * Must be a class component; React has no hook equivalent for componentDidCatch.
 */
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
        style={{ backgroundColor: "#030712", fontFamily: "'IBM Plex Mono', monospace" }}
      >
        <div className="max-w-md w-full text-center space-y-6">
          {/* Traffic-light dots — matches the app's own top bar */}
          <div className="flex justify-center gap-1.5 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          </div>

          <div>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">
              runtime error
            </p>
            <h1 className="text-white text-xl font-bold leading-snug">
              Something went wrong
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              An unexpected error occurred. Your work is safe — refresh the page
              or click below to try again.
            </p>
          </div>

          {/* Collapsed error detail for developers */}
          {this.state.error && (
            <details className="text-left">
              <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-400 transition-colors select-none">
                Show error detail
              </summary>
              <pre className="mt-2 p-3 rounded-xl bg-gray-900 border border-gray-800 text-xs text-red-400 whitespace-pre-wrap break-all leading-relaxed overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            </details>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={this.handleReset}
              className="text-sm px-4 py-2 rounded-xl font-bold transition-all duration-150 active:scale-95"
              style={{ backgroundColor: "#6C63FF", color: "white" }}
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-2 rounded-xl font-bold border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-150 active:scale-95"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
