// app/page.tsx

import HomeClient from "@/components/HomeClient";
import { auth } from "@clerk/nextjs/server";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default async function Page() {
  const { has } = await auth();
  const hasPro = has({ plan: "pro" });

  return <HomeClient hasPro={hasPro} />;
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return <div>Authenticated content: {messages?.length}</div>;
}

