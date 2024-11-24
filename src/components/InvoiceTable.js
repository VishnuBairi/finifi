'use client'
import React, { useState } from 'react';
import UpdateInvoiceModal from './UpdateInvoiceModal';
import { Trash2, Edit } from 'lucide-react';

const InvoiceTable = ({ invoices, onDelete, onRefresh, fetchInvoices }) => {

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const handleUpdateInvoice = async (updatedData) => {
    console.log(updatedData);
    try {
      console.log(updatedData.id);
      const response = await fetch(`/api/invoices/${updatedData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchInvoices();
        setIsUpdateModalOpen(false);
        setSelectedInvoice(null);
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {<tr className='text-red-300 text-center'>
            <td>Vendor Name</td>
            <td>Invoice Number</td>
            <td>Status</td>
            <td>Net Amount</td>
            <td>Invoice Date</td>
            <td>Due Date</td>
            <td>Department</td>
            <td>Actions</td>
          </tr>}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices && invoices.map((invoice) => (
            <tr key={invoice._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{invoice.vendorName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{invoice.invoiceNumber}</td>
              <td className="px-6 py-4 text-sm text-black">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {invoice.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{invoice.netAmount.toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(invoice.invoiceDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{invoice.department}</td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => onDelete(invoice._id)}
                  className="text-red-600 hover:text-red-900 p-1"
                >
                  <Trash2 size={16} />
                </button>
                <span className="mx-1 text-gray-300">|</span>
                <button
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setSelectedInvoice(invoice);
                  }}
                  className="text-blue-600 hover:text-blue-900 p-1"
                >
                  <Edit size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Render UpdateInvoiceModal outside the loop */}
      {isUpdateModalOpen && (
        <UpdateInvoiceModal
          open={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
          onSubmit={handleUpdateInvoice}
        />
      )}
    </div>
  );
  
};
export default InvoiceTable;  