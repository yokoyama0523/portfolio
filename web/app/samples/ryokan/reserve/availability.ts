import type { Room } from "../content/rooms";

const fromIso = (value: string) => new Date(`${value}T00:00:00`);

export const roomOpen = (room: Room, isoDate: string) => {
  const date = fromIso(isoDate);
  const n = (date.getDate() * 3 + date.getMonth() * 5 + (room.price % 11)) % 7;
  if (room.id === "tsuki") return n >= 3;
  if (room.id === "sugi") return n !== 1;
  return n !== 0;
};

export const isoToDate = fromIso;
