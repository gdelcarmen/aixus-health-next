import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Compass, Moon, Sun } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      {
        label: 'Story',
        href: '/#hero-story',
        isActive: pathname === '/',
      },
      {
        label: 'Navigator',
        href: '/#navigator-experience',
        isActive: pathname === '/',
      },
      {
        label: 'Action Plan',
        href: '/plan',
        isActive: pathname === '/plan',
      },
      {
        label: 'Tech Stack',
        href: '/stack',
        isActive: pathname === '/stack',
      },
    ],
    [pathname],
  );

  const breadcrumbs = useMemo(() => {
    if (pathname === '/plan') {
      return [
        { label: 'Codex', href: '/' },
        { label: 'Action Plan', href: '/plan' },
      ];
    }
    if (pathname === '/stack') {
      return [
        { label: 'Codex', href: '/' },
        { label: 'Tech Stack', href: '/stack' },
      ];
    }
    return [
      { label: 'Codex', href: '/' },
      { label: 'Storyline', href: '/#hero-story' },
    ];
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleTheme = () => {
    if (!mounted) return;

    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur transition-colors">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="text-xl font-semibold text-primary">
            AIXUS Health
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium text-muted">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative rounded-full border px-4 py-2 transition-colors hover:text-primary ${item.isActive ? 'border-primary/60 bg-primary/10 text-primary' : 'border-transparent'}`}
                aria-current={item.isActive ? 'page' : undefined}
                prefetch
              >
                {item.label}
                {item.isActive && (
                  <span className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-primary/70" aria-hidden />
                )}
              </Link>
            ))}
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
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-6 pb-3 text-xs font-semibold uppercase tracking-[0.4em] text-muted">
          <Compass className="h-3.5 w-3.5" />
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {index > 0 && <span className="text-border">/</span>}
              <Link href={crumb.href} className="hover:text-primary">
                {crumb.label}
              </Link>
            </span>
          ))}
        </div>
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
