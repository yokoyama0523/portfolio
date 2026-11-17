export const pageList = (current: number, last: number) => {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const middle = [current - 1, current, current + 1].filter((n) => n > 1 && n < last);
  const list: (number | "gap")[] = [1];
  if (middle[0] > 2) list.push("gap");
  list.push(...middle);
  if (middle[middle.length - 1] < last - 1) list.push("gap");
  list.push(last);
  return list;
};
