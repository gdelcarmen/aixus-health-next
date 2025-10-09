"use client";

import { useEffect, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Edit3, Plus, Target } from 'lucide-react';

import { actionPlanColumns, type ActionPlanColumn, type ActionPlanTask } from '@/data/codex';

interface BoardColumn extends ActionPlanColumn {}

interface EditorState {
  mode: 'create' | 'edit';
  columnId: string;
  task: ActionPlanTask;
}

function createEmptyTask(): ActionPlanTask {
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    id: `task-${id}`,
    title: '',
    owner: '',
    status: 'Planned',
    note: '',
  };
}

function SortableTaskCard({
  task,
  columnId,
  onSelect,
}: {
  task: ActionPlanTask;
  columnId: string;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.button
      ref={setNodeRef}
      layout
      style={style}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`flex w-full flex-col gap-2 rounded-2xl border border-border/60 bg-background-subtle/80 p-4 text-left shadow-sm transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isDragging ? 'shadow-2xl ring-2 ring-primary/40' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-body-md font-semibold text-foreground">{task.title || 'Untitled task'}</p>
        <span className="rounded-full border border-border/60 bg-background px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted">
          {task.status}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted">
        <Edit3 className="h-3.5 w-3.5" />
        <span>{task.owner || 'Unassigned'}</span>
      </div>
      {task.note && <p className="text-sm text-muted">{task.note}</p>}
    </motion.button>
  );
}

function TaskEditor({
  state,
  onClose,
  onSave,
}: {
  state: EditorState | null;
  onClose: () => void;
  onSave: (state: EditorState) => void;
}) {
  const [formState, setFormState] = useState(state);

  useEffect(() => {
    setFormState(state);
  }, [state]);

  if (!state || !formState) return null;

  const { task } = formState;

  const handleChange = (key: keyof ActionPlanTask, value: string) => {
    setFormState((prev) =>
      prev
        ? {
            ...prev,
            task: {
              ...prev.task,
              [key]: value,
            },
          }
        : prev,
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formState) return;
    onSave(formState);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="h-full w-full max-w-md overflow-y-auto border-l border-border/60 bg-background p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{formState.mode === 'create' ? 'Create task' : 'Edit task'}</p>
            <h2 className="mt-2 text-heading-xs font-semibold text-foreground">{task.title || 'New initiative'}</h2>
            <p className="text-xs text-muted">Column: {formState.columnId.toUpperCase()}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted hover:text-foreground"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Title</label>
            <input
              value={task.title}
              onChange={(event) => handleChange('title', event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background-subtle px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Describe the task"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Owner</label>
              <input
                value={task.owner}
                onChange={(event) => handleChange('owner', event.target.value)}
                className="mt-2 w-full rounded-xl border border-border/60 bg-background-subtle px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Assign an owner"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Status</label>
              <select
                value={task.status}
                onChange={(event) => handleChange('status', event.target.value)}
                className="mt-2 w-full rounded-xl border border-border/60 bg-background-subtle px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="Planned">Planned</option>
                <option value="In Flight">In Flight</option>
                <option value="Blocked">Blocked</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Notes</label>
            <textarea
              value={task.note ?? ''}
              onChange={(event) => handleChange('note', event.target.value)}
              className="mt-2 h-28 w-full rounded-xl border border-border/60 bg-background-subtle px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Add context or links"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20"
            >
              Save changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function PlanPage() {
  const [columns, setColumns] = useState<BoardColumn[]>(() =>
    actionPlanColumns.map((column) => ({ ...column, tasks: [...column.tasks] })),
  );
  const [activeTask, setActiveTask] = useState<ActionPlanTask | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const columnId = event.active.data.current?.columnId as string | undefined;
    const column = columns.find((col) => col.id === columnId) ?? columns.find((col) => col.tasks.some((task) => task.id === taskId));
    const task = column?.tasks.find((item) => item.id === taskId) ?? null;
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }
    const activeId = active.id as string;
    const overId = over.id as string;
    const originColumnId = (active.data.current?.columnId as string) ??
      columns.find((column) => column.tasks.some((task) => task.id === activeId))?.id;
    const overColumnId = (over.data.current?.columnId as string) ??
      columns.find((column) => column.tasks.some((task) => task.id === overId))?.id ?? overId;

    const originColumnIndex = columns.findIndex((column) => column.id === originColumnId);
    const targetColumnIndex = columns.findIndex((column) => column.id === overColumnId);

    if (originColumnIndex === -1 || targetColumnIndex === -1) {
      setActiveTask(null);
      return;
    }

    setColumns((prev) => {
      const updated = prev.map((column) => ({ ...column, tasks: [...column.tasks] }));
      const originColumn = updated[originColumnIndex];
      const targetColumn = updated[targetColumnIndex];

      const activeIndex = originColumn.tasks.findIndex((task) => task.id === activeId);

      if (originColumn.id === targetColumn.id) {
        const overTaskIndex = targetColumn.tasks.findIndex((task) => task.id === overId);
        const newIndex = overTaskIndex >= 0 ? overTaskIndex : targetColumn.tasks.length - 1;
        originColumn.tasks = arrayMove(originColumn.tasks, activeIndex, newIndex);
        updated[originColumnIndex] = { ...originColumn };
        return updated;
      }

      const [movedTask] = originColumn.tasks.splice(activeIndex, 1);
      const overTaskIndex = targetColumn.tasks.findIndex((task) => task.id === overId);
      const insertIndex = overTaskIndex >= 0 ? overTaskIndex : targetColumn.tasks.length;
      targetColumn.tasks.splice(insertIndex, 0, movedTask);

      updated[originColumnIndex] = { ...originColumn };
      updated[targetColumnIndex] = { ...targetColumn };
      return updated;
    });

    setActiveTask(null);
  };

  const openEditor = (columnId: string, task: ActionPlanTask, mode: EditorState['mode']) => {
    setEditorState({ columnId, task: { ...task }, mode });
  };

  const handleEditorSave = (state: EditorState) => {
    setColumns((prev) => {
      const updated = prev.map((column) => ({ ...column, tasks: [...column.tasks] }));
      const columnIndex = updated.findIndex((column) => column.id === state.columnId);
      if (columnIndex === -1) return prev;

      const column = updated[columnIndex];
      const existingIndex = column.tasks.findIndex((task) => task.id === state.task.id);

      if (existingIndex >= 0) {
        column.tasks[existingIndex] = state.task;
      } else {
        column.tasks.unshift(state.task);
      }

      updated[columnIndex] = { ...column };
      return updated;
    });
    setEditorState(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background-subtle to-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Orchestration plan
            </p>
            <h1 className="text-heading-md font-semibold text-foreground sm:text-heading-lg">
              Align the now, next, and later roadmap
            </h1>
            <p className="max-w-3xl text-body-md text-muted">
              Drag tasks between swim lanes, edit details inline, and keep the Codex synced so every stakeholder sees the same action plan.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
            <Target className="h-4 w-4" /> Focused cadence
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-border/50 bg-surface/80 p-6 shadow-xl backdrop-blur">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {columns.map((column) => {
                  const { setNodeRef } = useDroppable({ id: column.id, data: { columnId: column.id } });
                  return (
                    <motion.div
                      key={column.id}
                      ref={setNodeRef}
                      layout
                      className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-background-subtle/80 p-4 shadow-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">{column.title}</p>
                        <p className="text-body-sm text-muted">{column.description}</p>
                        <p className="text-xs text-muted/80">Focus: {column.focus}</p>
                      </div>
                    <SortableContext items={column.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                      <div className="flex flex-1 flex-col gap-3">
                        {column.tasks.map((task) => (
                          <SortableTaskCard
                            key={task.id}
                            task={task}
                            columnId={column.id}
                            onSelect={() => openEditor(column.id, task, 'edit')}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => openEditor(column.id, createEmptyTask(), 'create')}
                          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-primary/5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                        >
                          <Plus className="h-4 w-4" /> Add task
                        </button>
                      </div>
                    </SortableContext>
                    </motion.div>
                  );
                })}
              </div>

              <DragOverlay>
                {activeTask ? (
                  <motion.div className="w-64 rounded-2xl border border-primary/40 bg-background-subtle/90 p-4 shadow-2xl">
                    <p className="text-sm font-semibold text-foreground">{activeTask.title}</p>
                    <p className="mt-1 text-xs text-muted">{activeTask.owner || 'Unassigned'}</p>
                  </motion.div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          <aside className="space-y-6 rounded-3xl border border-border/50 bg-background-subtle/80 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted">Codex summary</h2>
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.4em] text-muted">
                Synced
              </span>
            </div>
            <p className="text-sm text-muted">
              The action plan pulls straight from the Codex. Updating tasks here keeps hero stories, demos, and stack narratives consistent.
            </p>
            <ul className="space-y-4">
              {columns.map((column) => (
                <li key={column.id} className="rounded-2xl border border-border/60 bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{column.title}</p>
                  <p className="mt-2 text-sm text-muted">{column.focus}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted">
                    <span>{column.tasks.length} tasks</span>
                    <span className="inline-flex items-center gap-1 text-primary">
                      View lane <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <AnimatePresence>{editorState && <TaskEditor state={editorState} onClose={() => setEditorState(null)} onSave={handleEditorSave} />}</AnimatePresence>
    </main>
  );
}
