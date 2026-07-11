"use strict";
"use client";

import { useState, useEffect } from "react";
import { Camera, Lock, User, Mail, Phone, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Explicitly defining the extended User type to eliminate VS Code warnings
interface CustomUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  // Input states initialized with clear defaults to stop "controlled to uncontrolled" type errors
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Sync state cleanly whenever the session data safely loads or mutates
  useEffect(() => {
    if (session?.user) {
      const user = session.user as CustomUser;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(user.name || "");
      setPhoneNumber(user.phoneNumber || "");
      setPreviewUrl(user.image || null);
    }
  }, [session?.user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
  };

  const uploadToImgBB = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("ImgBB API key is missing in environment setup.");
      return null;
    }

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success && result.data?.url) {
        return result.data.url;
      }
      return null;
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      return null;
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let finalImageUrl = session?.user?.image || null;

      // 1. Process local file image upload to cloud infrastructure only when saving triggers
      if (selectedFile) {
        setIsUploading(true);
        const uploadedUrl = await uploadToImgBB(selectedFile);
        setIsUploading(false);

        if (!uploadedUrl) {
          toast.error("Failed to upload the new profile image.");
          setIsSaving(false);
          return;
        }
        finalImageUrl = uploadedUrl;
      }

      // 2. Perform direct MongoDB document updates using supported user fields
      // FIX: phoneNumber was missing here, so it was never sent to better-auth
      // and never persisted to MongoDB even though the schema supports it.
      await authClient.updateUser({
        name: name,
        image: finalImageUrl || undefined,
        phoneNumber: phoneNumber,
      });

      setSelectedFile(null);

      // 3. Complete internal refetch cache sync procedures before firing toast alerts
      await refetch();

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("An error occurred while saving your profile updates.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-aqBase flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-aqButton animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-aqBase pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto bg-aqBase/60 border border-aqGlow/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-cardGlow">
        <h1 className="text-xl md:text-2xl font-bold border-b border-aqGlow/20 pb-4 mb-8">
          Account <span className="text-aqButton">Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-aqGlow/20 pb-6 md:pb-0 md:pr-8">
            <div className="relative group w-28 h-28 md:w-32 md:h-32 rounded-full border border-aqButton shadow-btnGlow overflow-hidden bg-aqGlow flex items-center justify-center">
              {isUploading ? (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <Loader2 className="h-6 w-6 text-aqButton animate-spin" />
                </div>
              ) : (
                <>
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="User Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold uppercase">{name?.charAt(0) ?? "U"}</span>
                  )}

                  <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isSaving || isUploading}
                  />
                </>
              )}
            </div>

            <div className="text-center mt-4">
              <h2 className="text-base font-semibold tracking-tight">{session.user.name}</h2>
              <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Mail className="h-3 w-3" /> {session.user.email}
              </p>
              {selectedFile && (
                <span className="inline-block mt-2 text-[10px] bg-aqButton/20 border border-aqButton/40 text-aqButton px-2 py-0.5 rounded-full animate-pulse">
                  Unsaved Changes
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-aqBase border border-aqGlow/40 rounded-lg focus:outline-none focus:border-aqButton text-white transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Email Address (Locked)</label>
                <div className="relative opacity-60">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    disabled
                    value={session.user.email}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-aqGlow/20 border border-aqGlow/40 rounded-lg cursor-not-allowed text-gray-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-aqBase border border-aqGlow/40 rounded-lg focus:outline-none focus:border-aqButton text-white transition-colors"
                    placeholder="Add or update phone number"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-aqGlow/20">
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="bg-aqButton hover:bg-aqButton/90 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all shadow-btnGlow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}