import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
        {/* Toast Notification Config */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              marginTop: "65px",
              marginRight: "10px",
              background: "#064E34",
              color: "#fff",
              border: "1px solid #25AC4C"
            }
          }}
        />
       
        {/* Main Content Area */}
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}