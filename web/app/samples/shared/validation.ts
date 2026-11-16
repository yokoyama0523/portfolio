export const isFilled = (value: string) => value.trim() !== "";

export const isPhone = (value: string) => /^[0-9０-９\-－ ]{10,14}$/.test(value);

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isKana = (value: string) => /^[ぁ-んー　 ]+$/.test(value);

export const isZip = (value: string) => /^[0-9０-９]{3}-?[0-9０-９]{4}$/.test(value);

export const isCardNumber = (value: string) => /^[0-9 ]{13,19}$/.test(value);

export const isExpiry = (value: string) => /^[0-9]{2} ?\/ ?[0-9]{2}$/.test(value);

export const isCvc = (value: string) => /^[0-9]{3,4}$/.test(value);
