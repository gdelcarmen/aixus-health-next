import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleTheme = () => {
    if (!mounted) return;

    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 transition-colors dark:text-gray-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur transition-colors dark:border-white/10 dark:bg-darkbg/80">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-xl font-semibold text-primary">
            AIXUS Health
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-700 transition-colors hover:text-primary dark:text-gray-200">
              Home
            </Link>
            <Link href="/demo" className="text-gray-700 transition-colors hover:text-primary dark:text-gray-200">
              Demo
            </Link>
            <Link href="/plan" className="text-gray-700 transition-colors hover:text-primary dark:text-gray-200">
              Plan
            </Link>
            <Link href="/stack" className="text-gray-700 transition-colors hover:text-primary dark:text-gray-200">
              Stack
            </Link>
            <button
              type="button"
              onClick={handleToggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-darkbg dark:text-gray-100 dark:hover:bg-darkbg2"
              aria-label="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-slate-200/70 bg-white/80 transition-colors dark:border-white/10 dark:bg-darkbg/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-600 transition-colors dark:text-gray-300 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AIXUS Health. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/plan" className="transition-colors hover:text-primary dark:hover:text-primary">
              Action Plan
            </Link>
            <Link href="/stack" className="transition-colors hover:text-primary dark:hover:text-primary">
              Tech Stack
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
