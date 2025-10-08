"use client";

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.article
      className="group rounded-2xl border border-border p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: 'var(--color-surface)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: 'rgba(95, 141, 255, 0.18)' }}
      >
        <Icon className="h-6 w-6 text-[color:var(--color-primary-soft)]" strokeWidth={1.5} />
      </div>
      <h3 className="text-heading-sm font-bold text-foreground mb-2">{title}</h3>
      <p className="text-body-md text-muted">{description}</p>
    </motion.article>
  );
}
