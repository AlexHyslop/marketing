import Link from "next/link";
import { Badge, DemoNotice, PageHeader, TableWrap, statusTone, td, th } from "@/components/ui";
import { callStatuses, prospects, type CallStatus } from "@/lib/demo-data";

export const metadata = { title: "Calls | Lead desk" };

export default async function CallsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = callStatuses.includes(status as CallStatus) ? (status as CallStatus) : undefined;
  const rows = active ? prospects.filter((p) => p.status === active) : prospects;

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Calls"
        intro="Your list of local landscapers, what each call turned up and what to do next. Screen every number against the TPS/CTPS registers before calling."
      />
      <DemoNotice />

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by call status">
        <FilterLink href="/dashboard/calls" active={!active} label={`All (${prospects.length})`} />
        {callStatuses.map((s) => {
          const count = prospects.filter((p) => p.status === s).length;
          return (
            <FilterLink
              key={s}
              href={`/dashboard/calls?status=${encodeURIComponent(s)}`}
              active={active === s}
              label={`${s} (${count})`}
            />
          );
        })}
      </div>

      <TableWrap>
        <thead>
          <tr>
            <th className={th}>Business</th>
            <th className={th}>Phone</th>
            <th className={th}>Status</th>
            <th className={th}>What they want</th>
            <th className={th}>Next step</th>
            <th className={th}>TPS checked</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td className={td}>
                <p className="font-medium">{p.business}</p>
                <p className="text-slate">
                  {p.contact === "Unknown" ? "Contact not known" : p.contact}, {p.area}
                </p>
                <p className="text-slate">{p.services}</p>
              </td>
              <td className={`${td} whitespace-nowrap`}>{p.phone}</td>
              <td className={td}>
                <Badge tone={statusTone(p.status)}>{p.status}</Badge>
              </td>
              <td className={`${td} max-w-xs`}>
                {p.wants ? <p>{p.wants}</p> : <p className="text-slate">Not asked yet</p>}
                {p.typicalJob ? <p className="text-slate">Typical job {p.typicalJob}</p> : null}
                {p.notes ? <p className="mt-1 text-slate">{p.notes}</p> : null}
              </td>
              <td className={td}>
                <p>{p.nextStep ?? "None"}</p>
                {p.nextDate ? <p className="text-slate">{p.nextDate}</p> : null}
              </td>
              <td className={td}>
                {p.tpsChecked ? (
                  <Badge tone="moss">Checked</Badge>
                ) : (
                  <Badge tone="clay">Check first</Badge>
                )}
              </td>
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td className={td} colSpan={6}>
                No businesses with this status. Choose another filter above.
              </td>
            </tr>
          ) : null}
        </tbody>
      </TableWrap>
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
