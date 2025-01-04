import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

export default function Categories() {
  const products = useSelector((state: RootState) => state.products.items);
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${category}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            <p className="text-gray-600">
              {products.filter(p => p.category === category).length} products
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
} 