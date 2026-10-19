import { Badge, DemoNotice, PageHeader, statusTone } from "@/components/ui";
import { contractors, disputeWindow, leadIncome, leads, money, paymentTerms, priceFor } from "@/lib/demo-data";

export const metadata = { title: "Partners | Lead desk" };

const billingTone = {
  "To invoice": "sand",
  Invoiced: "sand",
  Paid: "moss",
  "Credit requested": "clay",
  Credited: "neutral",
} as const;

export default function PartnersPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Partners"
        intro={`Tradespeople who receive your leads. Each pays a fixed price for every lead they get, agreed when you approve them, and invoiced monthly. Bad leads reported within ${disputeWindow} are credited.`}
      />
      <DemoNotice />

      <div className="space-y-6">
        {contractors.map((c) => {
          const theirLeads = leads.filter((l) => l.assignedTo === c.business && l.billing);
          const income = leadIncome(theirLeads);
          const owed = income.invoiced + income.toInvoice;

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
                    <Badge tone="moss">Terms agreed</Badge>
                  ) : (
                    <Badge tone="clay">Terms not agreed: no leads yet</Badge>
                  )}
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-line p-6 sm:grid-cols-4">
                <Stat label="Price per lead" value={money(c.pricePerLead)} />
                <Stat label="Leads sent" value={String(income.sent)} />
                <Stat label="Paid" value={money(income.paid)} />
                <Stat label="Owed to you" value={money(owed)} note="Invoiced or still to invoice" />
              </dl>

              <div className="p-6">
                <h3 className="font-semibold">Leads and charges</h3>
                {theirLeads.length > 0 ? (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead>
                        <tr className="text-slate">
                          <th className="border-b border-line py-2 pr-4 font-medium">Lead</th>
                          <th className="border-b border-line py-2 pr-4 font-medium">How it went</th>
                          <th className="border-b border-line py-2 pr-4 font-medium">Charge</th>
                          <th className="border-b border-line py-2 font-medium">Billing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {theirLeads.map((l) => {
                          const notCharged = l.billing === "Credited" || l.billing === "Credit requested";
                          return (
                            <tr key={l.id}>
                              <td className="border-b border-line py-2.5 pr-4">
                                <p className="font-medium">{l.jobType}</p>
                                <p className="text-slate">
                                  {l.id}, {l.received}
                                </p>
                              </td>
                              <td className="border-b border-line py-2.5 pr-4">
                                {l.status}
                                {l.note ? <p className="text-slate">{l.note}</p> : null}
                              </td>
                              <td
                                className={`border-b border-line py-2.5 pr-4 font-medium ${
                                  notCharged ? "text-slate line-through" : ""
                                }`}
                              >
                                {money(priceFor(l))}
                              </td>
                              <td className="border-b border-line py-2.5">
                                {l.billing ? <Badge tone={billingTone[l.billing]}>{l.billing}</Badge> : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-2 text-slate">No leads sent yet.</p>
                )}
              </div>

              <dl className="grid gap-x-8 gap-y-4 border-t border-line p-6 text-sm sm:grid-cols-2">
                <Term label="Jobs they want" value={c.jobTypes} />
                <Term label="Areas covered" value={c.areas} />
                <Term label="Price" value={`${money(c.pricePerLead)} per lead received, invoiced monthly, due ${paymentTerms}`} />
                <Term label="Most leads a week" value={String(c.weeklyCap)} />
                <Term label="How leads are delivered" value={c.delivery} />
                <Term label="Bad leads" value={`Credited if reported within ${disputeWindow}`} />
              </dl>
            </article>
          );
        })}

        <section className="rounded-lg border border-dashed border-line p-6 text-sm">
          <h2 className="font-display text-lg font-semibold">What every partner agrees to</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate">
            <li>A fixed price per lead, agreed before any leads are sent.</li>
            <li>What counts as a lead they pay for: in their area, for work they do, with working contact details.</li>
            <li>
              What counts as a bad lead (fake, wrong number, outside their area) and that it must be reported
              within {disputeWindow} to be credited.
            </li>
            <li>Leads are theirs alone; we never sell the same lead twice.</li>
            <li>Monthly invoicing, payment within {paymentTerms}, and whether VAT applies.</li>
            <li>A weekly limit they can change, and that they can pause or leave at any time.</li>
            <li>No promise of a number of leads or jobs.</li>
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
