export const generateRandomId = () =>
  Math.random()
    .toString(36)
    .substring(2, 8 + 2);

export const getLastDayOfNextMonth = () => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  return nextMonth;
};
