import { Box, Text } from "@radix-ui/themes";

const QuotesTable = () => {
  return (
    <Box className="p-6">
      <Text size="5" weight="bold" className="mb-4">
        Quotes
      </Text>
      <Text>Quotes table will be displayed here.</Text>
    </Box>
  );
};

export default QuotesTable;
