import type { Dictionary } from "@/i18n/dictionaries/en";

type Texts = Dictionary["builder"];

export type ItemId = keyof Texts["items"];

export type Item = {
  id: ItemId;
  group: keyof Texts["groups"];
  price: number | null;
  unit?: keyof Texts["units"];
  yearly?: boolean;
  monthly?: number;
  quantity?: number;
  choice?: "site";
};

export const items: readonly Item[] = [
  { id: "landing", group: "web", price: 60_000, choice: "site" },
  { id: "multi", group: "web", price: 180_000, choice: "site" },
  { id: "catalog", group: "web", price: 180_000, choice: "site" },
  { id: "hosting", group: "web", price: 15_000, unit: "year", yearly: true },
  { id: "support", group: "web", price: null, unit: "request" },
  { id: "edits", group: "web", price: 5_000, unit: "edit", quantity: 1 },
  { id: "automation", group: "automation", price: 50_000 },
  { id: "assistant", group: "automation", price: 90_000, monthly: 5_000 },
  { id: "custom", group: "automation", price: null, unit: "request" },
  { id: "photo", group: "content", price: 1_500, unit: "photo", quantity: 5 },
  { id: "video", group: "content", price: 5_000, unit: "clip", quantity: 1 },
  { id: "shootPhoto", group: "content", price: 20_000, unit: "visit" },
  { id: "shootVideo", group: "content", price: 15_000, unit: "visit" },
];

export const groups = ["web", "automation", "content"] as const;

export const initialQuantities = Object.fromEntries(
  items.map((item) => [item.id, item.quantity ?? 1]),
) as Record<ItemId, number>;

export const maxQuantity = 99;
