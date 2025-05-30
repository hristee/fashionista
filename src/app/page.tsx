'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  images: { secure_url: string }[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://glore-bd-backend-node-mongo.vercel.app/api/product')
      .then((res) => {
        console.log("🚀 API Response:", res.data.data);
        console.log("🚀 API Response:", products);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error("❌ API Fetch Failed:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="shadow-md sticky top-0 z-50 bg-white">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/Fashionista(logo).png" alt="Logo" width={150} height={150} className="rounded-full" />
            <h2 className="text-2xl font-bold text-indigo-700">Fashionista</h2>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            <a href="#offers" className="hover:text-indigo-600">Offers</a>
            <a href="#products" className="hover:text-indigo-600">Collections</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
            <a href="#contact" className="hover:text-indigo-600">My Orders</a>
          </nav>
          <div className="relative">
            <ShoppingCart className="text-indigo-700 w-6 h-6 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-100 to-indigo-50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-800">Dress with Comfort & Style</h2>
          <p className="mt-4 text-gray-600 text-lg">Discover the latest collection of premium dresses at unbeatable prices.</p>
          <a href="#products" className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold">Shop Now</a>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="bg-yellow-100 py-6 text-center">
        <h3 className="text-xl md:text-2xl font-semibold">🔥 Limited Offer: Buy 1 Get 1 Free on Select dresses! 🔥</h3>
      </section>

      {/* Product Grid */}
      <section id="products" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Our dress Collection</h2>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for dresses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => {
              const imageURL =
                product.images && product.images.length > 0
                  ? product.images[0].secure_url
                  : '/placeholder.jpg';

              return (
                <div key={product._id} className="bg-white rounded-xl shadow hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                  <img src={imageURL} alt={product.name} className="w-full h-60 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                    <p className="text-indigo-600 font-semibold mt-1">{product.price} TK</p>
                    <Link href={`/single-product/${product._id}`}>
                      <div className="mt-4 bg-indigo-600 text-white text-center py-2 rounded hover:bg-indigo-700 cursor-pointer">
                        View Details
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"Absolutely love these dress! Super comfy and stylish."</p>
              <p className="mt-4 font-semibold text-indigo-600">— Rahim, Dhaka</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"Fast delivery and quality product. Highly recommend!"</p>
              <p className="mt-4 font-semibold text-indigo-600">— Fatima, Chittagong</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">"Fashionista has changed my style game! Great customer service too."</p>
              <p className="mt-4 font-semibold text-indigo-600">— Hasan, Sylhet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-100 py-8 text-center text-gray-600">
        <p>© 2025 Fashionista. All rights reserved.</p>
      </footer>
    </div>
  );
}