import { Badge, DemoNotice, PageHeader, statusTone } from "@/components/ui";
import {
  contractors,
  creditBalance,
  creditPack,
  freeSamples,
  lowCreditWarning,
  samplesUsed,
} from "@/lib/demo-data";

export const metadata = { title: "Contractors | Lead desk" };

export default function ContractorsPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Contractors"
        intro={`Landscapers who buy leads, the terms agreed with each, and their credits. New contractors get ${freeSamples} free sample leads, then buy ${creditPack.leads} leads for £${creditPack.price}. Each lead sent uses one credit, and leads stop at zero.`}
      />
      <DemoNotice />

      <div className="space-y-6">
        {contractors.map((c) => {
          const balance = creditBalance(c);
          const used = samplesUsed(c);
          const low = balance <= lowCreditWarning;
          return (
            <article key={c.id} className="rounded-lg border border-line bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{c.business}</h2>
                  <p className="text-slate">Contact: {c.contact}</p>
                </div>
                <div className="flex gap-2">
                  <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                  {c.termsSigned ? (
                    <Badge tone="moss">Terms signed</Badge>
                  ) : (
                    <Badge tone="clay">Not signed: no leads yet</Badge>
                  )}
                </div>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-[220px_minmax(0,1fr)]">
                <div>
                  <p className="text-sm text-slate">Credits left</p>
                  <p
                    className={`font-display text-5xl font-semibold leading-none ${
                      low ? "text-clay-red" : "text-ink"
                    }`}
                  >
                    {balance}
                  </p>
                  <p className="mt-2 text-sm">
                    {balance === 0
                      ? "Leads are paused until they top up."
                      : low
                        ? "Last credit. A top-up call is on your list."
                        : `Enough for ${balance} more leads.`}
                  </p>
                  <p className="mt-3 text-sm text-slate">
                    Free samples used: {used} of {freeSamples}
                  </p>
                  <button
                    type="button"
                    disabled
                    className="mt-4 min-h-11 rounded-md border border-line bg-white px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Record a top-up
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Credit history</h3>
                  <ol className="mt-2 divide-y divide-line text-sm">
                    {c.ledger
                      .slice()
                      .reverse()
                      .map((entry, i) => (
                        <li key={`${entry.date}-${i}`} className="flex items-baseline justify-between gap-4 py-2">
                          <span>
                            <span className="text-slate">{entry.date}: </span>
                            {entry.what}
                          </span>
                          <span
                            className={`shrink-0 font-medium ${
                              entry.sample ? "text-slate" : entry.change > 0 ? "text-moss" : "text-ink"
                            }`}
                          >
                            {entry.sample ? "Free" : entry.change > 0 ? `+${entry.change}` : entry.change}
                          </span>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>

              <dl className="grid gap-x-8 gap-y-4 border-t border-line p-6 text-sm sm:grid-cols-2">
                <Term label="Jobs they want" value={c.jobTypes} />
                <Term label="Areas covered" value={c.areas} />
                <Term label="Price" value={`${c.pricePerLead} per lead (${c.payment})`} />
                <Term label="Weekly cap" value={`${c.weeklyCap} leads`} />
                <Term label="How leads are delivered" value={c.delivery} />
                <Term label="Time to dispute a lead" value={c.disputeWindow} />
              </dl>
            </article>
          );
        })}

        <section className="rounded-lg border border-dashed border-line p-6 text-sm">
          <h2 className="font-display text-lg font-semibold">What every contract needs</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate">
            <li>A checkable definition of a qualified lead: area, job type, valid contact details, consent.</li>
            <li>Exclusivity, and how quickly they must try to contact the homeowner.</li>
            <li>
              {freeSamples} free sample leads, then prepaid packs of {creditPack.leads} for £{creditPack.price};
              whether VAT applies.
            </li>
            <li>How long they have to dispute a lead, what counts as valid, and that disputes are credited back.</li>
            <li>No guarantee of jobs or revenue.</li>
            <li>Who is responsible for the homeowner&apos;s data once it&apos;s shared.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Term({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
