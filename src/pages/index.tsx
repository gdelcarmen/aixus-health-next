"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AIXUS Health is redefining the clinical experience
        <br />
        by individualizing the care pathway
      </motion.h1>
      <motion.p
        className="max-w-xl mx-auto text-lg text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Empower clinicians and patients with real‑time insights. From pre‑op readiness to
        recovery, the AIXUS platform keeps everyone aligned on tasks, expectations and outcomes.
      </motion.p>
      <motion.div
        className="flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link
          href="/demo"
          className="px-6 py-3 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          Explore Demo
        </Link>
        <Link
          href="/plan"
          className="px-6 py-3 rounded-md border border-primary text-accent font-semibold hover:bg-secondary hover:border-secondary transition-colors"
        >
          View Action Plan
        </Link>
        <Link
          href="/stack"
          className="px-6 py-3 rounded-md border border-primary text-accent font-semibold hover:bg-secondary hover:border-secondary transition-colors"
        >
          Tech Stack
        </Link>
      </motion.div>
    </main>
  );
}