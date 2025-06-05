'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, BookOpen, Code, ArrowLeft, Play, Trophy } from 'lucide-react';
import { curriculum } from '@/data/curriculum';

interface UnitPageClientProps {
  unitId: string;
}

export default function UnitPageClient({ unitId }: UnitPageClientProps) {
  const unit = curriculum.units.find(u => u.id === unitId);
  
  if (!unit) {
    return <div>Unit not found</div>;
  }

  const unitIndex = curriculum.units.findIndex(u => u.id === unitId);
  const nextUnit = curriculum.units[unitIndex + 1];
  const prevUnit = curriculum.units[unitIndex - 1];
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/units"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Units
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-yellow-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {unitIndex + 1}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                {unit.title}
              </h1>
              <p className="text-xl text-gray-600">
                {unit.description}
              </p>
            </div>
          </motion.div>
          
          {/* Unit Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-wrap gap-6 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-500" />
              <span>{unit.lessons.length} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              <span>
                {unit.lessons.reduce((total, lesson) => total + (lesson.estimatedTime || 30), 0)} minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-red-500" />
              <span>Beginner Friendly</span>
            </div>
          </motion.div>
        </div>

        {/* Lessons List */}
        <div className="grid gap-6 mb-12">
          {unit.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/units/${unit.id}/lessons/${lesson.id}`}>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-400 hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    {/* Lesson Number */}
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    {/* Lesson Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-500 transition-colors mb-2">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {lesson.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.estimatedTime || 30} min</span>
                            </div>
                            {lesson.type === 'coding' && (
                              <div className="flex items-center gap-1">
                                <Code className="w-4 h-4" />
                                <span>Coding Exercise</span>
                              </div>
                            )}
                            {lesson.difficulty && (
                              <div className="flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                <span className="capitalize">{lesson.difficulty}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Action */}
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            {lesson.type === 'coding' ? 'Interactive' : 'Learn'}
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between gap-4"
        >
          {/* Previous Unit */}
          {prevUnit && (
            <Link
              href={`/units/${prevUnit.id}`}
              className="group flex items-center gap-3 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-200 flex-1"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              <div>
                <div className="text-sm text-gray-500">Previous Unit</div>
                <div className="font-semibold text-gray-800 group-hover:text-red-500 transition-colors">
                  {prevUnit.title}
                </div>
              </div>
            </Link>
          )}

          {/* Start First Lesson */}
          <Link
            href={`/units/${unit.id}/lessons/${unit.lessons[0].id}`}
            className="group bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 flex-1"
          >
            <Play className="w-5 h-5" />
            Start Learning
          </Link>

          {/* Next Unit */}
          {nextUnit && (
            <Link
              href={`/units/${nextUnit.id}`}
              className="group flex items-center gap-3 bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-200 flex-1 justify-end text-right"
            >
              <div>
                <div className="text-sm text-gray-500">Next Unit</div>
                <div className="font-semibold text-gray-800 group-hover:text-red-500 transition-colors">
                  {nextUnit.title}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
