'use client';
import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';

const InvoiceModal = ({ open, onClose, onSubmit }) => {
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

  // Set current time and date when component mounts
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
    setCurrentDate(now.toLocaleDateString());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.vendorName || !formData.invoiceNumber) {
      alert('Vendor Name and Invoice Number are required.');
      return;
    }

    onSubmit({
      ...formData,
      createdTime: currentTime,
      createdDate: currentDate,
    });

    // Reset form and close modal
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Vendor Name"
              className="p-2 border rounded"
              value={formData.vendorName}
              onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Invoice Number"
              className="p-2 border rounded"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              required
            />
            <select
              className="p-2 border rounded"
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
            <input
              type="number"
              placeholder="Net Amount"
              className="p-2 border rounded"
              value={formData.netAmount}
              onChange={(e) => setFormData({ ...formData, netAmount: e.target.value })}
              required
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={formData.invoiceDate}
              onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
              required
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Department"
              className="p-2 border rounded"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="PO Number"
              className="p-2 border rounded"
              value={formData.poNumber}
              onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default InvoiceModal;
