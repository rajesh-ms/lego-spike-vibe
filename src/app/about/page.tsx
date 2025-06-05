'use client';

import { Book, Users, Target, Code, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧱</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About LEGO Programming</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A fun and interactive way for kids to learn programming with LEGO SPIKE Prime robots!
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We believe that programming should be accessible, fun, and engaging for young learners. 
              By combining the creativity of LEGO building with the power of Python programming, 
              we create an environment where kids can learn valuable STEM skills while having fun.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">For Young Learners</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Designed specifically for 10-year-old children, our curriculum breaks down complex 
              programming concepts into bite-sized, digestible lessons. Each unit builds upon 
              the previous one, ensuring a smooth learning journey from basics to advanced topics.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What You&apos;ll Learn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Python Programming</h3>
              <p className="text-gray-600">Learn the fundamentals of Python programming through hands-on coding exercises.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Robot Control</h3>
              <p className="text-gray-600">Control LEGO SPIKE Prime robots with motors, sensors, and interactive components.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Problem Solving</h3>
              <p className="text-gray-600">Develop critical thinking and problem-solving skills through coding challenges.</p>
            </div>
          </div>
        </div>

        {/* Curriculum Overview */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Learning Units</h2>
          <div className="space-y-4">
            {[
              { title: "Overview", description: "Introduction to LEGO SPIKE Prime and programming concepts" },
              { title: "Software and Hub", description: "Getting familiar with the LEGO SPIKE app and hub" },
              { title: "Introduction to Python", description: "Basic Python programming concepts and syntax" },
              { title: "Movement", description: "Programming motors and controlling robot movement" },
              { title: "Sensors and Outputs", description: "Working with sensors, lights, and sounds" },
              { title: "Advanced Programming", description: "Complex projects and advanced algorithms" }
            ].map((unit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{unit.title}</h3>
                  <p className="text-gray-600 text-sm">{unit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credits Section */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-8">
          <div className="text-center">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Credits & Acknowledgments</h2>
            <p className="text-gray-600 mb-6">
              This educational platform is based on the excellent curriculum from PrimeLessons.org, 
              adapted for online learning with interactive coding capabilities.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://primelessons.org/en/PyLessons.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                <ExternalLink size={20} />
                Visit PrimeLessons.org
              </a>
              <Link
                href="/units"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                <Book size={20} />
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
