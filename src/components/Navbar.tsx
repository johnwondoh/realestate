"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Buy", href: "#" },
    { label: "Rent", href: "#" },
    { label: "Sold", href: "#" },
    { label: "New homes", href: "#" },
    { label: "Find agents", href: "#" },
    { label: "Home loans", href: "#" },
    { label: "News", href: "#" },
    { label: "Commercial", href: "#" },
  ];

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-gray-900">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="font-semibold text-lg">realestate.com.au</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Sign in
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Join
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-700 hover:text-gray-900 text-sm font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-200 space-y-3">
              <a
                href="#"
                className="block text-gray-700 hover:text-gray-900 text-sm font-medium py-2"
              >
                Sign in
              </a>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
