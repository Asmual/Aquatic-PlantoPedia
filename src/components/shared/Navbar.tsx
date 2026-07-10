/* eslint-disable @next/next/no-img-element */
"use strict";
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf, User, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle this true/false to preview Login/Register buttons vs logged-in Avatar
  const isLoggedIn = false; 
  const userAvatarUrl = null; // System fallback to initials if image doesn't exist

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Plants", href: "/plants" },
    { name: "Fish", href: "/fish" },
    { name: "Bonsai", href: "/bonsai" },
    { name: "About Us", href: "/about" },
    { name: "Contacts", href: "/contact" },
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-aqBase border-b border-aqGlow/60 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-navGlow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf className="h-6 w-6 text-aqButton" />
            <span className="font-bold text-xl tracking-tight text-white">
              Aquatic <span className="text-aqButton">PlantoPedia</span>
            </span>
          </Link>

          {/* Middle Menu Links */}
          <div className="hidden md:flex items-center gap-4 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-1 text-sm font-medium transition-all relative flex flex-col items-center justify-center h-full ${
                    isActive ? "text-aqButton font-semibold" : "text-gray-300 hover:text-aqButton"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-5 left-0 right-0 h-0.5 bg-aqButton rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Conditional Authentication View */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              /* Authenticated User View (Avatar & Name) */
              <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <span className="text-sm font-medium text-white">Hi, Asmual</span>
                
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="h-9 w-9 rounded-full bg-aqGlow flex items-center justify-center font-bold text-white border border-aqButton shadow-btnGlow overflow-hidden cursor-pointer focus:outline-none"
                >
                  {userAvatarUrl ? (
                    <img 
                      src={userAvatarUrl} 
                      alt="User Avatar" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm uppercase">A</span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-12 w-48 rounded-xl bg-aqBase border border-aqGlow shadow-cardGlow py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:text-white hover:bg-aqGlow/50 transition-colors"
                    >
                      <User className="h-4 w-4 text-aqButton" />
                      View Profile
                    </Link>
                    <hr className="border-aqGlow/60 my-1" />
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-aqGlow/50 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest View (Dual Buttons with Premium Themes) */
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white font-medium px-4 py-2.5 text-sm transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-aqButton hover:bg-aqButton/90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-btnGlow border border-transparent"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburg Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg bg-aqGlow"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Panel */}
      {isOpen && (
        <div className="md:hidden bg-aqBase border-t border-aqGlow px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive ? "text-aqButton bg-aqGlow/40 font-semibold" : "text-gray-300 hover:text-white hover:bg-aqGlow"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* Mobile Dynamic Auth Actions */}
          <div className="pt-4 border-t border-aqGlow space-y-2 px-3">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">Hi, Asmual</span>
                  <div className="h-9 w-9 rounded-full bg-aqGlow flex items-center justify-center font-bold text-white border border-aqButton">
                    {userAvatarUrl ? (
                      <img src={userAvatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span>A</span>
                    )}
                  </div>
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-gray-300 hover:text-white"
                >
                  <User className="h-4 w-4 text-aqButton" /> View Profile
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-red-400 hover:text-red-300 text-left w-full"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-gray-300 hover:text-white font-medium py-2.5 text-sm rounded-xl border border-aqGlow bg-aqGlow/20"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block bg-aqButton text-white font-semibold py-2.5 rounded-xl text-sm shadow-btnGlow"
                >
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