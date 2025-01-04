import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductCard from '../components/ProductCard';

export default function Deals() {
  const products = useSelector((state: RootState) => state.products.items);
  // For demo purposes, let's consider products with price less than $50 as deals
  const dealsProducts = products.filter(product => product.price < 50);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Special Deals</h1>
      {dealsProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No deals available at the moment.</p>
        </div>
      )}
    </div>
  );
} 