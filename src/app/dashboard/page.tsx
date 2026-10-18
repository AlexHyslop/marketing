import Link from "next/link";
import { ApprovalBatch } from "@/components/approval-batch";
import { LeadReview } from "@/components/lead-review";
import { DemoNotice, PageHeader, Section, StageStrip, buttonPrimary } from "@/components/ui";
import {
  approvals,
  callsDueToday,
  commissionSummary,
  contractors,
  dueLabel,
  money,
  leads,
  prospects,
  stageOneTargets,
} from "@/lib/demo-data";

export const metadata = { title: "Today | Lead desk" };

export default function TodayPage() {
  const calls = callsDueToday();
  const toReview = leads.filter((l) => l.status === "Needs review");
  const contractorName = contractors[0]?.business ?? "the contractor";
  const earnings = commissionSummary();

  const spoke = prospects.filter((p) =>
    ["Interested", "Trial agreed", "Not interested"].includes(p.status),
  ).length;
  const interested = prospects.filter((p) => ["Interested", "Trial agreed"].includes(p.status)).length;
  const trials = prospects.filter((p) => p.status === "Trial agreed").length;

  const progress = [
    { label: "Businesses on the list", value: prospects.length, target: stageOneTargets.prospects },
    { label: "Real conversations", value: spoke, target: stageOneTargets.conversations },
    { label: "Interested", value: interested, target: stageOneTargets.interested },
    { label: "Trial agreed", value: trials, target: stageOneTargets.trials },
  ];

  // Rough time estimate so the list reads as a morning's work, not a pile.
  const decisionsNeeded = approvals.filter((a) => !a.routine).length;
  const minutes =
    calls.length * 5 + toReview.length * 1 + decisionsNeeded * 2 + (approvals.some((a) => a.routine) ? 1 : 0);
  const waiting = calls.length + toReview.length + approvals.length;

  return (
    <div className="max-w-6xl">
      <StageStrip />
      <PageHeader
        title="Today"
        intro={
          waiting > 0
            ? `About ${minutes} minutes of work: ${toReview.length} leads, ${calls.length} calls and ${approvals.length} approvals. Most urgent first.`
            : "Nothing needs you right now."
        }
      />
      <DemoNotice>Demo data. The buttons work so you can try the flow, but nothing is saved.</DemoNotice>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <Section title="Leads to check" count={toReview.length} action={<span className="text-sm text-slate">Homeowners go cold fast</span>}>
            <LeadReview leads={toReview} contractorName={contractorName} />
          </Section>

          <Section
            title="Calls"
            count={calls.length}
            action={
              calls.length > 0 ? (
                <Link href="/dashboard/calls/session" className={buttonPrimary}>
                  Start calling
                </Link>
              ) : null
            }
          >
            {calls.length > 0 ? (
              <ul className="divide-y divide-line">
                {calls.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5 first:pt-0 last:pb-0">
                    <span>
                      <span className="font-medium">{p.business}</span>
                      <span className="text-slate">: {p.nextStep}</span>
                    </span>
                    <span
                      className={`text-sm ${
                        (p.dueInDays ?? 0) < 0 ? "font-medium text-clay-red" : "text-slate"
                      }`}
                    >
                      {dueLabel(p.dueInDays)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate">No calls due. Add businesses to the call list to keep going.</p>
            )}
          </Section>

          <Section title="Approvals" count={approvals.length}>
            <ApprovalBatch approvals={approvals} />
          </Section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Your 10%</h2>
            <p className="text-sm text-slate">
              From {earnings.jobsWon} jobs won, worth {money(earnings.valueWon)} to contractors.
            </p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt>Paid</dt>
                <dd className="font-semibold text-moss">{money(earnings.paid)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Invoiced, not yet paid</dt>
                <dd className="font-semibold">{money(earnings.invoiced)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Ready to invoice</dt>
                <dd className="font-semibold text-[#6b4d14]">{money(earnings.readyToInvoice)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-line pt-2.5 text-slate">
                <dt>If quoted jobs are won</dt>
                <dd>{money(earnings.quoted)}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Finding contractors</h2>
            <p className="text-sm text-slate">Progress against the first-week targets in the plan.</p>
            <dl className="mt-4 space-y-4">
              {progress.map((item) => {
                const pct = Math.min(100, Math.round((item.value / item.target) * 100));
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <dt>{item.label}</dt>
                      <dd className="font-medium">
                        {item.value} of {item.target}
                      </dd>
                    </div>
                    <div
                      className="mt-1.5 h-2 overflow-hidden rounded-full bg-stone-deep"
                      role="progressbar"
                      aria-label={item.label}
                      aria-valuenow={item.value}
                      aria-valuemin={0}
                      aria-valuemax={item.target}
                    >
                      <div
                        className={`h-full rounded-full ${pct >= 100 ? "bg-moss" : "bg-sand"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </dl>
            <p className="mt-5 border-t border-line pt-4 text-sm">
              <span className="font-semibold">One contractor signed. </span>A second one means ads
              aren&apos;t limited by a single contractor&apos;s weekly cap.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
