// Search presets per trade. Shared by the server search and the screen.

export type Trade = {
  id: string;
  label: string;
  /** Phrases to search Google for, best first. */
  queries: string[];
  /** Companies House SIC code for the trade. */
  sic: string;
  sicNote?: string;
};

export const trades: Trade[] = [
  {
    id: "car-detailing",
    label: "Car detailing",
    queries: ["car detailing", "ceramic coating", "paint correction", "mobile valeting"],
    sic: "45200",
    sicNote: "SIC 45200 covers all vehicle maintenance, so expect garages in the results too.",
  },
  {
    id: "landscaping",
    label: "Landscaping and patios",
    queries: ["landscaper", "patio installer", "garden landscaping", "block paving"],
    sic: "81300",
  },
];

export function findTrade(id: string): Trade | undefined {
  return trades.find((t) => t.id === id);
}

export type FoundBusiness = {
  source: "google" | "companies-house";
  /** Google place ID or Companies House company number. */
  id: string;
  name: string;
  phone?: string;
  website?: string;
  address?: string;
  rating?: number;
  reviews?: number;
  mapsUrl?: string;
  incorporated?: string;
};

export type SearchResponse = {
  results: FoundBusiness[];
  nextPageToken?: string;
  error?: string;
};
