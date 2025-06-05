'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-yellow-400 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-8xl mb-4">🧱</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
          <h2 className="text-xl text-gray-600 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-6">
            Looks like this LEGO piece is missing! Don&apos;t worry, we can help you find your way back.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
