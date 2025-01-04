import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { dataService, Invoice } from '../../utils/dataService';
import InvoiceModal from '../../components/admin/InvoiceModal';

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await dataService.getAllInvoices();
      // Sort invoices by date, newest first
      const sortedInvoices = data.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setInvoices(sortedInvoices);
    } catch (error) {
      console.error('Error loading invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateInvoiceStatus = async (invoice: Invoice, newStatus: 'pending' | 'completed' | 'cancelled') => {
    try {
      const updatedInvoice = { ...invoice, status: newStatus };
      await dataService.saveInvoice(updatedInvoice);
      await loadInvoices(); // Reload the list
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  if (loading) {
    return <div className="p-4">Loading invoices...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order #</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="px-4 py-2">{invoice.orderNumber}</td>
                <td className="px-4 py-2">
                  {new Date(invoice.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {invoice.customerInfo.firstName} {invoice.customerInfo.lastName}
                </td>
                <td className="px-4 py-2">R {invoice.total.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className={`font-semibold ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(invoice)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                      aria-label={`View details for order ${invoice.orderNumber}`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    {invoice.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateInvoiceStatus(invoice, 'completed')}
                          className="text-green-600 hover:text-green-800"
                          title="Mark as Completed"
                          aria-label={`Mark order ${invoice.orderNumber} as completed`}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                        <button
                          onClick={() => updateInvoiceStatus(invoice, 'cancelled')}
                          className="text-red-600 hover:text-red-800"
                          title="Cancel Order"
                          aria-label={`Cancel order ${invoice.orderNumber}`}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default InvoiceList; 