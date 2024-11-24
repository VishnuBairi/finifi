'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import InvoiceTable from './InvoiceTable';
import InvoiceModal from './InvoiceModal';
import Pagination from './Pagination';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        status: statusFilter !== 'All' ? statusFilter : '',
        search: searchTerm
      });

      const response = await fetch(`/api/invoices?${queryParams}`);
      const data = await response.json();
      
      setInvoices(data.invoices);
      setFilteredInvoices(data.invoices);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [currentPage, statusFilter, searchTerm]);

  const handleCreateInvoice = async (invoiceData) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      if (response.ok) {
        fetchInvoices();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };
  

  const handleDeleteInvoice = async (id) => {
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={{ name: 'Vishnu Bairi' }} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search by vendor or invoice number..."
                className="p-2 border rounded w-64 text-black"
                value={searchTerm}
                onChange={handleSearch}
              />
              <select
                className="p-2 border rounded text-black"
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Invoice
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <InvoiceTable invoices={filteredInvoices} onDelete={handleDeleteInvoice} fetchInvoices={fetchInvoices} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
          <InvoiceModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateInvoice}
          />
          
        </main>
      </div>
    </div>
  );
};

export default InvoiceManagement;