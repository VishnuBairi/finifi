'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/', label: 'Invoices', icon: '📄' },
    { href: '/vendors', label: 'Vendors', icon: '👥' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg">
      <div className="p-4">
        <img
          src="logo.svg"
          alt="Finifi"
          className="h-8 text-black"
          
        />
      </div>
      <nav className="mt-8">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-6 py-2 transition-colors duration-200 ${
              pathname === href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50'
            }`}
            aria-current={pathname === href ? 'page' : undefined}
          >
            <span className="mr-3">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
