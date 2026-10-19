import Link from "next/link";
import {
  Badge,
  DemoNotice,
  PageHeader,
  TableWrap,
  buttonPrimary,
  buttonSecondary,
  statusTone,
  td,
  th,
} from "@/components/ui";
import { byDue, callStatuses, callsDueToday, dueLabel, prospects, type CallStatus } from "@/lib/demo-data";

export const metadata = { title: "Calls | Lead desk" };

export default async function CallsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = callStatuses.includes(status as CallStatus) ? (status as CallStatus) : undefined;
  const rows = (active ? prospects.filter((p) => p.status === active) : prospects).slice().sort(byDue);
  const dueCount = callsDueToday().length;

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Calls"
          intro="Every landscaper on your list, with whoever's due first at the top. Screen numbers against the TPS/CTPS registers before calling."
        />
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/calls/find" className={buttonSecondary}>
            Find businesses
          </Link>
          {dueCount > 0 ? (
            <Link href="/dashboard/calls/session" className={buttonPrimary}>
              Start calling ({dueCount} due)
            </Link>
          ) : null}
        </div>
      </div>
      <DemoNotice />

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by call status">
        <FilterLink href="/dashboard/calls" active={!active} label={`All (${prospects.length})`} />
        {callStatuses.map((s) => {
          const count = prospects.filter((p) => p.status === s).length;
          if (count === 0) return null;
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
            <th className={th}>Next step</th>
            <th className={th}>Business</th>
            <th className={th}>Status</th>
            <th className={th}>What we know</th>
            <th className={th}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const overdue = (p.dueInDays ?? 0) < 0;
            return (
              <tr key={p.id}>
                <td className={td}>
                  <p className={overdue ? "font-medium text-clay-red" : "font-medium"}>
                    {dueLabel(p.dueInDays)}
                  </p>
                  <p className="text-slate">{p.nextStep ?? "None"}</p>
                </td>
                <td className={td}>
                  <p className="font-medium">{p.business}</p>
                  <p className="text-slate">
                    {p.contact === "Unknown" ? "Contact not known" : p.contact}, {p.area}
                  </p>
                </td>
                <td className={td}>
                  <div className="flex flex-col items-start gap-1.5">
                    <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                    {!p.tpsChecked ? <Badge tone="clay">TPS not checked</Badge> : null}
                  </div>
                </td>
                <td className={`${td} max-w-sm`}>
                  {p.wants ? <p>{p.wants}</p> : null}
                  {p.typicalJob ? <p className="text-slate">Typical job {p.typicalJob}</p> : null}
                  <p className="text-slate">{p.notes ?? p.brief}</p>
                </td>
                <td className={`${td} whitespace-nowrap`}>
                  <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="underline-offset-2 hover:underline">
                    {p.phone}
                  </a>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 ? (
            <tr>
              <td className={td} colSpan={5}>
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
      className={`inline-flex min-h-9 items-center rounded-full border px-3 text-sm ${
        active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
      }`}
    >
      {label}
    </Link>
  );
}
