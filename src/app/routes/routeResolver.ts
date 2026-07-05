export type AppRouteName = 'home' | 'workbench' | 'runDashboard' | 'exportReview' | 'health' | 'notFound';

export interface AppRoute {
  name: AppRouteName;
  title: string;
  pathname: string;
  runId?: string;
}

const trimTrailingSlash = (pathname: string): string => {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
};

const decodeSegment = (segment: string): string => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

export function resolveRoute(pathname: string): AppRoute {
  const normalized = trimTrailingSlash(pathname || '/');

  if (normalized === '/') {
    return { name: 'home', title: 'Home overview', pathname: '/' };
  }

  if (normalized === '/workbench') {
    return { name: 'workbench', title: 'Guided workbench', pathname: '/workbench' };
  }

  if (normalized === '/health') {
    return { name: 'health', title: 'Product health', pathname: '/health' };
  }

  const runMatch = normalized.match(/^\/runs\/([^/]+)$/);
  if (runMatch) {
    return {
      name: 'runDashboard',
      title: 'Executive dashboard',
      pathname: normalized,
      runId: decodeSegment(runMatch[1]),
    };
  }

  const exportMatch = normalized.match(/^\/exports\/([^/]+)$/);
  if (exportMatch) {
    return {
      name: 'exportReview',
      title: 'Export review',
      pathname: normalized,
      runId: decodeSegment(exportMatch[1]),
    };
  }

  return { name: 'notFound', title: 'Page not found', pathname: normalized };
}
