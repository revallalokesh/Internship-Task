"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating?: number;
  category: string;
  description: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price, rating, ...rest }) => {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ id, image, title, price, rating: rating || 0, ...rest });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const inCart = cart.items.some(item => item.id === id);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer">
      <Link href={`/product/${id}`} className="flex flex-col items-center w-full h-full flex-1" tabIndex={-1}>
        <img src={image} alt={title} className="w-24 h-24 object-contain mb-3" />
        <div className="font-semibold text-center mb-1">{title}</div>
        <div className="text-blue-800 font-bold mb-1">${price}</div>
        {rating && (
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} fill={i < rating ? '#facc15' : 'none'} />
            ))}
          </div>
        )}
      </Link>
      <button
        className={`mt-2 bg-blue-600 text-white rounded px-4 py-1 text-sm font-medium hover:bg-blue-700 transition ${added ? 'bg-green-600' : ''}`}
        onClick={handleAdd}
        disabled={added}
      >
        {added ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard; 