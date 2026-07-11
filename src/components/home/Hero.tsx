"use strict";
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ 
        backgroundImage: "url('/Images/HeroBanner.jpg')",
      }}
    >
      {/* Background Dimmer Layer */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-aqBase/50 to-aqBase z-0" />

      {/* Main Structural Framework Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-20 pb-12 flex flex-col items-center">
        
        {/* Animated Badge Header */}
        <span className="animate__animated animate__fadeInDown text-aqButton font-semibold tracking-widest uppercase text-xs bg-aqGlow/20 px-4 py-1.5 rounded-full border border-aqButton/30 mb-6">
          Premium Aquatic Marketplace
        </span>
        
        {/* Main Header Text Node */}
        <h1 className="animate__animated animate__fadeInUp text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          Bring the Ultimate{" "}
          <span className="inline-block animate__animated animate__pulse animate__infinite text-aqButton drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            Aquatic Nature
          </span>{" "}
          Into Your Living Space
        </h1>
        
        {/* Sub-Header Description Text Block */}
        <p className="animate__animated animate__fadeInUp animate__delay-1s text-gray-300 mt-5 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
          Discover rare wild-grown plants, handcrafted aquascapes, exotic fish, and high-end ecosystem essentials designed for your peace of mind.
        </p>

        {/* Action Controller Elements */}
        <div className="animate__animated animate__fadeInUp animate__delay-1s mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          
          {/* Action Call Button with Bottom-to-Top Sliding Effect & Blink Animations */}
          <Link
            href="/plants"
            className="group relative w-full sm:w-auto bg-aqButton text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all overflow-hidden shadow-btnGlow text-center z-10"
          >
            {/* Sliding Layer Effect Element */}
            <span className="absolute inset-0 w-full h-full bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1]" />
            {/* Glowing Pulsing Inner Circle */}
            <span className="absolute inset-0 w-full h-full rounded-xl opacity-0 group-hover:animate-ping bg-white/10 z-[-2] duration-1000" />
            <span className="relative">Explore Marketplace</span>
          </Link>

          {/* Secondary Information Interface Component Button */}
          <Link
            href="/about"
            className="w-full sm:w-auto text-gray-300 hover:text-white font-medium px-8 py-3 text-sm transition-all rounded-xl border border-aqGlow/40 bg-aqGlow/10 hover:bg-aqGlow/30 text-center"
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}