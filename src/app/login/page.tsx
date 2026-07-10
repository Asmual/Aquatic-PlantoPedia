"use strict";
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields correctly.", {
        duration: 3000,
        style: {
          background: "#032C1C",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
      return;
    }
    
    toast.success("Welcome back! Login successful.", {
      duration: 3000,
      style: {
        background: "#032C1C",
        color: "#fff",
        border: "1px solid #25AC4C",
      },
    });
  };

  return (
    <div className="min-h-screen bg-aqBase flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-aqBase border border-aqGlow/60 rounded-2xl p-8 shadow-cardGlow backdrop-blur-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2">Log in to manage your PlantoPedia ecosystem</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-1.5 relative group">
            <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 relative group">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Password</label>
              <Link href="/forgot-password" className="text-xs text-[#25AC4C] hover:underline font-medium">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#25AC4C] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#25AC4C] hover:bg-[#25AC4C]/90 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-btnGlow flex items-center justify-center gap-2 group mt-2"
          >
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <hr className="w-full border-aqGlow/60" />
          <span className="absolute bg-aqBase px-3 text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
        </div>

        {/* Google Authentication Button */}
        <button
          type="button"
          className="w-full bg-aqGlow/20 hover:bg-aqGlow/40 text-white border border-aqGlow border-b-2 font-medium py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-3"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.56h3.29c1.93,-1.78 3.04,-4.4 3.04,-7.49C21.67,11.83 21.56,11.43 21.35,11.1z" fill="#4285F4" />
              <path d="M12,20.62c2.43,0 4.47,-0.81 5.96,-2.18l-3.29,-2.56c-0.91,0.61 -2.08,0.98 -2.67,0.98 -2.34,0 -4.33,-1.58 -5.03,-3.71H3.6v2.64C5.09,18.73 8.35,20.62 12,20.62z" fill="#34A853" />
              <path d="M6.97,13.15c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7s0.1,-1.16 0.28,-1.7V7.11H3.6v2.64C5.09,18.73 8.35,20.62 12,20.62z" fill="#FBBC05" />
              <path d="M12,6.14c1.32,0 2.51,0.45 3.44,1.35l2.58,-2.58C16.46,3.48 14.43,2.75 12,2.75c-3.65,0 -6.91,1.89 -8.4,4.36l3.37,2.64C7.67,8.03 9.66,6.14 12,6.14z" fill="#EA4335" />
            </g>
          </svg>
          Continue with Google
        </button>

        {/* Redirect Footer */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#25AC4C] font-semibold hover:underline">
            Register free
          </Link>
        </p>
      </div>
    </div>
  );
}