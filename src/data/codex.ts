export interface HeroMetric {
  label: string;
  value: string;
  description: string;
  trend?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  narrative: string;
  highlight: string;
  metrics: HeroMetric[];
  media: {
    device: 'mobile' | 'tablet' | 'desktop';
    src: string;
    alt: string;
  };
}

export interface ScenarioTimelineItem {
  id: string;
  time: string;
  title: string;
  detail: string;
  status: 'complete' | 'active' | 'upcoming';
}

export interface ScenarioChecklistItem {
  id: string;
  label: string;
  complete: boolean;
  note?: string;
}

export interface ScenarioMetric {
  label: string;
  value: string;
  delta?: string;
  tone?: 'positive' | 'neutral' | 'warning';
}

export interface DemoScenario {
  id: string;
  label: string;
  persona: string;
  headline: string;
  description: string;
  timeline: ScenarioTimelineItem[];
  checklist: ScenarioChecklistItem[];
  metrics: ScenarioMetric[];
  chart: {
    label: string;
    data: { step: string; score: number }[];
  };
}

export interface ActionPlanTask {
  id: string;
  title: string;
  owner: string;
  status: 'Planned' | 'In Flight' | 'Blocked' | 'Complete';
  note?: string;
}

export interface ActionPlanColumn {
  id: string;
  title: string;
  description: string;
  focus: string;
  tasks: ActionPlanTask[];
}

export interface TechStackItem {
  name: string;
  summary: string;
  interaction: string;
}

export interface TechStackLayer {
  id: 'frontend' | 'backend' | 'data' | 'infrastructure';
  label: string;
  description: string;
  items: TechStackItem[];
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'personalization',
    title: 'Personalized surgical journeys start with clarity',
    subtitle: 'Navigator workspace',
    narrative:
      'Surface readiness, outstanding tasks, and escalations in a single adaptive view. Clinicians receive proactive prompts while patients see next steps in plain language.',
    highlight: 'Real-time orchestration engine',
    metrics: [
      {
        label: 'Tasks automated',
        value: '48',
        description: 'per care coordinator each week',
        trend: '+18% vs. last month',
      },
      {
        label: 'Readiness lift',
        value: '22%',
        description: 'increase in on-time surgeries',
      },
    ],
    media: {
      device: 'tablet',
      src: '/images/navigator-tablet.png',
      alt: 'Tablet showing navigator workspace dashboard',
    },
  },
  {
    id: 'team-sync',
    title: 'Keep surgeons, nurses, and navigators aligned',
    subtitle: 'Team timeline',
    narrative:
      'AIXUS timelines show exactly where every perioperative task stands. Automated nudges reassign bottlenecks before they impact the surgical date.',
    highlight: 'Escalation & collaboration fabric',
    metrics: [
      {
        label: 'Cross-team updates',
        value: '5.6x',
        description: 'faster triage on escalations',
        trend: '-2.3 hr cycle time',
      },
      {
        label: 'Staff confidence',
        value: '93',
        description: 'experience score from pilot cohort',
      },
    ],
    media: {
      device: 'desktop',
      src: '/images/team-desktop.png',
      alt: 'Desktop UI showing team status timeline',
    },
  },
  {
    id: 'recovery',
    title: 'Extend guidance into a confident recovery',
    subtitle: 'Patient recovery coach',
    narrative:
      'Dynamic recovery plans adapt to patient-reported symptoms and wearable signals, closing the loop with surgeons through intelligent alerts.',
    highlight: 'Recovery intelligence loop',
    metrics: [
      {
        label: 'Symptom triage time',
        value: '7 min',
        description: 'average RN acknowledgement',
      },
      {
        label: 'Patient alignment',
        value: '87',
        description: 'engagement score after discharge',
        trend: '+9 vs. baseline',
      },
    ],
    media: {
      device: 'mobile',
      src: '/images/recovery-mobile.png',
      alt: 'Mobile phone showing recovery timeline controls',
    },
  },
];

