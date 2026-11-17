import { Lines } from "~/samples/shared/Lines";

const split = (text: string) => text.split(/(?<=。)/).filter(Boolean);

export function Sentences({ text }: { text: string }) {
  return <Lines lines={split(text)} />;
}
