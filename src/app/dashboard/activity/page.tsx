import { Badge, DemoNotice, PageHeader, statusTone } from "@/components/ui";
import { activity } from "@/lib/demo-data";

export const metadata = { title: "Activity | Lead desk" };

export default function ActivityPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Activity"
        intro="Everything the agents and you have done, newest first. When something goes wrong, this is where you see which agent did what and why."
      />
      <DemoNotice />

      <ol className="border-l border-line">
        {activity.map((entry) => (
          <li key={`${entry.when}-${entry.who}`} className="relative pb-6 pl-6 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-moss"
            />
            <p className="text-sm text-slate">{entry.when}</p>
            <p className="mt-0.5">
              <span className="font-semibold">{entry.who}</span>: {entry.what}
            </p>
            <div className="mt-1.5">
              <Badge tone={statusTone(entry.result)}>{entry.result}</Badge>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
