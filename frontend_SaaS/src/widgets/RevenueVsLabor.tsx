import { Card, Text, Box } from "@radix-ui/themes";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const series = [
  { month: "Jan", revenue: 45_000, labor: 28_000 },
  { month: "Feb", revenue: 52_000, labor: 31_000 },
  { month: "Mar", revenue: 48_000, labor: 29_000 },
  { month: "Apr", revenue: 61_000, labor: 35_000 },
  { month: "May", revenue: 55_000, labor: 33_000 },
  { month: "Jun", revenue: 67_000, labor: 38_000 },
];

const RevenueVsLabor = () => (
  <Card size="4">
    <Text weight="medium" mb="4">
      Revenue vs Labor Costs
    </Text>

    <Box height="64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
          <Line dataKey="revenue" stroke="#059669" strokeWidth={2} />
          <Line dataKey="labor" stroke="#71717a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Card>
);

export default RevenueVsLabor;
