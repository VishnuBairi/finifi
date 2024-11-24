'use client';
import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

const UpdateInvoiceModal = ({ open, onClose, onSubmit, invoice }) => {
  const [formData, setFormData] = useState({
    vendorName: '',
    invoiceNumber: '',
    status: 'Open',
    netAmount: '',
    invoiceDate: '',
    dueDate: '',
    department: '',
    poNumber: '',
  });
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when the modal is opened with an invoice
  useEffect(() => {
    if (open) {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    }

    if (invoice) {
      const formattedInvoiceDate = invoice.invoiceDate
        ? new Date(invoice.invoiceDate).toLocaleDateString('en-CA')
        : '';
      const formattedDueDate = invoice.dueDate
        ? new Date(invoice.dueDate).toLocaleDateString('en-CA')
        : '';

      setFormData({
        vendorName: invoice.vendorName || '',
        invoiceNumber: invoice.invoiceNumber || '',
        status: invoice.status || 'Open',
        netAmount: invoice.netAmount || '',
        invoiceDate: formattedInvoiceDate,
        dueDate: formattedDueDate,
        department: invoice.department || '',
        poNumber: invoice.poNumber || '',
      });
    } else {
      // Clear form if no invoice is passed
      setFormData({
        vendorName: '',
        invoiceNumber: '',
        status: 'Open',
        netAmount: '',
        invoiceDate: '',
        dueDate: '',
        department: '',
        poNumber: '',
      });
    }
  }, [open, invoice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        _id: invoice?._id,
        updatedTime: currentTime,
        updatedDate: currentDate,
      });
      onClose();
    } catch (error) {
      console.error('Error updating invoice:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Update Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Vendor Name */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Vendor Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.vendorName}
                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                required
              />
            </div>

            {/* Invoice Number */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Invoice Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="Open">Open</option>
                <option value="Awaiting Approval">Awaiting Approval</option>
                <option value="Approved">Approved</option>
                <option value="Processing">Processing</option>
                <option value="Paid">Paid</option>
                <option value="Rejected">Rejected</option>
                <option value="Vendor Not Found">Vendor Not Found</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Void">Void</option>
              </select>
            </div>

            {/* Net Amount */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Net Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={formData.netAmount}
                onChange={(e) => setFormData({ ...formData, netAmount: e.target.value })}
                required
              />
            </div>

            {/* Invoice Date */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Invoice Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={formData.invoiceDate}
                onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                required
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Due Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Department</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>

            {/* PO Number */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">PO Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.poNumber}
                onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              Update Invoice
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateInvoiceModal;
