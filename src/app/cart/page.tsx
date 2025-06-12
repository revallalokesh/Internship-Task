"use client";
import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const items = cart.items;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center bg-white rounded-lg shadow p-4 gap-4">
              <Image src={item.image} alt={item.title} width={80} height={80} className="w-20 h-20 object-contain rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-blue-800 font-bold">${item.price}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="p-1 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="p-1 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => removeFromCart(item.id)}
                title="Remove"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <div className="flex justify-end mt-8">
            <div className="bg-blue-50 rounded-lg p-6 w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 