export const themeColor = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim();
