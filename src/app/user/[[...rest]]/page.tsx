"use client";

import { UserProfile, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <SignedIn>
        <div className="w-full max-w-3xl">
          <UserProfile />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center">
          <SignInButton mode="modal">
            <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md">
              Sign in to access your profile
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </section>
  );
}
