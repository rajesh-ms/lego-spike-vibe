'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, BookOpen, Award, ArrowLeft } from 'lucide-react';
import { curriculum } from '@/data/curriculum';

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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Learning Units
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Master LEGO SPIKE Prime programming step by step. Each unit builds on the previous one to take you from beginner to robot programming expert!
            </p>
          </motion.div>
        </div>

        {/* Units Grid */}
        <div className="grid gap-8">
          {curriculum.units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/units/${unit.id}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-8 border-gradient-to-b from-red-400 to-yellow-400 hover:scale-[1.02]">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Unit Number and Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-yellow-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Unit Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-red-500 transition-colors mb-3">
                            {unit.title}
                          </h2>
                          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                            {unit.description}
                          </p>
                          
                          {/* Stats */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{unit.lessons.length} lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {unit.lessons.reduce((total, lesson) => total + (lesson.estimatedTime || 30), 0)} min
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span>Beginner Friendly</span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 self-start md:self-center">
                          <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-red-500 group-hover:translate-x-2 transition-all duration-300" />
                        </div>
                      </div>

                      {/* Lesson Preview */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-semibold text-gray-700 mb-3">What you&apos;ll learn:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {unit.lessons.slice(0, 4).map((lesson) => (
                            <div key={lesson.id} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                              <span>{lesson.title}</span>
                            </div>
                          ))}
                          {unit.lessons.length > 4 && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                              <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
                              <span>+{unit.lessons.length - 4} more lessons</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your LEGO Programming Journey?</h3>
          <p className="text-lg mb-6 text-white/90">
            Begin with Unit 1 and work your way through each lesson at your own pace!
          </p>
          <Link 
            href="/units/overview"
            className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Start with Unit 1
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
