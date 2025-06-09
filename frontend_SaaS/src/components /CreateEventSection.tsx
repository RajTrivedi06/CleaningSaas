import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import {
  PlusIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

const inputClass =
  "w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg " +
  "focus:border-emerald-500 outline-none bg-transparent text-sm";

const CreateEventSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Create Event:", data);
    // TODO: call your create-event API, then collapse accordion or show feedback
  };

  return (
    <Accordion.Root type="single" collapsible defaultValue="">
      <Accordion.Item value="create-event">
        <Accordion.Header>
          <Accordion.Trigger asChild>
            <Button
              variant="solid"
              size="2"
              accent="grass"
              className="flex items-center mb-4"
            >
              <PlusIcon className="mr-2" />
              Create Event
            </Button>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="overflow-hidden">
          <Box className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Core Venue Parameters */}
              <Text size="4" weight="medium">
                Core Venue Parameters
              </Text>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="venueId"
                    className="block text-sm font-medium mb-1"
                  >
                    Venue Name or ID
                  </label>
                  <input
                    id="venueId"
                    name="venueId"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="e.g. SOLDIER_FIELD"
                  />
                </div>
                <div>
                  <label
                    htmlFor="areaSqft"
                    className="block text-sm font-medium mb-1"
                  >
                    Total Area (sqft)
                  </label>
                  <input
                    id="areaSqft"
                    name="areaSqft"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 75000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="seatCount"
                    className="block text-sm font-medium mb-1"
                  >
                    Seat Count
                  </label>
                  <input
                    id="seatCount"
                    name="seatCount"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 60000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="numZones"
                    className="block text-sm font-medium mb-1"
                  >
                    Number of Zones
                  </label>
                  <input
                    id="numZones"
                    name="numZones"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div>
                <Text size="4" weight="medium" className="mb-2">
                  Surface Breakdown (sqft)
                </Text>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {["hardfloor", "carpet", "upholstery", "glass"].map((key) => (
                    <div key={key}>
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium mb-1"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        id={key}
                        name={key}
                        type="number"
                        required
                        className={inputClass}
                        placeholder="e.g. 20000"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Event Details */}
              <Text size="4" weight="medium">
                Event Details
              </Text>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-sm font-medium mb-1"
                  >
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    className={inputClass}
                  >
                    <option value="">Select type</option>
                    <option value="concert">Concert</option>
                    <option value="banquet">Banquet</option>
                    <option value="trade_show">Trade Show</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="expectedAttendance"
                    className="block text-sm font-medium mb-1"
                  >
                    Expected Attendance
                  </label>
                  <input
                    id="expectedAttendance"
                    name="expectedAttendance"
                    type="number"
                    className={inputClass}
                    placeholder="e.g. 55000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cleaningLevel"
                    className="block text-sm font-medium mb-1"
                  >
                    Cleaning Level
                  </label>
                  <select
                    id="cleaningLevel"
                    name="cleaningLevel"
                    required
                    className={inputClass}
                  >
                    <option value="">Select level</option>
                    <option value="light">Light Turnover</option>
                    <option value="standard">Standard Clean</option>
                    <option value="deep">Deep Clean</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="specialTasks"
                    className="block text-sm font-medium mb-1"
                  >
                    Special Tasks
                  </label>
                  <input
                    id="specialTasks"
                    name="specialTasks"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Window washing"
                  />
                </div>
              </div>

              {/* 3. Service & Task Specifications */}
              <Text size="4" weight="medium">
                Service & Task Spec
              </Text>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="areaRate"
                    className="block text-sm font-medium mb-1"
                  >
                    Area-based Rate (sqft/hr)
                  </label>
                  <input
                    id="areaRate"
                    name="areaRate"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="seatRate"
                    className="block text-sm font-medium mb-1"
                  >
                    Seat-based Rate (seats/hr)
                  </label>
                  <input
                    id="seatRate"
                    name="seatRate"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 2000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="detailHours"
                    className="block text-sm font-medium mb-1"
                  >
                    Detail Work Hours
                  </label>
                  <input
                    id="detailHours"
                    name="detailHours"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="travelTime"
                    className="block text-sm font-medium mb-1"
                  >
                    Travel Time (min/zone)
                  </label>
                  <input
                    id="travelTime"
                    name="travelTime"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              {/* 4. Operational Settings */}
              <Text size="4" weight="medium">
                Operational Settings
              </Text>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="shiftLength"
                    className="block text-sm font-medium mb-1"
                  >
                    Shift Length (hrs)
                  </label>
                  <select
                    id="shiftLength"
                    name="shiftLength"
                    required
                    className={inputClass}
                  >
                    <option value="">Select length</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="overhead"
                    className="block text-sm font-medium mb-1"
                  >
                    Overhead Buffer (%)
                  </label>
                  <input
                    id="overhead"
                    name="overhead"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 15"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateTime"
                    className="block text-sm font-medium mb-1"
                  >
                    Date & Time
                  </label>
                  <input
                    id="dateTime"
                    name="dateTime"
                    type="datetime-local"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="numShifts"
                    className="block text-sm font-medium mb-1"
                  >
                    Number of Shifts
                  </label>
                  <input
                    id="numShifts"
                    name="numShifts"
                    type="number"
                    required
                    className={inputClass}
                    placeholder="e.g. 1"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="solid"
                size="2"
                accent="grass"
                className="w-full mt-2"
              >
                Create Event
              </Button>
            </form>
          </Box>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default CreateEventSection;
