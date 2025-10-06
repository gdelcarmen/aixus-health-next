"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Task = {
  id: string;
  title: string;
  owner: string;
};
type Board = {
  now: Task[];
  next: Task[];
  later: Task[];
};

export default function PlanPage() {
  const [board, setBoard] = useState<Board>({ now: [], next: [], later: [] });
  const [filterOwner, setFilterOwner] = useState('');
  const [dragged, setDragged] = useState<{ id: string; from: keyof Board } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('actionPlanBoard');
    if (stored) {
      setBoard(JSON.parse(stored));
    } else {
      const initial: Board = {
        now: [
          { id: genId(), title: 'Define patient tasks', owner: 'Hannah' },
          { id: genId(), title: 'Collect surgical readiness data', owner: 'Clinician' },
        ],
        next: [
          { id: genId(), title: 'Implement informed consent flow', owner: 'Developer' },
        ],
        later: [
          { id: genId(), title: 'Analyse recovery metrics', owner: 'Data Scientist' },
        ],
      };
      setBoard(initial);
    }
  }, []);
  // Persist board to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('actionPlanBoard', JSON.stringify(board));
  }, [board]);

  const statuses: (keyof Board)[] = ['now', 'next', 'later'];

  const addTask = (status: keyof Board) => {
    const title = prompt('Task title:');
    if (!title) return;
    const owner = prompt('Owner (optional):') || '';
    const newTask: Task = { id: genId(), title: title.trim(), owner: owner.trim() };
    setBoard((prev) => ({ ...prev, [status]: [...prev[status], newTask] }));
  };

  const handleDragStart = (task: Task, from: keyof Board) => {
    setDragged({ id: task.id, from });
  };
  const handleDrop = (to: keyof Board) => {
    if (!dragged) return;
    const { id, from } = dragged;
    if (from === to) return;
    let movedTask: Task | undefined;
    setBoard((prev) => {
      const newPrev: Board = { ...prev, [from]: [...prev[from]], [to]: [...prev[to]] };
      newPrev[from] = newPrev[from].filter((t) => {
        if (t.id === id) {
          movedTask = t;
          return false;
        }
        return true;
      });
      if (movedTask) {
        newPrev[to].push(movedTask);
      }
      return newPrev;
    });
    setDragged(null);
  };

  const exportBoard = () => {
    const dataStr = JSON.stringify(board, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'action-plan.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen p-6">
      <header className="text-center mb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold">Action Plan Board</h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Organise tasks by priority and track progress. Drag tasks between the Now, Next and Later columns,
          filter by owner, or export your plan as JSON.
        </p>
        <Link href="/" className="inline-block px-4 py-2 rounded-md border border-primary text-accent font-semibold hover:bg-secondary transition-colors">
          Back to Home
        </Link>
      </header>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          value={filterOwner}
          onChange={(e) => setFilterOwner(e.target.value)}
          placeholder="Filter by owner (optional)"
          className="flex-1 min-w-[12rem] px-3 py-2 rounded-md border border-secondary bg-darkbg text-sm focus:outline-none"
        />
        <button
          onClick={() => setFilterOwner('')}
          className="px-3 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90"
        >
          Clear Filter
        </button>
        <button
          onClick={exportBoard}
          className="px-3 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90"
        >
          Export JSON
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {statuses.map((status) => {
          const tasks = board[status];
          return (
            <div
              key={status}
              className="flex-1 min-w-[250px] bg-secondary rounded-lg p-4 shadow-md flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(status)}
            >
              <h2 className="text-xl font-semibold text-center mb-2 capitalize">{status}</h2>
              <div className="flex-1 space-y-2 overflow-y-auto">
                {tasks
                  .filter((t) =>
                    filterOwner
                      ? t.owner.toLowerCase().includes(filterOwner.toLowerCase())
                      : true
                  )
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task, status)}
                      className="bg-darkbg p-2 rounded-md cursor-grab"
                    >
                      <div className="font-semibold text-sm">{task.title}</div>
                      {task.owner && (
                        <div className="text-xs text-gray-400">{task.owner}</div>
                      )}
                    </div>
                  ))}
              </div>
              <button
                onClick={() => addTask(status)}
                className="mt-2 px-3 py-1 rounded-md bg-darkbg text-accent text-sm hover:bg-darkbg/80"
              >
                + Add Task
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
