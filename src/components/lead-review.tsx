"use client";

import { useState } from "react";
import type { Lead } from "@/lib/demo-data";

type Decision = "Sent" | "Rejected";

export function LeadReview({ leads, contractorName }: { leads: Lead[]; contractorName: string }) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  if (leads.length === 0) {
    return <p className="text-slate">No leads waiting. The rules handled everything that came in.</p>;
  }

  return (
    <ul className="divide-y divide-line">
      {leads.map((lead) => {
        const decision = decisions[lead.id];
        return (
          <li key={lead.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">
                  {lead.jobType} in {lead.postcode}
                </p>
                <p className="text-sm text-slate">
                  {lead.name}, {lead.timing.toLowerCase()}, budget {lead.budget}
                </p>
                {lead.note ? <p className="mt-1 text-sm">Why it&apos;s here: {lead.note}</p> : null}
              </div>

              {decision ? (
                <p className="flex items-center gap-3 text-sm" role="status">
                  <span className="font-medium">
                    {decision === "Sent" ? `Sent to ${contractorName}` : "Rejected"}
                  </span>
                  <button
                    type="button"
                    className="text-slate underline underline-offset-2"
                    onClick={() =>
                      setDecisions((d) => {
                        const next = { ...d };
                        delete next[lead.id];
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
                    className="min-h-11 rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink"
                    onClick={() => setDecisions((d) => ({ ...d, [lead.id]: "Sent" }))}
                  >
                    Send to {contractorName}
                  </button>
                  <button
                    type="button"
                    className="min-h-11 rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink"
                    onClick={() => setDecisions((d) => ({ ...d, [lead.id]: "Rejected" }))}
                  >
                    Reject
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
