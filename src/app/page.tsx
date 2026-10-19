import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { SmsThread } from "@/components/home/sms-thread";
import { TradeTabs } from "@/components/home/trade-tabs";
import { Deal, Steps } from "@/components/public/deal";
import { Photo, PhotoCredits } from "@/components/public/photo";
import { OPERATOR, OPERATOR_CONTACT } from "@/lib/landing-pages";
import { photoCredits, photos } from "@/lib/photos";
import { moreTrades, recruitCopy, trades } from "@/lib/recruitment";

// Public homepage. Plain words, no numbers, no card grids.

export const metadata: Metadata = {
  title: `${OPERATOR} | Local customers for Kent tradespeople`,
  description: recruitCopy.subhead,
};


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link href="/" aria-label={`${OPERATOR} home`}>
            <LogoMark className="h-11 w-11" />
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/login" className="hidden underline-offset-4 hover:underline sm:inline">
              Partner log in
            </Link>
            <Link href="/join" className="inline-flex min-h-10 items-center rounded-md bg-ink px-4 font-medium text-white hover:bg-moss">
              Apply to join
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <h1 className="headline text-6xl sm:text-8xl">We find local customers for Kent tradespeople.</h1>
            <p className="mt-6 max-w-lg text-xl text-slate">
              We advertise, check every enquiry, and text it to one tradesperson. You pay for each enquiry we
              send you. Nothing else.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/join"
                className="inline-flex min-h-12 items-center rounded-md bg-moss px-6 font-medium text-white hover:bg-ink"
              >
                Apply to join
              </Link>
              <a href="#how" className="font-medium underline underline-offset-4">
                How it works
              </a>
            </div>
            <p className="mt-8 text-sm text-slate">For trades of every kind, right across Kent.</p>
          </div>
          <SmsThread className="mx-auto w-full max-w-[340px]" />
        </section>

        <section className="border-t-2 border-ink">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-20">
            <h2 className="headline max-w-3xl text-5xl sm:text-6xl">Whatever your trade</h2>
            <p className="mt-4 max-w-xl text-lg text-slate">
              If people in Kent search for it, we can advertise it. These are some of the trades we work with.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {trades.map((t) => (
                <li key={t.slug}>
                  <Link href={`/join/${t.slug}`} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-md border-2 border-ink">
                      <Photo
                        photo={photos[t.photo]}
                        width={320}
                        height={400}
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
                      />
                    </div>
                    <p className="mt-3 text-lg font-semibold group-hover:underline">{t.label}</p>
                  </Link>
                </li>
              ))}
              <li className="col-span-2 sm:col-span-1">
                <div className="flex h-full flex-col justify-between rounded-md border-2 border-dashed border-ink/40 p-5">
                  <p className="text-lg font-semibold">And many more</p>
                  <p className="mt-3 text-slate">{moreTrades.join(", ")}.</p>
                  <Link href="/join" className="mt-4 font-medium underline underline-offset-4">
                    Apply for any trade
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section id="how" className="scroll-mt-6 border-t-2 border-ink bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:py-20">
            <div>
              <h2 className="headline text-5xl sm:text-6xl">How it works</h2>
              <p className="mt-4 max-w-sm text-lg text-slate">
                You do the work you&apos;re good at. We do the advertising you don&apos;t have time for.
              </p>
            </div>
            <Steps />
          </div>
        </section>

        <section className="border-t-2 border-ink">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-20">
            <h2 className="headline max-w-3xl text-5xl sm:text-6xl">What turns up on your phone</h2>
            <div className="mt-10">
              <TradeTabs />
            </div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-20">
            <h2 className="headline text-5xl sm:text-6xl">The deal</h2>
            <div className="mt-10">
              <Deal dark />
            </div>
          </div>
        </section>

        <section className="border-b-2 border-ink bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:py-20">
            <h2 className="headline text-5xl sm:text-6xl">Who you&apos;re dealing with</h2>
            <div className="max-w-xl space-y-4 text-lg">
              <p>
                {OPERATOR} is run by Alex Hyslop. When you apply, you deal with me, not a call centre or a
                sales team.
              </p>
              <p>
                I check every enquiry before it reaches you. If one isn&apos;t right, or something about the way
                we work doesn&apos;t suit you, tell me and I&apos;ll sort it.
              </p>
              <p>
                Email{" "}
                <a href={`mailto:${OPERATOR_CONTACT}`} className="font-medium underline underline-offset-4">
                  {OPERATOR_CONTACT}
                </a>{" "}
                any time.
              </p>
              <p className="text-slate">Alex</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <h2 className="headline text-5xl sm:text-6xl">Questions</h2>
          <dl>
            {recruitCopy.faqs.map((f) => (
              <div key={f.q} className="border-t border-ink/30 py-5 first:border-t-2 first:border-ink">
                <dt className="text-lg font-semibold">{f.q}</dt>
                <dd className="mt-1 text-slate">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t-2 border-ink bg-moss-soft">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-8">
            <p className="headline text-4xl sm:text-5xl">Want more local work?</p>
            <Link
              href="/join"
              className="inline-flex min-h-12 items-center rounded-md bg-moss px-6 font-medium text-white hover:bg-ink"
            >
              Apply to join
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-slate sm:px-8">
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <LogoMark className="h-6 w-6" />© {OPERATOR}. Local customers for Kent tradespeople.
            </p>
            <PhotoCredits photos={photoCredits} />
          </div>
          <p className="flex flex-wrap gap-5">
            <a href={`mailto:${OPERATOR_CONTACT}`} className="hover:underline">
              {OPERATOR_CONTACT}
            </a>
            <Link href="/login" className="hover:underline">
              Partner log in
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
