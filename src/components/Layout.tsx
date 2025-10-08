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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <header className="sticky top-0 z-50 border-b border-border bg-surface backdrop-blur transition-colors">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-xl font-semibold text-primary">
            AIXUS Health
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-muted">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/demo" className="transition-colors hover:text-primary">
              Demo
            </Link>
            <Link href="/plan" className="transition-colors hover:text-primary">
              Plan
            </Link>
            <Link href="/stack" className="transition-colors hover:text-primary">
              Stack
            </Link>
            <button
              type="button"
              onClick={handleToggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-colors hover:bg-background-subtle"
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
      <footer className="border-t border-border bg-surface transition-colors">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-body-sm text-muted transition-colors sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AIXUS Health. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/plan" className="transition-colors hover:text-primary">
              Action Plan
            </Link>
            <Link href="/stack" className="transition-colors hover:text-primary">
              Tech Stack
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
