import { difference } from "$std/datetime/mod.ts";

export const now = () => new Date();

function formatDistance(start: Date, end: Date) {
  const diff = difference(start, end);

  for (const [unit, value] of Object.entries(diff).toReversed()) {
    const parsedUnit = unit.slice(
      0,
      unit.length - (value === 1 ? 1 : 0),
    );
    if (value > 0) return `at ${value} ${parsedUnit} ago`;
    else if (unit === "minutes") return "less than 1 minute ago";
    continue;
  }

  return "now";
}

export function dateFormatter(
  date = now(),
  formatter = formatDistance,
) {
  return formatter(date, now());
}
