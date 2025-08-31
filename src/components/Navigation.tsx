'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Blocks, Menu, X, Home, BookOpen, Code, Trophy, Users } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/units', label: 'Units', icon: BookOpen },
    { href: '/playground', label: 'Playground', icon: Code },
    { href: '/meetings', label: 'Meetings', icon: Users },
    { href: '/progress', label: 'Progress', icon: Trophy },
    { href: '/admin', label: 'Admin', icon: Users },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Blocks className="w-8 h-8 text-red-500" />
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
              LEGO Vibe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Level 1</span>
            </div>
            {session ? (
              <button onClick={() => signOut()} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Sign out</button>
            ) : (
              <button onClick={() => signIn()} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Sign in</button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );              })}              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <span className="text-lg">ℹ️</span>
                About
              </Link>
              <Link
                href="/help"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <span className="text-lg">❓</span>
                Help
              </Link>
              <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg mt-2">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Level 1 - Beginner</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
