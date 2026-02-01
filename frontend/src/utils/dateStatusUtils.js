export const isOverdue = (endDate, status) => {
  if (!endDate) return false;
  if (status === "done") return false;

  return new Date(endDate) < new Date();
};

export const daysLeft = (endDate) => {
  if (!endDate) return null;

  const diff =
    new Date(endDate).setHours(0, 0, 0, 0) -
    new Date().setHours(0, 0, 0, 0);

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
