import { NextResponse } from "next/server";
import { getGooglePlace } from "@/lib/prospecting/sources";

// Fresh details for a saved Google place ID. The shortlist stores only IDs,
// as Google's terms require, and looks the rest up here when shown.
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const place = await getGooglePlace(id);
  if (!place) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(place);
}
