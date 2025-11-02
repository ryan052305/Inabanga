// app/page.tsx

import HomeClient from "@/components/HomeClient";
import { auth } from "@clerk/nextjs/server";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";

export default async function Page() {
  const { has } = await auth();
  const hasPro = has({ plan: "pro" });

  return (
    <ConvexClientProvider>
      <Authenticated>
        <div className="flex justify-end p-4">
          <UserButton />
        </div>
        <HomeClient hasPro={hasPro} />
      </Authenticated>

      <Unauthenticated>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Inabanga</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to start discovering top Amazon products.
          </p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </ConvexClientProvider>
  );
}
