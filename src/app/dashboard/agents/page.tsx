import { Badge, PageHeader, statusTone } from "@/components/ui";
import { workers, type Worker } from "@/lib/demo-data";

export const metadata = { title: "Rules & agents | Lead desk" };

export default function AgentsPage() {
  const rules = workers.filter((w) => w.kind === "Rules");
  const ai = workers.filter((w) => w.kind === "AI");

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Rules & agents"
        intro="Routine work is split in two. Rules are fixed checks in code, used wherever the answer is clear-cut. AI agents are used only where judgement helps. Neither can touch anything outside its own list."
      />

      <section className="mb-8 max-w-3xl rounded-lg border border-line bg-white p-5 text-sm">
        <h2 className="font-display text-lg font-semibold">How each one earns trust</h2>
        <ol className="mt-3 grid gap-4 sm:grid-cols-3">
          <li>
            <Badge tone="neutral">Not built</Badge>
            <p className="mt-1.5 text-slate">You do it by hand first, so we learn what good looks like.</p>
          </li>
          <li>
            <Badge tone="sand">Proposes</Badge>
            <p className="mt-1.5 text-slate">It suggests actions in your daily approval batch.</p>
          </li>
          <li>
            <Badge tone="moss">Acts</Badge>
            <p className="mt-1.5 text-slate">Once its proposals are reliably right, it acts and logs what it did.</p>
          </li>
        </ol>
        <p className="mt-4">
          Calling contractors, signing terms, and anything involving money or ad spend stay with you
          permanently.
        </p>
      </section>

      <Group title="Rules" note="Instant, free and predictable. No AI involved." workers={rules} />
      <Group title="AI agents" note="For the parts that need judgement." workers={ai} />
    </div>
  );
}

function Group({ title, note, workers }: { title: string; note: string; workers: Worker[] }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="mb-4 text-slate">{note}</p>
      <ul className="grid gap-4 md:grid-cols-2">
        {workers.map((w) => (
          <li key={w.name} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{w.name}</h3>
              <div className="flex shrink-0 gap-1.5">
                <Badge tone={statusTone(w.mode)}>{w.mode}</Badge>
                <Badge tone="neutral">{w.when}</Badge>
              </div>
            </div>
            <p className="mt-1">{w.job}</p>
            <p className="mt-1 text-sm text-slate">Runs: {w.runs}</p>

            <h4 className="mt-4 text-sm font-semibold">Allowed to</h4>
            <p className="text-sm">{w.canDo.join(", ")}.</p>

            <h4 className="mt-3 text-sm font-semibold">Rules it can&apos;t break</h4>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate">
              {w.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
