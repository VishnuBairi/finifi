import './globals.css';

export const metadata = {
  title: 'Invoice Management System',
  description: 'FINIFI - Assignment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}