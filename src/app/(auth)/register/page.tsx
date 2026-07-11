"use strict";
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  // Validates standard criteria constraints mapping complexity parameters
  const validatePassword = (pass: string) => {
    const hasMinLength = pass.length >= 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[^A-Za-z0-9]/.test(pass);

    return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSymbol;
  };

  // Process core backend ingestion verification systems
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Structural confirmation validation checks across entries
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please complete all fields properly.", {
        duration: 3000,
        style: {
          background: "#032C1C",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
      return;
    }

    // RegEx string integrity authentication evaluation parsing
    if (!validatePassword(formData.password)) {
      toast.error("Password needs 8+ chars with upper, lower, number, and symbol.", {
        duration: 3000,
        style: {
          background: "#032C1C",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
      return;
    }

    // Comparative parameter synchronization check
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.", {
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

      // Pipe elements across to MongoDB via BetterAuth instance connection mapping
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/",
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Account created successfully! Welcome!", {
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
          toast.error(ctx.error.message || "Registration failed. Account might already exist.", {
            duration: 4000,
            style: {
              background: "#032C1C",
              color: "#fff",
              border: "1px solid #ef4444",
            },
          });
        }
      });
    } catch (err) {
      setIsLoading(false);
      toast.error("A technical error occurred during registration.");
    }
  };

  // Handle Google identity registration provider invocation routing setup
  const handleGoogleRegister = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google registration failed to initialize.");
    }
  };

  return (
    <div className="min-h-screen bg-aqBase flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Main Glassmorphism Display Card Canvas container setup */}
      <div className="w-full max-w-md bg-aqBase border border-aqGlow/60 rounded-2xl p-8 shadow-cardGlow backdrop-blur-md relative z-10">
        
        {/* Core Description Headings Label Segment */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 text-sm mt-2">Join PlantoPedia and customize your profile</p>
        </div>

        {/* Data Submission Entry Form Configuration layout wrapper */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* User Full Name Input Configuration Text Frame */}
          <div className="space-y-1.5 relative group">
            <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type="text"
                disabled={isLoading}
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* User Email Registration input management node system block */}
          <div className="space-y-1.5 relative group">
            <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type="email"
                disabled={isLoading}
                placeholder="example@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Secure AlphaNumeric Password String input data module tracking */}
          <div className="space-y-1.5 relative group">
            <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="Min 8 chars (A, a, 1, #)"
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

          {/* Secure Double Verification String Matching input box component context */}
          <div className="space-y-1.5 relative group">
            <label className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#25AC4C] transition-colors" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-[#032C1C] border border-aqGlow/50 rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#25AC4C] focus:ring-1 focus:ring-[#25AC4C] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#25AC4C] transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Main Action Controller Request Submission submission button trigger configuration */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#25AC4C] hover:bg-[#25AC4C]/90 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-btnGlow flex items-center justify-center gap-2 pt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Dynamic Context visual layout formatting split border setup divider */}
        <div className="relative my-5 flex items-center justify-center">
          <hr className="w-full border-aqGlow/60" />
          <span className="absolute bg-aqBase px-3 text-xs text-gray-500 uppercase tracking-wider">Or sign up with</span>
        </div>

        {/* Alternative Authentication Social Identity Google execution container entry */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleRegister}
          className="w-full bg-aqGlow/20 hover:bg-aqGlow/40 text-white border border-aqGlow border-b-2 font-medium py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <FcGoogle className="h-5 w-5" />
          Sign Up with Google
        </button>

        {/* Dynamic Inverse Login Form Portal Route Link Entry mapping */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#25AC4C] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}