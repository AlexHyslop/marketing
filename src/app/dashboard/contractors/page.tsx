import { Badge, DemoNotice, PageHeader, statusTone } from "@/components/ui";
import { contractors } from "@/lib/demo-data";

export const metadata = { title: "Contractors | Lead desk" };

export default function ContractorsPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Contractors"
        intro="Landscapers who buy leads, and the terms agreed with each. Agents follow these terms exactly, so nothing is sent until they're signed."
      />
      <DemoNotice />

      <div className="space-y-6">
        {contractors.map((c) => (
          <article key={c.id} className="rounded-lg border border-line bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
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

            <dl className="mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <Term label="Jobs they want" value={c.jobTypes} />
              <Term label="Areas covered" value={c.areas} />
              <Term label="Price per qualified lead" value={c.pricePerLead} />
              <Term label="Weekly cap" value={`${c.weeklyCap} leads`} />
              <Term label="How leads are delivered" value={c.delivery} />
              <Term label="Time to dispute a lead" value={c.disputeWindow} />
              <Term label="Payment" value={c.payment} />
            </dl>
          </article>
        ))}

        <section className="rounded-lg border border-dashed border-line p-6 text-sm">
          <h2 className="font-display text-lg font-semibold">What every contract needs</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate">
            <li>A checkable definition of a qualified lead: area, job type, valid contact details, consent.</li>
            <li>Exclusivity, and how quickly they must try to contact the homeowner.</li>
            <li>Price, payment terms and whether VAT applies.</li>
            <li>How long they have to dispute a lead and what counts as a valid dispute.</li>
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
