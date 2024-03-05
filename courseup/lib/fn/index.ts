export const range = (start: number, end: number, step = 1): number[] => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};
