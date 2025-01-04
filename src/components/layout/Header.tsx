import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import type { RootState } from '../../store';
import { selectCartItemsCount } from '../../store/slices/cartSlice';

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItemsCount = useSelector((state: { cart: RootState['cart'] }) =>
    selectCartItemsCount(state)
  );

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src=""
              alt=""
              className="h-10"
              style={{
                objectFit: 'contain',
                maxWidth: '150px'
              }}
            />
          </Link>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5">
                <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-gray-400" />
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900"
              aria-label={`Shopping cart with ${cartItemsCount} items`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Admin dashboard"
              >
                <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}