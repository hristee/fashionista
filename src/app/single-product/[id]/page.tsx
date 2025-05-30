'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: { secure_url: string }[];
}

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🧪 Extracted ID from URL:", id);

    fetch(`https://glore-bd-backend-node-mongo.vercel.app/api/product`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 All products:", data.data);

        const foundProduct = data.data.find((p: Product) => p._id === id);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.warn("⚠️ Product with this ID not found in list.");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch failed:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-600">Loading product...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Product not found.</div>;

  const imageURL =
    product.images && product.images.length > 0
      ? product.images[0].secure_url
      : '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <Link href="/" className="text-indigo-600 hover:underline">← Back to Shop</Link>

      <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={imageURL} alt={product.name} className="w-full h-[400px] object-cover rounded-lg" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-indigo-600 text-xl font-semibold mb-2">{product.price} TK</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex space-x-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">Add to Cart</button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
