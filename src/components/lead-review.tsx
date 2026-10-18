"use client";

import { useState } from "react";
import { reviewMode, waitingLabel, type Lead } from "@/lib/demo-data";

type Decision = "Send" | "Reject";

// Leads waiting longer than this are flagged: homeowners go cold fast.
const SLOW_MINUTES = 60;

export function LeadReview({ leads, contractorName }: { leads: Lead[]; contractorName: string }) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const decided = leads.filter((l) => decisions[l.id]);
  const agreedNow = decided.filter((l) => decisions[l.id] === l.rulesSuggest).length;
  const agreed = reviewMode.agreed + agreedNow;
  const checked = Math.min(reviewMode.window, decided.length);

  if (leads.length === 0) {
    return <p className="text-slate">No leads waiting.</p>;
  }

  return (
    <div>
      <div className="mb-4 rounded-md bg-stone px-3 py-2.5 text-sm">
        <p>
          <span className="font-semibold">You&apos;re checking every lead</span> until the rules have
          matched your decision {reviewMode.needed} times out of {reviewMode.window}. Then clear-cut
          leads send themselves and only the unclear ones come here.
        </p>
        <p className="mt-1 text-slate" role="status">
          Matched so far: {agreed} of {checked > 0 ? checked : 0} checked.
        </p>
      </div>

      <ul className="divide-y divide-line">
        {leads.map((lead) => {
          const decision = decisions[lead.id];
          const slow = (lead.waitingMinutes ?? 0) > SLOW_MINUTES;
          return (
            <li key={lead.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">
                    {lead.jobType} in {lead.postcode}
                    <span className={`ml-2 text-sm font-normal ${slow ? "text-clay-red" : "text-slate"}`}>
                      {waitingLabel(lead.waitingMinutes)}
                    </span>
                  </p>
                  <p className="text-sm text-slate">
                    {lead.name}, {lead.timing.toLowerCase()}, budget {lead.budget}
                  </p>
                  {lead.rulesSuggest ? (
                    <p className="mt-1 text-sm">
                      Rules would{" "}
                      <span className="font-semibold">
                        {lead.rulesSuggest === "Send" ? "send it" : "reject it"}
                      </span>
                      {lead.note ? `: ${lead.note}` : "."}
                    </p>
                  ) : null}
                </div>

                {decision ? (
                  <p className="flex items-center gap-3 text-sm" role="status">
                    <span className="font-medium">
                      {decision === "Send" ? `Sent to ${contractorName}` : "Rejected"}
                    </span>
                    {lead.rulesSuggest ? (
                      <span className={decision === lead.rulesSuggest ? "text-moss" : "text-clay-red"}>
                        {decision === lead.rulesSuggest ? "Matches the rules" : "Rules disagreed"}
                      </span>
                    ) : null}
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
                      onClick={() => setDecisions((d) => ({ ...d, [lead.id]: "Send" }))}
                    >
                      Send to {contractorName}
                    </button>
                    <button
                      type="button"
                      className="min-h-11 rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink"
                      onClick={() => setDecisions((d) => ({ ...d, [lead.id]: "Reject" }))}
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
    </div>
  );
}
