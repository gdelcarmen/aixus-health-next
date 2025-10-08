"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionItem {
  title: string;
  description: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    title: "Frontend Framework",
    items: [
      {
        title: "Next.js",
        description: "Next.js powers the app with server‑side rendering and routing",
      },
      {
        title: "React",
        description: "The underlying library for building the user interface",
      },
      {
        title: "TypeScript",
        description: "Adds static typing for safer and more robust code",
      },
    ],
  },
  {
    title: "Styling",
    items: [
      {
        title: "Tailwind CSS",
        description: "A utility‑first CSS framework for custom designs",
      },
      {
        title: "shadcn/ui",
        description:
          "A component library built with Radix and Tailwind CSS for accessible UI primitives",
      },
    ],
  },
  {
    title: "Charts & Visualization",
    items: [
      {
        title: "Recharts",
        description: "A library for building elegant charts in React",
      },
    ],
  },
  {
    title: "Animations",
    items: [
      {
        title: "Framer Motion",
        description: "A library for declarative animations in React",
      },
    ],
  },
];

export default function TechStack() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-background text-foreground p-6 text-left"
    >
      <h1 className="text-heading-md font-bold mb-4">Our Technology Stack</h1>
      <p className="mb-6 text-body-md text-muted">
        Explore the tools and technologies that power the AIXUS platform.
      </p>
      <div className="space-y-4">
        {sections.map((section, index) => {
          const isOpen = openSections.includes(index);
          return (
            <motion.div
              layout
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-border rounded-lg overflow-hidden bg-surface shadow-sm"
            >
              <button
                className="flex justify-between items-center w-full px-4 py-3 bg-surface-muted hover:bg-background-subtle transition-colors text-foreground"
                onClick={() => toggleSection(index)}
              >
                <span className="font-semibold">{section.title}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-3 bg-background-subtle space-y-2"
                  >
                    {section.items.map((item) => (
                      <div key={item.title}>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-muted">{item.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}