import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { adDrafts, recruitTargeting } from "@/lib/recruitment";

export const metadata = { title: "Adverts | Lead desk" };

const statusTone = { Draft: "neutral", Ready: "sand", Live: "moss", Paused: "clay" } as const;

export default function AdvertsPage() {
  const recruiting = adDrafts.filter((a) => a.audience === "Tradespeople");

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Adverts"
        intro="Ads do the finding now. First, ads to recruit detailers to /join; once a detailer is signed up, ads to homeowners point at their landing page."
      />

      <section className="mb-10 grid gap-4 rounded-lg border border-line bg-white p-5 text-sm md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl font-semibold">Recruiting detailers: how to run it</h2>
        </div>
        <Fact label="Where" value={recruitTargeting.platform} />
        <Fact label="Location" value={recruitTargeting.location} />
        <Fact label="Who" value={recruitTargeting.audience} />
        <Fact label="Budget" value={recruitTargeting.budget} />
        <Fact label="What counts" value={recruitTargeting.goal} />
        <Fact label="Watch out" value={recruitTargeting.note} />
      </section>

      <h2 className="font-display text-2xl font-semibold">Recruitment ads</h2>
      <p className="mb-4 text-slate">
        Each has an image to upload and the text to paste. They all link to the application page.
      </p>

      <ul className="grid gap-6 lg:grid-cols-3">
        {recruiting.map((ad) => (
          <li key={ad.id} className="flex flex-col rounded-lg border border-line bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <p className="font-semibold">
                {ad.id}: {ad.angle}
              </p>
              <Badge tone={statusTone[ad.status]}>{ad.status}</Badge>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ad.image}
              alt={`${ad.imageHeadline} ${ad.imageSub}`}
              width={1080}
              height={1080}
              className="aspect-square w-full"
            />

            <div className="flex flex-1 flex-col gap-3 p-4 text-sm">
              <div>
                <p className="font-medium text-slate">Primary text</p>
                <p className="mt-1 whitespace-pre-line">{ad.primaryText}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-medium text-slate">Headline</p>
                  <p className="mt-1">{ad.headline}</p>
                </div>
                <div>
                  <p className="font-medium text-slate">Button</p>
                  <p className="mt-1">{ad.cta}</p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <a
                  href={ad.image}
                  download
                  className="inline-flex min-h-10 items-center rounded-md border border-line px-3 font-medium hover:border-ink"
                >
                  Download image
                </a>
                <Link
                  href={ad.link}
                  className="inline-flex min-h-10 items-center rounded-md border border-line px-3 font-medium hover:border-ink"
                >
                  Open the page it links to
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">Homeowner ads</h2>
        <p className="mt-1 text-slate">
          These come once a detailer has signed up for an area. They point at that area&apos;s landing page
          and name the detailer in the consent wording. The Marketer will draft them from the detailer&apos;s
          application.
        </p>
        <Link href="/dashboard/pages" className="mt-3 inline-block text-sm underline underline-offset-2">
          See the landing pages
        </Link>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-slate">{value}</p>
    </div>
  );
}
