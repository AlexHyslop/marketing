import Link from "next/link";
import { Badge, DemoNotice, PageHeader, TableWrap, statusTone, td, th } from "@/components/ui";
import { commissionOn, leadStatuses, leads, money, type LeadStatus } from "@/lib/demo-data";

export const metadata = { title: "Leads | Lead desk" };

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = leadStatuses.includes(status as LeadStatus) ? (status as LeadStatus) : undefined;
  const rows = active ? leads.filter((l) => l.status === active) : leads;
  const usedStatuses = leadStatuses.filter((s) => leads.some((l) => l.status === s));

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Leads"
        intro="Every homeowner enquiry, from arrival to outcome. Leads are free to contractors; you earn 10% of the job value when one is won. A lead without recorded consent is never shared."
      />
      <DemoNotice />

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by lead status">
        <FilterLink href="/dashboard/leads" active={!active} label={`All (${leads.length})`} />
        {usedStatuses.map((s) => (
          <FilterLink
            key={s}
            href={`/dashboard/leads?status=${encodeURIComponent(s)}`}
            active={active === s}
            label={`${s} (${leads.filter((l) => l.status === s).length})`}
          />
        ))}
      </div>

      <TableWrap>
        <thead>
          <tr>
            <th className={th}>Lead</th>
            <th className={th}>Job</th>
            <th className={th}>Job value (your 10%)</th>
            <th className={th}>Consent</th>
            <th className={th}>Status</th>
            <th className={th}>Sent to</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id}>
              <td className={td}>
                <p className="font-medium">{l.name}</p>
                <p className="text-slate">
                  {l.id}, received {l.received}
                </p>
              </td>
              <td className={td}>
                <p>{l.jobType}</p>
                <p className="text-slate">
                  {l.postcode}, {l.timing.toLowerCase()}, budget {l.budget}
                </p>
              </td>
              <td className={`${td} whitespace-nowrap`}>
                {l.jobValue ? (
                  <>
                    <p className="font-medium">
                      {money(l.jobValue)} ({money(commissionOn(l.jobValue))})
                    </p>
                    <p className="text-slate">
                      {l.status === "Quoted" ? "Quoted, not won yet" : l.commission ?? ""}
                    </p>
                  </>
                ) : (
                  <span className="text-slate">Not known yet</span>
                )}
              </td>
              <td className={td}>
                {l.consent ? <Badge tone="moss">Recorded</Badge> : <Badge tone="clay">Missing</Badge>}
              </td>
              <td className={td}>
                <Badge tone={statusTone(l.status)}>{l.status}</Badge>
                {l.note ? <p className="mt-1 max-w-[220px] text-slate">{l.note}</p> : null}
              </td>
              <td className={td}>{l.assignedTo ?? <span className="text-slate">Not sent</span>}</td>
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td className={td} colSpan={6}>
                No leads with this status. Choose another filter above.
              </td>
            </tr>
          ) : null}
        </tbody>
      </TableWrap>

      <p className="mt-4 max-w-3xl text-sm text-slate">
        Lead statuses in order: {leadStatuses.join(", ")}.
      </p>
    </div>
  );
}

function FilterLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`rounded-full border px-3 py-1 text-sm ${
        active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
      }`}
    >
      {label}
    </Link>
  );
}
