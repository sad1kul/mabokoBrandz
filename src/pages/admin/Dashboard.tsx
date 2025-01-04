import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import InvoiceList from './InvoiceList';
import ProductList from './ProductList';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'invoices'>('products');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'products'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon icon={faBox} className="mr-2" />
          Products
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'invoices'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon icon={faFileInvoice} className="mr-2" />
          Orders
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'products' ? <ProductList /> : <InvoiceList />}
      </div>
    </div>
  );
};

export default Dashboard; 