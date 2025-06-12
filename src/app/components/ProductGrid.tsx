"use client";

import React from 'react';
import ProductCard from './ProductCard';

// Inline Product type definition
type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  description: string;
};

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid; 