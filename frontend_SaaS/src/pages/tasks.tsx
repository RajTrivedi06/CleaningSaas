import { Box, Heading } from "@radix-ui/themes";

const Tasks = () => {
  return (
    <Box p="4">
      <Heading size="6">Tasks</Heading>
      <Box mt="4">
        <p>Your cleaning tasks will appear here.</p>
      </Box>
    </Box>
  );
};

export default Tasks;
