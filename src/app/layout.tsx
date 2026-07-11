import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquatic PlantoPedia",
  description: "Premium Aquatic Plant & Ecosystem Marketplace",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-aquaticBg text-white min-h-screen flex flex-col`}>
        {/* Toast View Controller Setup adjusted for 50px optimized navbar height */}
        <Toaster 
          position="top-right" 
          reverseOrder={false} 
          toastOptions={{
            style: {
              marginTop: "65px",
              marginRight: "10px",
            }
          }}
        />
        
        <Navbar />
        {/* Growing Core Node Context Element Container */}
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}