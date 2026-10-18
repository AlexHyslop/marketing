import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { OPERATOR, landingPages, launchChecks } from "@/lib/landing-pages";

export const metadata = { title: "Landing pages | Lead desk" };

const statusTone = {
  Draft: "neutral",
  "Ready to launch": "sand",
  Live: "moss",
} as const;

export default function LandingPagesScreen() {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Landing pages"
        intro="One page per trade and area, all built from the same template. Homeowners see a local business page; the privacy notice and consent wording say exactly who receives their details."
      />

      <ul className="space-y-5">
        {landingPages.map((page) => {
          const checks = launchChecks(page);
          const passed = checks.filter((c) => c.ok).length;
          return (
            <li key={page.slug} className="rounded-lg border border-line bg-white">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-5">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-10 w-10 shrink-0 rounded-md border border-line"
                    style={{
                      background: `linear-gradient(135deg, ${page.theme.bg} 50%, ${page.theme.accent} 50%)`,
                    }}
                  />
                  <div>
                    <h2 className="font-display text-xl font-semibold">{page.trade}</h2>
                    <p className="text-sm text-slate">
                      {page.area}, shown as{" "}
                      <span className="font-medium text-ink">{page.brand.name}</span>
                      {page.brand.mode === "partner" ? " (the partner's own name)" : ` (a local brand run by ${OPERATOR})`}
                    </p>
                    <p className="text-sm text-slate">
                      Enquiries go to:{" "}
                      {page.partner ? (
                        <span className="font-medium text-ink">{page.partner}</span>
                      ) : (
                        <span className="font-medium text-clay-red">no partner yet</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={statusTone[page.status]}>{page.status}</Badge>
                  <Link
                    href={`/q/${page.slug}`}
                    className="inline-flex min-h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink"
                  >
                    Open page
                  </Link>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-sm font-semibold">
                  Before it goes live: {passed} of {checks.length} done
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {checks.map((c) => (
                    <li key={c.label} className="flex gap-2">
                      <span aria-hidden="true" className={c.ok ? "text-moss" : "text-clay-red"}>
                        {c.ok ? "✓" : "✗"}
                      </span>
                      <span>
                        {c.label}
                        {c.ok ? null : <span className="text-slate">: {c.fix}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">How a new page gets made</h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              1
            </span>
            <p>
              <span className="font-semibold">You pick a trade and area</span> and sign a partner on the
              phone. Their answers in call mode (jobs they want, typical job value, how fast they reply)
              are the raw material.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              2
            </span>
            <p>
              <span className="font-semibold">The Marketer drafts the page:</span> headline, services, form
              questions, FAQs and colours, as one entry in the page list. It only uses facts from the call
              notes.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              3
            </span>
            <p>
              <span className="font-semibold">The launch checks run:</span> a named partner, consent that
              names them, a privacy notice, and no claims the partner hasn&apos;t confirmed.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              4
            </span>
            <p>
              <span className="font-semibold">You and the partner approve it,</span> then it goes live and
              ads can point at it.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
