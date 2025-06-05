'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>          <p className="text-gray-600 mb-4">
            Our LEGO bricks got a bit mixed up! Don&apos;t worry, we can fix this.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-red-50 p-4 rounded-lg mb-4">
              <summary className="font-semibold text-red-700 cursor-pointer">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-red-600 mt-2 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
            <Link
            href="/"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
