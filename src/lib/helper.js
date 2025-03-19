import { format, parseISO } from "date-fns";

export function formatDate(dateString) {
  const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
  const date = parseISO(dateString);
  const dayOfWeek = days[date.getUTCDay()];
  const formattedDate = format(date, "MM/d/yyyy");

  return `${dayOfWeek} - ${formattedDate}`;
}

export const filterTasks = (filters, tasks) => {
  const departmentArr = filters
    .filter((f) => f.type === "department")
    .map((f) => f.value);
  const priorityArr = filters
    .filter((f) => f.type === "priority")
    .map((f) => f.value);
  const employeeArr = filters.find((f) => f.type === "employee");

  return tasks.filter((task) => {
    const departmentFiltered =
      departmentArr.length === 0 ||
      departmentArr.includes(task.department.name);
    const priorityFiltered =
      priorityArr.length === 0 || priorityArr.includes(task.priority.name);
    const employeeFiltered =
      !employeeArr ||
      `${task.employee.name} ${task.employee.surname}` === employeeArr.value;

    return departmentFiltered && priorityFiltered && employeeFiltered;
  });
};
