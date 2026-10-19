import type { CSSProperties } from "react";
import { submitEnquiry } from "@/app/form-actions";
import { FormShell } from "@/components/public/form-shell";
import {
  OPERATOR,
  OPERATOR_CONTACT,
  consentWording,
  type FormField,
  type LandingPage,
} from "@/lib/landing-pages";

function themeVars(page: LandingPage): CSSProperties {
  const t = page.theme;
  return {
    "--lp-bg": t.bg,
    "--lp-surface": t.surface,
    "--lp-ink": t.ink,
    "--lp-muted": t.muted,
    "--lp-line": t.line,
    "--lp-accent": t.accent,
    "--lp-accent-ink": t.accentInk,
  } as CSSProperties;
}

const input =
  "mt-1 w-full rounded-md border border-[var(--lp-line)] bg-[var(--lp-bg)] px-3 py-2.5 text-base text-[var(--lp-ink)] focus:border-[var(--lp-accent)]";

function Field({ field }: { field: FormField }) {
  const id = `f-${field.id}`;
  return (
    <div className={field.half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="text-sm font-medium">
        {field.label}
      </label>
      {field.type === "select" ? (
        <select id={id} name={field.id} className={input} defaultValue="" required>
          <option value="" disabled>
            Choose one
          </option>
          {field.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.id}
          type={field.type}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          required={field.id !== "email"}
          className={input}
        />
      )}
    </div>
  );
}

const contactFields: FormField[] = [
  { id: "name", label: "Your name", type: "text", autoComplete: "name" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
  { id: "email", label: "Email", type: "email", autoComplete: "email", half: true },
];

function HeroArt({ art }: { art: LandingPage["theme"]["art"] }) {
  if (art === "paving") {
    // Laid slabs in a broken-bond pattern, in stone tones.
    const tones = ["#d9d3c3", "#cfc8b6", "#e3ddcf", "#c7c0ad", "#d4cdbb"];
    const slabs = [];
    for (let row = 0; row < 8; row++) {
      const offset = row % 2 === 0 ? 0 : -60;
      for (let col = 0; col < 8; col++) {
        const w = (row + col) % 3 === 0 ? 150 : 110;
        slabs.push(
          <rect
            key={`${row}-${col}`}
            x={offset + col * 130}
            y={row * 70}
            width={w}
            height={64}
            rx={2}
            fill={tones[(row * 3 + col) % tones.length]}
          />,
        );
      }
    }
    return (
      <svg aria-hidden="true" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width="900" height="560" fill="#bdb6a3" />
        {slabs}
      </svg>
    );
  }
  // Light sweeping across a dark, freshly coated panel.
  return (
    <svg aria-hidden="true" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d252d" />
          <stop offset="1" stopColor="#0c1014" />
        </linearGradient>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="tint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5fd0c4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#5fd0c4" stopOpacity="0.25" />
          <stop offset="1" stopColor="#5fd0c4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="900" height="560" fill="url(#panel)" />
      <path d="M-100 420 C 200 300, 500 260, 1000 120 L 1000 170 C 520 300, 220 350, -100 470 Z" fill="url(#sweep)" />
      <path d="M-100 520 C 260 420, 560 380, 1000 260 L 1000 290 C 560 410, 260 450, -100 545 Z" fill="url(#tint)" />
      <path d="M-100 250 C 240 190, 560 150, 1000 40 L 1000 52 C 560 165, 240 205, -100 262 Z" fill="url(#sweep)" opacity="0.5" />
    </svg>
  );
}

export function LandingTemplate({ page }: { page: LandingPage }) {
  const brandName = page.brand.name;

  return (
    <div style={themeVars(page)} className="min-h-screen bg-[var(--lp-bg)] text-[var(--lp-ink)]">
      <header className="border-b border-[var(--lp-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <p className="font-display text-xl font-semibold tracking-tight">{brandName}</p>
          <a
            href="#quote"
            className="rounded-md bg-[var(--lp-accent)] px-4 py-2 text-sm font-medium text-[var(--lp-accent-ink)]"
          >
            {page.formTitle}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <HeroArt art={page.theme.art} />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:py-20">
          <div className="lg:pr-8">
            <p className="text-sm font-medium text-[var(--lp-muted)]">
              {page.trade} in {page.area}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {page.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--lp-muted)]">{page.subhead}</p>
            <ul className="mt-6 space-y-2">
              {page.promises.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--lp-accent)]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div id="quote" className="scroll-mt-6 lg:pl-8">
            <FormShell
              action={submitEnquiry}
              labelledBy="form-title"
              className="rounded-xl border border-[var(--lp-line)] bg-[var(--lp-surface)] p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.45)] sm:p-7"
              submitLabel={page.formTitle}
              buttonClassName="mt-4 w-full rounded-md bg-[var(--lp-accent)] px-4 py-3 font-medium text-[var(--lp-accent-ink)]"
              errorClassName="mt-4 rounded-md border border-[var(--lp-line)] bg-[var(--lp-bg)] px-3 py-2 text-sm"
              thanksTitle="Thanks, that's with us"
              thanksTitleClassName="font-display text-2xl font-semibold"
              thanksText={`We'll be in touch within ${page.responseTime}.`}
            >
              <input type="hidden" name="page" value={page.slug} />
              <h2 id="form-title" className="font-display text-2xl font-semibold">
                {page.formTitle}
              </h2>
              <p className="mt-1 text-sm text-[var(--lp-muted)]">
                Takes a minute. We reply within {page.responseTime}.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[...page.fields, ...contactFields].map((f) => (
                  <Field key={f.id} field={f} />
                ))}
              </div>

              <div className="mt-4 flex gap-3 rounded-md bg-[var(--lp-bg)] p-3">
                <input id="consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0" />
                <label htmlFor="consent" className="text-sm">
                  {consentWording(page)}
                </label>
              </div>

            </FormShell>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--lp-line)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">What we do</h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {page.services.map((s) => (
              <li key={s.name} className="border-t-2 border-[var(--lp-accent)] pt-4">
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-[var(--lp-muted)]">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--lp-surface)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-6 space-y-5">
              {page.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--lp-accent)] font-display font-semibold text-[var(--lp-accent-ink)]">
                    {i + 1}
                  </span>
                  <p className="pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Questions</h2>
            <dl className="mt-6 space-y-5">
              {page.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold">{f.q}</dt>
                  <dd className="mt-1 text-[var(--lp-muted)]">{f.a}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#quote"
              className="mt-8 inline-block rounded-md bg-[var(--lp-accent)] px-5 py-3 font-medium text-[var(--lp-accent-ink)]"
            >
              {page.formTitle}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--lp-line)]">
        <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-[var(--lp-muted)] sm:px-8">
          <h2 className="font-display text-base font-semibold text-[var(--lp-ink)]">Privacy</h2>
          {page.brand.mode === "partner" ? (
            <p className="mt-2">
              This page is run for {page.partner} by {OPERATOR}, which handles enquiries on their behalf.
              Your name, contact details and project details go to {page.partner} so they can contact you
              about a quote, and to no one else.
            </p>
          ) : (
            <p className="mt-2">
              {brandName} is run by {OPERATOR}. We pass your enquiry to one local {page.providerNoun},{" "}
              {page.partner ?? "[partner name]"}, who will contact you with a price. We don&apos;t share
              your details with anyone else.
            </p>
          )}
          <p className="mt-2">
            We keep enquiries for [retention period]. To see, correct or delete your details, email{" "}
            {OPERATOR_CONTACT}.
          </p>
          <p className="mt-4">
            © {brandName}
            {page.brand.mode === "local" ? `, a ${OPERATOR} service` : ""}
          </p>
        </div>
      </footer>
    </div>
  );
}
