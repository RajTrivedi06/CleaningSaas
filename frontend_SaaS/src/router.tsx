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

/* ───── Auth pages ──────────────────────────────────────── */
const Login = lazy(() => import("@/pages/login"));
const ResetPw = lazy(() => import("@/pages/reset-password"));

/* ───── App pages ───────────────────────────────────────── */
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

/* ───── Root route ─────────────────────────────────────── */
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

/* ───── Auth layout & children ─────────────────────────── */
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: Login,
});

const resetPwRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/reset-pw",
  component: ResetPw,
});

/* ───── App layout & children ──────────────────────────── */
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: Shell,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

const dashboardJobRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard/$id",
  component: DashboardJob,
});

const eventsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/events",
  component: EventsTable,
});

const eventWizardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/events/new",
  component: EventWizard,
});

const quotesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/quotes",
  component: QuotesTable,
});

const quoteDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/quotes/$id",
  component: QuoteDetail,
});

const schedulerRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/scheduler",
  component: SchedulerPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/reports",
  component: ReportsTable,
});

const reportDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/reports/$id",
  component: ReportDetail,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: Settings,
});

/* ───── Landing redirect (/) ───────────────────────────── */
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" />, // add auth-gate later
});

/* ───── Build hierarchy & router ───────────────────────── */
const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([loginRoute, resetPwRoute]),
  appLayoutRoute.addChildren([
    dashboardRoute,
    dashboardJobRoute,
    eventsRoute,
    eventWizardRoute,
    quotesRoute,
    quoteDetailRoute,
    schedulerRoute,
    reportsRoute,
    reportDetailRoute,
    settingsRoute,
  ]),
  landingRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => <Navigate to="/login" />,
});

/* ───── Optional devtools ──────────────────────────────── */
// Devtools are configured differently in TanStack Router v5
// They should be added as a component in your app root

/* ───── Type-augment for TanStack Router ▸ TS only ─────── */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
