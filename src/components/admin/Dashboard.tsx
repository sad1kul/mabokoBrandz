import React from 'react';
import { BarChart, DollarSign, Package, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export default function Dashboard() {
  const { items: products } = useSelector((state: RootState) => state.products);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      icon: DollarSign,
      change: '+12.3%',
      changeType: 'positive',
    },
    {
      title: 'Active Products',
      value: products.length.toString(),
      icon: Package,
      change: '+4.5%',
      changeType: 'positive',
    },
    {
      title: 'Total Customers',
      value: '1,234',
      icon: Users,
      change: '+2.3%',
      changeType: 'positive',
    },
    {
      title: 'Sales',
      value: '456',
      icon: BarChart,
      change: '-1.5%',
      changeType: 'negative',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.title}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Add charts and other dashboard components here */}
    </div>
  );
}