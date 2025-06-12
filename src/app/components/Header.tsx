"use client";
import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  const { cart } = useCart();
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-800 text-white px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="font-bold text-2xl">Logo</div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-md pl-10 pr-4 py-2 bg-blue-800 border border-white text-white placeholder-white focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-white" size={18} />
        </div>
      </div>
      {/* Cart Only */}
      <div className="flex items-center gap-6">
        <Link href="/cart" className="relative flex items-center bg-blue-900 rounded-lg px-4 py-2 hover:bg-blue-950 transition">
          <ShoppingCart size={24} />
          <span className="ml-2 font-semibold">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header; 