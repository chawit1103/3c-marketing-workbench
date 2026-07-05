import type { ReactNode } from 'react';
import type { AppRoute } from '../routes/routeResolver';
import { SafetyLabels } from '../../components/product/SafetyLabels';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/workbench', label: 'Workbench' },
  { href: '/runs/sample-run', label: 'Dashboard' },
  { href: '/exports/sample-run', label: 'Export review' },
  { href: '/health', label: 'Health' },
];

interface AppShellProps {
  route: AppRoute;
  children: ReactNode;
}

export function AppShell({ route, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="3C Marketing Workbench home">
          <span className="brand-mark">3C</span>
          <span>
            <strong>Marketing Workbench</strong>
            <small>Executive scenario review</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              aria-current={route.pathname === item.href ? 'page' : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="page-shell">
        <SafetyLabels />
        {children}
      </main>
    </div>
  );
}
