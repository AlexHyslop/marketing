import { NextResponse } from "next/server";
import { searchCompaniesHouse, searchGoogle } from "@/lib/prospecting/sources";
import { findTrade } from "@/lib/prospecting/trades";

// Sits behind the dashboard password (see src/proxy.ts), so only you can
// spend search credits.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const source = params.get("source");
  const trade = findTrade(params.get("trade") ?? "");
  const area = (params.get("area") ?? "").trim().slice(0, 80);
  const query = (params.get("query") ?? "").trim().slice(0, 80);
  const pageToken = params.get("page") ?? undefined;

  if (!trade || !area) {
    return NextResponse.json({ results: [], error: "Choose a trade and enter a town or postcode." }, { status: 400 });
  }

  try {
    if (source === "companies-house") {
      return NextResponse.json(await searchCompaniesHouse(trade.sic, area));
    }
    return NextResponse.json(await searchGoogle(query || trade.queries[0], area, pageToken));
  } catch {
    return NextResponse.json(
      { results: [], error: "The search service didn't respond. Try again in a minute." },
      { status: 502 },
    );
  }
}
