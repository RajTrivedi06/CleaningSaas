// scripts/generateStaff.mjs
import { faker } from "@faker-js/faker";
import { format, addDays } from "date-fns";
import fs from "fs";
import path from "path";

// reproducible data
faker.seed(20250608);

// how many to generate?
const count = parseInt(process.argv[2] || "100", 10);

/** @returns {Array} */
function generateStaff(count) {
  const roles = ["Cleaner", "Supervisor", "Team Lead"];
  const zones = ["Ballroom", "Lobby", "Restroom", "Concourse"];

  return Array.from({ length: count }).map(() => {
    const name = faker.person.fullName();
    const id = faker.string.uuid();
    const qualified = faker.helpers.arrayElements(
      zones,
      faker.number.int({ min: 1, max: 2 })
    );
    const availability = [];

    for (let d = 0; d < 7; d++) {
      const date = format(addDays(new Date(), d), "yyyy-MM-dd");
      const start = faker.number.int({ min: 6, max: 12 });
      availability.push({
        date,
        start: `${String(start).padStart(2, "0")}:00`,
        end: `${String(start + 8).padStart(2, "0")}:00`,
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

// write out
const outPath = path.resolve("src/data/staff.json");
fs.writeFileSync(outPath, JSON.stringify(generateStaff(count), null, 2));
console.log(`✅ Wrote ${count} records to ${outPath}`);
