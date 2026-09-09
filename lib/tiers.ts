export type TierId = "scout" | "ranger" | "operator" | "rambo";

export interface TierFeature {
  id: string;
  label: string;
  scout: boolean | string;
  ranger: boolean | string;
  operator: boolean | string;
  rambo: boolean | string;
}

export interface PricingPlan {
  tier: TierId;
  monthlyUsd: number;
  yearlyUsd: number;
  yearlyDiscount: string;
}

export const TIER_ORDER: TierId[] = ["scout", "ranger", "operator", "rambo"];

export const TIER_NAMES: Record<TierId, string> = {
  scout: "🥾 Scout",
  ranger: "🎯 Ranger",
  operator: "🛡️ Operator",
  rambo: "🔥 Rambo",
};

export const TIER_DESCRIPTIONS: Record<TierId, string> = {
  scout: "Free forever. Browse the basics.",
  ranger: "For active traders who compare firms.",
  operator: "For serious prop-firm researchers.",
  rambo: "Everything. Lifetime option via HFM IB.",
};

export const FEATURES: TierFeature[] = [
  { id: "directory", label: "Full prop-firm directory", scout: true, ranger: true, operator: true, rambo: true },
  { id: "firm_detail", label: "Firm detail pages", scout: "3/day", ranger: true, operator: true, rambo: true },
  { id: "search", label: "Search firms", scout: false, ranger: true, operator: true, rambo: true },
  { id: "compare", label: "Compare firms", scout: false, ranger: "2 at a time", operator: "5 at a time", rambo: "Unlimited" },
  { id: "advanced_filters", label: "Advanced filters", scout: false, ranger: false, operator: true, rambo: true },
  { id: "csv_export", label: "CSV export", scout: false, ranger: false, operator: true, rambo: true },
  { id: "trust_breakdown", label: "Trust-score breakdown", scout: false, ranger: false, operator: false, rambo: true },
  { id: "api_access", label: "API key access", scout: false, ranger: false, operator: false, rambo: true },
  { id: "sponsor_alerts", label: "Sponsored firm alerts", scout: false, ranger: false, operator: false, rambo: true },
];

export const PRICING: PricingPlan[] = [
  { tier: "ranger", monthlyUsd: 7, yearlyUsd: 60, yearlyDiscount: "Save 29%" },
  { tier: "operator", monthlyUsd: 15, yearlyUsd: 140, yearlyDiscount: "Save 22%" },
  { tier: "rambo", monthlyUsd: 29, yearlyUsd: 260, yearlyDiscount: "Save 25%" },
];

export function tierRank(tier: TierId): number {
  return TIER_ORDER.indexOf(tier);
}

export function hasTier(userTier: TierId, requiredTier: TierId): boolean {
  return tierRank(userTier) >= tierRank(requiredTier);
}

export function tierMeets(userTier: TierId, featureId: string): boolean {
  const feature = FEATURES.find((f) => f.id === featureId);
  if (!feature) return false;
  const value = feature[userTier];
  return value === true || typeof value === "string";
}

export function getCompareLimit(tier: TierId): number {
  if (tier === "rambo") return 100;
  if (tier === "operator") return 5;
  if (tier === "ranger") return 2;
  return 0;
}

export function getFirmDetailLimit(tier: TierId): number {
  if (tier === "scout") return 3;
  return Infinity;
}

export function formatPrice(usd: number): string {
  return `$${usd}`;
}
