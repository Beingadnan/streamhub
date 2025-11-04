'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-20 mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1920px] mx-auto relative z-10 min-h-screen">
        {children}
      </main>
    </>
  );
}

