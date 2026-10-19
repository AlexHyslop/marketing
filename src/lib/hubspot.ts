import { cookies, headers } from "next/headers";

// Form submissions go to HubSpot's public Forms API. No API key is needed:
// the portal and form IDs are the same ones any HubSpot embed exposes.
// Forms live at app-eu1.hubspot.com/forms/148195857.

export const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? "148195857";

export const HUBSPOT_FORMS = {
  partnerApplication: process.env.HUBSPOT_FORM_PARTNER ?? "c05d3f5f-6512-42c8-86ff-0715947f311c",
  customerEnquiry: process.env.HUBSPOT_FORM_CUSTOMER ?? "58993b36-844b-48ab-b99a-b41c669e85ee",
} as const;

export type FormState = { ok: true } | { ok: false; error: string } | null;

type Field = { name: string; value: string };

export async function submitToHubSpot({
  formGuid,
  fields,
  pageName,
  consentText,
}: {
  formGuid: string;
  fields: Record<string, string | undefined>;
  pageName: string;
  consentText: string;
}): Promise<boolean> {
  const h = await headers();
  const c = await cookies();

  const list: Field[] = Object.entries(fields)
    .filter(([, v]) => v && v.trim() !== "")
    .map(([name, value]) => ({ name, value: value!.trim().slice(0, 2000) }));

  const context: Record<string, string> = { pageName };
  const pageUri = h.get("referer");
  if (pageUri) context.pageUri = pageUri;
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) context.ipAddress = ip;
  const hutk = c.get("hubspotutk")?.value;
  if (hutk) context.hutk = hutk;

  const url = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formGuid}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: list,
        context,
        legalConsentOptions: { consent: { consentToProcess: true, text: consentText } },
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("HubSpot submission failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpot submission error", err);
    return false;
  }
}

export function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}
