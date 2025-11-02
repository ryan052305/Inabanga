import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Get the authenticated user (the one calling this endpoint)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Parse body
    const { userId: targetUserId, role, plan } = await req.json();

    // ✅ Restrict this route to your admin account only
    const adminSetterId = "user_34sTLJLDqC5ZBrrbprUNGBG4WLg";
    if (userId !== adminSetterId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Update target user's public metadata in Clerk
    const clerk = await clerkClient();
    await clerk.users.updateUser(targetUserId, {
      publicMetadata: {
        role: role || "admin",
        plan: plan || "pro",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error in /api/set-admin-role:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
