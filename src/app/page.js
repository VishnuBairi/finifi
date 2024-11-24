'use client';
import dynamic from 'next/dynamic';
const InvoiceManagement = dynamic(() => import('@/components/InvoiceManagement'), {
  ssr: false
});

export default function Home() {
  return <InvoiceManagement />;
}

