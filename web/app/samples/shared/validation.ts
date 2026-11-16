export const isFilled = (value: string) => value.trim() !== "";

export const isPhone = (value: string) => /^[0-9０-９\-－ ]{10,14}$/.test(value);

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
