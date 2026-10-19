"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/public/photo";
import { photos, type PhotoKey } from "@/lib/photos";

type Example = {
  slug: string;
  label: string;
  noun: string;
  who: string;
  rows: { label: string; value: string }[];
  photo: PhotoKey;
};

// Example enquiries across trades. No numbers, by design.
const examples: Example[] = [
  {
    slug: "plumbing",
    label: "Plumbing",
    noun: "plumber",
    who: "Sarah in Maidstone",
    rows: [
      { label: "Wants", value: "Leaking kitchen tap fixed, boiler looked at" },
      { label: "Home", value: "Semi-detached house" },
      { label: "When", value: "This week if possible" },
      { label: "Best time", value: "Evenings" },
    ],
    photo: "plumbing",
  },
  {
    slug: "electrical",
    label: "Electrical",
    noun: "electrician",
    who: "Priya in Ashford",
    rows: [
      { label: "Wants", value: "New consumer unit and extra sockets" },
      { label: "Home", value: "Older terrace, mid-renovation" },
      { label: "When", value: "Before the kitchen goes in" },
      { label: "Best time", value: "Weekdays" },
    ],
    photo: "electrical",
  },
  {
    slug: "roofing",
    label: "Roofing",
    noun: "roofer",
    who: "Mark in Canterbury",
    rows: [
      { label: "Wants", value: "Slipped tiles replaced, gutter checked" },
      { label: "Home", value: "Bungalow" },
      { label: "When", value: "Before the bad weather" },
      { label: "Best time", value: "Any time" },
    ],
    photo: "roofing",
  },
  {
    slug: "decorating",
    label: "Decorating",
    noun: "decorator",
    who: "Hannah in Sevenoaks",
    rows: [
      { label: "Wants", value: "Hallway, stairs and landing repainted" },
      { label: "Home", value: "Empty while they move in" },
      { label: "When", value: "Flexible" },
      { label: "Best time", value: "Mornings" },
    ],
    photo: "painting",
  },
  {
    slug: "landscaping",
    label: "Landscaping",
    noun: "landscaper",
    who: "James in Tonbridge",
    rows: [
      { label: "Wants", value: "New porcelain patio and steps" },
      { label: "Garden", value: "Back garden, slight slope" },
      { label: "When", value: "Before the summer" },
      { label: "Best time", value: "Weekends" },
    ],
    photo: "finishedPatio",
  },
  {
    slug: "car-detailing",
    label: "Car detailing",
    noun: "detailer",
    who: "Tom in Gillingham",
    rows: [
      { label: "Wants", value: "Ceramic coating" },
      { label: "Car", value: "Nearly new, some swirls" },
      { label: "Where", value: "At home, on the drive" },
      { label: "Best time", value: "Evenings" },
    ],
    photo: "polishing",
  },
];

export function TradeTabs() {
  const [active, setActive] = useState(0);
  const ex = examples[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Example enquiries by trade"
        className="-mx-4 flex gap-x-7 overflow-x-auto border-b-2 border-ink px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {examples.map((e, i) => (
          <button
            key={e.slug}
            role="tab"
            id={`tab-${e.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${e.slug}`}
            onClick={() => setActive(i)}
            className={`-mb-[2px] min-h-11 shrink-0 border-b-4 text-lg font-semibold ${
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
          <p className="mt-6 max-w-xl text-lg">
            The customer fills this in. We check the number works and they&apos;re in your area, then text it to
            you and nobody else. Enough to know whether it&apos;s worth your time before you ring.
          </p>
        </div>
        <div className="lg:pt-2">
          <div className="aspect-[3/2] overflow-hidden rounded-md border-2 border-ink">
            <Photo photo={photos[ex.photo]} width={600} height={400} sizes="(min-width: 1024px) 420px, 100vw" />
          </div>
          <Link href={`/join/${ex.slug}`} className="mt-5 inline-block font-medium underline underline-offset-4">
            Apply as a {ex.noun}
          </Link>
        </div>
      </div>
    </div>
  );
}
