import { NextResponse } from "next/server";
import { db } from "@/db";
import { propFirms } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const slug = searchParams.get("slug");

    if (slug) {
      const firm = await db.query.propFirms.findFirst({
        where: eq(propFirms.slug, slug),
      });
      if (!firm) {
        return NextResponse.json({ error: "Firm not found" }, { status: 404 });
      }
      return NextResponse.json({ firm });
    }

    let query = db
      .select()
      .from(propFirms)
      .where(eq(propFirms.isActive, true))
      .orderBy(desc(propFirms.isSponsored), desc(propFirms.trustScore));

    if (q) {
      query = db
        .select()
        .from(propFirms)
        .where(sql`${propFirms.isActive} = true AND ${ilike(propFirms.name, `%${q}%`)}`)
        .orderBy(desc(propFirms.trustScore));
    }

    const firms = await query;
    return NextResponse.json({ firms });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch prop firms" }, { status: 500 });
  }
}
