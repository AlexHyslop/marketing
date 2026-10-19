"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/public/photo";
import { photos, type Photo as PhotoData } from "@/lib/photos";

type Example = {
  slug: string;
  label: string;
  noun: string;
  who: string;
  rows: { label: string; value: string }[];
  note: string;
  photo: PhotoData;
};

const examples: Example[] = [
  {
    slug: "car-detailing",
    label: "Car detailing",
    noun: "detailer",
    who: "Sarah in Maidstone",
    rows: [
      { label: "Wants", value: "Ceramic coating" },
      { label: "Car", value: "BMW" },
      { label: "Paint", value: "Some swirls and light scratches" },
      { label: "Where", value: "At home, on the drive" },
      { label: "When", value: "This month" },
    ],
    note: "Enough to price the job before you ring.",
    photo: photos.polishing,
  },
  {
    slug: "landscaping",
    label: "Landscaping and patios",
    noun: "landscaper",
    who: "James in Tonbridge",
    rows: [
      { label: "Wants", value: "New porcelain patio" },
      { label: "Garden", value: "Back garden, slight slope" },
      { label: "Also", value: "Steps and a raised border" },
      { label: "Budget", value: "Has one in mind, wants a visit" },
      { label: "When", value: "Before the summer" },
    ],
    note: "Enough to know it's worth a visit.",
    photo: photos.finishedPatio,
  },
];

export function TradeTabs() {
  const [active, setActive] = useState(0);
  const ex = examples[active];

  return (
    <div>
      <div role="tablist" aria-label="Trades" className="flex flex-wrap gap-x-8 border-b-2 border-ink">
        {examples.map((e, i) => (
          <button
            key={e.slug}
            role="tab"
            id={`tab-${e.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${e.slug}`}
            onClick={() => setActive(i)}
            className={`-mb-[2px] min-h-11 border-b-4 text-lg font-semibold ${
              i === active ? "border-moss text-ink" : "border-transparent text-slate hover:text-ink"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${ex.slug}`}
        aria-labelledby={`tab-${ex.slug}`}
        className="grid gap-10 pt-8 lg:grid-cols-[1.3fr_1fr]"
      >
        <div>
          <p className="headline text-4xl">{ex.who}</p>
          <dl className="mt-5">
            {ex.rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ink/20 py-3">
                <dt className="text-slate">{r.label}</dt>
                <dd className="font-medium">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:pt-2">
          <div className="mb-6 aspect-[3/2] overflow-hidden rounded-md border-2 border-ink">
            <Photo photo={ex.photo} width={600} height={400} sizes="(min-width: 1024px) 420px, 100vw" />
          </div>
          <p className="text-lg">
            The customer fills this in. We check the number works and they&apos;re in your area, then text it to
            you and nobody else. {ex.note}
          </p>
          <Link href={`/join/${ex.slug}`} className="mt-6 inline-block font-medium underline underline-offset-4">
            Apply as a {ex.noun}
          </Link>
          <p className="mt-6 text-sm text-slate">More trades to follow.</p>
        </div>
      </div>
    </div>
  );
}
