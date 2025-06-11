'use client';

import React from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  images: { secure_url: string }[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  cart: CartItem[];
  onClose: () => void;
}

export default function CartSidebar({ cart, onClose }: Props) {
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
      <button
        className="absolute top-2 right-2 text-xl font-bold text-gray-600"
        onClick={onClose}
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const imageURL =
              item.product.images && item.product.images.length > 0
                ? item.product.images[0].secure_url
                : '/placeholder.jpg';

            return (
              <div key={item.product._id} className="flex gap-3 items-center border-b pb-3">
                <img
                  src={imageURL}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="font-semibold text-pink-600">
                    ৳ {item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="mt-6 text-lg font-bold text-right text-indigo-700">
            Subtotal: ৳ {subtotal}
          </div>

          <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
