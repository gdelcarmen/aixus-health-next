import Link from 'next/link';
import AIXUSDemo from '@/components/AIXUSDemo';

export default function DemoPage() {
  return (
    <main className="min-h-screen p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold">AIXUS Interactive Demo</h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Walk through the core experiences: clinician dashboard, patient tasks, informed consent and recovery planning.
        </p>
        <Link href="/" className="inline-block mt-2 px-4 py-2 rounded-md border border-primary text-accent font-semibold hover:bg-secondary transition-colors">
          Back to Home
        </Link>
      </header>
      <AIXUSDemo />
    </main>
  );
}
