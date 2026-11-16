const prefix = "asagi_v2_";

export const read = <T>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(prefix + key);
    return value == null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
};

export const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(prefix + key, JSON.stringify(value));
  } catch {
    return;
  }
};

export const clearAll = () => {
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith(prefix)) window.localStorage.removeItem(key);
    }
  } catch {
    return;
  }
};
