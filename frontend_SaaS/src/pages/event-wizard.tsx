import { Box, Text } from "@radix-ui/themes";

const EventWizard = () => {
  return (
    <Box className="p-6">
      <Text size="5" weight="bold" className="mb-4">
        Event Wizard
      </Text>
      <Text>Event creation wizard will be displayed here.</Text>
    </Box>
  );
};

export default EventWizard;
