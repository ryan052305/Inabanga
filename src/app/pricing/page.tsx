import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-background to-muted/30 py-20 px-6">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Choose the Plan That Fits You Best
        </h1>
        <p className="text-muted-foreground text-lg">
          Upgrade anytime — unlock powerful features built for sellers.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-card shadow-xl rounded-3xl border border-border/50 p-6 md:p-10 transition-all hover:shadow-2xl">
        <PricingTable />
      </div>

      <div className="text-center mt-10 space-y-2">
        <p className="text-sm text-muted-foreground">
          You can <span className="font-medium text-foreground">cancel your subscription anytime</span>.
        </p>
      </div>
    </section>
  )
}
