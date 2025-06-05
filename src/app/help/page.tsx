import { HelpCircle, BookOpen, Settings } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to get started with LEGO programming!
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">🚀 Quick Start Guide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Learning</h3>
              <p className="text-gray-600 text-sm">Visit the Units page and begin with the Overview unit</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Lessons</h3>
              <p className="text-gray-600 text-sm">Complete lessons in order for the best learning experience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Try the Code</h3>
              <p className="text-gray-600 text-sm">Use the Python editor to experiment with code examples</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">4️⃣</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice</h3>
              <p className="text-gray-600 text-sm">Use the Playground to create your own programs</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* For Kids */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">For Young Programmers</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🤔 What is LEGO SPIKE Prime?</h3>
                <p className="text-gray-600 text-sm">
                  LEGO SPIKE Prime is a cool robot kit that you can build and program with Python code! 
                  It has motors, sensors, and lights that you can control.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">💻 How do I use the code editor?</h3>
                <p className="text-gray-600 text-sm">
                  Click in the code area and start typing! Press the &quot;Run Code&quot; button to test your programs. 
                  Don&apos;t worry about making mistakes - that&apos;s how we learn!
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🧩 What if I get stuck?</h3>
                <p className="text-gray-600 text-sm">
                  Look for the yellow &quot;Hints&quot; button in the code editor, or ask a grown-up for help. 
                  You can also start over with the &quot;Reset&quot; button.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🏆 How do I earn achievements?</h3>
                <p className="text-gray-600 text-sm">
                  Complete lessons, write code, and explore! Check your Progress page to see how you&apos;re doing 
                  and what achievements you&apos;ve unlocked.
                </p>
              </div>
            </div>
          </div>

          {/* For Parents/Teachers */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <HelpCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">For Parents & Teachers</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📚 Curriculum Overview</h3>
                <p className="text-gray-600 text-sm">
                  This course covers 6 units progressing from basic concepts to advanced programming. 
                  Each lesson takes approximately 30-45 minutes to complete.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🎯 Learning Objectives</h3>
                <p className="text-gray-600 text-sm">
                  Students learn Python programming basics, problem-solving skills, and computational thinking 
                  through hands-on robotics projects.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🛠️ Required Equipment</h3>
                <p className="text-gray-600 text-sm">
                  While this website provides simulation, real LEGO SPIKE Prime hardware is needed for 
                  physical robot programming. Code can be copied to the official LEGO app.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📊 Progress Tracking</h3>
                <p className="text-gray-600 text-sm">
                  Monitor student progress through the Progress page, which shows completed lessons, 
                  achievements, and overall learning statistics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Settings className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Troubleshooting</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Common Issues</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Code won&apos;t run:</strong> Check for typos and proper indentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Page won&apos;t load:</strong> Refresh the browser or check internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Progress not saving:</strong> Make sure browser cookies are enabled</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Code editor too small:</strong> Use fullscreen mode or zoom out</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Tips for Success</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Take breaks between lessons to avoid fatigue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Experiment with code examples to understand better</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Use the Playground to practice new concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Don&apos;t rush - understanding is more important than speed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Resources */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6 text-white/90">
            This website is based on the excellent curriculum from PrimeLessons.org
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://primelessons.org/en/PyLessons.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Visit PrimeLessons.org
            </a>
            <Link
              href="/about"
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Learn More About This Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
