"use client";

import Link from "next/link";
import { useState } from "react";
import type { CallStatus, Prospect } from "@/lib/demo-data";

type Script = { opening: string; questions: string[]; pitch: string };

type Outcome = Exclude<CallStatus, "Not called">;

const outcomes: { value: Outcome; hint: string }[] = [
  { value: "Interested", hint: "Wants to hear the terms" },
  { value: "Trial agreed", hint: "Agreed to a small paid trial" },
  { value: "Call back", hint: "Asked you to ring later" },
  { value: "No answer", hint: "Try again tomorrow" },
  { value: "Not interested", hint: "Check back in a few months" },
];

const nextDates = ["Tomorrow", "In 2 days", "Next week", "In a month", "No follow-up"];

type Logged = {
  prospect: Prospect;
  outcome: Outcome;
  notes: string;
  next: string;
  wants: string;
  jobValue: string;
};

export function CallSession({ queue, script }: { queue: Prospect[]; script: Script }) {
  const [index, setIndex] = useState(0);
  const [asked, setAsked] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState("");
  const [wants, setWants] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [next, setNext] = useState(nextDates[0]);
  const [log, setLog] = useState<Logged[]>([]);

  const current = queue[index];

  function record(outcome: Outcome) {
    setLog((l) => [...l, { prospect: current, outcome, notes, next, wants, jobValue }]);
    setIndex((i) => i + 1);
    setAsked(new Set());
    setNotes("");
    setWants("");
    setJobValue("");
    setNext(nextDates[0]);
  }

  if (!current) {
    return (
      <div className="max-w-2xl rounded-lg border border-line bg-white p-6">
        <h2 className="font-display text-2xl font-semibold">That&apos;s today&apos;s calls done</h2>
        {log.length > 0 ? (
          <ul className="mt-4 divide-y divide-line">
            {log.map((entry) => (
              <li key={entry.prospect.id} className="py-3">
                <p className="font-medium">
                  {entry.prospect.business}: {entry.outcome}
                </p>
                <p className="text-sm text-slate">
                  Next: {entry.next}
                  {entry.wants ? `. Wants: ${entry.wants}` : ""}
                  {entry.jobValue ? `. Typical job: ${entry.jobValue}` : ""}
                  {entry.notes ? `. Notes: ${entry.notes}` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-slate">You skipped every call in the list.</p>
        )}
        <p className="mt-4 text-sm text-slate">
          In the real version each outcome is saved to the call list as you go.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex min-h-11 items-center rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink"
        >
          Back to Today
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <section aria-labelledby="who" className="rounded-lg border border-line bg-white p-5">
        <p className="text-sm text-slate">
          Call {index + 1} of {queue.length}
        </p>
        <h2 id="who" className="mt-1 font-display text-2xl font-semibold">
          {current.business}
        </h2>
        <p className="text-slate">
          {current.contact === "Unknown" ? "Ask who you're speaking to" : `Ask for ${current.contact}`},{" "}
          {current.area}
        </p>

        <a
          href={`tel:${current.phone.replace(/\s/g, "")}`}
          className="mt-4 flex min-h-12 items-center justify-center rounded-md bg-ink px-4 font-display text-xl font-semibold tracking-wide text-white"
        >
          {current.phone}
        </a>

        {!current.tpsChecked ? (
          <p className="mt-3 rounded-md bg-clay-soft px-3 py-2 text-sm text-[#8a3524]">
            This number hasn&apos;t been screened against the TPS/CTPS registers. Check it before calling.
          </p>
        ) : null}

        <h3 className="mt-5 text-sm font-semibold">Brief</h3>
        <p className="text-sm">{current.brief}</p>
        <p className="mt-1 text-sm text-slate">Services: {current.services}</p>

        {current.notes || current.wants ? (
          <>
            <h3 className="mt-4 text-sm font-semibold">From last time</h3>
            {current.wants ? <p className="text-sm">Wants: {current.wants}</p> : null}
            {current.typicalJob ? <p className="text-sm">Typical job: {current.typicalJob}</p> : null}
            {current.notes ? <p className="text-sm">{current.notes}</p> : null}
          </>
        ) : null}

        <p className="mt-4 text-sm">
          <span className="font-semibold">Why you&apos;re calling: </span>
          {current.nextStep}
        </p>
      </section>

      <section aria-label="Script and outcome" className="space-y-5">
        <div className="rounded-lg border border-line bg-white p-5">
          <h3 className="font-semibold">Opening</h3>
          <p className="mt-1">{script.opening}</p>

          <h3 className="mt-5 font-semibold">Ask</h3>
          <ul className="mt-2 space-y-1.5">
            {script.questions.map((q, i) => (
              <li key={q}>
                <label className="flex min-h-9 cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 shrink-0 accent-[#47653a]"
                    checked={asked.has(i)}
                    onChange={(e) =>
                      setAsked((a) => {
                        const nextSet = new Set(a);
                        if (e.target.checked) nextSet.add(i);
                        else nextSet.delete(i);
                        return nextSet;
                      })
                    }
                  />
                  <span className={asked.has(i) ? "text-slate line-through" : ""}>{q}</span>
                </label>
              </li>
            ))}
          </ul>

          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-semibold">If they ask how it works</summary>
            <p className="mt-1">{script.pitch}</p>
          </details>
        </div>

        <div className="rounded-lg border border-line bg-white p-5">
          <h3 className="font-semibold">What you learned</h3>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="wants" className="text-sm font-medium">
                Jobs they want
              </label>
              <input
                id="wants"
                value={wants}
                onChange={(e) => setWants(e.target.value)}
                placeholder={current.wants ?? "e.g. patios over 20m²"}
                className="mt-1 w-full rounded-md border border-line bg-stone px-3 py-2 text-base"
              />
            </div>
            <div>
              <label htmlFor="jobValue" className="text-sm font-medium">
                Typical job value
              </label>
              <input
                id="jobValue"
                value={jobValue}
                onChange={(e) => setJobValue(e.target.value)}
                placeholder={current.typicalJob ?? "e.g. £6k–£12k"}
                className="mt-1 w-full rounded-md border border-line bg-stone px-3 py-2 text-base"
              />
            </div>
          </div>

          <label htmlFor="notes" className="mt-3 block text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Where their work comes from, objections, anything else"
            className="mt-1 w-full rounded-md border border-line bg-stone px-3 py-2 text-base"
          />
        </div>
      </section>

      <div className="sticky bottom-0 z-10 -mx-4 border-t border-line bg-white/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:col-span-2 lg:-mx-12 lg:px-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold">How did it go?</span>
          {outcomes.map((o) => (
            <button
              key={o.value}
              type="button"
              title={o.hint}
              onClick={() => record(o.value)}
              className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-medium hover:border-ink"
            >
              {o.value}
            </button>
          ))}
          <label className="ml-auto flex items-center gap-2 text-sm">
            Follow up
            <select
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="min-h-11 rounded-md border border-line bg-white px-2 text-sm"
            >
              {nextDates.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="min-h-11 px-2 text-sm text-slate underline underline-offset-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
