"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroMetric, HeroSlide } from '@/data/codex';
import { MetricCallouts } from './MetricCallouts';

interface HeroShowcaseProps {
  id?: string;
  slides: HeroSlide[];
  activeSlideId: string;
  onSlideChange: (slideId: string) => void;
}

const slideVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

function toMetricCallout(metric: HeroMetric) {
  return {
    label: metric.label,
    value: metric.value,
    description: metric.description,
    trend: metric.trend,
  };
}

export function HeroShowcase({ id, slides, activeSlideId, onSlideChange }: HeroShowcaseProps) {
  const activeIndex = Math.max(
    0,
    slides.findIndex((slide) => slide.id === activeSlideId),
  );
  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-surface via-surface/70 to-background-subtle p-6 sm:p-10 shadow-xl"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {slides.map((slide, index) => {
                const isActive = slide.id === activeSlide.id;
                const progress = ((activeIndex + 1) / slides.length) * 100;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => onSlideChange(slide.id)}
                    className={`relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isActive ? 'border-primary/60 bg-primary/10 text-primary' : 'border-border/60 bg-background-subtle/60 text-muted hover:text-foreground'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="hidden text-xs uppercase tracking-[0.3em] text-muted sm:inline">{`0${index + 1}`}</span>
                      {slide.subtitle}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="hero-tab-indicator"
                        className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-primary/70"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
              <span>Guided Story</span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="inline-flex h-2 w-12 rounded-full bg-primary/40"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.5em] text-primary/80">
              <motion.span layoutId="hero-highlight-bullet" className="h-2 w-2 rounded-full bg-primary" />
              {activeSlide.highlight}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45 }}
                className="space-y-5"
              >
                <h1 className="text-heading-lg font-semibold text-foreground sm:text-heading-xl">
                  {activeSlide.title}
                </h1>
                <p className="max-w-xl text-body-lg text-muted">{activeSlide.narrative}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <MetricCallouts
            metrics={activeSlide.metrics.map(toMetricCallout)}
            columns={2}
            activeKey={activeSlide.id}
          />
        </div>

        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.media.src}
              initial={{ opacity: 0, scale: 0.96, rotateX: -8 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotateX: 8 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-to-b from-background-subtle/80 to-background/40 p-6 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-60" />
              <div className="relative aspect-[10/16] w-full">
                <Image
                  src={activeSlide.media.src}
                  alt={activeSlide.media.alt}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-muted">
                <span className="uppercase tracking-[0.4em]">{activeSlide.media.device}</span>
                <span>{activeIndex + 1} / {slides.length}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
