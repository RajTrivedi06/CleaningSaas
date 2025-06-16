import { Flex, Text, Card, Separator, ScrollArea } from "@radix-ui/themes";
import {
  DashboardIcon,
  CalendarIcon,
  ClipboardIcon,
  PersonIcon,
  FileTextIcon,
  BarChartIcon,
  GearIcon,
  ClockIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
// CHANGED: Added useMatchRoute hook and motion from framer-motion
import { Link, useMatchRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FC } from "react";
import clsx from "clsx";

// --- Type Definition (no change) ---
type NavItem = {
  label: string;
  to: string;
  icon: FC<{ className?: string }>;
};

// --- Navigation Data (no change) ---
const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  { label: "Events", to: "/dashboard/events", icon: CalendarIcon },
  { label: "Tasks", to: "/dashboard/tasks", icon: ClipboardIcon },
  { label: "Team", to: "/dashboard/team", icon: PersonIcon },
  { label: "Documents", to: "/dashboard/documents", icon: FileTextIcon },
  { label: "Reports", to: "/dashboard/reports", icon: BarChartIcon },
  { label: "Settings", to: "/dashboard/settings", icon: GearIcon },
];

// --- Sub-component for the Header (no change) ---
const SideNavHeader = () => (
  <Flex align="center" gap="3" className="px-6 py-5">
    <RocketIcon className="w-6 h-6 text-emerald-500" />
    <Text size="4" weight="bold" className="text-white">
      CleaningSaaS
    </Text>
  </Flex>
);

// --- Sub-component for Navigation Links (UPDATED) ---
const NavigationLinks = () => {
  const matchRoute = useMatchRoute();

  return (
    <ScrollArea className="flex-1">
      <nav className="px-4 py-2 space-y-2">
        {navItems.map((item) => {
          // Check for active route. The `fuzzy` option solves the issue
          // of the Dashboard link always being active. We only want
          // fuzzy matching for routes that have children.
          const isActive = matchRoute({
            to: item.to,
            // fuzzy: item.to !== '/dashboard', <-- A more robust solution below
            fuzzy: item.to === "/dashboard" ? false : true,
          });

          return (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              {/* This is the animated highlight using framer-motion */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-item"
                  className="absolute inset-0 bg-emerald-600 rounded-lg"
                  style={{ zIndex: 0 }}
                />
              )}
              {/* z-10 ensures the icon and text are on top of the highlight */}
              <item.icon className="w-5 h-5 relative z-10" />
              <Text
                as="span"
                size="2"
                weight="medium"
                className="relative z-10"
              >
                {item.label}
              </Text>
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );
};

// --- Sub-component for the Quick Stats Card (no change) ---
const QuickStats = () => (
  <div className="px-4 pb-4">
    <Card className="bg-white border-none border-l-2 border-emerald-500/70 rounded-xl">
      <div className="px-4 py-5">
        <Flex justify="between" align="center" className="mb-4">
          <Text size="2" weight="medium" className="text-zinc-900">
            Quick Stats
          </Text>
          <ClockIcon className="w-5 h-5 text-zinc-900" />
        </Flex>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <CalendarIcon className="w-6 h-6 text-emerald-600 mb-1" />
            <Text size="5" weight="bold" className="text-zinc-900">
              12
            </Text>
            <Text size="1" className="text-zinc-600">
              Events
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <ClipboardIcon className="w-6 h-6 text-amber-600 mb-1" />
            <Text size="5" weight="bold" className="text-zinc-900">
              34
            </Text>
            <Text size="1" className="text-zinc-600">
              Tasks
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <PersonIcon className="w-6 h-6 text-blue-600 mb-1" />
            <Text size="5" weight="bold" className="text-zinc-900">
              8/12
            </Text>
            <Text size="1" className="text-zinc-600">
              Online
            </Text>
          </div>
        </div>
        <Separator className="border-zinc-200 mb-3" />
        <Flex
          justify="center"
          align="center"
          gap="2"
          className="text-xs text-zinc-500"
        >
          <ClockIcon className="w-4 h-4" />
          <Text>Refresh in 5 min</Text>
        </Flex>
      </div>
    </Card>
  </div>
);

// --- Main SideNav Component (no change) ---
const SideNav = () => (
  <aside className="w-60 h-full bg-zinc-900 text-white flex flex-col">
    <SideNavHeader />
    <NavigationLinks />
    <Separator my="3" size="4" className="bg-zinc-700" />
    <QuickStats />
  </aside>
);

export default SideNav;
