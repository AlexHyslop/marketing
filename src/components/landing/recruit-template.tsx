import { OPERATOR, OPERATOR_CONTACT } from "@/lib/landing-pages";
import type { RecruitPage } from "@/lib/recruitment";

const input =
  "mt-1 w-full rounded-md border border-[#2c353e] bg-[#101418] px-3 py-2.5 text-base text-[#eef2f5] placeholder:text-[#6f7c86] focus:border-[#5fd0c4]";

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

function Select({ id, label, options, half }: { id: string; label: string; options: string[]; half?: boolean }) {
  return (
    <div className={half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select id={id} name={id} className={input} defaultValue="">
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

export function RecruitTemplate({ page }: { page: RecruitPage }) {
  return (
    <div className="min-h-screen bg-[#101418] text-[#eef2f5]">
      <header className="border-b border-[#2c353e]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <p className="font-display text-xl font-semibold tracking-tight">
            {OPERATOR} <span className="font-normal text-[#a9b4bd]">for {page.providerNoun}s</span>
          </p>
          <a href="#apply" className="rounded-md bg-[#5fd0c4] px-4 py-2 text-sm font-medium text-[#0b1316]">
            Apply
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <div>
          <p className="text-sm font-medium text-[#a9b4bd]">
            {page.trade} in {page.area}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {page.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#a9b4bd]">{page.subhead}</p>

          <ul className="mt-10 space-y-6">
            {page.points.map((p) => (
              <li key={p.title} className="border-l-2 border-[#5fd0c4] pl-4">
                <h2 className="font-display text-lg font-semibold">{p.title}</h2>
                <p className="mt-1 text-[#a9b4bd]">{p.detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-lg border border-[#2c353e] p-5">
            <h2 className="font-display text-lg font-semibold">The terms, in full</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#c8d1d8]">
              {page.terms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <dl className="mt-10 space-y-5">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1 text-[#a9b4bd]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="apply" className="scroll-mt-6">
          <form className="rounded-xl border border-[#2c353e] bg-[#1a2027] p-6 lg:sticky lg:top-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold">Apply to join</h2>
            <p className="mt-1 text-sm text-[#a9b4bd]">
              Two minutes. We check every application and reply within two working days.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Text id="business" label="Business name" autoComplete="organization" />
              <Text id="name" label="Your name" autoComplete="name" half />
              <Text id="phone" label="Mobile" type="tel" autoComplete="tel" half />
              <Text id="email" label="Email" type="email" autoComplete="email" />
              <Text id="town" label="Where you're based" placeholder="Town" half />
              <Select id="radius" label="How far you'll travel" options={["5 miles", "10 miles", "15 miles", "20 miles", "25+ miles"]} half />
              <Select id="setup" label="How you work" options={["Mobile", "From a unit", "Both"]} half />
              <Text id="coatingPrice" label="Typical coating price" placeholder="e.g. £500–£900" half />
            </div>

            <fieldset className="mt-4">
              <legend className="text-sm font-medium">What you offer</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {page.services.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="services" value={s} className="h-4 w-4" />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Select id="capacity" label="Extra jobs you could take a week" options={["1", "2–3", "4–5", "More than 5"]} half />
              <Select id="delivery" label="Send enquiries by" options={["Text", "WhatsApp", "Email"]} half />
              <Text id="instagram" label="Instagram or website (optional)" />
            </div>

            <div className="mt-4 space-y-3 rounded-md bg-[#101418] p-3 text-sm">
              <label className="flex gap-3">
                <input type="checkbox" name="terms" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>I&apos;ve read the terms: 10% of jobs won from your enquiries, reported within 14 days.</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" name="contact" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {OPERATOR} can contact me about this application. Details are used only for this, and
                  you can ask us to delete them at {OPERATOR_CONTACT}.
                </span>
              </label>
            </div>

            <button
              type="button"
              aria-disabled="true"
              className="mt-4 w-full rounded-md bg-[#5fd0c4] px-4 py-3 font-medium text-[#0b1316]"
            >
              Send application
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#2c353e]">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-[#a9b4bd] sm:px-8">
          © {OPERATOR}. Questions: {OPERATOR_CONTACT}.
        </p>
      </footer>
    </div>
  );
}
