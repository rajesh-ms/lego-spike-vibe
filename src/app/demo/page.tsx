'use client';

import Link from 'next/link';
import { ArrowLeft, TestTube } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the client component to avoid SSR issues
const DemoClient = dynamic(() => import('./DemoClient'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function DemoPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - server rendered */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <TestTube className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Component Demo
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Test all the interactive components and features of the LEGO programming platform.
            </p>
          </div>
        </div>

        {/* Client component */}
        <DemoClient />
      </div>
    </div>
  );
}
