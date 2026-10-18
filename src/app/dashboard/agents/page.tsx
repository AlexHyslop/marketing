import { Badge, PageHeader, statusTone } from "@/components/ui";
import { agents } from "@/lib/demo-data";

export const metadata = { title: "Agents | Lead desk" };

export default function AgentsPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Agents"
        intro="The team that will take over the routine work. Each agent has one job, a schedule, a short list of things it's allowed to do, and rules that are enforced in code rather than just asked for."
      />

      <section className="mb-8 max-w-3xl rounded-lg border border-line bg-white p-5 text-sm">
        <h2 className="font-display text-lg font-semibold">How an agent earns trust</h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          <li>
            <Badge tone="neutral">Not built</Badge>
            <p className="mt-1 text-slate">You do the job by hand, so we learn what good looks like.</p>
          </li>
          <li>
            <Badge tone="sand">Proposes</Badge>
            <p className="mt-1 text-slate">The agent suggests each action and you approve it.</p>
          </li>
          <li>
            <Badge tone="moss">Acts</Badge>
            <p className="mt-1 text-slate">
              Once its proposals are reliably right, it acts on its own and logs what it did.
            </p>
          </li>
        </ol>
        <p className="mt-4 text-slate">
          Calling contractors, signing terms and increasing ad spend stay with you permanently.
        </p>
      </section>

      <ul className="grid gap-4 md:grid-cols-2">
        {agents.map((agent) => (
          <li key={agent.name} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-xl font-semibold">{agent.name}</h2>
              <div className="flex shrink-0 gap-1.5">
                <Badge tone={statusTone(agent.mode)}>{agent.mode}</Badge>
                <Badge tone="neutral">Phase {agent.phase}</Badge>
              </div>
            </div>
            <p className="mt-1">{agent.job}</p>
            <p className="mt-1 text-sm text-slate">Runs: {agent.runs}</p>

            <h3 className="mt-4 text-sm font-semibold">Allowed to</h3>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {agent.canDo.map((tool) => (
                <li key={tool}>
                  <Badge tone="neutral">{tool}</Badge>
                </li>
              ))}
            </ul>

            <h3 className="mt-4 text-sm font-semibold">Rules</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate">
              {agent.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
