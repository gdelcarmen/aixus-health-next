import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionItem {
  name: string;
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
        name: "Next.js",
        description: "React framework for server-side rendering and routing."
      },
      {
        name: "React",
        description: "JavaScript library for building user interfaces."
      },
      {
        name: "TypeScript",
        description: "Strongly typed superset of JavaScript."
      }
    ]
  },
  {
    title: "Styling",
    items: [
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework with JIT engine."
      },
      {
        name: "Shadcn UI",
        description: "Accessible React component library built on top of Tailwind."
      }
    ]
  },
  {
    title: "Charts & Visualization",
    items: [
      {
        name: "Recharts",
        description: "Declarative charting library built with React and D3."
      }
    ]
  },
  {
    title: "Animations",
    items: [
      {
        name: "Framer Motion",
        description: "Production-ready motion library for React."
      }
    ]
  }
];

export default function Stack() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggle = (title: string) => {
    setOpenSections(prev => {
      const set = new Set(prev);
      if (set.has(title)) {
        set.delete(title);
      } else {
        set.add(title);
      }
      return set;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-800 to-slate-900 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Technology Stack</h1>
      <p className="mb-6 text-lg">
        Explore the tools and libraries powering AIXUS Health. Click a section to learn more.
      </p>
      <div className="space-y-4">
        {sections.map(section => (
          <div key={section.title} className="border border-slate-700 rounded-xl">
            <button
              className="w-full flex justify-between items-center px-4 py-3 focus:outline-none"
              onClick={() => toggle(section.title)}
            >
              <span className="text-xl">{section.title}</span>
              {openSections.has(section.title) ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSections.has(section.title) && (
              <ul className="bg-slate-800 px-4 py-2 space-y-2 animate-fade-in">
                {section.items.map(item => (
                  <li
                    key={item.name}
                    className="p-2 rounded-md hover:bg-slate-700 transition-colors"
                  >
                    <strong>{item.name}</strong>
                    <p className="text-sm text-slate-300">{item.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
