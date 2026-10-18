import { Badge, DemoNotice, PageHeader, statusTone } from "@/components/ui";
import {
  commissionOn,
  commissionSummary,
  contractors,
  leads,
  money,
  paymentTerms,
} from "@/lib/demo-data";

export const metadata = { title: "Contractors | Lead desk" };

const stageTone = {
  "Job booked": "neutral",
  "Ready to invoice": "sand",
  Invoiced: "sand",
  Paid: "moss",
} as const;

export default function ContractorsPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Contractors"
        intro={`Landscapers who receive your leads. They pay nothing for leads, only 10% of the final value of any job they win from one, invoiced when the job is finished and due ${paymentTerms}.`}
      />
      <DemoNotice />

      <div className="space-y-6">
        {contractors.map((c) => {
          const theirLeads = leads.filter((l) => l.assignedTo === c.business);
          const won = theirLeads.filter((l) => l.status === "Won");
          const quoted = theirLeads.filter((l) => l.status === "Quoted");
          const summary = commissionSummary(theirLeads);
          const owed = summary.invoiced + summary.readyToInvoice;
          const decided = theirLeads.filter((l) => l.status === "Won" || l.status === "Lost").length;

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

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-line p-6 sm:grid-cols-4">
                <Stat label="Leads sent" value={String(theirLeads.length)} />
                <Stat
                  label="Jobs won"
                  value={String(won.length)}
                  note={decided > 0 ? `${won.length} of ${decided} decided` : undefined}
                />
                <Stat label="Commission paid" value={money(summary.paid)} />
                <Stat label="Owed to you" value={money(owed)} note="Invoiced or ready to invoice" />
              </dl>

              <div className="p-6">
                <h3 className="font-semibold">Jobs and commission</h3>
                {won.length + quoted.length > 0 ? (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead>
                        <tr className="text-slate">
                          <th className="border-b border-line py-2 pr-4 font-medium">Lead</th>
                          <th className="border-b border-line py-2 pr-4 font-medium">Job value</th>
                          <th className="border-b border-line py-2 pr-4 font-medium">Your 10%</th>
                          <th className="border-b border-line py-2 font-medium">Where it&apos;s at</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...won, ...quoted].map((l) => (
                          <tr key={l.id}>
                            <td className="border-b border-line py-2.5 pr-4">
                              <p className="font-medium">{l.jobType}</p>
                              <p className="text-slate">
                                {l.id}, {l.postcode}
                              </p>
                            </td>
                            <td className="border-b border-line py-2.5 pr-4">
                              {l.jobValue ? money(l.jobValue) : "Not known"}
                              {l.status === "Quoted" ? <span className="text-slate"> quoted</span> : null}
                            </td>
                            <td className="border-b border-line py-2.5 pr-4 font-medium">
                              {l.jobValue ? money(commissionOn(l.jobValue)) : "–"}
                            </td>
                            <td className="border-b border-line py-2.5">
                              {l.commission ? (
                                <Badge tone={stageTone[l.commission]}>{l.commission}</Badge>
                              ) : (
                                <Badge tone="neutral">Waiting on homeowner</Badge>
                              )}
                              {l.note ? <p className="mt-1 text-slate">{l.note}</p> : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-2 text-slate">No quotes or wins reported yet.</p>
                )}
              </div>

              <dl className="grid gap-x-8 gap-y-4 border-t border-line p-6 text-sm sm:grid-cols-2">
                <Term label="Jobs they want" value={c.jobTypes} />
                <Term label="Areas covered" value={c.areas} />
                <Term label="Commission" value={`10% of the final job value, due ${paymentTerms}`} />
                <Term label="Weekly cap" value={`${c.weeklyCap} leads`} />
                <Term label="How leads are delivered" value={c.delivery} />
                <Term label="Reporting" value={c.reporting} />
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
              Commission of 10% on any job won from a lead you sent, including later jobs from the same
              enquiry, for a set period (for example 12 months).
            </li>
            <li>
              What &ldquo;job value&rdquo; means: the final amount invoiced to the homeowner, and whether
              that&apos;s before or after VAT.
            </li>
            <li>A duty to report quotes, wins and job values within 14 days, and when you can ask to see the invoice.</li>
            <li>Payment terms ({paymentTerms}) and whether VAT applies to your commission.</li>
            <li>No guarantee of jobs or revenue.</li>
            <li>Who is responsible for the homeowner&apos;s data once it&apos;s shared.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-sm text-slate">{label}</dt>
      <dd className="font-display text-2xl font-semibold">{value}</dd>
      {note ? <dd className="text-xs text-slate">{note}</dd> : null}
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
