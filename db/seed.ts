import { db } from "./index";
import { propFirms } from "./schema";

async function seed() {
  const existing = await db.select().from(propFirms);
  if (existing.length > 0) {
    console.log(`Database already has ${existing.length} prop firms. Skipping seed.`);
    process.exit(0);
  }

  const affiliateUrl = process.env.PROPRANK_AFFILIATE_URL || "https://example.com";

  await db.insert(propFirms).values([
    {
      slug: "ftmo",
      name: "FTMO",
      challengeFeeUsd: 155,
      accountSizeUsd: 10000,
      maxDailyDrawdownPct: 5,
      maxTotalDrawdownPct: 10,
      profitTargetPct: 10,
      minTradingDays: 4,
      allowsOvernight: true,
      allowsNewsTrading: true,
      allowsEaBots: true,
      payoutSplitPct: 80,
      firstPayoutDays: 14,
      trustScore: 92,
      country: "Czech Republic",
      regulationNote: "Established 2015, widely reviewed.",
      affiliateUrl,
      affiliateLabel: "💼 FTMO Challenge",
    },
    {
      slug: "the5ers",
      name: "The5ers",
      challengeFeeUsd: 39,
      accountSizeUsd: 5000,
      maxDailyDrawdownPct: 5,
      maxTotalDrawdownPct: 10,
      profitTargetPct: 8,
      minTradingDays: 3,
      allowsOvernight: true,
      allowsNewsTrading: true,
      allowsEaBots: true,
      payoutSplitPct: 80,
      firstPayoutDays: 5,
      trustScore: 85,
      country: "Israel",
      regulationNote: "Instant funding option available.",
      affiliateUrl,
      affiliateLabel: "💼 The5ers Challenge",
    },
    {
      slug: "fundednext",
      name: "FundedNext",
      challengeFeeUsd: 49,
      accountSizeUsd: 6000,
      maxDailyDrawdownPct: 5,
      maxTotalDrawdownPct: 10,
      profitTargetPct: 10,
      minTradingDays: 0,
      allowsOvernight: true,
      allowsNewsTrading: true,
      allowsEaBots: true,
      payoutSplitPct: 80,
      firstPayoutDays: 5,
      trustScore: 82,
      country: "UAE",
      regulationNote: "Fast-growing, competitive pricing.",
      affiliateUrl,
      affiliateLabel: "💼 FundedNext",
      isSponsored: true,
    },
    {
      slug: "trueforexfunds",
      name: "True Forex Funds",
      challengeFeeUsd: 89,
      accountSizeUsd: 10000,
      maxDailyDrawdownPct: 5,
      maxTotalDrawdownPct: 10,
      profitTargetPct: 10,
      minTradingDays: 0,
      allowsOvernight: true,
      allowsNewsTrading: false,
      allowsEaBots: true,
      payoutSplitPct: 80,
      firstPayoutDays: 14,
      trustScore: 78,
      country: "Hungary",
      regulationNote: "No news trading during evaluation.",
      affiliateUrl,
      affiliateLabel: "💼 True Forex Funds",
    },
    {
      slug: "myforexfunds",
      name: "My Forex Funds",
      challengeFeeUsd: 49,
      accountSizeUsd: 5000,
      maxDailyDrawdownPct: 5,
      maxTotalDrawdownPct: 12,
      profitTargetPct: 8,
      minTradingDays: 0,
      allowsOvernight: true,
      allowsNewsTrading: true,
      allowsEaBots: true,
      payoutSplitPct: 75,
      firstPayoutDays: 14,
      trustScore: 45,
      country: "Canada",
      regulationNote: "⚠️ Regulatory actions in 2023/2024 — verify before funding.",
      affiliateUrl,
      affiliateLabel: "💼 My Forex Funds",
    },
  ]);

  console.log("Seeded 5 prop firms.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
