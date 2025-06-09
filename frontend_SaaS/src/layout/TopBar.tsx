// src/layout/TopBar.tsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const TopBar: React.FC = () => (
  <Box asChild className="border-b">
    <header className="h-16 px-6 flex items-center justify-between bg-white">
      {/* — Left: Logo + Breadcrumb — */}
      <Flex gap="4" align="center">
        <Flex
          align="center"
          justify="center"
          width="8"
          height="8"
          className="rounded-lg bg-emerald-600"
        >
          <Text className="text-white" weight="bold" size="1">
            AS
          </Text>
        </Flex>
        <Text weight="medium">ArenaSweep</Text>
        <Text className="text-zinc-500" size="2">
          Dashboard / Events
        </Text>
      </Flex>

      {/* — Right: Search, Notifications, Avatar — */}
      <Flex gap="4" align="center">
        <TextField.Root size="2" className="w-64">
          <TextField.Slot>
            <MagnifyingGlassIcon className="w-4 h-4 text-zinc-500" />
          </TextField.Slot>
          <TextField.Slot>
            <input
              type="search"
              placeholder="Search events, venues…"
              className="w-full px-3 py-2 text-sm bg-transparent outline-none"
            />
          </TextField.Slot>
        </TextField.Root>

        <IconButton variant="soft" size="2" aria-label="Notifications">
          <BellIcon />
        </IconButton>

        <Avatar fallback="JD" size="2" />
      </Flex>
    </header>
  </Box>
);

export default TopBar;
