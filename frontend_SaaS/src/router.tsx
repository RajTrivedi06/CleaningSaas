import { lazy } from "react";
import {
  Outlet,
  Navigate,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

/* ───── Layouts ─────────────────────────────────────────── */
import Shell from "@/layout/Shell";
import AuthLayout from "@/layout/AuthLayout";

/* ───── Page Components ─────────────────────────────────── */
const Login = lazy(() => import("@/pages/login"));
const ResetPw = lazy(() => import("@/pages/reset-password"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const DashboardJob = lazy(() => import("@/pages/dashboard-job"));
const EventsTable = lazy(() => import("@/pages/events"));
const EventWizard = lazy(() => import("@/pages/event-wizard"));
const QuotesTable = lazy(() => import("@/pages/quotes"));
const QuoteDetail = lazy(() => import("@/pages/quote-detail"));
const SchedulerPage = lazy(() => import("@/pages/scheduler"));
const ReportsTable = lazy(() => import("@/pages/reports"));
const ReportDetail = lazy(() => import("@/pages/report-detail"));
const Settings = lazy(() => import("@/pages/settings"));
const Team = lazy(() => import("@/pages/team"));
const Tasks = lazy(() => import("@/pages/tasks"));
const Documents = lazy(() => import("@/pages/documents"));

/* ───── Root Route ─────────────────────────────────────── */
const rootRoute = createRootRoute({
  component: Outlet,
});

/* ───── Auth Routes ────────────────────────────────────── */
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  // REMOVED: The 'id' property was causing the error
  component: AuthLayout,
  path: "/auth",
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "login",
  component: Login,
});

const resetPwRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "reset-pw",
  component: ResetPw,
});

/* ───── App (Protected) Routes ──────────────────────────── */
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app", // This is a pathless layout route, so 'id' is correct here
  component: Shell,
});

const dashboardBaseRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: Outlet,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "/",
  component: Dashboard,
});

const dashboardJobRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "$id",
  component: DashboardJob,
});

const eventsRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "events",
  component: EventsTable,
});

const eventWizardRoute = createRoute({
  getParentRoute: () => eventsRoute,
  path: "new",
  component: EventWizard,
});

const tasksRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "tasks",
  component: Tasks,
});

const teamRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "team",
  component: Team,
});

const documentsRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "documents",
  component: Documents,
});

const quotesRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "quotes",
  component: QuotesTable,
});

const quoteDetailRoute = createRoute({
  getParentRoute: () => quotesRoute,
  path: "$id",
  component: QuoteDetail,
});

const schedulerRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "scheduler",
  component: SchedulerPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "reports",
  component: ReportsTable,
});

const reportDetailRoute = createRoute({
  getParentRoute: () => reportsRoute,
  path: "$id",
  component: ReportDetail,
});

const settingsRoute = createRoute({
  getParentRoute: () => dashboardBaseRoute,
  path: "settings",
  component: Settings,
});

/* ───── Landing Redirect ───────────────────────────────── */
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/auth/login" />,
});

/* ───── Build Hierarchy & Router ───────────────────────── */
const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([loginRoute, resetPwRoute]),
  appLayoutRoute.addChildren([
    dashboardBaseRoute.addChildren([
      dashboardIndexRoute,
      eventsRoute.addChildren([eventWizardRoute]),
      tasksRoute,
      teamRoute,
      documentsRoute,
      quotesRoute.addChildren([quoteDetailRoute]),
      schedulerRoute,
      reportsRoute.addChildren([reportDetailRoute]),
      settingsRoute,
      dashboardJobRoute,
    ]),
  ]),
  landingRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => {
    return <p>Page Not Found!</p>;
  },
});

/* ───── Type Augmentation ──────────────────────────────── */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
