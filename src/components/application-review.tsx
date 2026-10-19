"use client";

import { useState } from "react";
import type { Application } from "@/lib/recruitment";
import type { FoundBusiness, SearchResponse } from "@/lib/prospecting/trades";

type Decision = "Approved" | "Declined";

type ReviewCheck =
  | { state: "loading" }
  | { state: "found"; business: FoundBusiness }
  | { state: "none" }
  | { state: "error"; message: string };

export function ApplicationReview({ applications }: { applications: Application[] }) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [checks, setChecks] = useState<Record<string, ReviewCheck>>({});

  async function checkReviews(app: Application) {
    setChecks((c) => ({ ...c, [app.id]: { state: "loading" } }));
    const params = new URLSearchParams({
      source: "google",
      trade: "car-detailing",
      query: app.business,
      area: app.town,
    });
    try {
      const res = await fetch(`/api/prospects/search?${params}`);
      const data = (await res.json()) as SearchResponse;
      if (data.error) {
        setChecks((c) => ({ ...c, [app.id]: { state: "error", message: data.error ?? "Search failed" } }));
      } else if (data.results[0]) {
        setChecks((c) => ({ ...c, [app.id]: { state: "found", business: data.results[0] } }));
      } else {
        setChecks((c) => ({ ...c, [app.id]: { state: "none" } }));
      }
    } catch {
      setChecks((c) => ({ ...c, [app.id]: { state: "error", message: "The search didn't go through." } }));
    }
  }

  if (applications.length === 0) {
    return <p className="text-slate">No new applications. When the ads are running, they land here.</p>;
  }

  return (
    <ul className="divide-y divide-line">
      {applications.map((app) => {
        const decision = decisions[app.id];
        const check = checks[app.id];
        return (
          <li key={app.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 max-w-xl">
                <p className="font-medium">
                  {app.business}
                  <span className="ml-2 text-sm font-normal text-slate">
                    {app.name}, {app.town} + {app.radius}, {app.setup.toLowerCase()}
                  </span>
                </p>
                <p className="text-sm">{app.services.join(", ")}</p>
                <p className="text-sm text-slate">
                  Typical job {app.typicalJob}. {app.capacity}. Enquiries by {app.delivery.toLowerCase()}.
                </p>
                <p className="text-sm text-slate">
                  Applied {app.received}, from ad {app.fromAd}
                </p>
                {app.flag ? <p className="mt-1 text-sm text-clay-red">Check: {app.flag}</p> : null}

                <div className="mt-2 text-sm">
                  {!check ? (
                    <button
                      type="button"
                      onClick={() => checkReviews(app)}
                      className="underline underline-offset-2"
                    >
                      Check their Google reviews
                    </button>
                  ) : check.state === "loading" ? (
                    <span className="text-slate">Looking them up…</span>
                  ) : check.state === "found" ? (
                    <span>
                      Google: <span className="font-medium">{check.business.name}</span>
                      {check.business.rating !== undefined
                        ? `, ${check.business.rating.toFixed(1)} stars from ${check.business.reviews ?? 0} reviews`
                        : ", no reviews yet"}
                      {check.business.mapsUrl ? (
                        <>
                          {" "}
                          <a
                            href={check.business.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2"
                          >
                            Open in Maps
                          </a>
                        </>
                      ) : null}
                    </span>
                  ) : check.state === "none" ? (
                    <span className="text-slate">Not found on Google. Ask for their Instagram or website.</span>
                  ) : (
                    <span className="text-clay-red">{check.message}</span>
                  )}
                </div>
              </div>

              {decision ? (
                <p className="flex items-center gap-3 text-sm" role="status">
                  <span className={decision === "Approved" ? "font-medium text-moss" : "font-medium text-clay-red"}>
                    {decision === "Approved" ? "Approved: welcome text and terms go out" : "Declined"}
                  </span>
                  <button
                    type="button"
                    className="text-slate underline underline-offset-2"
                    onClick={() =>
                      setDecisions((d) => {
                        const next = { ...d };
                        delete next[app.id];
                        return next;
                      })
                    }
                  >
                    Undo
                  </button>
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setDecisions((d) => ({ ...d, [app.id]: "Approved" }))}
                    className="min-h-11 rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecisions((d) => ({ ...d, [app.id]: "Declined" }))}
                    className="min-h-11 rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