export const demoScenarios: DemoScenario[] = [
  {
    id: 'clinician',
    label: 'Clinician',
    persona: 'Care Navigator',
    headline: 'Hannah Young is nearly ready for surgery',
    description:
      'Clinical teams orchestrate readiness tasks and intervene quickly with AI-ranked risk signals.',
    timeline: [
      {
        id: 'tl-1',
        time: '08:40',
        title: 'Respiratory coaching assigned',
        detail: 'AI flagged pulmonary risk as moderate and created a targeted pre-op plan.',
        status: 'complete',
      },
      {
        id: 'tl-2',
        time: '09:10',
        title: 'Navigator escalated mobility concern',
        detail: 'Physical therapy added to pathway with same-day telehealth slot.',
        status: 'active',
      },
      {
        id: 'tl-3',
        time: '12:20',
        title: 'Consent packet verification',
        detail: 'Pending e-signature from patient; auto reminder scheduled.',
        status: 'upcoming',
      },
    ],
    checklist: [
      { id: 'cl-1', label: 'Medication hold confirmed', complete: true },
      { id: 'cl-2', label: 'Lab results synced', complete: true },
      { id: 'cl-3', label: 'Consent awaiting signature', complete: false, note: 'Reminder sent 10m ago' },
    ],
    metrics: [
      { label: 'Readiness score', value: '92', delta: '+4', tone: 'positive' },
      { label: 'Tasks cleared', value: '17 / 20', delta: '+2 today', tone: 'neutral' },
      { label: 'Escalations open', value: '1', delta: '-1 vs. avg', tone: 'positive' },
    ],
    chart: {
      label: 'Readiness trajectory',
      data: [
        { step: 'Intake', score: 48 },
        { step: 'Risk review', score: 63 },
        { step: 'Clinician huddle', score: 78 },
        { step: 'Today', score: 92 },
      ],
    },
  },
  {
    id: 'patient',
    label: 'Patient',
    persona: 'Hannah Young',
    headline: 'Know exactly what to do before surgery',
    description:
      'Patients receive guided tasks, friendly nudges, and human check-ins that match their confidence level.',
    timeline: [
      {
        id: 'pt-1',
        time: 'Today',
        title: 'Review fasting guide',
        detail: 'Interactive module finished, comprehension score 92%.',
        status: 'complete',
      },
      {
        id: 'pt-2',
        time: 'Tomorrow',
        title: 'Chlorhexidine rinse',
        detail: 'Patient scheduled reminder and marked supplies delivered.',
        status: 'active',
      },
      {
        id: 'pt-3',
        time: 'Surgery day',
        title: 'Arrival checklist',
        detail: 'Wayfinding and parking instructions pinned to mobile wallet.',
        status: 'upcoming',
      },
    ],
    checklist: [
      { id: 'ptc-1', label: 'Informed consent passcode verified', complete: true },
      { id: 'ptc-2', label: 'Protein intake logged', complete: false, note: 'Goal 85g daily' },
      { id: 'ptc-3', label: 'Support contact confirmed', complete: true },
    ],
    metrics: [
      { label: 'Confidence index', value: '87', delta: '+11 after coaching', tone: 'positive' },
      { label: 'Daily streak', value: '5 days', tone: 'neutral' },
      { label: 'Messages unread', value: '0', delta: 'All caught up', tone: 'positive' },
    ],
    chart: {
      label: 'Engagement trend',
      data: [
        { step: 'Week -2', score: 54 },
        { step: 'Week -1', score: 68 },
        { step: 'This week', score: 83 },
        { step: 'Today', score: 87 },
      ],
    },
  },
  {
    id: 'recovery',
    label: 'Recovery',
    persona: 'Post-op Coach',
    headline: 'Adapt recovery with live signal monitoring',
    description:
      'Recovery dashboards blend patient reported outcomes with wearable streams so clinicians intervene at the right moment.',
    timeline: [
      {
        id: 'rc-1',
        time: 'Post-op Day 1',
        title: 'Pain survey received',
        detail: 'Flagged as moderate and assigned nurse follow-up.',
        status: 'complete',
      },
      {
        id: 'rc-2',
        time: 'Post-op Day 4',
        title: 'Mobility milestone met',
        detail: 'Steps goal achieved, wearable sync confirmed.',
        status: 'active',
      },
      {
        id: 'rc-3',
        time: 'Upcoming',
        title: 'Virtual wound check',
        detail: 'Consent module queued with educational snippets.',
        status: 'upcoming',
      },
    ],
    checklist: [
      { id: 'rcc-1', label: 'Symptom triage note sent', complete: true },
      { id: 'rcc-2', label: 'Recovery slider updated', complete: false, note: 'Patient expects 6 days' },
      { id: 'rcc-3', label: 'Care circle synced', complete: true },
    ],
    metrics: [
      { label: 'Recovery time goal', value: '6 days', delta: '-1.5 vs. baseline', tone: 'positive' },
      { label: 'Check-ins automated', value: '12', delta: 'this week', tone: 'neutral' },
      { label: 'Alerts unresolved', value: '0', tone: 'positive' },
    ],
    chart: {
      label: 'Healing confidence',
      data: [
        { step: 'Day 1', score: 61 },
        { step: 'Day 3', score: 72 },
        { step: 'Day 5', score: 81 },
        { step: 'Today', score: 89 },
      ],
    },
  },
];

