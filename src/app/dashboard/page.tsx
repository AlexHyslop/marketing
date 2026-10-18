import Link from "next/link";
import { Badge, DemoNotice, PageHeader } from "@/components/ui";
import {
  approvals,
  contractors,
  leads,
  prospects,
  workflow,
  type WorkflowStep,
} from "@/lib/demo-data";

// Slightly uneven corners so each step reads as a laid stone rather than a card.
const stoneShapes = [
  "18px 10px 16px 8px",
  "10px 18px 8px 16px",
  "14px 8px 18px 12px",
  "8px 14px 12px 18px",
];

function Stone({ step, number, index }: { step: WorkflowStep; number: number; index: number }) {
  const isNow = step.status === "now";
  const isYours = step.owner === "You" || step.owner === "Homeowner";

  const surface = isNow
    ? "bg-sand-soft border-2 border-ink"
    : isYours
      ? "bg-white border border-dashed border-sand"
      : "bg-moss-soft/50 border border-dashed border-moss/60";

  const body = (
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
            isNow ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line"
          }`}
        >
          {number}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-snug">
            <span className="sr-only">Step {number}: </span>
            {step.title}
          </h3>
          <p className="mt-1 text-sm text-slate">{step.detail}</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Badge tone={step.owner === "You" ? "ink" : isYours ? "neutral" : "moss"}>
              {step.owner === "You" ? "You" : step.owner}
            </Badge>
            {step.helper ? (
              <Badge tone="neutral">
                {step.helper === "You" ? "you approve" : `${step.helper} helps later`}
              </Badge>
            ) : null}
            {isNow ? (
              <Badge tone="sand">Doing now</Badge>
            ) : (
              <Badge tone="neutral">Phase {step.phase}</Badge>
            )}
          </div>
        </div>
      </div>
  );

  const className = `block p-4 transition-colors ${surface} ${
    step.href ? "hover:border-ink" : ""
  } ${index % 2 === 1 ? "sm:ml-10" : ""}`;
  const style = { borderRadius: stoneShapes[index % stoneShapes.length] };

  return step.href ? (
    <Link href={step.href} className={className} style={style}>
      {body}
    </Link>
  ) : (
    <div className={className} style={style}>
      {body}
    </div>
  );
}

export default function OverviewPage() {
  // Step numbers run on across the three stages.
  const stageOffsets = workflow.map((_, i) =>
    workflow.slice(0, i).reduce((total, stage) => total + stage.steps.length, 0),
  );

  const callsDue = prospects.filter((p) => p.nextDate === "Mon 19 Oct").length;
  const notCalled = prospects.filter((p) => p.status === "Not called").length;
  const newLeads = leads.filter((l) => l.status === "New" || l.status === "Needs review").length;
  const signed = contractors.filter((c) => c.termsSigned).length;

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="How the work flows"
        intro="Each stone is a step from finding a landscaper to getting paid for a lead. Solid stones are what you're doing now. Dashed ones are planned, with the phase they arrive in. Click a stone to see that part of the dashboard."
      />
      <DemoNotice />

      <div className="grid gap-10 xl:grid-cols-[1fr_300px]">
        <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {workflow.map((stage, stageIndex) => (
            <li key={stage.name}>
              <h2 className="font-display text-xl font-semibold">{stage.name}</h2>
              <p className="mt-1 mb-4 text-sm text-slate">{stage.summary}</p>
              <ol className="space-y-3">
                {stage.steps.map((step, i) => (
                  <li key={step.title}>
                    <Stone step={step} number={stageOffsets[stageIndex] + i + 1} index={i} />
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>

        <aside className="space-y-6">
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Needs you</h2>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <Link href="/dashboard/calls" className="font-medium underline-offset-2 hover:underline">
                  {callsDue} calls due tomorrow
                </Link>
                <p className="text-slate">{notCalled} businesses not called yet</p>
              </li>
              <li>
                <Link
                  href="/dashboard/approvals"
                  className="font-medium underline-offset-2 hover:underline"
                >
                  {approvals.length} agent proposals to approve
                </Link>
                <p className="text-slate">Examples of what agents will ask you</p>
              </li>
              <li>
                <Link href="/dashboard/leads" className="font-medium underline-offset-2 hover:underline">
                  {newLeads} leads to check
                </Link>
                <p className="text-slate">One may be outside the agreed area</p>
              </li>
            </ul>
          </section>

          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">Before any ads run</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2">
                <span aria-hidden="true">{signed > 0 ? "✓" : "○"}</span>
                <span>A contractor has signed the trial terms</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">○</span>
                <span>Landing page names that contractor in the consent wording</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">○</span>
                <span>A test enquiry reaches the dashboard end to end</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">○</span>
                <span>Daily ad spend cap is set</span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
