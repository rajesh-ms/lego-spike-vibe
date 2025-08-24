'use client';

import { curriculum } from '@/data/curriculum';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeClient() {
  const units = curriculum.units;
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with SUBMERGED Season */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">LEGO SPIKE Prime Programming</h1>
              <p className="text-lg mb-6">Learn Python programming with LEGO SPIKE Prime and join the exciting UNEARTHED℠ season challenge!</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/units" className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm">
                  Start Learning
                </Link>
                <Link href="/demo" className="border-2 border-white text-white px-5 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-sm">
                  Try Demo
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/season-intro.jpg"
                alt="FIRST LEGO League UNEARTHED Season"
                width={350}
                height={220}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Season Banner */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">UNEARTHED℠ Season 2025-2026</h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Discover the current FIRST® LEGO® League season and explore archaeological missions, 
              robotics challenges, and innovative programming with LEGO SPIKE Prime!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Image
                src="/banner-left.jpg"
                alt="UNEARTHED Season Challenge"
                width={250}
                height={140}
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="relative">
              <Image
                src="/banner-right.jpg"
                alt="LEGO Robotics Programming"
                width={250}
                height={140}
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Learning Units */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-center mb-6">Learning Curriculum</h2>
          <p className="text-sm text-center text-gray-600 mb-4 max-w-xl mx-auto">
            Master Python programming with our comprehensive curriculum designed for young learners. 
            Each unit builds on the previous one, taking you from basics to advanced robotics programming.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <Link href={`/units/${unit.id}`} key={unit.id}>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{unit.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {unit.lessons.length} lessons
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">{unit.description}</p>
                  <div className="text-sm text-blue-600 font-medium">
                    Start Learning →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Season Resources */}
      <section className="py-8 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-xl font-bold mb-3">Season Resources & Challenges</h2>
              <p className="text-sm mb-4">
                Explore past FIRST LEGO League challenges and discover how teams have tackled 
                real-world problems through robotics, programming, and innovative thinking.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <a 
                    href="https://www.first-lego-league.org/en/2025-26-season/challenge-resources" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs hover:text-yellow-300 transition-colors underline"
                  >
                    Download UNEARTHED℠ season materials
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <a 
                    href="https://education.lego.com/en-us/product-resources/spike-prime/downloads" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs hover:text-yellow-300 transition-colors underline"
                  >
                    Access programming guides and tutorials
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <a 
                    href="https://www.firstlegoleague.org/past-challenges" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs hover:text-yellow-300 transition-colors underline"
                  >
                    View past challenge themes and solutions
                  </a>
                </div>
              </div>
              <a 
                href="https://www.first-lego-league.org/en/2025-26-season" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-yellow-500 text-black px-3 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-xs"
              >
                Visit Official Season Page
              </a>
            </div>
            <div className="relative">
              <Image
                src="/past-challenges.jpg"
                alt="Past FIRST LEGO League Challenges"
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <section className="py-6 bg-white border-t">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600 mb-3 text-sm">FIRST LEGO League is an alliance between FIRST & LEGO Education</p>
            <div className="flex justify-center items-center">
              <Image
                src="/lego-education-logo.png"
                alt="LEGO Education"
                width={150}
                height={45}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
