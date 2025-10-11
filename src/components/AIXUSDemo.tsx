"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BatteryFull,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  LineChart,
  Moon,
  Pill,
  Signal,
  Sun,
  User,
  Wifi,
} from "lucide-react";

function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

type LightTask = {
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
  accent: string;
};

type DarkTask = {
  title: string;
  detail: string;
  dosage: string;
  time: string;
  icon: LucideIcon;
  accent: string;
};

type FilterChipConfig = {
  label: string;
  active: boolean;
};

type BottomNavItem = {
  label: string;
  icon: LucideIcon;
  active: boolean;
};

type LightPhoneData = {
  statusBarTime: string;
  statusLabel: string;
  greeting: string;
  userName: string;
  headline: string;
  supportingCopy: string;
  readiness: {
    label: string;
    score: number;
    trend: number;
    trendSuffix: string;
    focus: string;
    coachNote: string;
  };
  upcomingLabel: string;
  viewAllLabel: string;
  tasks: LightTask[];
  badgeIcon: LucideIcon;
  badgeClassName: string;
  badgeIconClassName: string;
};

type DarkPhoneData = {
  statusBarTime: string;
  statusLabel: string;
  greeting: string;
  userName: string;
  headline: string;
  dateLabel?: string;
  supportingCopy: string;
  tasks: DarkTask[];
  filterChips: FilterChipConfig[];
  bottomNav: BottomNavItem[];
  badgeIcon: LucideIcon;
  badgeClassName: string;
  badgeIconClassName: string;
  taskActionLabel: string;
};

type LightPhoneOverrides = Partial<Omit<LightPhoneData, "readiness" | "tasks">> & {
  readiness?: Partial<LightPhoneData["readiness"]>;
  tasks?: LightTask[];
};

type DarkPhoneOverrides = Partial<Omit<DarkPhoneData, "tasks" | "filterChips" | "bottomNav">> & {
  tasks?: DarkTask[];
  filterChips?: FilterChipConfig[];
  bottomNav?: BottomNavItem[];
};

export type AIXUSDemoProps = {
  light?: LightPhoneOverrides;
  dark?: DarkPhoneOverrides;
  className?: string;
};

const defaultLight: LightPhoneData = {
  statusBarTime: "7:30",
  statusLabel: "Navigator",
  greeting: "Good Morning",
  userName: "John",
  headline: "You're on track for your Hernia Repair",
  supportingCopy:
    "The surgical readiness score reflects how well your routines support recovery.",
  readiness: {
    label: "Readiness Score",
    score: 87,
    trend: 4,
    trendSuffix: "vs yesterday",
    focus: "Pre-op checklist",
    coachNote: "Hydrate and walk as planned",
  },
  upcomingLabel: "Upcoming Tasks",
  viewAllLabel: "View all",
  tasks: [
    {
      title: "Eat 85g of Protein",
      detail: "Recovery power breakfast",
      time: "15th • Morning",
      icon: Activity,
      accent: "bg-sky-100 text-sky-600",
    },
    {
      title: "Take Chlorhexidine Bath",
      detail: "Necessary step",
      time: "15th • Evening",
      icon: Calendar,
      accent: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Stop Anti-Coagulant",
      detail: "Recovery preparation",
      time: "16th • Morning",
      icon: Pill,
      accent: "bg-violet-100 text-violet-600",
    },
  ],
  badgeIcon: Sun,
  badgeClassName: "shadow-sm",
  badgeIconClassName: "text-amber-400",
};

