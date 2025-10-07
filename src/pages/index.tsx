import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
        AIXUS Health is redefining the clinical experience
        <br />
        by individualizing the care pathway
      </h1>
      <p className="max-w-xl mx-auto text-lg text-gray-300 mb-8">
        Empower clinicians and patients with real‑time insights. From pre‑op readiness to
        recovery, the AIXUS platform keeps everyone aligned on tasks, expectations and outcomes.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/demo"
          className="px-6 py-3 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          Explore Demo
        </Link>
        <Link
          href="/plan"
          className="px-6 py-3 rounded-md border border-primary text-accent font-semibold hover:bg-secondary hover:text-primary transition-colors"
        >
          View Action Plan
        </Link>
        <Link
          href="/stack"
          className="px-6 py-3 rounded-md border border-primary text-accent font-semibold hover:bg-secondary hover:text-primary transition-colors"
        >
          Tech Stack
        </Link>
      </div>
    </main>
  );
}
