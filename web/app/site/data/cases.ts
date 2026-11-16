import { type Sample, samples } from "~/samples/catalog";

export type Case = Sample;

export const cases = samples;

export const stats = {
  industries: cases.length,
  forms: cases.filter((c) => c.has_flow).length,
};
