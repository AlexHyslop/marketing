import Link from "next/link";
import { FindBusinesses } from "@/components/find-businesses";
import { PageHeader } from "@/components/ui";
import { sourcesConfigured } from "@/lib/prospecting/sources";
import { trades } from "@/lib/prospecting/trades";

export const metadata = { title: "Research an area | Lead desk" };

// Reads the environment on each request, so adding a key takes effect on the next deploy.
export const dynamic = "force-dynamic";

export default function ResearchPage() {
  const configured = sourcesConfigured();
  const anyReady = configured.google || configured.companiesHouse;

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Research an area"
          intro="See which tradespeople already work in an area and how well reviewed they are, before you spend on ads there. Save the strongest ones to compare with who applies."
        />
        <Link href="/dashboard/applications" className="text-sm text-slate underline underline-offset-2">
          Back to applications
        </Link>
      </div>

      {!anyReady ? (
        <p className="mb-6 max-w-3xl rounded-md border border-dashed border-sand bg-sand-soft/60 px-4 py-2.5 text-sm text-[#5e4617]">
          No search source is connected yet. Add a key using the steps at the bottom of this page, then
          redeploy.
        </p>
      ) : null}

      <FindBusinesses trades={trades} configured={configured} />

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">Connecting the sources</h2>

        <div className="mt-4 rounded-lg border border-line bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">Google Places</h3>
            <span className={configured.google ? "text-sm font-medium text-moss" : "text-sm text-clay-red"}>
              {configured.google ? "Connected" : "Not connected"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate">
            Best coverage, including sole traders and mobile businesses, with phone numbers, websites and
            reviews. Searches that include phone numbers bill at Google&apos;s Enterprise rate, with a free
            monthly allowance; check the current figure on Google&apos;s pricing page.
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
            <li>In Google Cloud Console, create a project and add a billing account.</li>
            <li>Enable <span className="font-medium">Places API (New)</span>.</li>
            <li>Create an API key and restrict it to Places API (New).</li>
            <li>
              Under quotas, cap Text Search at around 50 requests a day, and set a budget alert. This stops
              surprise bills.
            </li>
            <li>
              In Vercel, add it as <code className="rounded bg-stone px-1">GOOGLE_PLACES_API_KEY</code> under
              Settings, Environment Variables, then redeploy.
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate">
            Google&apos;s terms only allow the place ID to be stored, so your list keeps IDs and looks up the
            latest name and number each time you view it.
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-line bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">Companies House</h3>
            <span
              className={configured.companiesHouse ? "text-sm font-medium text-moss" : "text-sm text-clay-red"}
            >
              {configured.companiesHouse ? "Connected" : "Not connected"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate">
            Free and official, searched by industry code. Only limited companies, and no phone numbers, so
            use it to find names to look up.
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
            <li>Register on the Companies House developer hub.</li>
            <li>Create an application and add a REST API key for it.</li>
            <li>
              In Vercel, add it as <code className="rounded bg-stone px-1">COMPANIES_HOUSE_API_KEY</code>, then
              redeploy.
            </li>
          </ol>
        </div>


      </section>
    </div>
  );
}
