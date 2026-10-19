"use client";

import Link from "next/link";
import { useState } from "react";

type Example = {
  slug: string;
  label: string;
  who: string;
  rows: { label: string; value: string }[];
  note: string;
};

const examples: Example[] = [
  {
    slug: "car-detailing",
    label: "Car detailing",
    who: "Sarah in Maidstone",
    rows: [
      { label: "Wants", value: "Ceramic coating" },
      { label: "Car", value: "BMW" },
      { label: "Paint", value: "Some swirls and light scratches" },
      { label: "Where", value: "At home, on the drive" },
      { label: "When", value: "This month" },
    ],
    note: "Enough to price the job before you call.",
  },
  {
    slug: "landscaping",
    label: "Landscaping and patios",
    who: "James in Tonbridge",
    rows: [
      { label: "Wants", value: "New porcelain patio" },
      { label: "Garden", value: "Back garden, slight slope" },
      { label: "Also", value: "Steps and a raised border" },
      { label: "Budget", value: "Has one in mind, wants a visit" },
      { label: "When", value: "Before the summer" },
    ],
    note: "Enough to know it's worth a visit.",
  },
];

export function TradeTabs() {
  const [active, setActive] = useState(0);
  const ex = examples[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div>
        <div role="tablist" aria-label="Trades" className="flex flex-wrap gap-2">
          {examples.map((e, i) => (
            <button
              key={e.slug}
              role="tab"
              id={`tab-${e.slug}`}
              aria-selected={i === active}
              aria-controls={`panel-${e.slug}`}
              onClick={() => setActive(i)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium ${
                i === active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
              }`}
            >
              {e.label}
            </button>
          ))}
          <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-line px-4 text-sm text-slate">
            More trades soon
          </span>
        </div>
        <p className="mt-6 max-w-md text-lg text-slate">
          Every enquiry arrives with the details that matter for your trade, filled in by the customer and
          checked by us. {ex.note}
        </p>
        <Link
          href={`/join/${ex.slug}`}
          className="mt-6 inline-flex min-h-11 items-center rounded-md border border-ink px-5 font-medium hover:bg-ink hover:text-white"
        >
          Apply as a {ex.label === "Car detailing" ? "detailer" : "landscaper"}
        </Link>
      </div>

      <div
        role="tabpanel"
        id={`panel-${ex.slug}`}
        aria-labelledby={`tab-${ex.slug}`}
        className="rounded-2xl border-2 border-ink bg-white p-6 sm:p-8"
      >
        <p className="text-sm font-medium text-slate">New enquiry, just for you</p>
        <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{ex.who}</p>
        <dl className="mt-6 divide-y divide-line">
          {ex.rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-6 py-3">
              <dt className="text-slate">{r.label}</dt>
              <dd className="text-right font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 flex items-center gap-2 rounded-lg bg-moss-soft px-4 py-3 text-sm text-[#2f4a24]">
          <span aria-hidden="true">✓</span>
          Checked: real contact details, in your area, sent to you alone
        </p>
      </div>
    </div>
  );
}
