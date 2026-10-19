"use client";

import { useEffect, useState } from "react";
import type { FoundBusiness, SearchResponse, Trade } from "@/lib/prospecting/trades";

type Source = "google" | "companies-house";

/** What the shortlist keeps. Google entries hold only the place ID. */
type ShortlistEntry =
  | { source: "google"; id: string; trade: string; addedAt: string }
  | { source: "companies-house"; id: string; trade: string; addedAt: string; business: FoundBusiness };

const STORAGE_KEY = "lead-desk-shortlist";

function loadShortlist(): ShortlistEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShortlistEntry[]) : [];
  } catch {
    return [];
  }
}

function saveShortlist(entries: ShortlistEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage blocked: the shortlist still works until the page is closed.
  }
}

const field = "mt-1 w-full rounded-md border border-line bg-white px-3 py-2.5 text-base";

export function FindBusinesses({
  trades,
  configured,
}: {
  trades: Trade[];
  configured: { google: boolean; companiesHouse: boolean };
}) {
  const [source, setSource] = useState<Source>(
    configured.google || !configured.companiesHouse ? "google" : "companies-house",
  );
  const [tradeId, setTradeId] = useState(trades[0].id);
  const trade = trades.find((t) => t.id === tradeId) ?? trades[0];
  const [query, setQuery] = useState(trade.queries[0]);
  const [area, setArea] = useState("");
  const [results, setResults] = useState<FoundBusiness[]>([]);
  const [nextPage, setNextPage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);

  useEffect(() => {
    setShortlist(loadShortlist());
  }, []);

  const sourceReady = source === "google" ? configured.google : configured.companiesHouse;

  async function search(page?: string) {
    if (!area.trim()) {
      setError("Enter a town or postcode area to search.");
      return;
    }
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ source, trade: tradeId, query, area });
    if (page) params.set("page", page);
    try {
      const res = await fetch(`/api/prospects/search?${params}`);
      const data = (await res.json()) as SearchResponse;
      if (data.error) setError(data.error);
      setResults((prev) => (page ? [...prev, ...data.results] : data.results));
      setNextPage(data.nextPageToken);
      setSearched(true);
    } catch {
      setError("The search didn't go through. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function add(b: FoundBusiness) {
    const addedAt = new Date().toISOString();
    const entry: ShortlistEntry =
      b.source === "google"
        ? { source: "google", id: b.id, trade: trade.label, addedAt }
        : { source: "companies-house", id: b.id, trade: trade.label, addedAt, business: b };
    const next = [entry, ...shortlist.filter((e) => e.id !== b.id)];
    setShortlist(next);
    saveShortlist(next);
  }

  function remove(id: string) {
    const next = shortlist.filter((e) => e.id !== id);
    setShortlist(next);
    saveShortlist(next);
  }

  const onList = new Set(shortlist.map((e) => e.id));

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <form
          className="rounded-lg border border-line bg-white p-5"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <fieldset>
            <legend className="text-sm font-semibold">Search</legend>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Where to search">
              {(
                [
                  ["google", "Google (phone numbers)", configured.google],
                  ["companies-house", "Companies House (free, no phones)", configured.companiesHouse],
                ] as const
              ).map(([value, label, ready]) => (
                <label
                  key={value}
                  className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-3 text-sm ${
                    source === value ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="source"
                    value={value}
                    checked={source === value}
                    onChange={() => setSource(value)}
                    className="sr-only"
                  />
                  {label}
                  {!ready ? <span className={source === value ? "text-white/70" : "text-slate"}>· not set up</span> : null}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="trade" className="text-sm font-medium">
                Trade
              </label>
              <select
                id="trade"
                value={tradeId}
                onChange={(e) => {
                  const t = trades.find((x) => x.id === e.target.value) ?? trades[0];
                  setTradeId(t.id);
                  setQuery(t.queries[0]);
                }}
                className={field}
              >
                {trades.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            {source === "google" ? (
              <div>
                <label htmlFor="query" className="text-sm font-medium">
                  Search for
                </label>
                <select id="query" value={query} onChange={(e) => setQuery(e.target.value)} className={field}>
                  {trade.queries.map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium">Industry code</p>
                <p className="mt-1 py-2.5 text-sm">SIC {trade.sic}</p>
              </div>
            )}
            <div>
              <label htmlFor="area" className="text-sm font-medium">
                Town or postcode area
              </label>
              <input
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Maidstone or ME14"
                className={field}
              />
            </div>
          </div>

          {source === "companies-house" && trade.sicNote ? (
            <p className="mt-3 text-sm text-slate">{trade.sicNote}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading || !sourceReady}
            className="mt-4 min-h-11 rounded-md bg-moss px-5 text-sm font-medium text-white hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Searching…" : "Search"}
          </button>
          {!sourceReady ? (
            <p className="mt-2 text-sm text-clay-red">
              This source needs its key adding first. The steps are below.
            </p>
          ) : null}
        </form>

        {error ? (
          <p role="alert" className="rounded-md bg-clay-soft px-4 py-3 text-sm text-[#6e2a1c]">
            {error}
          </p>
        ) : null}

        {searched && results.length === 0 && !error ? (
          <p className="text-slate">
            Nothing found. Try a nearby bigger town, or another search phrase.
          </p>
        ) : null}

        {results.length > 0 ? (
          <section aria-label="Results" className="rounded-lg border border-line bg-white">
            <h2 className="border-b border-line px-5 py-3 font-display text-lg font-semibold">
              {results.length} businesses
            </h2>
            <ul className="divide-y divide-line">
              {results.map((b) => (
                <li key={b.id} className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
                  <BusinessDetails business={b} />
                  {onList.has(b.id) ? (
                    <span className="min-h-11 py-3 text-sm font-medium text-moss">On your list</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => add(b)}
                      className="min-h-11 rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink"
                    >
                      Add to call list
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {nextPage ? (
              <div className="border-t border-line px-5 py-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => search(nextPage)}
                  className="min-h-11 text-sm font-medium underline underline-offset-2"
                >
                  {loading ? "Loading…" : "Show more"}
                </button>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>

      <aside>
        <section className="rounded-lg border border-line bg-white">
          <h2 className="border-b border-line px-5 py-3 font-display text-lg font-semibold">
            To call <span className="text-slate">{shortlist.length}</span>
          </h2>
          {shortlist.length === 0 ? (
            <p className="px-5 py-4 text-sm text-slate">
              Businesses you add appear here, with their latest phone number.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {shortlist.map((entry) => (
                <ShortlistRow key={entry.id} entry={entry} onRemove={() => remove(entry.id)} />
              ))}
            </ul>
          )}
          <p className="border-t border-line px-5 py-3 text-xs text-slate">
            Saved in this browser until the database is connected. Screen every number against the
            TPS/CTPS registers before calling.
          </p>
        </section>
      </aside>
    </div>
  );
}

function BusinessDetails({ business: b }: { business: FoundBusiness }) {
  return (
    <div className="min-w-0 max-w-xl">
      <p className="font-medium">{b.name}</p>
      {b.rating !== undefined ? (
        <p className="text-sm">
          {b.rating.toFixed(1)} stars
          {b.reviews !== undefined ? <span className="text-slate"> from {b.reviews} reviews</span> : null}
        </p>
      ) : null}
      {b.address ? <p className="text-sm text-slate">{b.address}</p> : null}
      {b.incorporated ? <p className="text-sm text-slate">Registered {b.incorporated}</p> : null}
      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {b.phone ? (
          <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="font-medium underline underline-offset-2">
            {b.phone}
          </a>
        ) : b.source === "google" ? (
          <span className="text-slate">No phone listed</span>
        ) : null}
        {b.website ? (
          <a href={b.website} target="_blank" rel="noreferrer" className="underline underline-offset-2">
            {b.source === "companies-house" ? "Companies House record" : "Website"}
          </a>
        ) : null}
        {b.mapsUrl ? (
          <a href={b.mapsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">
            Google Maps
          </a>
        ) : null}
      </p>
    </div>
  );
}

function ShortlistRow({ entry, onRemove }: { entry: ShortlistEntry; onRemove: () => void }) {
  const [business, setBusiness] = useState<FoundBusiness | null>(
    entry.source === "companies-house" ? entry.business : null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (entry.source !== "google") return;
    let cancelled = false;
    fetch(`/api/prospects/place?id=${encodeURIComponent(entry.id)}`)
      .then((r) => (r.ok ? (r.json() as Promise<FoundBusiness>) : Promise.reject()))
      .then((b) => {
        if (!cancelled) setBusiness(b);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [entry]);

  return (
    <li className="px-5 py-3 text-sm">
      {business ? (
        <>
          <p className="font-medium">{business.name}</p>
          {business.phone ? (
            <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="underline underline-offset-2">
              {business.phone}
            </a>
          ) : (
            <p className="text-slate">No phone listed</p>
          )}
        </>
      ) : (
        <p className="text-slate">{failed ? "Couldn't load this business." : "Loading…"}</p>
      )}
      <p className="mt-1 flex justify-between gap-3 text-xs text-slate">
        <span>{entry.trade}</span>
        <button type="button" onClick={onRemove} className="underline underline-offset-2">
          Remove
        </button>
      </p>
    </li>
  );
}
