// Server-only: talks to Google Places and Companies House with keys from the
// environment. Keys never reach the browser.
//
// Google's terms only allow the place ID to be stored, so callers keep IDs
// and fetch names and numbers fresh with getGooglePlace when they're shown.

import type { FoundBusiness, SearchResponse } from "./trades";

export function sourcesConfigured() {
  return {
    google: Boolean(process.env.GOOGLE_PLACES_API_KEY),
    companiesHouse: Boolean(process.env.COMPANIES_HOUSE_API_KEY),
  };
}

// Phone, website and rating are Enterprise fields; the whole request bills
// at that tier (1,000 free a month at the time of writing).
const PLACE_FIELDS = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "websiteUri",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "businessStatus",
];

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  businessStatus?: string;
};

export function parseGooglePlace(p: GooglePlace): FoundBusiness | null {
  if (!p.id || !p.displayName?.text) return null;
  if (p.businessStatus && p.businessStatus !== "OPERATIONAL") return null;
  return {
    source: "google",
    id: p.id,
    name: p.displayName.text,
    phone: p.nationalPhoneNumber,
    website: p.websiteUri,
    address: p.formattedAddress,
    rating: p.rating,
    reviews: p.userRatingCount,
    mapsUrl: p.googleMapsUri,
  };
}

async function googleError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: { message?: string } };
    return body.error?.message ?? `Google returned ${res.status}`;
  } catch {
    return `Google returned ${res.status}`;
  }
}

export async function searchGoogle(
  query: string,
  area: string,
  pageToken?: string,
): Promise<SearchResponse> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return { results: [], error: "Google Places isn't set up yet." };

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": [...PLACE_FIELDS.map((f) => `places.${f}`), "nextPageToken"].join(","),
    },
    body: JSON.stringify({
      textQuery: `${query} in ${area}`,
      regionCode: "GB",
      languageCode: "en-GB",
      pageSize: 20,
      ...(pageToken ? { pageToken } : {}),
    }),
    cache: "no-store",
  });

  if (!res.ok) return { results: [], error: await googleError(res) };

  const data = (await res.json()) as { places?: GooglePlace[]; nextPageToken?: string };
  const results = (data.places ?? [])
    .map(parseGooglePlace)
    .filter((b): b is FoundBusiness => b !== null);
  return { results, nextPageToken: data.nextPageToken };
}

export async function getGooglePlace(id: string): Promise<FoundBusiness | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key || !/^[A-Za-z0-9_-]+$/.test(id)) return null;

  const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": PLACE_FIELDS.join(","),
    },
    // Short cache keeps repeat views cheap without storing the details.
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return parseGooglePlace((await res.json()) as GooglePlace);
}

type CompaniesHouseItem = {
  company_name?: string;
  company_number?: string;
  company_status?: string;
  date_of_creation?: string;
  registered_office_address?: {
    address_line_1?: string;
    address_line_2?: string;
    locality?: string;
    postal_code?: string;
  };
};

export function parseCompaniesHouseItem(item: CompaniesHouseItem): FoundBusiness | null {
  if (!item.company_name || !item.company_number) return null;
  if (item.company_status && item.company_status !== "active") return null;
  const a = item.registered_office_address ?? {};
  const address = [a.address_line_1, a.address_line_2, a.locality, a.postal_code].filter(Boolean).join(", ");
  return {
    source: "companies-house",
    id: item.company_number,
    name: item.company_name,
    address: address || undefined,
    incorporated: item.date_of_creation,
    website: `https://find-and-update.company-information.service.gov.uk/company/${item.company_number}`,
  };
}

export async function searchCompaniesHouse(sic: string, area: string): Promise<SearchResponse> {
  const key = process.env.COMPANIES_HOUSE_API_KEY;
  if (!key) return { results: [], error: "Companies House isn't set up yet." };

  const url = new URL("https://api.company-information.service.gov.uk/advanced-search/companies");
  url.searchParams.set("sic_codes", sic);
  url.searchParams.set("location", area);
  url.searchParams.set("company_status", "active");
  url.searchParams.set("size", "50");

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${btoa(`${key}:`)}` },
    cache: "no-store",
  });
  if (res.status === 404) return { results: [] };
  if (!res.ok) return { results: [], error: `Companies House returned ${res.status}` };

  const data = (await res.json()) as { items?: CompaniesHouseItem[] };
  const results = (data.items ?? [])
    .map(parseCompaniesHouseItem)
    .filter((b): b is FoundBusiness => b !== null);
  return { results };
}
