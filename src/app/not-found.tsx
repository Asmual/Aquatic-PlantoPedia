"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    // Added pt-20 (Padding Top) to push content safely below the fixed/sticky navbar
    <div className="min-h-screen bg-aqBase flex flex-col items-center justify-center text-center px-4 pt-2 relative overflow-hidden">
      
      {/* CSS Keyframes for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(0.9); }
        }
        @keyframes customSwing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .animate-digit-four {
          animation: customSwing 2s ease-in-out infinite;
          display: inline-block;
        }
        .animate-digit-zero {
          animation: customBounce 1.5s ease-in-out infinite;
          display: inline-block;
        }
      `}} />

      {/* Decorative Blur Background Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute w-72 h-72 bg-aqButton rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-aqGlow rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-700"></div>
      </div>

      <div className="z-10 flex flex-col items-center max-w-2xl">
        
        {/* Branding Subtitle */}
        <h3 className="text-xl md:text-3xl font-bold tracking-wider text-slate-300 mb-2">
          Aquatic <span className="text-aqButton">PlantoPedia</span>
        </h3>

        {/* 404 Typography Viewport */}
        <div className="flex items-center justify-center font-extrabold text-[7rem] md:text-[10rem] tracking-tighter select-none leading-none drop-shadow-md">
          <span className="animate-digit-four text-aqButton">4</span>
          <span className="animate-digit-zero text-slate-100 mx-2">0</span>
          <span className="animate-digit-four text-aqButton" style={{ animationDelay: "0.3s" }}>4</span>
        </div>
        
        {/* Status Badge */}
        <div className="bg-aqButton text-aqBase px-4 py-1 text-xs font-black rounded uppercase tracking-widest shadow-btnGlow mt-2 mb-8">
          Page Not Found
        </div>

        {/* Descriptive Headings */}
        <h2 className="text-xl md:text-3xl font-semibold text-slate-200 mb-4 px-2">
          Oops! You must have drifted into deep waters.
        </h2>
        <p className="text-slate-400 max-w-md mb-8 text-xs md:text-sm px-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Sliding Animation Action Button */}
        <Link
          href="/"
          className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-white rounded-lg bg-aqGlow/50 border border-aqButton/30 shadow-btnGlow transition duration-300 ease-out group"
        >
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-aqButton transition-all duration-300 transform translate-y-full group-hover:translate-y-0 ease"></span>
          <span className="relative text-xs md:text-sm uppercase tracking-wider group-hover:text-aqBase transition-colors duration-200">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}