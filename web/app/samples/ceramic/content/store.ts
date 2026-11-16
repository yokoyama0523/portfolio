import { samplePath } from "~/samples/catalog";
import type { ImageAsset } from "~/samples/shared/images";
import { image } from "../assets";
import { type ItemId, itemData, itemIds } from "./items";

const home = samplePath("ceramic");

export const store = {
  name: "土と火",
  latin: "UTSUWA · SINCE 2014",
  copyright: "© Tsuchi to Hi",
  paths: {
    home,
    pieces: `${home}#pieces`,
    item: (id: string) => `${home}item/${id}/`,
    checkout: `${home}checkout/`,
  },
  cartKey: "tsuchi_cart",
  freeShippingFrom: 11000,
  shipping: 770,
  giftBox: 880,
};

export const items = Object.fromEntries(
  itemIds.map((id) => [id, { ...itemData[id], image: image(`p2-${id}.jpg`) }]),
) as { [K in ItemId]: (typeof itemData)[K] & { image: ImageAsset } };

export { type ItemId, itemIds };

export const isItemId = (value: string): value is ItemId => value in items;

export const yen = (value: number) => `${value.toLocaleString("ja-JP")}円`;

export const FEW_STOCK = 2;
