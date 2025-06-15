import { Box, Text } from "@radix-ui/themes";

const DashboardJob = () => {
  return (
    <Box className="p-6">
      <Text size="5" weight="bold" className="mb-4">
        Job Dashboard
      </Text>
      <Text>Job details will be displayed here.</Text>
    </Box>
  );
};

export default DashboardJob;
