import type { Metadata } from "next";
import Link from "next/link";
import { PhoneEnquiry } from "@/components/home/phone-enquiry";
import { TradeTabs } from "@/components/home/trade-tabs";
import { OPERATOR, OPERATOR_CONTACT } from "@/lib/landing-pages";
import { recruitCopy, trades } from "@/lib/recruitment";

// Public homepage for kentservices.uk. No numbers in the copy, by design.

export const metadata: Metadata = {
  title: `${OPERATOR} | Local customers, sent to you`,
  description: recruitCopy.subhead,
};

const primary =
  "inline-flex min-h-12 items-center justify-center rounded-md bg-moss px-6 font-medium text-white hover:bg-ink";
const secondary =
  "inline-flex min-h-12 items-center justify-center rounded-md border border-ink px-6 font-medium hover:bg-ink hover:text-white";

const features = [
  {
    title: "Yours alone",
    body: "Every enquiry goes to one tradesperson. Never sold twice, never a race to call first.",
    span: "lg:col-span-2",
  },
  {
    title: "Pay only for what you get",
    body: "A fixed price for each enquiry we send, agreed before you start. Nothing for anything else.",
    span: "lg:col-span-2",
  },
  { title: "Set your own limit", body: "Tell us how much work you can take, and we won't send more.", span: "" },
  { title: "Bad enquiries are free", body: "Fake, wrong number or out of your area? Tell us and it's off your bill.", span: "" },
  { title: "Pause any time", body: "Holiday, busy month, full diary. Pause with a message, no questions.", span: "" },
  { title: "No contract", body: "No sign-up fee, no monthly fee, nothing to sign up to.", span: "" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-stone/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            {OPERATOR}
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
            <a href="#how" className="hover:underline">
              How it works
            </a>
            <a href="#enquiries" className="hover:underline">
              What you get
            </a>
            <a href="#questions" className="hover:underline">
              Questions
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm hover:underline sm:inline">
              Log in
            </Link>
            <Link href="/join" className="inline-flex min-h-10 items-center rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-ink">
              Apply
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-moss" aria-hidden="true" />
              Now taking on {trades.map((t) => `${t.noun}s`).join(" and ")} in Kent
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
              Local customers, sent straight to you.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate sm:text-xl">
              We run the adverts, check every enquiry, and send it to one tradesperson only. You only pay for
              the enquiries you get.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/join" className={primary}>
                Apply to join
              </Link>
              <a href="#how" className={secondary}>
                See how it works
              </a>
            </div>
          </div>
          <PhoneEnquiry />
        </section>

        <section id="enquiries" className="scroll-mt-20 border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Not a list of names. A customer ready to talk.
            </h2>
            <div className="mt-10">
              <TradeTabs />
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">How it works</h2>
          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {recruitCopy.steps.map((step) => (
              <li key={step.title} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-slate">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Built around how you already work.
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <li
                  key={f.title}
                  className={`rounded-2xl border p-6 ${f.span} ${
                    i === 0 ? "border-ink bg-ink text-white" : i === 1 ? "border-moss bg-moss-soft" : "border-line bg-stone"
                  }`}
                >
                  <h3 className={`font-display font-semibold ${i < 2 ? "text-3xl" : "text-xl"}`}>{f.title}</h3>
                  <p className={`mt-2 ${i === 0 ? "text-white/80" : "text-slate"} ${i < 2 ? "text-lg" : ""}`}>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="questions" className="scroll-mt-20 mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:py-24">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Questions</h2>
          <dl className="divide-y divide-line border-y border-line">
            {recruitCopy.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-xl font-semibold">{f.q}</dt>
                <dd className="mt-2 text-slate">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-moss text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-8 lg:py-24">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Ready for more local work?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Tell us about your business. We check every application and get back to you quickly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/join" className="inline-flex min-h-12 items-center rounded-md bg-white px-6 font-medium text-ink hover:bg-stone">
                Apply to join
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/85">
              <li>No sign-up fee</li>
              <li>No monthly fee</li>
              <li>No contract</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-sm sm:px-8 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-white">{OPERATOR}</p>
            <p className="mt-2">Local customers for Kent tradespeople.</p>
          </div>
          <FooterList
            title="For tradespeople"
            links={[
              { href: "/join", label: "Apply to join" },
              { href: "#how", label: "How it works" },
              { href: "#questions", label: "Questions" },
            ]}
          />
          <FooterList title="Trades" links={trades.map((t) => ({ href: `/join/${t.slug}`, label: t.label }))} />
          <FooterList
            title="Company"
            links={[
              { href: `mailto:${OPERATOR_CONTACT}`, label: OPERATOR_CONTACT },
              { href: "/login", label: "Partner log in" },
            ]}
          />
        </div>
        <p className="mx-auto max-w-6xl border-t border-white/15 px-4 py-6 text-xs sm:px-8">© {OPERATOR}</p>
      </footer>
    </div>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-semibold text-white">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="hover:text-white hover:underline">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
