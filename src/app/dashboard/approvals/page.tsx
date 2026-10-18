import { Badge, DemoNotice, PageHeader } from "@/components/ui";
import { approvals } from "@/lib/demo-data";

export const metadata = { title: "Approvals | Lead desk" };

const kindTone = {
  Lead: "moss",
  Prospects: "neutral",
  Money: "sand",
  Spend: "clay",
} as const;

export default function ApprovalsPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Approvals"
        intro="Agents start by proposing rather than acting. Each proposal waits here until you approve or reject it. Spending and money always stay here, however much the agents are trusted."
      />
      <DemoNotice>
        Demo data. These are examples of what agents will ask you. The buttons start working
        once the database is connected.
      </DemoNotice>

      <ul className="space-y-4">
        {approvals.map((a) => (
          <li key={a.id} className="rounded-lg border border-line bg-white p-5">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge tone="ink">{a.agent}</Badge>
              <Badge tone={kindTone[a.kind]}>{a.kind}</Badge>
              <span className="text-slate">{a.raised}</span>
            </div>
            <h2 className="mt-3 font-display text-lg font-semibold">{a.action}</h2>
            <p className="mt-1 text-sm text-slate">Why: {a.reason}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                disabled
                className="rounded-md bg-moss px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Approve
              </button>
              <button
                type="button"
                disabled
                className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
