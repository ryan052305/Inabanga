import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Get the current authenticated user (admin performing this request)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Parse request JSON body
    const { userId: targetUserId, role, plan } = await req.json();

    // ✅ Restrict who can assign roles (only your admin account)
    const adminSetterId = "user_2aBcDeFg12345user_34sTLJLDqC5ZBrrbprUNGBG4WLg";
    if (userId !== adminSetterId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Update the *target user's* public metadata (not your own)
    const clerk = await clerkClient();
    await clerk.users.updateUser(targetUserId, {
      publicMetadata: {
        role: role || "admin",
        plan: plan || "pro",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Error in set-admin-role:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
