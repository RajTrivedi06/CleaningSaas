import React, { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Box, Text } from "@radix-ui/themes";
import sampleEvents from "@/data/sampleEvents.json";
import CreateEventSection from "../components/CreateEventSection";

type Event = (typeof sampleEvents)[number];

const columnHelper = createColumnHelper<Event>();
const columns = [
  columnHelper.accessor("eventName", { header: "Event" }),
  columnHelper.accessor("clientName", { header: "Client" }),
  columnHelper.accessor("venueId", { header: "Venue" }),
  columnHelper.accessor("dateTime", {
    header: "Date & Time",
    cell: (info) =>
      new Date(info.getValue()).toLocaleString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  }),
  columnHelper.accessor("staffCount", { header: "Staff" }),
  columnHelper.accessor("expectedAttendance", { header: "Attendance" }),
  columnHelper.accessor("budget", { header: "Budget" }),
];

const EventsPage: React.FC = () => {
  const data = useMemo(() => sampleEvents, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Page title */}
      <Text size="5" weight="bold">
        Events
      </Text>

      {/* Separate Create Event component */}
      <CreateEventSection />

      {/* Placeholder Events Table */}
      <Box className="overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-900"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default EventsPage;
