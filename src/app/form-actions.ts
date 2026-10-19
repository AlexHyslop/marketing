"use server";

import { HUBSPOT_FORMS, submitToHubSpot, text, type FormState } from "@/lib/hubspot";
import { OPERATOR, OPERATOR_CONTACT, consentWording, findLandingPage } from "@/lib/landing-pages";

const SEND_FAILED = `Sorry, that didn't send. Please try again, or email us at ${OPERATOR_CONTACT}.`;

function looksLikeEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function looksLikePhone(v: string) {
  return v.replace(/[^\d]/g, "").length >= 10;
}

/** The /join application form. */
export async function submitApplication(_prev: FormState, form: FormData): Promise<FormState> {
  // Bots fill in every field, including this hidden one.
  if (text(form, "nickname")) return { ok: true };

  const name = text(form, "name");
  const email = text(form, "email");
  const phone = text(form, "phone");
  const trade = text(form, "trade");

  if (!name || !trade) return { ok: false, error: "Please tell us your name and your trade." };
  if (!looksLikePhone(phone)) return { ok: false, error: "Please check your mobile number." };
  if (!looksLikeEmail(email)) return { ok: false, error: "Please check your email address." };
  if (!form.get("terms") || !form.get("contact")) {
    return { ok: false, error: "Please tick both boxes so we can process your application." };
  }

  const [firstname, ...rest] = name.split(/\s+/);
  const ok = await submitToHubSpot({
    formGuid: HUBSPOT_FORMS.partnerApplication,
    pageName: "Apply to join",
    consentText: `${OPERATOR} can contact me about this application, and I can ask for my details to be deleted at ${OPERATOR_CONTACT}.`,
    fields: {
      firstname,
      lastname: rest.join(" "),
      company: text(form, "business"),
      email,
      phone,
      website: text(form, "website"),
      ks_trade: trade,
      ks_area_covered: text(form, "area"),
      ks_wants_more: text(form, "wantMore"),
      ks_capacity: text(form, "capacity"),
      ks_delivery: text(form, "delivery"),
      ks_contact_type: "Partner applicant",
      ks_landing_page: text(form, "page") || "/join",
    },
  });

  return ok ? { ok: true } : { ok: false, error: SEND_FAILED };
}

/** The homeowner enquiry form on the /q/* landing pages. */
export async function submitEnquiry(_prev: FormState, form: FormData): Promise<FormState> {
  if (text(form, "nickname")) return { ok: true };

  const page = findLandingPage(text(form, "page"));
  if (!page) return { ok: false, error: SEND_FAILED };

  const name = text(form, "name");
  const phone = text(form, "phone");
  const email = text(form, "email");

  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!looksLikePhone(phone)) return { ok: false, error: "Please check your phone number." };
  if (email && !looksLikeEmail(email)) return { ok: false, error: "Please check your email address." };
  if (!form.get("consent")) return { ok: false, error: "Please tick the box so we can pass your enquiry on." };

  const details = page.fields
    .map((f) => {
      const v = text(form, f.id);
      return v ? `${f.label} ${v}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const ok = await submitToHubSpot({
    formGuid: HUBSPOT_FORMS.customerEnquiry,
    pageName: `${page.trade} in ${page.area}`,
    consentText: consentWording(page),
    fields: {
      firstname: name,
      email,
      phone,
      zip: text(form, "postcode"),
      ks_trade: page.trade,
      ks_enquiry_details: details,
      ks_contact_type: "Customer",
      ks_landing_page: `/q/${page.slug}`,
    },
  });

  return ok ? { ok: true } : { ok: false, error: SEND_FAILED };
}
