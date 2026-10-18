import Link from "next/link";
import { Badge, PageHeader } from "@/components/ui";
import { stages, workflow, type WorkflowStep } from "@/lib/demo-data";

export const metadata = { title: "How it works | Lead desk" };

const ownerTone = {
  You: "ink",
  Homeowner: "neutral",
  Rules: "neutral",
  AI: "moss",
} as const;

function ownerLabel(step: WorkflowStep) {
  if (step.ownerKind === "Rules") return "Rules (automatic)";
  if (step.ownerKind === "AI") return `${step.owner} (AI)`;
  return step.owner;
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-6xl">
      <PageHeader
        title="How it works"
        intro="The whole business in nine steps, from finding a landscaper to getting paid for a lead. You're in the first stage; the others switch on in order."
      />

      <ol className="grid gap-6 lg:grid-cols-3">
        {stages.map((stage, stageIndex) => {
          const steps = workflow.filter((s) => s.stage === stageIndex);
          const firstNumber =
            workflow.findIndex((s) => s.stage === stageIndex) + 1;
          const isNow = stage.when === "Now";
          return (
            <li
              key={stage.name}
              className={`rounded-xl p-5 ${
                isNow ? "border-2 border-ink bg-white" : "border border-dashed border-line bg-white/50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold">{stage.name}</h2>
                <Badge tone={isNow ? "sand" : "neutral"}>{stage.when}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate">{stage.summary}</p>

              <ol className="mt-5 space-y-4">
                {steps.map((step, i) => {
                  const body = (
                    <>
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          isNow ? "bg-ink text-white" : "bg-stone-deep text-ink"
                        }`}
                      >
                        {firstNumber + i}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug">{step.title}</span>
                        <span className="mt-0.5 block text-sm text-slate">{step.detail}</span>
                        <span className="mt-2 block">
                          <Badge tone={ownerTone[step.ownerKind]}>{ownerLabel(step)}</Badge>
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={step.title}>
                      {step.href ? (
                        <Link href={step.href} className="-m-2 flex gap-3 rounded-md p-2 hover:bg-stone">
                          {body}
                        </Link>
                      ) : (
                        <div className="flex gap-3">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>

      <section className="mt-8 max-w-3xl text-sm">
        <h2 className="font-display text-lg font-semibold">Who does what</h2>
        <ul className="mt-2 space-y-1.5">
          <li>
            <Badge tone="ink">You</Badge> calling, contracts, and every decision about money and ad spend.
          </li>
          <li>
            <Badge tone="neutral">Rules (automatic)</Badge> fixed checks written in code: instant, free and
            never wrong about the rules they follow.
          </li>
          <li>
            <Badge tone="moss">AI</Badge> only where judgement helps: call briefs, reading contractor
            replies, drafting ads, writing the report.
          </li>
        </ul>
      </section>
    </div>
  );
}
