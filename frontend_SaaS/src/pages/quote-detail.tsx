import { Box, Text } from "@radix-ui/themes";

const QuoteDetail = () => {
  return (
    <Box className="p-6">
      <Text size="5" weight="bold" className="mb-4">
        Quote Detail
      </Text>
      <Text>Quote details will be displayed here.</Text>
    </Box>
  );
};

export default QuoteDetail;
