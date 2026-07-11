"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  BarChart3, 
  Layers, 
  ShoppingBag, 
  CreditCard, 
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isUserRoute = pathname.startsWith('/dashboard/user');

  const isActive = (path: string) => pathname === path;

  const linkStyle = (path: string) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path) 
        ? 'bg-aqButton text-white shadow-btnGlow' 
        : 'text-slate-400 hover:bg-aqGlow/40 hover:text-slate-200'
    }`;

  return (
    <div className="flex flex-col h-full py-6 px-4 bg-aqBase">
      
      {/* Sidebar Top Header Section */}
      <div className="px-4 mb-6 pb-6 border-b border-aqGlow/20">
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Control Panel</h2>
        <p className="text-xs text-slate-400 mt-1">
          Role: {isAdminRoute ? 'Admin' : isUserRoute ? 'User' : 'Authorized'}
        </p>
      </div>

      {/* Dynamic Navigation Logic */}
      <nav className="flex-1 space-y-6">
        
        {/* Admin Navigation Options */}
        {isAdminRoute && (
          <div>
            <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
              Admin Dashboard
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard/admin/admin-profile" className={linkStyle('/dashboard/admin/admin-profile')}>
                  <User size={18} />
                  <span>Admin Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/sales-management" className={linkStyle('/dashboard/admin/sales-management')}>
                  <BarChart3 size={18} />
                  <span>Sales Management</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/products-management" className={linkStyle('/dashboard/admin/products-management')}>
                  <Layers size={18} />
                  <span>Products Management</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/orders-management" className={linkStyle('/dashboard/admin/orders-management')}>
                  <ShoppingBag size={18} />
                  <span>Orders Management</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/transactions-history" className={linkStyle('/dashboard/admin/transactions-history')}>
                  <CreditCard size={18} />
                  <span>Transactions History</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* User Navigation Options */}
        {isUserRoute && (
          <div>
            <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
              User Dashboard
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard/user/user-profile" className={linkStyle('/dashboard/user/user-profile')}>
                  <User size={18} />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/user/my-orders" className={linkStyle('/dashboard/user/my-orders')}>
                  <ShoppingBag size={18} />
                  <span>My Orders</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

      </nav>
    </div>
  );
};

export default Sidebar;