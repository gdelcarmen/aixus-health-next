"use client";

import type { LucideIcon } from "lucide-react";
import { Bell, BatteryFull, Wifi, Check, Clock, Pill, Sun, Moon, Calendar, Home, Settings } from "lucide-react";

type Task = {
  title: string;
  time: string;
  status: "upcoming" | "completed";
  description?: string;
  dosage?: string;
};

function StatusBar({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div className="flex items-center justify-between text-xs font-semibold tracking-wide">
      <span>{variant === "dark" ? "8:45" : "7:30"}</span>
      <div className="flex items-center gap-1.5">
        <Wifi className="h-3.5 w-3.5" />
        <BatteryFull className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function TaskCard({ task, dark }: { task: Task; dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl border ${
        dark
          ? "border-white/10 bg-white/5 text-white"
          : "border-slate-200 bg-white/70 backdrop-blur"
      } p-4 space-y-2 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-9 w-9 rounded-full flex items-center justify-center ${
              dark ? "bg-white/10" : "bg-slate-900/10"
            }`}
          >
            <Pill className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold leading-tight">{task.title}</h4>
            {task.description && (
              <p className={`text-xs ${dark ? "text-white/70" : "text-slate-500"}`}>{task.description}</p>
            )}
          </div>
        </div>
        {task.dosage && (
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              dark ? "bg-white/10 text-white" : "bg-slate-900/5 text-slate-700"
            }`}
          >
            {task.dosage}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={dark ? "text-white/60" : "text-slate-500"}>{task.time}</span>
        <div className="flex items-center gap-1 text-emerald-500">
          {task.status === "completed" && <Check className="h-3.5 w-3.5" />}
          <span className="font-medium uppercase tracking-wide">
            {task.status === "completed" ? "Done" : "Next"}
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active ? "border-white bg-white/10 text-white" : "border-white/10 text-white/70 hover:text-white"
      }`}
    >
      <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="h-3.5 w-3.5" />
      </div>
      {label}
    </button>
  );
}

export default function AIXUSDemo() {
  const morningTasks: Task[] = [
    { title: "Hydration Check", time: "8:00 AM", status: "completed", description: "16 oz. of water" },
    { title: "Protein Breakfast", time: "9:30 AM", status: "upcoming", description: "Yogurt & granola" },
    { title: "Breathing Exercises", time: "10:30 AM", status: "upcoming", description: "4 minute session" },
  ];

  const eveningTasks: Task[] = [
    { title: "Evening Med", time: "6:00 PM", status: "completed", dosage: "10 mg" },
    { title: "Pain Relief", time: "8:00 PM", status: "upcoming", dosage: "5 mg" },
    { title: "Sleep Support", time: "10:00 PM", status: "upcoming", dosage: "2 caps" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center">
      <div className="w-[320px] rounded-3xl border border-slate-200 bg-gradient-to-b from-[#F8FBFF] via-[#F1F7FF] to-white shadow-xl p-6 space-y-6">
        <StatusBar />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <div className="h-8 w-8 rounded-full bg-white shadow flex items-center justify-center">
              <Sun className="h-4 w-4 text-amber-400" />
            </div>
            Good Morning, Hannah
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">Your readiness looks strong today</h2>
        </div>
        <div className="rounded-3xl bg-gradient-to-b from-[#E5F1FF] via-[#ECF4FF] to-white p-6 shadow-inner text-center space-y-4">
          <div className="mx-auto h-36 w-36 rounded-full bg-gradient-to-b from-indigo-100 via-indigo-200 to-indigo-300 p-6 relative flex items-center justify-center">
            <div className="absolute inset-3 rounded-full border-4 border-white/60" />
            <div className="relative text-slate-900">
              <span className="block text-sm uppercase tracking-[0.2em] text-slate-500">Score</span>
              <span className="text-4xl font-bold">87</span>
            </div>
          </div>
          <p className="text-sm text-slate-500">Keep completing daily steps to stay on track for surgery.</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">Upcoming tasks</span>
            <button className="text-xs font-semibold text-indigo-500">View all</button>
          </div>
          <div className="space-y-0 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
            {morningTasks.map((task) => (
              <div key={task.title} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{task.title}</h3>
                    <p className="text-xs text-slate-500">{task.description}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{task.time}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center">
                    {task.status === "completed" ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  </div>
                  <span className={task.status === "completed" ? "text-emerald-500" : "text-slate-500"}>
                    {task.status === "completed" ? "Completed" : "Scheduled"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[320px] rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-2xl p-6 space-y-6">
        <StatusBar variant="dark" />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
              <Moon className="h-4 w-4" />
            </div>
            Good Evening, Hannah
          </div>
          <h2 className="text-2xl font-semibold">Wind down with tonight’s plan</h2>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto">
          <FilterChip icon={Calendar} label="Today" active />
          <FilterChip icon={Bell} label="Reminders" />
          <FilterChip icon={Settings} label="Adjust" />
        </div>
        <div className="space-y-0 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5 p-2">
          {eveningTasks.map((task) => (
            <div key={task.title} className="p-2 first:pt-1 last:pb-1">
              <TaskCard task={task} dark />
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-around text-xs font-medium uppercase tracking-wide text-white/60">
            <NavIcon icon={Home} label="Home" active />
            <NavIcon icon={Pill} label="Meds" />
            <NavIcon icon={Bell} label="Alerts" />
            <NavIcon icon={Settings} label="Settings" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <button className="flex flex-col items-center gap-1 text-white/60">
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center ${
          active ? "bg-white text-slate-900" : "bg-white/10"
        }`}
      >
        <Icon className={`h-4 w-4 ${active ? "text-slate-900" : "text-white"}`} />
      </div>
      <span className={`text-[10px] font-semibold ${active ? "text-white" : "text-white/60"}`}>{label}</span>
    </button>
  );
}