const defaultDark: DarkPhoneData = {
  statusBarTime: "7:30",
  statusLabel: "Recovery Mode",
  greeting: "Good Evening",
  userName: "John",
  headline: "Today's Tasks",
  dateLabel: new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date("2024-05-15T19:30:00")),
  supportingCopy: "All • Critical • Coaching",
  tasks: [
    {
      title: "Eat 85g of Protein",
      detail: "Recovery power dinner",
      dosage: "40g left",
      time: "7:00 PM",
      icon: Activity,
      accent: "bg-sky-500/20 text-sky-200",
    },
    {
      title: "Stop Anti-Coagulant",
      detail: "Recovery preparation",
      dosage: "Critical",
      time: "8:30 PM",
      icon: Pill,
      accent: "bg-rose-500/20 text-rose-200",
    },
    {
      title: "Schedule Uber to Follow Up",
      detail: "Next-day appointment",
      dosage: "Due",
      time: "9:15 PM",
      icon: Calendar,
      accent: "bg-indigo-500/20 text-indigo-200",
    },
  ],
  filterChips: [
    { label: "All", active: true },
    { label: "Critical", active: false },
    { label: "Coaching", active: false },
  ],
  bottomNav: [
    { label: "Home", icon: Home, active: true },
    { label: "Tasks", icon: Calendar, active: false },
    { label: "Alerts", icon: Bell, active: false },
    { label: "Profile", icon: User, active: false },
  ],
  badgeIcon: Moon,
  badgeClassName: "bg-white/10",
  badgeIconClassName: "text-indigo-200",
  taskActionLabel: "Mark done",
};

