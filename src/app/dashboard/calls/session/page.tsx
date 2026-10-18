import Link from "next/link";
import { CallSession } from "@/components/call-session";
import { DemoNotice } from "@/components/ui";
import { callScript, callsDueToday } from "@/lib/demo-data";

export const metadata = { title: "Calling | Lead desk" };

export default function CallSessionPage() {
  const queue = callsDueToday();

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Calling</h1>
        <Link href="/dashboard/calls" className="text-sm text-slate underline underline-offset-2">
          See the full call list
        </Link>
      </div>
      <DemoNotice>Demo data. Try the buttons: outcomes move you to the next call but aren&apos;t saved.</DemoNotice>
      <CallSession queue={queue} script={callScript} />
    </div>
  );
}
