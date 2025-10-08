import Link from 'next/link';
import AIXUSDemo from '@/components/AIXUSDemo';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-heading-md sm:text-heading-lg font-bold">AIXUS Interactive Demo</h1>
        <p className="text-muted text-body-md max-w-3xl mx-auto">
          Walk through the core experiences: clinician dashboard, patient tasks, informed consent and recovery planning.
        </p>
        <Link href="/" className="inline-block mt-2 px-4 py-2 rounded-md border border-border bg-background text-foreground font-semibold transition-colors hover:border-primary hover:text-primary hover:bg-background-subtle">
          Back to Home
        </Link>
      </header>
      <AIXUSDemo />
    </main>
  );
}
