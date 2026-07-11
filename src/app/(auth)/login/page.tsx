"use strict";
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle standard email and password authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Field completeness structural assessment validation
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

    try {
      setIsLoading(true);

      // Submit user data via better-auth client provider mapping
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Welcome back! Login successful.", {
            duration: 3000,
            style: {
              background: "#032C1C",
              color: "#fff",
              border: "1px solid #25AC4C",
            },
          });
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message || "Invalid email or password.", {
            duration: 4000,
            style: {
              background: "#032C1C",
              color: "#fff",
              border: "1px solid #ef4444",
            },
          });
        }
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsLoading(false);
      toast.error("An unexpected network anomaly occurred.");
    }
  };

  // Handle federated social Google identity registration
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Google authentication failed to initialize.");
    }
  };

  return (
    <div className="min-h-screen bg-aqBase flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-aqBase border border-aqGlow/60 rounded-2xl p-8 shadow-cardGlow backdrop-blur-md relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2">Log in to manage your PlantoPedia ecosystem</p>
        </div>

        {/* Data Submission Interface Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Input Field */}
          <div className="space-y-1.5 relative group">
            <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type="email"
                disabled={isLoading}
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-1.5 relative group">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Password</label>
              <Link href="/forgot-password" className="text-xs text-[#25AC4C] hover:underline font-medium">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#25AC4C] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Core Submit Controller Action Trigger */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#25AC4C] hover:bg-[#25AC4C]/90 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-btnGlow flex items-center justify-center gap-2 group mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Dynamic Structural Visual Divider Separator */}
        <div className="relative my-6 flex items-center justify-center">
          <hr className="w-full border-aqGlow/60" />
          <span className="absolute bg-aqBase px-3 text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
        </div>

        {/* External Google Identity Portal Action Execution Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full bg-aqGlow/20 hover:bg-aqGlow/40 text-white border border-aqGlow border-b-2 font-medium py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        {/* Registration Redirection Anchor Portal Link */}
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