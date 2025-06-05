'use client';

import Link from 'next/link';
import { Blocks, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Blocks className="w-8 h-8 text-red-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                LEGO Vibe
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Learn Python programming with LEGO SPIKE Prime! Fun, interactive lessons designed 
              specifically for young programmers to build amazing robots and bring them to life with code.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for young programmers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/units" className="text-gray-300 hover:text-white transition-colors">
                  Learning Units
                </Link>
              </li>              <li>
                <Link href="/playground" className="text-gray-300 hover:text-white transition-colors">
                  Python Playground
                </Link>
              </li>              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-gray-300 hover:text-white transition-colors">
                  Component Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className="font-bold text-lg mb-4">Learning</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/units/overview" className="text-gray-300 hover:text-white transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/units/python-basics" className="text-gray-300 hover:text-white transition-colors">
                  Python Basics
                </Link>
              </li>
              <li>
                <Link href="/units/movement" className="text-gray-300 hover:text-white transition-colors">
                  Robot Movement
                </Link>
              </li>
              <li>
                <Link href="/units/sensors" className="text-gray-300 hover:text-white transition-colors">
                  Sensors & Outputs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 LEGO Vibe. Educational content inspired by PrimeLessons.org
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="text-gray-400 text-sm">
              Built with Next.js & TypeScript
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
