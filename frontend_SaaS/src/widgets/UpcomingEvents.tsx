import { Card, Flex, Text, Box, Separator } from "@radix-ui/themes";
import { CalendarIcon, PinIcon, PersonIcon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";

type Event = {
  id: number;
  title: string;
  venue: string;
  date: string;
  staff: number;
  status: "In Progress" | "Scheduled" | "Planning";
};

const data: Event[] = [
  {
    id: 1,
    title: "Taylor Swift Concert",
    venue: "Soldier Field",
    date: "Today, 6:00 PM",
    staff: 12,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Bears vs Packers",
    venue: "Soldier Field",
    date: "Tomorrow, 1:00 PM",
    staff: 15,
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Corporate Event",
    venue: "United Center",
    date: "Dec 8, 7:00 PM",
    staff: 8,
    status: "Planning",
  },
];

const statusTint = {
  "In Progress": "green",
  Scheduled: "gray",
  Planning: "yellow",
} as const;

const UpcomingEvents = () => (
  <Card size="4">
    <Text weight="medium" mb="4">
      Upcoming Events
    </Text>

    <Flex direction="column" gap="3">
      {data.map((ev, i) => (
        <Box key={ev.id}>
          <Flex justify="between" align="center">
            {/* left = meta */}
            <Box>
              <Text weight="medium">{ev.title}</Text>

              <Flex asChild gap="4" mt="1" align="center" color="gray" size="2">
                <ul>
                  <li className="inline-flex items-center gap-1">
                    <PinIcon /> {ev.venue}
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <CalendarIcon /> {ev.date}
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <PersonIcon /> {ev.staff} staff
                  </li>
                </ul>
              </Flex>
            </Box>

            {/* right = status */}
            <Badge radius="full" color={statusTint[ev.status]} variant="solid">
              {ev.status}
            </Badge>
          </Flex>

          {i !== data.length - 1 && <Separator my="3" />}
        </Box>
      ))}
    </Flex>
  </Card>
);

export default UpcomingEvents;
