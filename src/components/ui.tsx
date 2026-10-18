import Link from "next/link";
import type { ReactNode } from "react";
import { stages } from "@/lib/demo-data";

type Tone = "neutral" | "moss" | "sand" | "clay" | "ink";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-stone-deep text-ink",
  moss: "bg-moss-soft text-[#2f4a24]",
  sand: "bg-sand-soft text-[#6b4d14]",
  clay: "bg-clay-soft text-[#8a3524]",
  ink: "bg-ink text-white",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[13px] font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "Trial agreed":
    case "Active":
    case "Sent":
    case "Contacted":
    case "Quoted":
    case "Won":
    case "Done":
    case "Acts":
      return "moss";
    case "Interested":
    case "Call back":
    case "Needs review":
    case "New":
    case "Terms sent":
    case "Waiting for you":
    case "Proposes":
      return "sand";
    case "Not interested":
    case "Rejected":
    case "Lost":
    case "Blocked":
    case "Paused":
      return "clay";
    default:
      return "neutral";
  }
}

export function PageHeader({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <header className="mb-6 max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-2 text-slate">{intro}</p> : null}
    </header>
  );
}

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="mb-6 max-w-3xl rounded-md border border-dashed border-sand bg-sand-soft/60 px-4 py-2.5 text-sm text-[#5e4617]">
      {children ??
        "Demo data. This shows how the page will work; nothing here is real yet and nothing is saved."}
    </p>
  );
}

/** One line showing which stage of the business you're in. */
export function StageStrip() {
  return (
    <nav aria-label="Business stage" className="mb-6">
      <ol className="flex flex-wrap items-stretch gap-2">
        {stages.map((stage, i) => {
          const current = stage.when === "Now";
          return (
            <li key={stage.name} className="flex items-center gap-2">
              <Link
                href="/dashboard/how-it-works"
                aria-current={current ? "step" : undefined}
                className={`rounded-full border px-3.5 py-1.5 text-sm ${
                  current
                    ? "border-ink bg-ink font-medium text-white"
                    : "border-line bg-white text-slate hover:border-ink"
                }`}
              >
                {current ? "You're here: " : ""}
                {stage.name}
              </Link>
              {i < stages.length - 1 ? (
                <span aria-hidden="true" className="text-slate">
                  ›
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Section({
  title,
  count,
  action,
  children,
}: {
  title: string;
  count?: number;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-line bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h2 className="font-display text-lg font-semibold">
          {title}
          {count !== undefined ? <span className="ml-2 text-slate">{count}</span> : null}
        </h2>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

export const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink";
export const buttonSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-4 text-sm font-medium hover:border-ink";

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export const th = "border-b border-line bg-stone/60 px-4 py-2.5 font-medium text-slate";
export const td = "border-b border-line px-4 py-3 align-top";
