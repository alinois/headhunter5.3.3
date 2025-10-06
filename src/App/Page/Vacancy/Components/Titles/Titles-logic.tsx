import type { VacancyType } from "../../../../../types";

export const formatSalary = (salary: VacancyType["salary"]) => {
  if (!salary) return "Зарплата не указана";
  const from = salary.from;
  const to = salary.to;
  const currency = salary.currency;

  if (from && to) return `${from} - ${to} ${currency}`;
  if (from) return `${from} ${currency}`;
  if (to) return `${to} ${currency}`;
  return "Зарплата не указана";
};

export const formatSchedule = (schedule: VacancyType['schedule']) => {
  switch (schedule?.id) {
    case "remote":
      return "Можно удалённо";
    case "flexible":
      return "Гибрид";
    case "fullDay":
    case "shift":
    case "flyInFlyOut":
    case "partTime":
      return "Офис";
    default:
      return "Не указано";
  }
};

export const getScheduleClass = (schedule: VacancyType['schedule']) => {
  switch (schedule?.id) {
    case "remote": 
      return "badge-remote";
    case "flexible": 
      return "badge-hybrid";
    case "fullDay":
    case "shift":
    case "flyInFlyOut":
    case "partTime":
      return "badge-office";
    default: 
      return "badge-default";
  }
};
