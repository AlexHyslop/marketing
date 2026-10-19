import Link from "next/link";
import { ApplicationReview } from "@/components/application-review";
import { ApprovalBatch } from "@/components/approval-batch";
import { LeadReview } from "@/components/lead-review";
import { DemoNotice, PageHeader, Section, StageStrip } from "@/components/ui";
import { approvals, contractors, leadIncome, money, leads } from "@/lib/demo-data";
import { applications, recruitTargets } from "@/lib/recruitment";

export const metadata = { title: "Today | Lead desk" };

export default function TodayPage() {
  const newApplications = applications.filter((a) => a.status === "New");
  const toReview = leads.filter((l) => l.status === "Needs review");
  const contractorName = contractors[0]?.business ?? "the contractor";
  const income = leadIncome();

  const approved = applications.filter((a) => a.status === "Approved" || a.status === "Active").length;
  const active = contractors.filter((c) => c.status === "Active").length;

  const progress = [
    { label: "Applications", value: applications.length, target: recruitTargets.applications },
    { label: "Approved", value: approved, target: recruitTargets.approved },
    { label: "Active partners", value: active, target: recruitTargets.active },
  ];

  // Rough time estimate so the list reads as a morning's work, not a pile.
  const decisionsNeeded = approvals.filter((a) => !a.routine).length;
  const minutes =
    newApplications.length * 2 + toReview.length * 1 + decisionsNeeded * 2 + (approvals.some((a) => a.routine) ? 1 : 0);
  const waiting = newApplications.length + toReview.length + approvals.length;

  return (
    <div className="max-w-6xl">
      <StageStrip />
      <PageHeader
        title="Today"
        intro={
          waiting > 0
            ? `About ${minutes} minutes of work: ${toReview.length} leads, ${newApplications.length} applications and ${approvals.length} approvals. Most urgent first.`
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
            title="New applications"
            count={newApplications.length}
            action={
              <Link href="/dashboard/applications" className="text-sm text-slate underline underline-offset-2">
                All applications
              </Link>
            }
          >
            <ApplicationReview applications={newApplications} />
          </Section>

          <Section title="Approvals" count={approvals.length}>
            <ApprovalBatch approvals={approvals} />
          </Section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Lead income</h2>
            <p className="text-sm text-slate">From {income.sent} leads sent to partners.</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt>Paid</dt>
                <dd className="font-semibold text-moss">{money(income.paid)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Invoiced, not yet paid</dt>
                <dd className="font-semibold">{money(income.invoiced)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>To invoice this month</dt>
                <dd className="font-semibold text-[#6b4d14]">{money(income.toInvoice)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-line pt-2.5 text-slate">
                <dt>Credits to decide</dt>
                <dd>{income.creditRequests}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Recruiting tradespeople</h2>
            <p className="text-sm text-slate">From the recruitment ads, against this month&apos;s targets.</p>
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
              <span className="font-semibold">Judge the ads on approved detailers, </span>not clicks or
              applications. <Link href="/dashboard/adverts" className="underline underline-offset-2">See the ads</Link>
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
