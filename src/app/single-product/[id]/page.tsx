"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  TruckIcon,
  RefreshCcwIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  Facebook, 
  Instagram, 
  MessageSquare, 
  PhoneCall 
} from "lucide-react";

import Header from '../../../components/Header';


interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category?: {
    _id: string;
    name: string;
  };
  images: { secure_url: string }[];
}


export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://glore-bd-backend-node-mongo.vercel.app/api/product")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.data.find((p: Product) => p._id === id);
        if (foundProduct) {
          console.log("🧪 category value:", foundProduct.category);
          setProduct(foundProduct);
        }
          
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Loading product...</div>
    );
  if (!product)
    return (
      <div className="p-10 text-center text-red-500">Product not found.</div>
    );

  const imageURL =
    product.images && product.images.length > 0
      ? product.images[0].secure_url
      : "/placeholder.jpg";

  return (
    <div className="min-h-screen bg-pink-50 px-4 md:px-10 py-8">
      <Link
        href="/"
        className="text-indigo-600 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Shop
      </Link>
      <Header />

      <br></br>
      <div className="bg-pink-100 p-6 rounded-xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={imageURL}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-yellow-500 mb-4">
            {"★★★★★"}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-pink-700">
              ৳ {product.price}
            </span>
            <span className="line-through text-gray-400">৳ 2500</span>
          </div>

          <span className="text-sm text-white bg-pink-500 px-2 py-1 rounded inline-block mb-4">
            Save: ৳ 300
          </span>

          {product.category && (
            <p className="text-sm mb-4">
              <span className="font-semibold">Category:</span> {product.category?.name}
            </p>
          )}
          

          <div className="flex items-center mb-6 gap-2">
            <button className="bg-gray-200 px-3 py-1 rounded">-</button>
            <span>1</span>
            <button className="bg-gray-200 px-3 py-1 rounded">+</button>
          </div>

          <button className="bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 mb-6">
            Order Now
          </button>
              
          <div className="text-sm space-y-3 text-gray-700">
            <div className="flex items-center gap-2">
              <BadgeCheckIcon className="w-5 h-5 text-pink-500" />
              100% Original Product.
            </div>
            <div className="flex items-center gap-2">
              <TruckIcon className="w-5 h-5 text-pink-500" />
              Express Shipping
            </div>
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5 text-pink-500" />
              Cash on Delivery Available
            </div>
            <div className="flex items-center gap-2">
              <RefreshCcwIcon className="w-5 h-5 text-pink-500" />
              Easy return and exchange within 3 days
            </div>
        
            {/* Description */}
      <div className="bg-white mt-10 max-w-6xl mx-auto p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {product.description}
        </p>
      </div>
      {/*Social media icons */}
       

      <div className="flex gap-6 mt-4 text-pink-600">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Facebook className="w-6 h-6 hover:text-pink-700 cursor-pointer" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <Instagram className="w-6 h-6 hover:text-pink-700 cursor-pointer" />
        </a>
         <a href="https://m.me/yourpage" target="_blank" rel="noopener noreferrer">
        <MessageSquare className="w-6 h-6 hover:text-pink-700 cursor-pointer" />
        </a>
       <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
       <PhoneCall className="w-6 h-6 hover:text-pink-700 cursor-pointer" />
       </a>
      </div>

       
          </div>
          
        </div>
        
      </div>
      
    </div>

    
  );
}
