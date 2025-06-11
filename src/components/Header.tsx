'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, Search, ChevronDown, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCategoriesMobile, setShowCategoriesMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCategoriesSidebar, setShowCategoriesSidebar] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="container mx-auto flex items-center px-6 py-4 justify-between">

        {/* Sidebar toggle button for large screens */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex items-center justify-center p-2 rounded-md hover:bg-gray-200"
          aria-label="Toggle sidebar menu"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-indigo-700" /> : <Menu className="w-6 h-6 text-indigo-700" />}
        </button>

        {/* Logo */}
        <Image
          src="/Fashionista(logo).png"
          alt="Logo"
          width={150}
          height={150}
          className="rounded-full"
        />

        {/* Center Nav links (desktop) */}
        <nav className="hidden md:flex space-x-8 text-gray-600">
          <Link href="#offers" className="hover:text-indigo-600">Offers</Link>
          <Link href="#products" className="hover:text-indigo-600">Collections</Link>
          <Link href="#contact" className="hover:text-indigo-600">Contact</Link>
          <Link href="#orders" className="hover:text-indigo-600">My Orders</Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSearch(!showSearch)} className="hidden md:block">
            <Search className="w-5 h-5 text-indigo-700" />
          </button>

          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-indigo-700 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <Menu className="w-6 h-6 text-indigo-700" />
          </button>
        </div>
      </div>

      {/* Search bar toggle */}
      {showSearch && (
        <div className="bg-indigo-50 py-2 px-6 hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      )}

      {/* Sidebar for large screens */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          hidden md:block
        `}
      >
        <div className="p-6">
           {/* Close button */}
    <button
      onClick={() => setSidebarOpen(false)}
      className="self-end mb-4 p-1 rounded hover:bg-gray-200"
      aria-label="Close sidebar"
    >
      <ArrowLeft className="w-6 h-6 text-indigo-700" />
    </button>
          <button
            onClick={() => setShowCategoriesSidebar(!showCategoriesSidebar)}
            className="flex justify-between items-center w-full font-semibold text-gray-700"
            aria-expanded={showCategoriesSidebar}
          >
            Categories
            <ChevronDown className={`w-5 h-5 transform transition-transform ${showCategoriesSidebar ? 'rotate-180' : ''}`} />
          </button>
          
          {showCategoriesSidebar && (
            <div className="mt-4 flex flex-col space-y-2 pl-4">
              <Link href="#" className="hover:text-pink-500">Women's Clothing</Link>
              <Link href="#" className="hover:text-pink-500">Bags</Link>
              <Link href="#" className="hover:text-pink-500">Accessories</Link>
              <Link href="#" className="hover:text-pink-500">Shoes</Link>
            </div>
          )}
        </div>
      
      </aside>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-2 text-gray-600">
          <Link href="#offers" className="block hover:text-indigo-600">Offers</Link>
          <Link href="#products" className="block hover:text-indigo-600">Collections</Link>
          <Link href="#contact" className="block hover:text-indigo-600">Contact</Link>
          <Link href="#orders" className="block hover:text-indigo-600">My Orders</Link>

          {/* Mobile Categories toggle */}
          <div className="mt-3">
            <button
              className="flex justify-between w-full font-semibold text-gray-700"
              onClick={() => setShowCategoriesMobile(!showCategoriesMobile)}
            >
              Categories
              <ChevronDown className={`w-5 h-5 transform transition-transform ${showCategoriesMobile ? 'rotate-180' : ''}`} />
            </button>

            {showCategoriesMobile && (
              <div className="mt-2 pl-4 space-y-1">
                <Link href="#" className="block hover:text-pink-500">Women's Clothing</Link>
                <Link href="#" className="block hover:text-pink-500">Bags</Link>
                <Link href="#" className="block hover:text-pink-500">Accessories</Link>
                <Link href="#" className="block hover:text-pink-500">Shoes</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
