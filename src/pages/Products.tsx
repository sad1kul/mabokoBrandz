import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 