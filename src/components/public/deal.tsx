import { recruitCopy } from "@/lib/recruitment";

/** The whole deal in two plain lists. Shared by the homepage and join page. */
export function Deal({ dark = false }: { dark?: boolean }) {
  const { pay } = recruitCopy;
  const rule = dark ? "border-white/25" : "border-ink";
  const muted = dark ? "text-white/70" : "text-slate";
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <h3 className={`border-b-2 pb-2 text-lg font-semibold ${rule}`}>You pay for</h3>
        <p className="mt-4 text-xl leading-snug">{pay.paid}.</p>
      </div>
      <div>
        <h3 className={`border-b-2 pb-2 text-lg font-semibold ${rule}`}>You don&apos;t pay for</h3>
        <ul className="mt-2">
          {pay.free.map((item) => (
            <li key={item} className={`border-b py-2.5 ${dark ? "border-white/15" : "border-line"}`}>
              {item}
            </li>
          ))}
        </ul>
        <p className={`mt-3 text-sm ${muted}`}>No sign-up fee, no monthly fee, no contract.</p>
      </div>
    </div>
  );
}

/** The steps as a single line of events, not a row of feature columns. */
export function Steps() {
  return (
    <ol className="relative space-y-7 border-l-2 border-ink pl-7">
      {recruitCopy.steps.map((step) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-ink bg-stone"
          />
          <p className="text-lg font-semibold">{step.title}</p>
          <p className="text-slate">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
