'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
//import { ShoppingCart } from 'lucide-react';
//import Image from 'next/image';
import Header from '../components/Header';




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
      <Header />
      
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
              <p className="text-gray-700 italic">Absolutely love these dress! Super comfy and stylish.</p>
              <p className="mt-4 font-semibold text-indigo-600">— Rahim, Dhaka</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">Fast delivery and quality product. Highly recommend!</p>
              <p className="mt-4 font-semibold text-indigo-600">— Fatima, Chittagong</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow">
              <p className="text-gray-700 italic">Fashionista has changed my style game! Great customer service too.</p>
              <p className="mt-4 font-semibold text-indigo-600">— Hasan, Sylhet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer Section */}
<footer className="mt-16">
  {/* Pink Section */}
  <div className="bg-pink-100 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div>
      <div className="text-3xl mb-2">🔁</div>
      <h4 className="font-semibold">Easy Exchange Policy</h4>
      <p className="text-sm text-gray-600">We offer hassle free exchange policy</p>
    </div>
    <div>
      <div className="text-3xl mb-2">✅</div>
      <h4 className="font-semibold">3 Days Return Policy</h4>
      <p className="text-sm text-gray-600">We provide 3 days free return policy</p>
    </div>
    <div>
      <div className="text-3xl mb-2">🎧</div>
      <h4 className="font-semibold">Best customer support</h4>
      <p className="text-sm text-gray-600">We provide 24/7 customer support</p>
    </div>
  </div>

  {/* Black Section */}
  <div className="bg-black text-white px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Logo and Description */}
    <div>
      <h3 className="text-pink-400 text-2xl font-bold mb-2">Fashionista</h3>
      <p className="text-pink-200 text-sm">CLOTHES THAT SMILE</p>
      <p className="text-xs mt-2 leading-relaxed text-gray-300">
        Our collection will offer you a perfect blend of fashion loyalty and commitment.
      </p>
    </div>

    {/* Explore More */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Explore More</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#">New Arrivals</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    {/* Client Experience */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Client Experience</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#">Track Your Order</a></li>
        <li><a href="#">Returns & Exchanges</a></li>
        <li><a href="#">Customer Reviews</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="text-lg font-semibold mb-3">GET IN TOUCH</h4>
      <p className="text-sm">Mobile Number: (+88) 09999999999</p>
      <p className="text-sm mb-4">E-Mail: shop@fashionista.com</p>
      <div className="flex gap-4 text-white text-xl mt-2">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="bg-black text-gray-400 text-center text-sm py-4">
     <p>© 2025 Fashionista. All rights reserved.</p>
  </div>
</footer>

    
    </div>
  );
}