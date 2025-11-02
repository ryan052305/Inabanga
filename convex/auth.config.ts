export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || "https://clerk.inabanga.com",
      applicationID: 'convex',
    },
  ],
}