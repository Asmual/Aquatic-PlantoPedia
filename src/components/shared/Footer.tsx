"use strict";

import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aqBase border-t border-aqGlow text-gray-400 shadow-cardGlow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-aqButton/40 shadow-btnGlow ">
                <Image
                  src="/Images/logo.png"
                  alt="Aquatic PlantoPedia Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-white transition-colors">
                Aquatic <span className="text-aqButton">PlantoPedia</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              Exotic aquatic ecosystems, lush floating plants, and premium
              boutique aquascaping artifacts.
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/plants"
                  className="hover:text-aqButton transition-colors"
                >
                  Aquatic Plants
                </Link>
              </li>
              <li>
                <Link
                  href="/fish"
                  className="hover:text-aqButton transition-colors"
                >
                  Exotic Fish
                </Link>
              </li>
              <li>
                <Link
                  href="/bonsai"
                  className="hover:text-aqButton transition-colors"
                >
                  Premium Bonsai
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-aqButton transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-aqButton transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-aqButton transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Icons (With Custom Glow Box Effects) */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Social Network
            </h3>
            <div className="flex gap-3">
              {/* Facebook Icon */}
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white hover:border-aqButton transition-all bg-aqGlow/40 p-2.5 rounded-xl border border-aqGlow shadow-sm text-aqButton hover:shadow-btnGlow"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Twitter / X Icon */}
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white hover:border-aqButton transition-all bg-aqGlow/40 p-2.5 rounded-xl border border-aqGlow shadow-sm text-aqButton hover:shadow-btnGlow"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram Icon */}
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white hover:border-aqButton transition-all bg-aqGlow/40 p-2.5 rounded-xl border border-aqGlow shadow-sm text-aqButton hover:shadow-btnGlow"
              >
                <svg
                  className="h-4 w-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Mail Icon */}
              <a
                href="#"
                aria-label="Email"
                className="hover:text-white hover:border-aqButton transition-all bg-aqGlow/40 p-2.5 rounded-xl border border-aqGlow shadow-sm text-aqButton hover:shadow-btnGlow"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-aqGlow mt-12 pt-6 text-xs flex flex-col sm:flex-row justify-between gap-4 text-gray-400">
          <p>&copy; {currentYear} Aquatic PlantoPedia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
