"use client";

import { useState } from "react";
import type { Approval } from "@/lib/demo-data";

type Decision = "Approved" | "Rejected";

export function ApprovalBatch({ approvals }: { approvals: Approval[] }) {
  const routine = approvals.filter((a) => a.routine);
  const decisionsNeeded = approvals.filter((a) => !a.routine);

  const [ticked, setTicked] = useState<Set<string>>(() => new Set(routine.map((a) => a.id)));
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const undecidedRoutine = routine.filter((a) => !decisions[a.id]);
  const tickedCount = undecidedRoutine.filter((a) => ticked.has(a.id)).length;

  function decide(id: string, decision: Decision) {
    setDecisions((d) => ({ ...d, [id]: decision }));
  }

  function approveTicked() {
    setDecisions((d) => {
      const next = { ...d };
      for (const a of undecidedRoutine) {
        if (ticked.has(a.id)) next[a.id] = "Approved";
      }
      return next;
    });
  }

  function undo(id: string) {
    setDecisions((d) => {
      const next = { ...d };
      delete next[id];
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {routine.length > 0 ? (
        <div>
          <h3 className="font-semibold">Routine</h3>
          <p className="text-sm text-slate">Ticked by default. Untick anything you&apos;re not happy with.</p>
          <ul className="mt-3 space-y-2">
            {routine.map((a) => (
              <li key={a.id} className="rounded-md border border-line px-3 py-2.5">
                {decisions[a.id] ? (
                  <Decided approval={a} decision={decisions[a.id]} onUndo={() => undo(a.id)} />
                ) : (
                  <label className="flex cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 shrink-0 accent-[#47653a]"
                      checked={ticked.has(a.id)}
                      onChange={(e) =>
                        setTicked((t) => {
                          const next = new Set(t);
                          if (e.target.checked) next.add(a.id);
                          else next.delete(a.id);
                          return next;
                        })
                      }
                    />
                    <span>
                      <span className="font-medium">{a.action}</span>
                      <span className="block text-sm text-slate">
                        {a.from}: {a.reason}
                      </span>
                    </span>
                  </label>
                )}
              </li>
            ))}
          </ul>
          {undecidedRoutine.length > 0 ? (
            <button
              type="button"
              disabled={tickedCount === 0}
              onClick={approveTicked}
              className="mt-3 min-h-11 rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Approve {tickedCount} ticked
            </button>
          ) : null}
        </div>
      ) : null}

      {decisionsNeeded.length > 0 ? (
        <div>
          <h3 className="font-semibold">Needs your decision</h3>
          <p className="text-sm text-slate">Anything involving money or ad spend is never pre-ticked.</p>
          <ul className="mt-3 space-y-2">
            {decisionsNeeded.map((a) => (
              <li key={a.id} className="rounded-md border border-sand bg-sand-soft/40 px-3 py-3">
                {decisions[a.id] ? (
                  <Decided approval={a} decision={decisions[a.id]} onUndo={() => undo(a.id)} />
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium">{a.action}</p>
                      <p className="text-sm text-slate">
                        {a.from} ({a.kind.toLowerCase()}): {a.reason}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => decide(a.id, "Approved")}
                        className="min-h-11 rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(a.id, "Rejected")}
                        className="min-h-11 rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Decided({
  approval,
  decision,
  onUndo,
}: {
  approval: Approval;
  decision: Decision;
  onUndo: () => void;
}) {
  return (
    <p className="flex flex-wrap items-center gap-3 text-sm" role="status">
      <span className={decision === "Approved" ? "font-medium text-moss" : "font-medium text-clay-red"}>
        {decision}
      </span>
      <span className="text-slate">{approval.action}</span>
      <button type="button" onClick={onUndo} className="text-slate underline underline-offset-2">
        Undo
      </button>
    </p>
  );
}
