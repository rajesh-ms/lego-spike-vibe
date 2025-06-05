'use client';

import { Blocks } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Blocks className="w-16 h-16 text-red-500 animate-bounce mx-auto" />
          <div className="absolute inset-0 w-16 h-16 bg-red-500 rounded-lg opacity-20 animate-ping mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading LEGO Vibe</h2>
        <p className="text-gray-600">Preparing your programming adventure...</p>
        <div className="mt-4">
          <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
