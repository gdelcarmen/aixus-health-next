"use client";

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Compass, MapPin } from 'lucide-react';

import { demoScenarios } from '@/data/codex';
import { DemoScenarioTabs } from './DemoScenarioTabs';

export default function AIXUSDemo() {
  const [activeScenarioId, setActiveScenarioId] = useState(demoScenarios[0]?.id ?? '');

  const activeScenario = useMemo(
    () => demoScenarios.find((scenario) => scenario.id === activeScenarioId) ?? demoScenarios[0],
    [activeScenarioId],
  );

  const progressValue = useMemo(() => {
    const index = demoScenarios.findIndex((scenario) => scenario.id === activeScenario?.id);
    if (index === -1) return 0;
    return ((index + 1) / demoScenarios.length) * 100;
  }, [activeScenario?.id]);

  return (
    <section className="relative space-y-8 rounded-3xl border border-border/50 bg-gradient-to-b from-background-subtle/60 via-background/40 to-background/70 p-6 shadow-2xl sm:p-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Immersive demo
          </p>
          <h2 className="mt-4 text-heading-md font-semibold text-foreground sm:text-heading-lg">
            Explore the orchestrated care workspace
          </h2>
          <p className="mt-2 max-w-2xl text-body-md text-muted">
            Toggle between clinician, patient, and recovery journeys to watch the navigator workspace adapt in real time. Every persona pulls from the same Codex so storytelling stays in sync.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
          <Compass className="h-4 w-4" /> Guided walkthrough
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.4fr_1.6fr]">
        <aside className="space-y-6 rounded-3xl border border-border/50 bg-surface/70 p-6 shadow-lg backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Scenario path</p>
            <div className="relative h-2 rounded-full bg-border/40">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                animate={{ width: `${progressValue}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-sm text-muted">{Math.round(progressValue)}% through the story</p>
          </div>

          <nav className="space-y-4">
            {demoScenarios.map((scenario, index) => {
              const isActive = scenario.id === activeScenario?.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={`group relative flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${isActive ? 'border-primary/50 bg-primary/10 text-foreground shadow-lg' : 'border-border/60 bg-background-subtle text-muted hover:text-foreground'}`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em]">{scenario.label}</p>
                    <p className="text-xs text-muted">{scenario.persona}</p>
                  </div>
                  <motion.span
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                    className="ml-auto text-primary"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </button>
              );
            })}
          </nav>

          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent">
            <p className="font-semibold uppercase tracking-[0.4em]">Codex aligned</p>
            <p className="mt-2 text-accent/80">
              Active scenario data flows directly from the codex module. Update it once and the hero, demo, plan, and stack pages stay coordinated.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario?.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
            >
              <DemoScenarioTabs
                scenarios={demoScenarios}
                activeScenarioId={activeScenarioId}
                onScenarioChange={setActiveScenarioId}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background-subtle/80 p-5 text-sm text-muted">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4" />
              <span>
                Persona anchors from the Codex power navigation breadcrumbs and ensure layout sections highlight the right focus areas.
              </span>
            </div>
            <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.4em]">
              Codex synced
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
