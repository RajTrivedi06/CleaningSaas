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
} from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

type Item = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: Item[] = [
  { label: "Dashboard", to: "/", icon: DashboardIcon },
  { label: "Events", to: "/events", icon: CalendarIcon },
  { label: "Tasks", to: "/tasks", icon: ClipboardIcon },
  { label: "Team", to: "/team", icon: PersonIcon },
  { label: "Documents", to: "/documents", icon: FileTextIcon },
  { label: "Reports", to: "/reports", icon: BarChartIcon },
  { label: "Settings", to: "/settings", icon: GearIcon },
];

const SideNav = () => (
  <aside className="w-60 h-full bg-zinc-900 text-white flex flex-col">
    {/* navigation list */}
    <ScrollArea className="flex-1">
      <nav className="px-4 py-6 space-y-2">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              )
            }
          >
            <Icon className="w-5 h-5" />
            <Text as="span" size="2" weight="medium">
              {label}
            </Text>
          </NavLink>
        ))}
      </nav>
    </ScrollArea>
    {/* improved quick stats */}
    <div className="px-4 pb-6">
      <Card
        className="
          bg-white
          border-none
          border-l-2
          border-emerald-500/70
          rounded-xl
        "
      >
        <div className="px-4 py-5">
          {/* header */}
          <Flex justify="between" align="center" className="mb-4">
            <Text size="2" weight="medium" className="text-zinc-900">
              Quick Stats
            </Text>
            <ClockIcon className="w-5 h-5 text-zinc-900" />
          </Flex>

          {/* stats grid */}
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

          {/* separator */}
          <Separator className="border-zinc-200 mb-3" />

          {/* footer */}
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
  </aside>
);

export default SideNav;
