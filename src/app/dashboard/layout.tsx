import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/global/Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-aqBase text-slate-100 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <div className="w-full relative z-50 border-b border-aqGlow/30 mt-15">
        <Navbar />
      </div>

      {/* Main Container Layout */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Side: Sidebar Panel */}
        <aside className="w-64 border-r border-aqGlow/20 bg-aqBase/95 hidden md:block overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Right Side: Dynamic Dashboard Viewport */}
        <main className="flex-1 p-8 overflow-y-auto bg-aqBase/30">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;