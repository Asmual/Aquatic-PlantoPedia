import { auth } from "@/lib/auth"; // আপনার auth.ts ফাইলটির সঠিক পাথ নিশ্চিত করুন

// ১. Better Auth-এর টাইপ অগমেন্টেশন (যাতে useSession-এ phoneNumber এবং role-এর টাইপ সাপোর্ট পাওয়া যায়)
declare module "better-auth" {
  interface User {
    phoneNumber?: string;
    role?: "user" | "admin";
  }
  interface Session {
    user: User;
  }
}

// ২. আপনার প্রজেক্টের গ্লোবাল ইন্টারফেসসমূহ (যাতে বারবার import করতে না হয়)
export interface TPlant {
  id?: string;
  title: string;
  scientificName: string;
  category: 'Aquatic' | 'Floating' | 'Submerged' | 'Deep Water';
  shortDescription: string;
  fullDescription: string;
  price: number;
  stock: number;
  sunlightNeeds: 'Low' | 'Medium' | 'High';
  image: string;
  rating: number;
}

export interface TUser {
  id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
}