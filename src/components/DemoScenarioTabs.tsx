"use client";

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { DemoScenario } from '@/data/codex';
import { MetricCallouts, MetricCallout } from './MetricCallouts';

interface DemoScenarioTabsProps {
  scenarios: DemoScenario[];
  activeScenarioId: string;
  onScenarioChange: (scenarioId: string) => void;
}

const timelineTone: Record<DemoScenario['timeline'][number]['status'], string> = {
  complete: 'bg-emerald-500/60 border-emerald-500/60 text-emerald-100',
  active: 'bg-primary/40 border-primary/60 text-primary',
  upcoming: 'bg-border/40 border-border/60 text-muted',
};

function toMetricCallouts(metrics: DemoScenario['metrics']): MetricCallout[] {
  return metrics.map((metric) => ({
    label: metric.label,
    value: metric.value,
    delta: metric.delta,
    tone: metric.tone,
  }));
}

export function DemoScenarioTabs({ scenarios, activeScenarioId, onScenarioChange }: DemoScenarioTabsProps) {
  const [checklistState, setChecklistState] = useState<Record<string, Record<string, boolean>>>(() => {
    return scenarios.reduce((acc, scenario) => {
      acc[scenario.id] = scenario.checklist.reduce((column, item) => {
        column[item.id] = item.complete;
        return column;
      }, {} as Record<string, boolean>);
      return acc;
    }, {} as Record<string, Record<string, boolean>>);
  });

  const activeScenario = useMemo(() => {
    return scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];
  }, [scenarios, activeScenarioId]);

  const handleChecklistToggle = (scenarioId: string, itemId: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        [itemId]: !prev[scenarioId]?.[itemId],
      },
    }));
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onScenarioChange(scenario.id)}
              className={`group relative overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${isActive ? 'border-primary/60 bg-primary/10 text-primary' : 'border-border/60 bg-background-subtle text-muted hover:text-foreground'}`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 transition-colors ${isActive ? 'text-primary' : 'text-muted'}`} />
                {scenario.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="scenario-tab-indicator"
                  className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario.id}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.45 }}
          className="grid gap-8 rounded-3xl border border-border/50 bg-surface/70 p-6 shadow-xl backdrop-blur lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="space-y-6">
            <header className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {activeScenario.persona}
              </span>
              <h2 className="text-heading-sm font-semibold text-foreground sm:text-heading-md">
                {activeScenario.headline}
              </h2>
              <p className="text-body-md text-muted">{activeScenario.description}</p>
            </header>

            <div className="grid gap-6 md:grid-cols-[1fr_0.65fr]">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Timeline</h3>
                <div className="relative pl-4">
                  <div className="absolute left-[0.4rem] top-2 bottom-2 w-0.5 bg-border/60" aria-hidden />
                  <ul className="space-y-5">
                    {activeScenario.timeline.map((item, index) => {
                      const progress = ((index + 1) / activeScenario.timeline.length) * 100;
                      return (
                        <li key={item.id} className="relative">
                          <motion.span
                            layout
                            className={`absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full border text-[0.65rem] font-semibold uppercase ${timelineTone[item.status]}`}
                          >
                            {item.time.replace(/[^0-9A-Za-z]/g, '').slice(0, 2)}
                          </motion.span>
                          <div className="rounded-2xl border border-border/60 bg-background-subtle/80 p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-body-md font-semibold text-foreground">{item.title}</p>
                              <motion.div
                                layout
                                className="h-1 w-24 overflow-hidden rounded-full bg-border"
                              >
                                <motion.div
                                  className="h-full bg-primary"
                                  initial={{ width: `${item.status === 'complete' ? 100 : item.status === 'active' ? 65 : 15}%` }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ duration: 0.6, delay: index * 0.05 }}
                                />
                              </motion.div>
                            </div>
                            <p className="mt-2 text-sm text-muted">{item.detail}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Readiness Pulse</h3>
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border/60 bg-background-subtle/80 p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeScenario.chart.data}>
                      <defs>
                        <linearGradient id={`scenarioGradient-${activeScenario.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="step" hide padding={{ left: 20, right: 20 }} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip
                        cursor={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
                        contentStyle={{
                          background: 'var(--color-surface)',
                          borderRadius: '12px',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-foreground)',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                        fill={`url(#scenarioGradient-${activeScenario.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between text-xs text-muted">
                    <span>{activeScenario.chart.label}</span>
                    <span>{activeScenario.chart.data[activeScenario.chart.data.length - 1]?.score ?? ''}</span>
                  </div>
                </div>
              </div>
            </div>

            <MetricCallouts
              metrics={toMetricCallouts(activeScenario.metrics)}
              columns={3}
              activeKey={activeScenario.id}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 bg-background-subtle/80 p-5 shadow-md">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Interactive Checklist</h3>
              <ul className="mt-4 space-y-3">
                {activeScenario.checklist.map((item) => {
                  const checked = checklistState[activeScenario.id]?.[item.id] ?? item.complete;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleChecklistToggle(activeScenario.id, item.id)}
                        className={`group flex w-full items-start gap-3 rounded-xl border border-border/60 bg-surface/80 p-3 text-left transition-colors hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${checked ? 'shadow-lg' : ''}`}
                      >
                        <motion.span
                          animate={{ scale: checked ? 1 : 0.95 }}
                          className={`mt-1 rounded-full border p-1 ${checked ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300' : 'border-border text-muted'}`}
                        >
                          {checked ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        </motion.span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          {item.note && (
                            <p className="text-xs text-muted">{item.note}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5 text-sm text-primary">
              <p className="font-semibold uppercase tracking-[0.4em]">Scenario cadence</p>
              <p className="mt-3 text-primary/80">
                Switching personas updates the live chart, metrics, and checklist state so demos feel like a sequenced story.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
