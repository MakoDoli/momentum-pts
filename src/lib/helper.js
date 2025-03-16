import { format, parseISO } from "date-fns";

export function formatDate(dateString) {
  const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
  const date = parseISO(dateString);
  const dayOfWeek = days[date.getUTCDay()];
  const formattedDate = format(date, "MM/d/yyyy");

  return `${dayOfWeek} - ${formattedDate}`;
}

export const filterTasks = (filters, tasks) => {
  return tasks.filter((task) => {
    return filters.every((filter) => {
      const taskValue = task[filter.type];
      if (filter.type === "employee") {
        return filter.value === `${taskValue.name} ${taskValue.surname}`;
      }
      return taskValue.name === filter.value;
    });
  });
};
