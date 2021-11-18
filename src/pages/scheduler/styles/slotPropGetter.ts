export const slotPropGetter = (mode: <T>(light: T, dark: T) => T) => (date: Date) =>
  date.getDay() === 2 || date.getDay() === 4
    ? {
        style: {
          backgroundColor: mode('#F7F7F7', 'rgb(76, 79, 82)'),
        },
      }
    : {};
