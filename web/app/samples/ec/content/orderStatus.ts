export const orderStatus = {
  received: "受付",
  preparing: "発送準備",
  shipped: "発送済",
  done: "完了",
  cancelled: "キャンセル",
} as const;

export const orderStatuses = Object.values(orderStatus);

export const statusKey = (status: string) =>
  Object.entries(orderStatus).find(([, label]) => label === status)?.[0] ?? "";