export const actionPlanColumns: ActionPlanColumn[] = [
  {
    id: 'now',
    title: 'Now',
    description: 'Immediate priorities to launch the pilot experience.',
    focus: 'Align care navigation workflows and compliance gates.',
    tasks: [
      {
        id: 'now-1',
        title: 'Design navigator readiness cockpit',
        owner: 'Product',
        status: 'In Flight',
        note: 'Prototype linked in Figma with consent escalation states.',
      },
      {
        id: 'now-2',
        title: 'Integrate consent e-signature API',
        owner: 'Engineering',
        status: 'Planned',
        note: 'Waiting on legal review for vendor agreement.',
      },
      {
        id: 'now-3',
        title: 'Map perioperative data feeds',
        owner: 'Data Science',
        status: 'In Flight',
        note: 'HL7 ADT stream validated; wearable integration pending.',
      },
    ],
  },
  {
    id: 'next',
    title: 'Next',
    description: 'Sequenced initiatives that deepen personalization.',
    focus: 'Expand patient guidance modules and analytics loops.',
    tasks: [
      {
        id: 'next-1',
        title: 'Launch patient confidence scoring',
        owner: 'Behavioral Science',
        status: 'Planned',
        note: 'Needs translation review and tone calibration.',
      },
      {
        id: 'next-2',
        title: 'Automate nurse escalation routing',
        owner: 'Operations',
        status: 'Planned',
        note: 'Define thresholds with clinical governance council.',
      },
      {
        id: 'next-3',
        title: 'Embed analytics pulse into EHR',
        owner: 'Engineering',
        status: 'Blocked',
        note: 'Awaiting Epic App Orchard sandbox approval.',
      },
    ],
  },
  {
    id: 'later',
    title: 'Later',
    description: 'Strategic investments for scale and differentiation.',
    focus: 'Optimize recovery intelligence and partner network.',
    tasks: [
      {
        id: 'later-1',
        title: 'Introduce wearable partner marketplace',
        owner: 'Partnerships',
        status: 'Planned',
        note: 'Targeting Q3 vendor showcase.',
      },
      {
        id: 'later-2',
        title: 'Predictive staffing insights',
        owner: 'Data Science',
        status: 'Planned',
        note: 'Requires longitudinal outcomes dataset.',
      },
      {
        id: 'later-3',
        title: 'Recovery community loops',
        owner: 'Patient Experience',
        status: 'Planned',
        note: 'Design moderated groups with clinical oversight.',
      },
    ],
  },
];

export const techStackLayers: TechStackLayer[] = [
  {
    id: 'frontend',
    label: 'Frontend Experience',
    description: 'Craft immersive clinician and patient surfaces that adapt to context.',
    items: [
      {
        name: 'Next.js App Router',
        summary: 'Server-driven routing with streaming UI for real-time care updates.',
        interaction: 'Delivers navigator workspace transitions and hydration for checklists.',
      },
      {
        name: 'Framer Motion',
        summary: 'Declarative motion primitives for timelines and guided flows.',
        interaction: 'Animates hero carousel progress and scenario transitions.',
      },
      {
        name: 'Tailwind CSS + tokens',
        summary: 'Design system tokens that keep typography and color consistent.',
        interaction: 'Applies mode-aware gradients and precise layout rhythm.',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend Services',
    description: 'Secure orchestration layer that coordinates patient and clinician journeys.',
    items: [
      {
        name: 'Node.js service mesh',
        summary: 'Type-safe service layer for scheduling, consent, and messaging.',
        interaction: 'Publishes readiness events that drive live navigator boards.',
      },
      {
        name: 'GraphQL gateway',
        summary: 'Unified schema for pulling tasks, metrics, and personalization data.',
        interaction: 'Powers clinician and patient tabs without over-fetching.',
      },
      {
        name: 'Auth0 workforce IAM',
        summary: 'Fine-grained role access and audit trails for care teams.',
        interaction: 'Enforces clinical scopes on escalation workflows.',
      },
    ],
  },
  {
    id: 'data',
    label: 'Data Intelligence',
    description: 'Pipelines that shape raw clinical signals into decision-ready insights.',
    items: [
      {
        name: 'Fivetran ingestion',
        summary: 'Managed connectors for EHR, wearables, and patient engagement tools.',
        interaction: 'Feeds the readiness trajectory models nightly.',
      },
      {
        name: 'dbt semantic layer',
        summary: 'Re-usable transformations define readiness, risk, and sentiment metrics.',
        interaction: 'Generates codified KPIs for the metrics callouts.',
      },
      {
        name: 'Vertex AI personalization',
        summary: 'Predictive models tailor recovery suggestions and risk stratification.',
        interaction: 'Updates action plan focus areas from streaming telemetry.',
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure & Ops',
    description: 'Reliability, compliance, and delivery foundations for regulated care.',
    items: [
      {
        name: 'GKE multi-region',
        summary: 'High availability clusters with automated compliance guardrails.',
        interaction: 'Keeps navigator workspace live across hospital regions.',
      },
      {
        name: 'HashiCorp Vault',
        summary: 'Secret management and key rotation for sensitive integrations.',
        interaction: 'Secures consent and messaging credentials end-to-end.',
      },
      {
        name: 'Terraform blueprints',
        summary: 'Infrastructure as code for clinics onboarding onto the platform.',
        interaction: 'Bootstraps new health system environments in hours.',
      },
    ],
  },
];

export const codex = {
  heroSlides,
  demoScenarios,
  actionPlanColumns,
  techStackLayers,
};

export type Codex = typeof codex;
