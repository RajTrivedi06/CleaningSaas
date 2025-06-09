import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import {
  CalendarIcon,
  ClipboardIcon,
  PersonIcon,
  BarChartIcon,
} from "@radix-ui/react-icons";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) => (
  <Card className="p-4">
    <Flex gap="3" align="center">
      <Box className={`p-2 rounded-lg bg-${color}-100`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </Box>
      <Box>
        <Text size="2" color="gray">
          {" "}
          {title}{" "}
        </Text>
        <Text size="5" weight="bold">
          {" "}
          {value}{" "}
        </Text>
      </Box>
    </Flex>
  </Card>
);

const Dashboard = () => {
  return (
    <Box p="4">
      <Heading size="6" mb="4">
        Dashboard
      </Heading>

      <Grid columns="4" gap="4" mb="6">
        <StatCard
          title="Today's Events"
          value="12"
          icon={CalendarIcon}
          color="emerald"
        />
        <StatCard
          title="Active Tasks"
          value="34"
          icon={ClipboardIcon}
          color="blue"
        />
        <StatCard
          title="Team Online"
          value="8/12"
          icon={PersonIcon}
          color="amber"
        />
        <StatCard
          title="Completion Rate"
          value="92%"
          icon={BarChartIcon}
          color="green"
        />
      </Grid>

      <Grid columns="2" gap="4">
        <Card className="p-4">
          <Heading size="3" mb="3">
            Recent Activity
          </Heading>
          <Text color="gray">No recent activity to display.</Text>
        </Card>

        <Card className="p-4">
          <Heading size="3" mb="3">
            Upcoming Events
          </Heading>
          <Text color="gray">No upcoming events scheduled.</Text>
        </Card>
      </Grid>
    </Box>
  );
};

export default Dashboard;
