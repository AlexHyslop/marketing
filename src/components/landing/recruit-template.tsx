import { OPERATOR, OPERATOR_CONTACT } from "@/lib/landing-pages";
import { recruitCopy, trades, type Trade } from "@/lib/recruitment";

// Public page: no numbers in the copy. Prices are agreed with each partner.

const input = "mt-1 w-full rounded-md border border-line bg-white px-3 py-2.5 text-base focus:border-moss";

function Text({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  half,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  half?: boolean;
}) {
  return (
    <div className={half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} placeholder={placeholder} className={input} />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  defaultValue = "",
  half,
}: {
  id: string;
  label: string;
  options: string[];
  defaultValue?: string;
  half?: boolean;
}) {
  return (
    <div className={half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select id={id} name={id} className={input} defaultValue={defaultValue}>
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/** The one thing to remember: you pay for enquiries you get, and nothing else. */
function PayCard() {
  const { pay } = recruitCopy;
  return (
    <figure className="rounded-xl border-2 border-ink bg-white p-6 sm:p-7">
      <figcaption className="font-display text-xl font-semibold">{pay.title}</figcaption>
      <p className="mt-4 flex items-start gap-3 rounded-md bg-moss-soft px-4 py-3 font-medium text-[#2f4a24]">
        <span aria-hidden="true" className="mt-0.5 text-lg leading-none">
          ✓
        </span>
        {pay.paid}
      </p>
      <p className="mt-5 text-sm font-medium text-slate">Free, always</p>
      <ul className="mt-1">
        {pay.free.map((item) => (
          <li key={item} className="flex items-start gap-3 border-b border-dashed border-line py-2.5 last:border-b-0">
            <span aria-hidden="true" className="text-slate">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function RecruitTemplate({ trade }: { trade?: Trade }) {
  const tradeLabels = trades.map((t) => t.label);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <p className="font-display text-xl font-semibold tracking-tight">{OPERATOR}</p>
          <a href="#apply" className="rounded-md bg-moss px-4 py-2 text-sm font-medium text-white hover:bg-ink">
            Apply
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            {recruitCopy.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate">{recruitCopy.subhead}</p>
          <p className="mt-6 text-sm text-slate">
            Now taking on {trades.map((t) => `${t.noun}s`).join(" and ")} in {recruitCopy.area}.
          </p>
          <a
            href="#apply"
            className="mt-6 inline-flex min-h-12 items-center rounded-md bg-moss px-6 font-medium text-white hover:bg-ink"
          >
            Apply today
          </a>
        </div>
        <PayCard />
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">What we do</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recruitCopy.steps.map((step) => (
              <li key={step.title} className="border-t-2 border-moss pt-4">
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-1 text-slate">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">The terms, in full</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5">
            {recruitCopy.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-3xl font-semibold tracking-tight">Questions</h2>
          <dl className="mt-5 space-y-5">
            {recruitCopy.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1 text-slate">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="apply" className="scroll-mt-6">
          <form className="rounded-xl border border-line bg-white p-6 sm:p-7 lg:sticky lg:top-6">
            <h2 className="font-display text-2xl font-semibold">Apply</h2>
            <p className="mt-1 text-sm text-slate">
              A few quick questions. We check every application and get back to you quickly.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Select
                id="trade"
                label="Your trade"
                options={[...tradeLabels, "Something else"]}
                defaultValue={trade?.label ?? ""}
              />
              <Text id="business" label="Business name" autoComplete="organization" />
              <Text id="name" label="Your name" autoComplete="name" half />
              <Text id="phone" label="Mobile" type="tel" autoComplete="tel" half />
              <Text id="email" label="Email" type="email" autoComplete="email" />
              <Text id="area" label="Where you work" placeholder="Towns or postcode areas you cover" />
              <Text
                id="wantMore"
                label="What work do you want more of?"
                placeholder="The jobs you'd most like to fill your diary with"
              />
              <Select
                id="capacity"
                label="How much extra work can you take?"
                options={["A little", "A fair amount", "As much as you can send"]}
                half
              />
              <Select id="delivery" label="Send enquiries by" options={["Text", "WhatsApp", "Email"]} half />
              <Text id="website" label="Website or Instagram" placeholder="Optional" />
            </div>

            <div className="mt-4 space-y-3 rounded-md bg-stone p-3 text-sm">
              <label className="flex gap-3">
                <input type="checkbox" name="terms" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  I&apos;ve read the terms: I pay only for enquiries I receive, at a price we agree before I
                  start.
                </span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="contact" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {OPERATOR} can contact me about this application. You&apos;ll only use my details for
                  this, and I can ask you to delete them at {OPERATOR_CONTACT}.
                </span>
              </label>
            </div>

            <button
              type="button"
              aria-disabled="true"
              className="mt-4 w-full rounded-md bg-moss px-4 py-3 font-medium text-white hover:bg-ink"
            >
              Send application
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate sm:px-8">
          © {OPERATOR}. Questions: {OPERATOR_CONTACT}.
        </p>
      </footer>
    </div>
  );
}
