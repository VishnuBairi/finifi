import React from 'react';

const Navbar = ({ user }) => {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-black">Manage Invoices</h1>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <span className="text-sm text-gray-600">{user?.name || 'User'}</span>
      </div>
    </div>
  );
};

export default Navbar;