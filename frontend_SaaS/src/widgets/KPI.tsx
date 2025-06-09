import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: ReactNode;
};

export const KPI = ({ label, value, delta, trend, icon }: Props) => (
  <Card size="3">
    <Flex direction="column" gap="3">
      {/* icon + delta */}
      <Flex justify="between">
        <Box className="p-2 rounded-md bg-zinc-100">{icon}</Box>
        <Flex
          gap="1"
          align="center"
          className={`text-sm ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpIcon width="14" height="14" />
          ) : (
            <ArrowDownIcon width="14" height="14" />
          )}
          {delta}
        </Flex>
      </Flex>

      {/* metric */}
      <Text size="5" weight="bold">
        {value}
      </Text>
      <Text size="2" color="gray">
        {label}
      </Text>
    </Flex>
  </Card>
);
