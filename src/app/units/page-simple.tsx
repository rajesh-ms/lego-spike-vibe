import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

export default function UnitsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Learning Units
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Master LEGO SPIKE Prime programming step by step. Each unit builds on the previous one to take you from beginner to robot programming expert!
            </p>
          </div>
        </div>

        {/* Units - Static for now */}
        <div className="grid gap-8">
          {/* Unit 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-yellow-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  1
                </div>
              </div>
              
              <div className="flex-grow">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Overview
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  Introduction to LEGO SPIKE Prime and programming concepts
                </p>
                
                <div className="flex flex-wrap gap-6 text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>4 lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>~2 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Link
                  href="/units/overview"
                  className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Start Unit
                </Link>
              </div>
            </div>
          </div>

          {/* More units coming soon */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">🚀 More Units Coming Soon!</h2>
            <p className="text-xl mb-6">
              Additional learning units including Python basics, movement, sensors, and advanced programming will be available after deployment.
            </p>
            <Link 
              href="/demo" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200 inline-block"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
