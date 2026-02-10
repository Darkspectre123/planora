import { Badge } from "@mantine/core";
import { isOverdue, daysLeft } from "../../utils/dateStatusUtils";

export default function OverdueBadge({ endDate, status }) {
  if (!endDate) return null;

  if (isOverdue(endDate, status)) {
    return (
      <Badge color="red" size="xs" ml={6}>
        Overdue
      </Badge>
    );
  }

  const left = daysLeft(endDate);

  if (left === 1) {
    return (
      <Badge color="orange" size="xs" ml={6}>
        Due Tomorrow
      </Badge>
    );
  }

  if (left === 0) {
    return (
      <Badge color="yellow" size="xs" ml={6}>
        Due Today
      </Badge>
    );
  }

  return null;
}
