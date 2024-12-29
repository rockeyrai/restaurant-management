import React from 'react';
// import '../globals.css';
import Sidebar from '@/components/Sidebar';
import ReduxProvider from '@/lib/redux/reduxProvider';
// import {Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Restaurant Admin Dashboard',
//   description: 'Admin dashboard for restaurant management',
// };

export default function RootLayout({
  children
}) {
  return (
    (<html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <div className="flex h-screen bg-gray-100">
        <Sidebar/>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
            {children}
            </div>
          </main>
        </div>
      </body>
    </html>)
  );
}

