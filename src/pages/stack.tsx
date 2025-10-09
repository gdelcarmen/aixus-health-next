"use client";

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Server, Sparkles } from 'lucide-react';

import { techStackLayers } from '@/data/codex';

export default function TechStack() {
  const [activeLayerId, setActiveLayerId] = useState(techStackLayers[0]?.id ?? 'frontend');

  const activeLayer = useMemo(
    () => techStackLayers.find((layer) => layer.id === activeLayerId) ?? techStackLayers[0],
    [activeLayerId],
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background-subtle to-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 sm:gap-12 sm:py-16">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Codex stack
            </p>
            <h1 className="text-heading-md font-semibold text-foreground sm:text-heading-lg">
              Explore the layers powering AIXUS
            </h1>
            <p className="max-w-2xl text-body-md text-muted">
              Toggle between frontend, backend, data, and infrastructure to see how each layer supports the orchestrated care experience.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
            <Layers className="h-4 w-4" /> Structured Codex
          </div>
        </header>

        <section className="rounded-3xl border border-border/50 bg-surface/80 p-6 shadow-xl backdrop-blur sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            {techStackLayers.map((layer) => {
              const isActive = layer.id === activeLayer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`group relative overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${isActive ? 'border-primary/60 bg-primary/10 text-primary' : 'border-border/60 bg-background-subtle text-muted hover:text-foreground'}`}
                >
                  <span className="flex items-center gap-2">
                    <Server className={`h-4 w-4 transition-colors ${isActive ? 'text-primary' : 'text-muted'}`} />
                    {layer.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="stack-tab"
                      className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
              className="mt-8 space-y-6"
            >
              <div className="rounded-2xl border border-border/60 bg-background-subtle/80 p-6 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">{activeLayer.label}</p>
                <p className="mt-3 text-body-md text-muted">{activeLayer.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {activeLayer.items.map((item) => (
                  <motion.div
                    key={item.name}
                    layout
                    className="group flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-background p-5 shadow-md transition-transform hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-heading-xs font-semibold text-foreground">{item.name}</h2>
                        <motion.span
                          className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35 }}
                        >
                          Active
                        </motion.span>
                      </div>
                      <p className="text-sm text-muted">{item.summary}</p>
                    </div>
                    <div className="mt-6 rounded-xl border border-dashed border-accent/40 bg-accent/10 p-4 text-sm text-accent">
                      <p className="font-semibold uppercase tracking-[0.3em] text-accent/80">Interaction</p>
                      <p className="mt-2 text-accent/80">{item.interaction}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="rounded-3xl border border-border/60 bg-background-subtle/80 p-6 shadow-lg sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted">Codex orchestration</h2>
              <p className="mt-3 max-w-3xl text-body-md text-muted">
                Updates to the Codex ripple through the hero storyline, interactive demo, and plan board. The stack view mirrors that structure so the narrative stays synchronized.
              </p>
            </div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-accent"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4" /> Codex linked
            </motion.span>
          </div>
        </section>
      </div>
    </main>
  );
}
