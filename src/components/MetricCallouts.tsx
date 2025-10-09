"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

type MetricTone = 'positive' | 'neutral' | 'warning';

export interface MetricCallout {
  label: string;
  value: string;
  description?: string;
  delta?: string;
  trend?: string;
  tone?: MetricTone;
}

interface MetricCalloutsProps {
  metrics: MetricCallout[];
  columns?: 1 | 2 | 3;
  activeKey?: string;
}

const toneClasses: Record<MetricTone, string> = {
  positive: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  neutral: 'border-sky-500/20 bg-sky-500/10 text-sky-200',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
};

export function MetricCallouts({ metrics, columns = 3, activeKey }: MetricCalloutsProps) {
  const gridClass = useMemo(() => {
    if (columns === 1) return 'grid-cols-1';
    if (columns === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';
  }, [columns]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.dl
        key={activeKey || metrics.map((metric) => metric.label).join('-')}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4 }}
        className={`grid gap-4 ${gridClass}`}
      >
        {metrics.map((metric) => {
          const tone = metric.tone ?? 'neutral';
          return (
            <motion.div
              key={metric.label}
              layout
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/70 p-5 shadow-lg backdrop-blur"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60" />
              </div>
              <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                {metric.label}
              </dt>
              <dd className="mt-3 flex items-baseline gap-3">
                <span className="text-4xl font-semibold text-foreground">{metric.value}</span>
                {(metric.delta || metric.trend) && (
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.7rem] font-medium ${toneClasses[tone]}`}
                  >
                    {metric.delta ?? metric.trend}
                  </span>
                )}
              </dd>
              {metric.description && (
                <p className="mt-2 text-sm text-muted">{metric.description}</p>
              )}
            </motion.div>
          );
        })}
      </motion.dl>
    </AnimatePresence>
  );
}
