'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component to avoid SSR issues
const UnitsClient = dynamic(() => import('./UnitsClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading units...</p>
      </div>
    </div>
  )
});

export default function UnitsPage() {
  return <UnitsClient />;
}
