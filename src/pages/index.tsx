"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, PlayCircle } from 'lucide-react';

import { codex } from '@/data/codex';
import { HeroShowcase } from '@/components/HeroShowcase';
import { DemoScenarioTabs } from '@/components/DemoScenarioTabs';
import { MetricCallouts } from '@/components/MetricCallouts';

export default function Home() {
  const { heroSlides, demoScenarios } = codex;
  const [activeHeroSlideId, setActiveHeroSlideId] = useState(heroSlides[0]?.id ?? '');
  const [activeScenarioId, setActiveScenarioId] = useState(demoScenarios[0]?.id ?? '');

  const activeScenario = useMemo(
    () => demoScenarios.find((scenario) => scenario.id === activeScenarioId) ?? demoScenarios[0],
    [activeScenarioId, demoScenarios],
  );

  const heroIndex = useMemo(
    () => heroSlides.findIndex((slide) => slide.id === activeHeroSlideId),
    [heroSlides, activeHeroSlideId],
  );

  const sequenceProgress = useMemo(() => {
    const heroProgress = heroIndex >= 0 ? (heroIndex + 1) / heroSlides.length : 0;
    const scenarioProgress =
      demoScenarios.findIndex((scenario) => scenario.id === activeScenario?.id) + 1;
    return {
      hero: Math.round(heroProgress * 100),
      scenario: Math.round((scenarioProgress / demoScenarios.length) * 100),
    };
  }, [heroIndex, heroSlides.length, activeScenario?.id, demoScenarios]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background-subtle/60 to-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_55%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 sm:gap-20 sm:py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <HeroShowcase
            id="hero-story"
            slides={heroSlides}
            activeSlideId={activeHeroSlideId}
            onSlideChange={setActiveHeroSlideId}
          />
        </motion.div>

        <motion.section
          id="navigator-experience"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 rounded-3xl border border-border/50 bg-surface/70 p-6 shadow-xl backdrop-blur sm:p-10"
        >
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Navigator workspace
              </p>
              <h2 className="text-heading-md font-semibold text-foreground sm:text-heading-lg">
                Walk through the demo scenarios
              </h2>
              <p className="max-w-2xl text-body-md text-muted">
                Flip personas to see how readiness, consent, and recovery cues stay orchestrated. The Codex keeps each scenario in lockstep with the hero narrative.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
              <PlayCircle className="h-4 w-4" />
              Live simulation
            </div>
          </header>

          <DemoScenarioTabs
            scenarios={demoScenarios}
            activeScenarioId={activeScenarioId}
            onScenarioChange={setActiveScenarioId}
          />
        </motion.section>

        <motion.section
          id="codex-metrics"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-120px' }}
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="rounded-3xl border border-border/60 bg-background-subtle/80 p-6 shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-muted">Codex journey tracker</h3>
            <p className="mt-3 text-body-md text-muted">
              Every interactive moment references the shared Codex. When you advance the hero or scenarios, progress and metrics update everywhere instantly.
            </p>
            <div className="mt-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted">
                  <span>Hero storyline</span>
                  <span>{sequenceProgress.hero}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-border/40">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${sequenceProgress.hero}%` }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted">
                  <span>Scenario tour</span>
                  <span>{sequenceProgress.scenario}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-border/40">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    animate={{ width: `${sequenceProgress.scenario}%` }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-background p-4 text-sm text-muted">
              <Compass className="h-4 w-4" />
              Guided breadcrumbs follow your selections in the global layout navigation.
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-surface/80 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted">Dynamic metrics</h3>
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.4em] text-muted">
                Codex synced
              </span>
            </div>
            <p className="mt-3 text-body-md text-muted">
              Metrics refresh as personas change, blending readiness, confidence, and recovery signals from the Codex dataset.
            </p>
            <div className="mt-6">
              <MetricCallouts
                metrics={(activeScenario?.metrics ?? []).map((metric) => ({
                  label: metric.label,
                  value: metric.value,
                  delta: metric.delta,
                  tone: metric.tone,
                }))}
                columns={2}
                activeKey={activeScenario?.id}
              />
            </div>
            <motion.div
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4" />
              Explore the plan to see how tasks align
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
