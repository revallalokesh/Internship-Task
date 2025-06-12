"use client";
import React, { useState } from 'react';
import products from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Star } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === Number(params.id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="max-w-2xl mx-auto py-10 px-4 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="w-72 h-72 object-contain rounded-xl bg-white shadow" />
      </div>
      {/* Details Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-800 text-2xl font-bold">${product.price}</span>
          <span className="flex items-center ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'} fill={i < product.rating ? '#facc15' : 'none'} />
            ))}
          </span>
        </div>
        <div className="mb-4 text-gray-600">{product.description}</div>
        <div className="mb-4 text-sm text-gray-500">Category: {product.category}</div>
        <div className="flex items-center gap-4 mb-6">
          <span>Quantity:</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
          onClick={() => {
            for (let i = 0; i < quantity; i++) addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 