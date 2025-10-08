"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardCheck, ShieldCheck, Sparkle, Stethoscope } from 'lucide-react';

import { FeatureCard } from '@/components/FeatureCard';

const features = [
  {
    icon: Sparkle,
    title: 'Intelligent orchestration',
    description:
      'Automated outreach, reminders, and education dynamically adapt to each patient’s risk profile and progress.'
  },
  {
    icon: ClipboardCheck,
    title: 'Surgical readiness clarity',
    description:
      'Surface a live readiness score and actionable tasks so clinical teams can proactively remove barriers to surgery.'
  },
  {
    icon: Stethoscope,
    title: 'Clinician collaboration',
    description:
      'Unify perioperative teams with a shared workflow that aligns surgeons, nurses, and care navigators.'
  },
  {
    icon: ShieldCheck,
    title: 'Recovery confidence',
    description:
      'Deliver individualized recovery plans and symptom tracking that give patients peace of mind after discharge.'
  }
];

const careJourney = [
  {
    title: 'Risk stratification',
    description: 'AI flags pulmonary risk as moderate and schedules respiratory coaching.',
    status: 'In Motion',
    tone: 'accent'
  },
  {
    title: 'Pre-op checklist',
    description: 'Patient confirmed medication hold and completed fasting questionnaire.',
    status: 'Completed',
    tone: 'success'
  },
  {
    title: 'Care navigator note',
    description: 'Navigator escalated mobility concern to PT with same-day telehealth slot.',
    status: 'Escalated',
    tone: 'warning'
  }
];

export default function Home() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/patterns/grid.svg'), var(--color-background)",
        backgroundSize: '10rem 10rem, cover',
        backgroundRepeat: 'repeat, no-repeat'
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/30 via-transparent to-white/10 dark:from-[#0f172a]/40 dark:via-transparent dark:to-[#0f172a]/30" />
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-16 sm:py-24">
        <motion.section
          className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: {} }}
        >
          <div className="space-y-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-primary"
                style={{ backgroundColor: 'rgba(200, 236, 255, 0.55)' }}
              >
                AI X US platform
              </span>
              <h1 className="text-heading-lg sm:text-heading-xl font-bold text-foreground">
                Let’s End One Size Fits All Healthcare
              </h1>
              <p className="max-w-xl text-body-lg text-muted">
                AI X US is optimizing patient outcomes by personalizing the surgical journey. We illuminate the path from
                preparation through recovery so every patient, clinician, and care team member is informed and empowered.
              </p>
            </motion.div>
            <motion.div
              className="rounded-3xl border border-border bg-surface/80 p-8 shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-body-sm font-semibold uppercase tracking-[0.25em] text-muted">Product simulation</p>
                  <h2 className="mt-2 text-heading-xs font-bold text-foreground">Navigator workspace</h2>
                </div>
                <span className="rounded-full bg-[color:var(--color-primary-soft)]/40 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Live preview
                </span>
              </div>
              <ul className="mt-8 space-y-6">
                {careJourney.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span
                      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full shadow-inner"
                      style={{
                        backgroundColor:
                          item.tone === 'success'
                            ? 'rgba(34, 197, 94, 0.18)'
                            : item.tone === 'warning'
                              ? 'rgba(251, 191, 36, 0.18)'
                              : 'rgba(125, 216, 255, 0.22)',
                        color:
                          item.tone === 'success'
                            ? 'var(--color-success)'
                            : item.tone === 'warning'
                              ? 'var(--color-warning)'
                              : 'var(--color-accent)'
                      }}
                    >
                      <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-3">
                        <p className="text-body-md font-semibold text-foreground">{item.title}</p>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                          style={{
                            backgroundColor:
                              item.tone === 'success'
                                ? 'rgba(34, 197, 94, 0.12)'
                                : item.tone === 'warning'
                                  ? 'rgba(251, 191, 36, 0.12)'
                                  : 'rgba(125, 216, 255, 0.16)',
                            color:
                              item.tone === 'success'
                                ? 'var(--color-success)'
                                : item.tone === 'warning'
                                  ? 'var(--color-warning)'
                                  : 'var(--color-accent-contrast)'
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-body-sm text-muted">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                <span>Updated moments ago from our synthetic pre-op cohort run.</span>
              </div>
            </motion.div>
            <motion.dl
              className="grid gap-6 sm:grid-cols-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div
                className="rounded-2xl border border-border p-6 backdrop-blur"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <dt className="text-body-sm uppercase tracking-[0.2em] text-muted">Surgical Readiness</dt>
                <dd className="mt-2 flex items-baseline gap-3">
                  <span className="text-5xl font-semibold text-[color:var(--color-score)]">92%</span>
                  <span className="text-body-md text-muted">average readiness score</span>
                </dd>
              </div>
              <div
                className="rounded-2xl border border-border p-6 backdrop-blur"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <dt className="text-body-sm uppercase tracking-[0.2em] text-muted">Task Completion</dt>
                <dd className="mt-2 flex items-baseline gap-3">
                  <span className="text-5xl font-semibold text-primary">48</span>
                  <span className="text-body-md text-muted">critical tasks automated weekly</span>
                </dd>
              </div>
            </motion.dl>
          </div>
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative flex h-full w-full max-w-md flex-col items-center justify-center">
              <div
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(125, 216, 255, 0.45)' }}
              />
              <Image
                src="/images/hero-app-1.svg"
                alt="AIXUS mobile experience overview"
                width={320}
                height={640}
                className="drop-shadow-2xl"
              />
              <Image
                src="/images/hero-app-2.svg"
                alt="Personalized care pathway on AIXUS"
                width={300}
                height={600}
                className="-mt-24 w-[65%] -translate-x-12 drop-shadow-2xl sm:-translate-x-16"
              />
            </div>
          </motion.div>
        </motion.section>

        <section className="space-y-12">
          <div className="max-w-2xl">
            <h2 className="text-heading-md font-bold text-foreground">Care teams move faster with clarity.</h2>
            <p className="mt-4 text-body-lg text-muted">
              Clinicians, navigators, and patients gain a single shared operating picture. These experience pillars deliver the
              confidence and calm needed to navigate the surgical journey without surprises.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={0.1 * index} />
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}