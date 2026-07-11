/* eslint-disable @next/next/no-img-element */
"use strict";
"use client";

import { useState, useRef, useEffect } from "react";
// Fixed the incorrect import path from "next/next/link" to "next/link"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ShoppingBag, 
  BarChart3, 
  Layers, 
  CreditCard 
} from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = useSession();
 
  const isLoggedIn = !!session;
  const userAvatarUrl = session?.user?.image || null;
  const userName = session?.user?.name || "User";
  
  const userRole = (session?.user as any)?.role?.toLowerCase() || "user";
  const isAdmin = userRole === "admin";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Plants", href: "/plants" },
    { name: "Fish", href: "/fish" },
    { name: "Bonsai", href: "/bonsai" },
    { name: "About Us", href: "/about" },
    { name: "Contacts", href: "/contact" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-aqBase/40 border-b border-aqGlow/20 backdrop-blur-md h-14 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-aqGlow/20 animate-pulse" />
            <div className="h-4 w-24 bg-aqGlow/20 animate-pulse rounded" />
          </div>
          <div className="h-7 w-20 bg-aqGlow/20 animate-pulse rounded-lg" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-aqBase/40 border-b border-aqGlow/20 backdrop-blur-md shadow-navGlow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
         
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7 rounded-full overflow-hidden border border-aqButton/40 shadow-btnGlow">
              <Image
                src="/Images/logo.png"
                alt="Aquatic PlantoPedia Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Aquatic <span className="text-aqButton">PlantoPedia</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-5 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-1 text-xs font-medium transition-all relative flex flex-col items-center justify-center h-full ${
                    isActive ? "text-aqButton font-semibold" : "text-gray-300 hover:text-aqButton"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-2 left-0 right-0 h-0.5 bg-aqButton rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Authentication View */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <span className="text-xs font-medium text-white">Hi, {userName}</span>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="h-7 w-7 rounded-full bg-aqGlow flex items-center justify-center font-bold text-white border border-aqButton shadow-btnGlow overflow-hidden focus:outline-none"
                >
                  {userAvatarUrl ? (
                    <img src={userAvatarUrl} alt="User Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs uppercase">{userName?.charAt(0) ?? "U"}</span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-9 w-52 rounded-lg bg-aqBase border border-aqGlow shadow-cardGlow py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {isAdmin ? (
                      <>
                        <Link
                          href="/dashboard/admin/sales-management"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-aqButton" />
                          View Dashboard
                        </Link>
                        <Link
                          href="/dashboard/admin/admin-profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <User className="h-3.5 w-3.5 text-aqButton" />
                          Admin Profile
                        </Link>
                        <Link
                          href="/dashboard/admin/sales-management"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <BarChart3 className="h-3.5 w-3.5 text-aqButton" />
                          Sales Management
                        </Link>
                        <Link
                          href="/dashboard/admin/products-management"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <Layers className="h-3.5 w-3.5 text-aqButton" />
                          Products Management
                        </Link>
                        <Link
                          href="/dashboard/admin/orders-management"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5 text-aqButton" />
                          Orders Management
                        </Link>
                        <Link
                          href="/dashboard/admin/transactions-history"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <CreditCard className="h-3.5 w-3.5 text-aqButton" />
                          Transactions History
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard/user/user-profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-aqButton" />
                          View Dashboard
                        </Link>
                        <Link
                          href="/dashboard/user/user-profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <User className="h-3.5 w-3.5 text-aqButton" />
                          View Profile
                        </Link>
                        <Link
                          href="/dashboard/user/my-orders"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5 text-aqButton" />
                          My Orders
                        </Link>
                      </>
                    )}

                    <hr className="border-aqGlow/60 my-1" />
                    <button
                      onClick={async () => {
                        setShowDropdown(false);
                        await signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-aqGlow/50 transition-colors text-left"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-gray-300 hover:text-white font-medium px-3 py-1.5 text-xs transition-all">
                  Login
                </Link>
                <Link href="/register" className="bg-aqButton hover:bg-aqButton/90 text-white font-semibold px-4 py-1.5 rounded-lg text-xs transition-all shadow-btnGlow">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Controller Trigger Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1 rounded bg-aqGlow">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Menu System */}
      {isOpen && (
        <div className="md:hidden bg-aqBase/95 border-t border-aqGlow/40 px-4 pt-2 pb-5 space-y-1 backdrop-blur-lg max-h-[calc(100vh-56px)] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-aqButton bg-aqGlow/40 font-semibold" : "text-gray-300 hover:text-white hover:bg-aqGlow"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-aqGlow/40 space-y-1 px-3">
            {isLoggedIn ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between py-2 border-b border-aqGlow/20 mb-2">
                  <span className="text-white text-xs font-medium">Hi, {userName}</span>
                  <div className="h-7 w-7 rounded-full bg-aqGlow flex items-center justify-center font-bold text-white border border-aqButton">
                    {userAvatarUrl ? <img src={userAvatarUrl} alt="Avatar" className="h-full w-full object-cover" /> : <span className="text-xs uppercase">{userName?.charAt(0) ?? "U"}</span>}
                  </div>
                </div>

                {isAdmin ? (
                  <>
                    <Link href="/dashboard/admin/sales-management" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <LayoutDashboard className="h-4 w-4 text-aqButton" /> View Dashboard
                    </Link>
                    <Link href="/dashboard/admin/admin-profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <User className="h-4 w-4 text-aqButton" /> Admin Profile
                    </Link>
                    <Link href="/dashboard/admin/sales-management" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <BarChart3 className="h-4 w-4 text-aqButton" /> Sales Management
                    </Link>
                    <Link href="/dashboard/admin/products-management" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <Layers className="h-4 w-4 text-aqButton" /> Products Management
                    </Link>
                    <Link href="/dashboard/admin/orders-management" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <ShoppingBag className="h-4 w-4 text-aqButton" /> Orders Management
                    </Link>
                    <Link href="/dashboard/admin/transactions-history" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <CreditCard className="h-4 w-4 text-aqButton" /> Transactions History
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard/user/user-profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <LayoutDashboard className="h-4 w-4 text-aqButton" /> View Dashboard
                    </Link>
                    <Link href="/dashboard/user/user-profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <User className="h-4 w-4 text-aqButton" /> View Profile
                    </Link>
                    <Link href="/dashboard/user/my-orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-300 hover:text-white">
                      <ShoppingBag className="h-4 w-4 text-aqButton" /> My Orders
                    </Link>
                  </>
                )}

                <button
                  onClick={async () => {
                    setIsOpen(false);
                    await signOut();
                  }}
                  className="flex items-center gap-3 py-2 text-sm text-red-400 hover:text-red-300 text-left w-full mt-2 pt-2 border-t border-aqGlow/20"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 pt-1">
                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center text-gray-300 hover:text-white font-medium py-2 text-xs rounded-lg border border-aqGlow/30 bg-aqGlow/10">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center block bg-aqButton text-white font-semibold py-2 text-xs rounded-lg shadow-btnGlow">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}