import { mutation } from "./_generated/server";
import { Clerk } from "@clerk/backend";

// Create a Clerk client instance
const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });

export const upgradeUser = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const userId = identity.subject;

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: { plan: "pro" },
  });

  return { success: true };
});
