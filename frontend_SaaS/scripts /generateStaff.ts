#!/usr/bin/env ts-node

import { faker } from "@faker-js/faker";
import { format, addDays } from "date-fns";
import fs from "fs";
import path from "path";

// 1) Parse how many records to emit
const count = parseInt(process.argv[2] ?? "100", 10);

// 2) Optionally seed for reproducibility
faker.seed(20250608);

interface Shift {
  date: string;
  start: string;
  end: string;
  eventId?: string;
}
interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  zones: string[];
  availability: Shift[];
}

function generateStaff(count: number): Staff[] {
  const roles = ["Cleaner", "Supervisor", "Team Lead"];
  const zones = ["Ballroom", "Lobby", "Restroom", "Concourse"];

  return Array.from({ length: count }).map(() => {
    const name = faker.person.fullName();
    const id = faker.string.uuid();
    const qualified = faker.helpers.arrayElements(
      zones,
      faker.number.int({ min: 1, max: 2 })
    );
    const availability: Shift[] = [];

    // e.g. 7 days of availability
    for (let d = 0; d < 7; d++) {
      const date = format(addDays(new Date(), d), "yyyy-MM-dd");
      const startHour = faker.number.int({ min: 6, max: 12 });
      availability.push({
        date,
        start: `${String(startHour).padStart(2, "0")}:00`,
        end: `${String(startHour + 8).padStart(2, "0")}:00`,
      });
    }

    return {
      id,
      name,
      role: faker.helpers.arrayElement(roles),
      email: faker.internet.email(name),
      phone: faker.phone.number(),
      zones: qualified,
      availability,
    };
  });
}

// 3) Generate and write out to your data folder
const staff = generateStaff(count);
const outPath = path.resolve(__dirname, "../src/data/staff.json");
fs.writeFileSync(outPath, JSON.stringify(staff, null, 2));
console.log(`✅ Wrote ${count} staff records to ${outPath}`);
