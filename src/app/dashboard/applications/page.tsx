import Link from "next/link";
import { ApplicationReview } from "@/components/application-review";
import { Badge, DemoNotice, PageHeader, buttonSecondary } from "@/components/ui";
import { applications } from "@/lib/recruitment";

export const metadata = { title: "Applications | Lead desk" };

const tone = { New: "sand", Approved: "moss", Active: "moss", Declined: "clay" } as const;

export default function ApplicationsPage() {
  const fresh = applications.filter((a) => a.status === "New");
  const others = applications.filter((a) => a.status !== "New");

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Applications"
          intro="Detailers who answered the recruitment ads. Check their reviews, then approve or decline. Approved detailers get a welcome text with the terms."
        />
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/adverts" className={buttonSecondary}>
            Recruitment ads
          </Link>
          <Link href="/dashboard/research" className={buttonSecondary}>
            Research an area
          </Link>
        </div>
      </div>
      <DemoNotice>
        Demo applications. &ldquo;Check their Google reviews&rdquo; is real and uses one of your 50 daily
        searches.
      </DemoNotice>

      <section className="rounded-lg border border-line bg-white p-5">
        <h2 className="mb-4 font-display text-lg font-semibold">
          To review <span className="text-slate">{fresh.length}</span>
        </h2>
        <ApplicationReview applications={fresh} />
      </section>

      {others.length > 0 ? (
        <section className="mt-6 rounded-lg border border-line bg-white p-5">
          <h2 className="mb-3 font-display text-lg font-semibold">Decided</h2>
          <ul className="divide-y divide-line text-sm">
            {others.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
                <span>
                  <span className="font-medium">{a.business}</span>
                  <span className="text-slate">
                    , {a.town}. {a.services.join(", ")}
                  </span>
                </span>
                <Badge tone={tone[a.status]}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-8 max-w-3xl text-sm">
        <h2 className="font-display text-lg font-semibold">What to check before approving</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate">
          <li>They offer what the homeowner ads sell: coating and paint correction.</li>
          <li>Real reviews, ideally 4.5 stars or more, and photos of their own work.</li>
          <li>Their area isn&apos;t already covered by another detailer.</li>
          <li>They can take on the extra work they say they can.</li>
        </ul>
      </section>
    </div>
  );
}
