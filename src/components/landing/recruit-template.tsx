import Link from "next/link";
import { Deal, Steps } from "@/components/public/deal";
import { Photo, PhotoCredits } from "@/components/public/photo";
import { OPERATOR, OPERATOR_CONTACT } from "@/lib/landing-pages";
import { photos } from "@/lib/photos";
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

export function RecruitTemplate({ trade }: { trade?: Trade }) {
  const tradeLabels = trades.map((t) => t.label);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link href="/" className="headline text-3xl">
            {OPERATOR}
          </Link>
          <a href="#apply" className="inline-flex min-h-10 items-center rounded-md bg-ink px-4 text-sm font-medium text-white hover:bg-moss">
            Apply
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8 lg:py-20">
        <h1 className="headline max-w-4xl text-6xl sm:text-8xl">{recruitCopy.headline}</h1>
        <p className="mt-6 max-w-2xl text-xl text-slate">{recruitCopy.subhead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#apply" className="inline-flex min-h-12 items-center rounded-md bg-moss px-6 font-medium text-white hover:bg-ink">
            Apply to join
          </a>
          <p className="text-sm text-slate">
            Taking on {trades.map((t) => `${t.noun}s`).join(" and ")} in {recruitCopy.area} first.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
          <div className="aspect-[16/10] overflow-hidden rounded-md border-2 border-ink">
            <Photo
              photo={trade?.slug === "landscaping" ? photos.layingPatio : photos.polishing}
              width={800}
              height={500}
              sizes="(min-width: 640px) 640px, 100vw"
              priority
            />
          </div>
          <div className="relative hidden overflow-hidden rounded-md border-2 border-ink sm:block">
            <Photo
              photo={trade?.slug === "landscaping" ? photos.finishedPatio : photos.layingPatio}
              width={480}
              height={600}
              sizes="400px"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8 lg:py-16">
          <h2 className="headline text-5xl">The deal</h2>
          <div className="mt-8">
            <Deal dark />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:py-16">
          <h2 className="headline text-5xl">How it works</h2>
          <Steps />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h2 className="headline text-5xl">The terms, in full</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5">
            {recruitCopy.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h2 className="headline mt-14 text-5xl">Questions</h2>
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
          <form className="rounded-md border-2 border-ink bg-white p-6 sm:p-7 lg:sticky lg:top-6">
            <h2 className="headline text-4xl">Apply</h2>
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

      <footer className="border-t-2 border-ink">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate sm:px-8">
          © {OPERATOR}. Questions: {OPERATOR_CONTACT}.
        </p>
        <div className="mx-auto max-w-6xl px-4 pb-8 text-sm text-slate sm:px-8">
          <PhotoCredits photos={Object.values(photos)} />
        </div>
      </footer>
    </div>
  );
}
