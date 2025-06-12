"use client";

import React from 'react';

type SidebarProps = {
  category: string;
  setCategory: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ category, setCategory, price, setPrice }) => {
  return (
    <aside className="bg-blue-800 rounded-xl p-5 w-64 min-w-[220px] text-white">
      <h2 className="font-semibold mb-4">Filters</h2>
      {/* Category Filter */}
      <div className="mb-6">
        <div className="font-medium mb-2">Category</div>
        <div className="flex flex-col gap-1 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="category" checked={category === 'All'} onChange={() => setCategory('All')} className="accent-white" /> All
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="category" checked={category === 'Electronics'} onChange={() => setCategory('Electronics')} className="accent-white" /> Electronics
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="category" checked={category === 'Clothing'} onChange={() => setCategory('Clothing')} className="accent-white" /> Clothing
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="category" checked={category === 'Home'} onChange={() => setCategory('Home')} className="accent-white" /> Home
          </label>
        </div>
      </div>
      {/* Price Range */}
      <div className="mb-6">
        <div className="font-medium mb-2">Price</div>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          className="w-full accent-white slider-white"
          style={{ background: 'linear-gradient(to right, white 0%, white 100%)' }}
        />
        <div className="flex justify-between text-xs mt-1">
          <span>0</span>
          <span>1000</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 