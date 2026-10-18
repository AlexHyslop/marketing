import Link from "next/link";
import { SERVICE_AREA, contractors } from "@/lib/demo-data";

export const metadata = { title: "Patio and garden quotes | Preview" };

const contractorName = contractors[0]?.business ?? "a local landscaper";

const field =
  "mt-1 w-full rounded-md border border-line bg-white px-3 py-2.5 text-base focus:border-moss";

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-stone">
      <div className="bg-ink px-4 py-2 text-center text-sm text-white">
        Preview of the homeowner landing page. The form isn&apos;t connected yet.{" "}
        <Link href="/dashboard" className="underline underline-offset-2">
          Back to the dashboard
        </Link>
      </div>

      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <section>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Planning a new patio or garden makeover?
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate">
            Tell us about your project and we&apos;ll pass it to one local, independent landscaper
            covering {SERVICE_AREA}, who will contact you to arrange a quote. Your details go to one
            business only, never a list.
          </p>

          <ul className="mt-8 max-w-xl space-y-4">
            <li className="border-l-4 border-moss pl-4">
              <p className="font-semibold">Patios</p>
              <p className="text-slate">Porcelain, sandstone, slate and block paving.</p>
            </li>
            <li className="border-l-4 border-sand pl-4">
              <p className="font-semibold">Garden makeovers</p>
              <p className="text-slate">Redesigns, levelling, borders, lawns and lighting.</p>
            </li>
            <li className="border-l-4 border-slate pl-4">
              <p className="font-semibold">Free, no-obligation quote</p>
              <p className="text-slate">
                You decide whether to go ahead. We don&apos;t do the work ourselves.
              </p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="form-title" className="rounded-xl border border-line bg-white p-6 sm:p-8">
          <h2 id="form-title" className="font-display text-2xl font-semibold">
            Ask for a quote
          </h2>
          <p className="mt-1 text-sm text-slate">Takes about a minute.</p>

          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="job" className="text-sm font-medium">
                What would you like done?
              </label>
              <select id="job" name="job" className={field} defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>New patio</option>
                <option>Garden makeover</option>
                <option>Patio and garden together</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="postcode" className="text-sm font-medium">
                  Postcode
                </label>
                <input id="postcode" name="postcode" autoComplete="postal-code" className={field} />
              </div>
              <div>
                <label htmlFor="timing" className="text-sm font-medium">
                  When would you like it done?
                </label>
                <select id="timing" name="timing" className={field} defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>As soon as possible</option>
                  <option>Within 3 months</option>
                  <option>Next spring</option>
                  <option>Just exploring</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Your name
              </label>
              <input id="name" name="name" autoComplete="name" className={field} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input id="email" name="email" type="email" autoComplete="email" className={field} />
              </div>
            </div>

            <div className="flex gap-3 rounded-md bg-stone p-3">
              <input id="consent" name="consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
              <label htmlFor="consent" className="text-sm">
                I agree to my details being shared with {contractorName}, a local landscaper, so
                they can contact me about this project. See the privacy notice below.
              </label>
            </div>

            <button
              type="button"
              aria-disabled="true"
              className="w-full rounded-md bg-moss px-4 py-3 font-medium text-white hover:bg-ink"
            >
              Send my project details
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl text-sm text-slate">
          <h2 className="font-display text-lg font-semibold text-ink">Privacy notice</h2>
          <p className="mt-2">
            We collect your name, contact details, postcode and project details so we can pass your
            enquiry to {contractorName}, who will contact you about a quote. We share your details
            with that business only, and only if you tick the box above. We keep enquiries for [set
            retention period] and you can ask us to see, correct or delete your details at any time
            by contacting [your contact email].
          </p>
          <p className="mt-2">
            This wording is a placeholder and needs checking against the ICO&apos;s guidance before
            the page goes live.
          </p>
        </div>
      </footer>
    </div>
  );
}
