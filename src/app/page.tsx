// app/page.tsx
import HomeClient from "@/components/HomeClient";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { has } = await auth();
  const hasPro = has({ plan: "pro" });

  return <HomeClient hasPro={hasPro} />;
}