export default function AIXUSDemo({
  light,
  dark,
  className,
}: AIXUSDemoProps = {}) {
  const lightConfig: LightPhoneData = {
    ...defaultLight,
    ...light,
    readiness: { ...defaultLight.readiness, ...light?.readiness },
    tasks: light?.tasks ?? defaultLight.tasks,
  };

  const darkConfig: DarkPhoneData = {
    ...defaultDark,
    ...dark,
    tasks: dark?.tasks ?? defaultDark.tasks,
    filterChips: dark?.filterChips ?? defaultDark.filterChips,
    bottomNav: dark?.bottomNav ?? defaultDark.bottomNav,
  };

  const readinessTrend = formatTrend(lightConfig.readiness.trend);
  const darkDateLabel =
    darkConfig.dateLabel ??
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date());

  return (
    <section
      className={cn(
        "relative mx-auto flex max-w-5xl flex-col justify-center gap-10 overflow-hidden rounded-[3rem] border border-slate-900/60 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#020617] p-10 text-slate-100 shadow-[0_80px_120px_-80px_rgba(15,23,42,0.9)] lg:flex-row",
        className,
      )}
    >
      <div className="pointer-events-none absolute -left-48 top-12 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative z-10 flex flex-col justify-center gap-10 lg:flex-row">
        <div className="mx-auto flex w-full max-w-[320px] flex-col rounded-[2.25rem] border border-white/20 bg-gradient-to-b from-[#F8FBFF] via-[#F1F6FF] to-white/95 p-6 text-slate-900 shadow-[0_40px_100px_-60px_rgba(14,116,244,0.45)]">
          <div className="space-y-6">
            <StatusBar time={lightConfig.statusBarTime} />
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                {lightConfig.statusLabel}
              </p>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-500">{lightConfig.greeting}</p>
                  <p className="text-4xl font-semibold text-slate-900">{lightConfig.userName}</p>
                </div>
                <IconBadge
                  icon={lightConfig.badgeIcon}
                  className={cn("bg-white", lightConfig.badgeClassName)}
                  iconClassName={lightConfig.badgeIconClassName}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold leading-tight text-slate-900">
                  {lightConfig.headline}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {lightConfig.supportingCopy}
                </p>
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-gradient-to-b from-[#4A6DFF] via-[#6C84FF] to-[#A2B4FF] p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                    {lightConfig.readiness.label}
                  </p>
                  <p className="text-4xl font-semibold">{lightConfig.readiness.score}</p>
                  <p className="text-sm text-white/80">
                    {readinessTrend} {lightConfig.readiness.trendSuffix}
                  </p>
                </div>
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/30 text-3xl font-semibold text-slate-900">
                    {lightConfig.readiness.score}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-white/80">
                <div className="space-y-1">
                  <p className="uppercase tracking-[0.3em]">Focus</p>
                  <p className="text-sm font-medium text-white">{lightConfig.readiness.focus}</p>
                </div>
                <div className="space-y-1">
                  <p className="uppercase tracking-[0.3em]">Coach note</p>
                  <p className="text-sm font-medium text-white">{lightConfig.readiness.coachNote}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  {lightConfig.upcomingLabel}
                </p>
                <button className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                  {lightConfig.viewAllLabel}
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-4 divide-y divide-slate-200/70">
                {lightConfig.tasks.map((task) => (
                  <div key={task.title} className="pt-4 first:pt-0">
                    <TaskCard task={task} variant="light" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[320px] flex-col rounded-[2.25rem] border border-white/10 bg-slate-900/95 p-6 text-white shadow-[0_40px_100px_-60px_rgba(15,23,42,0.9)]">
          <div className="space-y-6">
            <StatusBar variant="dark" time={darkConfig.statusBarTime} />
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
                {darkConfig.statusLabel}
              </p>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-white/70">{darkConfig.greeting}</p>
                  <p className="text-4xl font-semibold text-white">{darkConfig.userName}</p>
                </div>
                <IconBadge
                  icon={darkConfig.badgeIcon}
                  className={darkConfig.badgeClassName}
                  iconClassName={darkConfig.badgeIconClassName}
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold leading-tight text-white">
                  {darkConfig.headline}
                </h3>
                <p className="text-sm text-white/60">{darkDateLabel}</p>
                <p className="text-sm text-white/70">{darkConfig.supportingCopy}</p>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {darkConfig.filterChips.map((chip) => (
                <FilterChip key={chip.label} label={chip.label} active={chip.active} />
              ))}
            </div>
            <div className="space-y-4 divide-y divide-white/10">
              {darkConfig.tasks.map((task) => (
                <div key={task.title} className="pt-4 first:pt-0">
                  <TaskCard task={task} variant="dark" actionLabel={darkConfig.taskActionLabel} />
                </div>
              ))}
            </div>
          </div>

          <nav className="mt-10 rounded-2xl bg-black/30 p-3">
            <div className="grid grid-cols-4 gap-2">
              {darkConfig.bottomNav.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl px-2 py-1 text-xs font-semibold transition",
                    item.active ? "bg-white text-slate-900" : "text-white/60 hover:text-white",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", item.active ? "text-slate-900" : "text-white/70")} />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

function formatTrend(value: number) {
  if (Number.isNaN(value)) {
    return "0%";
  }

  if (value > 0) {
    return `+${value}%`;
  }

  if (value < 0) {
    return `${value}%`;
  }

  return "0%";
}

function StatusBar({
  variant = "light",
  time = "7:30",
}: {
  variant?: "light" | "dark";
  time?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between text-xs font-semibold",
        variant === "dark" ? "text-white/60" : "text-slate-400",
      )}
    >
      <span>{time}</span>
      <div className="flex items-center gap-2">
        <Signal className="h-4 w-4" />
        <Wifi className="h-4 w-4" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  );
}

function IconBadge({
  icon: Icon,
  className = "",
  iconClassName = "",
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", className)}>
      <Icon className={cn("h-5 w-5", iconClassName)} />
    </div>
  );
}

type TaskCardProps =
  | { task: LightTask; variant: "light"; actionLabel?: string }
  | { task: DarkTask; variant: "dark"; actionLabel?: string };

function TaskCard(props: TaskCardProps) {
  if (props.variant === "light") {
    const { task } = props;
    return (
      <div className="flex items-center gap-4">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-full", task.accent)}>
          <task.icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">{task.title}</p>
          <p className="text-xs text-slate-500">{task.detail}</p>
        </div>
        <div className="text-right text-xs font-semibold text-slate-400">{task.time}</div>
      </div>
    );
  }

  const { task, actionLabel } = props;
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", task.accent)}>
            <task.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{task.title}</p>
            <p className="text-xs text-white/60">{task.detail}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          {task.dosage}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-white/50">
        <div className="inline-flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          {task.time}
        </div>
        <button className="text-xs font-semibold text-white">
          {actionLabel ?? "Complete"}
        </button>
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-white text-slate-900"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
