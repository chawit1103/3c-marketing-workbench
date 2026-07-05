import { AppShell } from './app/shell/AppShell';
import { resolveRoute } from './app/routes/routeResolver';
import {
  ExportReviewView,
  HealthView,
  HomeView,
  NotFoundView,
  RunDashboardView,
  WorkbenchView,
} from './views';

export function App() {
  const route = resolveRoute(window.location.pathname);

  const view = (() => {
    switch (route.name) {
      case 'home':
        return <HomeView />;
      case 'workbench':
        return <WorkbenchView />;
      case 'runDashboard':
        return <RunDashboardView runId={route.runId} />;
      case 'exportReview':
        return <ExportReviewView runId={route.runId} />;
      case 'health':
        return <HealthView />;
      case 'notFound':
        return <NotFoundView />;
    }
  })();

  return <AppShell route={route}>{view}</AppShell>;
}
