'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#problem', label: 'Problem' },
    { href: '#solution', label: 'Solution' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-navbar transition-all duration-300 shadow-lg ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-green-400 transition-colors"
            >
              ZeroEarth
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 rounded-md focus-ring"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:scale-105 focus-ring"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-green-400 p-2 focus-ring bg-white/5 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white/90 hover:text-white block px-3 py-3 text-base font-medium w-full text-left hover:bg-white/5 rounded-md transition-colors focus-ring"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => scrollToSection('#contact')}
                className="bg-green-600 hover:bg-green-700 text-white block px-3 py-3 rounded-md text-base font-medium w-full transition-colors focus-ring"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;