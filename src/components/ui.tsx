import type { ReactNode } from "react";

type Tone = "neutral" | "moss" | "sand" | "clay" | "ink";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-stone-deep text-slate",
  moss: "bg-moss-soft text-moss",
  sand: "bg-sand-soft text-[#7a5a1f]",
  clay: "bg-clay-soft text-clay-red",
  ink: "bg-ink text-white",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "Trial agreed":
    case "Active":
    case "Qualified":
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
    <header className="mb-8 max-w-3xl">
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

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export const th = "border-b border-line bg-stone/60 px-4 py-2.5 font-medium text-slate";
export const td = "border-b border-line px-4 py-3 align-top";
