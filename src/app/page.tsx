'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Code, Zap, Trophy, ChevronRight, Blocks } from 'lucide-react';
import { curriculum } from '@/data/curriculum';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <Blocks className="w-12 h-12 text-red-500" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                LEGO Vibe
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Learn Python programming with LEGO SPIKE Prime! 
              Build amazing robots and bring them to life with code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/units"
              className="group bg-gradient-to-r from-red-500 to-yellow-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Learning
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/playground"
              className="bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Code className="w-5 h-5" />
              Try Code Now
            </Link>
          </motion.div>
        </div>

        {/* Floating LEGO Bricks Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-8 h-8 ${['bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][i % 4]} rounded-lg opacity-20`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-800"
          >
            What You&apos;ll Learn
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Blocks className="w-8 h-8" />,
                title: "LEGO SPIKE Prime",
                description: "Discover the amazing LEGO SPIKE Prime hub and all its cool sensors and motors!",
                color: "from-red-400 to-red-600"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Python Programming",
                description: "Learn Python step by step with fun examples and interactive coding challenges!",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Robot Movement",
                description: "Make your robots move, dance, and respond to the world around them!",
                color: "from-yellow-400 to-yellow-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Learning Journey
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.units.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/units/${unit.id}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-gradient-to-b from-red-400 to-yellow-400 hover:scale-105">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors">
                        {unit.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{unit.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{unit.lessons.length} lessons</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Amazing Robots?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of kids learning to code with LEGO! Start your programming adventure today.
            </p>
            <Link 
              href="/units"
              className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Begin Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
