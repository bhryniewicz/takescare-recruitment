export const setHourRange = (
  visitDate: Date,
  timeFrom: number,
  mode: "from" | "to"
) => {
  const currentDate = new Date();

  const ceilToHour = (date: Date) => {
    const nextHour = new Date(date);
    nextHour.setHours(nextHour.getHours() + 2);
    return nextHour.getHours();
  };

  const isToday =
    visitDate &&
    new Date(visitDate).toDateString() === currentDate.toDateString();

  let startHour = 0;
  const endHour = mode === "from" ? 22 : 23;

  if (mode === "from") {
    startHour = isToday ? Math.min(ceilToHour(currentDate), 22) : 0;
  } else if (mode === "to") {
    startHour =
      timeFrom !== undefined && timeFrom !== null
        ? Math.min(timeFrom + 1, 23)
        : 0;
  }

  const hoursRange = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => i + startHour
  );

  return hoursRange;
};
