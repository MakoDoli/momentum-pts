import { format, parseISO } from "date-fns";

export function formatDate(dateString) {
  const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
  const date = parseISO(dateString);
  const dayOfWeek = days[date.getUTCDay()];
  const formattedDate = format(date, "MM/d/yyyy");

  return `${dayOfWeek} - ${formattedDate}`;
}
