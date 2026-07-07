import { type ReactNode } from 'react';
import type { AppRoute } from '../routes/routeResolver';
import { SafetyLabels } from '../../components/product/SafetyLabels';
import { localizeNode } from '../../i18n/localize';
import { useI18n } from '../../i18n/useI18n';

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
  const { language, setLanguage, t } = useI18n();
  const localizedChildren = localizeNode(children, language);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label={t('3C Marketing Workbench home')}>
          <span className="brand-mark">3C</span>
          <span>
            <strong>{t('Marketing Decision Workbench')}</strong>
            <small>{t('Executive scenario review')}</small>
          </span>
        </a>
        <div className="header-actions">
          <nav className="site-nav" aria-label={t('Main navigation')}>
            {navItems.map((item) => (
              <a
                aria-current={route.pathname === item.href ? 'page' : undefined}
                href={item.href}
                key={item.href}
              >
                {t(item.label)}
              </a>
            ))}
          </nav>
          <label className="language-selector" htmlFor="language-selector">
            <span>{t('Language')}</span>
            <select
              id="language-selector"
              value={language}
              onChange={(event) => setLanguage(event.target.value === 'en' ? 'en' : 'th')}
            >
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </header>
      <main className="page-shell">
        <SafetyLabels />
        {localizedChildren}
      </main>
    </div>
  );
}
