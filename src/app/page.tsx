"use client";
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import productsData from './data/products';

export default function Page() {
  const [category, setCategory] = useState<string>('All');
  const [price, setPrice] = useState<number>(1000);
  const [search, setSearch] = useState<string>('');

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesPrice = product.price <= price;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header search={search} setSearch={setSearch} />
      <main className="flex-1 max-w-7xl mx-auto w-full flex gap-8 px-4 py-8">
        <Sidebar
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
        />
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-blue-900">Product Listing</h1>
          <ProductGrid products={filteredProducts} />
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-10">No products found.</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
