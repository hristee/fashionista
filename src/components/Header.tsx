'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, Search } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-1">
          <Image
            src="/Fashionista(logo).png"
            alt="Logo"
            width={110}
            height={110}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold text-indigo-700">Fashionista</h2>
        </div>

        {/* Nav links - hidden on mobile */}
        <nav className="hidden md:flex space-x-8 text-gray-600">
          <Link href="#offers" className="hover:text-indigo-600">Offers</Link>
          <Link href="#products" className="hover:text-indigo-600">Collections</Link>
          <Link href="#contact" className="hover:text-indigo-600">Contact</Link>
          <Link href="#orders" className="hover:text-indigo-600">My Orders</Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Toggle Search */}
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 text-indigo-700" />
          </button>

          {/* Cart */}
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-indigo-700 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
          </div>

          {/* Mobile menu icon */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <Menu className="w-6 h-6 text-indigo-700" />
          </button>
        </div>
      </div>

      {/* Search bar toggle */}
      {showSearch && (
        <div className="bg-indigo-50 py-2 px-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      )}

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-2 text-gray-600">
          <Link href="#offers" className="block hover:text-indigo-600">Offers</Link>
          <Link href="#products" className="block hover:text-indigo-600">Collections</Link>
          <Link href="#contact" className="block hover:text-indigo-600">Contact</Link>
          <Link href="#orders" className="block hover:text-indigo-600">My Orders</Link>
        </div>
      )}
    </header>
  );
}
