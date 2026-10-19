// One config per landing page. The template in src/components/landing renders
// any of these, so a new trade or area is a new entry here, not new code.
// Later the Marketer agent drafts these from call notes for you to approve.

export type FormField =
  | {
      id: string;
      label: string;
      type: "select";
      options: string[];
      half?: boolean;
    }
  | {
      id: string;
      label: string;
      type: "text" | "tel" | "email";
      autoComplete?: string;
      placeholder?: string;
      half?: boolean;
    };

export type Theme = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentInk: string;
  /** Hero artwork drawn in code, until the partner's own job photos are added. */
  art: "paving" | "gloss";
};

export type Brand =
  /** The page carries the partner's own name, with their permission. */
  | { mode: "partner"; name: string }
  /** A local brand you run, which passes enquiries to a named partner. */
  | { mode: "local"; name: string };

export type LandingPage = {
  slug: string;
  trade: string;
  /** What to call one provider in sentences, e.g. "landscaper". */
  providerNoun: string;
  area: string;
  status: "Draft" | "Ready to launch" | "Live";
  brand: Brand;
  /** The partner who receives every enquiry. Null until one has signed. */
  partner: string | null;
  headline: string;
  subhead: string;
  promises: string[];
  services: { name: string; detail: string }[];
  steps: string[];
  faqs: { q: string; a: string }[];
  formTitle: string;
  fields: FormField[];
  responseTime: string;
  theme: Theme;
};

/** Your trading name, shown in the privacy notice on every page. */
export const OPERATOR = "Kent Services";
export const OPERATOR_CONTACT = "hello@kentservices.uk";

export const landingPages: LandingPage[] = [
  {
    slug: "patios",
    trade: "Patios and garden makeovers",
    providerNoun: "landscaper",
    area: "Kent",
    status: "Ready to launch",
    brand: { mode: "partner", name: "Fieldstone Patios" },
    partner: "Fieldstone Patios",
    headline: "New patios, laid properly.",
    subhead:
      "Porcelain, sandstone and slate patios across north Kent, from the groundwork up. Tell us about your garden and we'll arrange a free visit and a fixed quote.",
    promises: ["Free visit and fixed quote", "Proper sub-base, not just sand", "Quick, friendly reply"],
    services: [
      { name: "Porcelain patios", detail: "Hard-wearing, low-maintenance and frost-proof. Laid on a full mortar bed." },
      { name: "Natural stone", detail: "Indian sandstone and slate, cut and pointed to suit older homes." },
      { name: "Garden makeovers", detail: "Levelling, steps, borders and lighting, planned around the patio." },
    ],
    steps: [
      "Tell us what you have in mind. It takes about a minute.",
      "We call to arrange a visit at a time that suits you.",
      "You get a fixed written quote. No pressure, no obligation.",
    ],
    faqs: [
      {
        q: "How much does a new patio cost?",
        a: "It depends on size, material and groundwork. The visit gives you an exact, fixed figure, with no obligation."
      },
      {
        q: "How long does it take?",
        a: "It depends on size and the weather. You get a clear timeline with your quote.",
      },
      {
        q: "When can you start?",
        a: "We're booking spring work now. Ask on the call and we'll give you the next available dates.",
      },
    ],
    formTitle: "Get a free quote",
    fields: [
      {
        id: "job",
        label: "What would you like done?",
        type: "select",
        options: ["New patio", "Garden makeover", "Patio and garden together"],
      },
      { id: "postcode", label: "Postcode", type: "text", autoComplete: "postal-code", half: true },
      {
        id: "timing",
        label: "When?",
        type: "select",
        options: ["As soon as possible", "In the next few months", "Next spring", "Just exploring"],
        half: true,
      },
    ],
    responseTime: "a working day",
    theme: {
      bg: "#f1efe8",
      surface: "#ffffff",
      ink: "#1f2a22",
      muted: "#4b554d",
      line: "#d6d3c6",
      accent: "#3f5e32",
      accentInk: "#ffffff",
      art: "paving",
    },
  },
  {
    slug: "car-detailing",
    trade: "Car detailing and paint protection",
    providerNoun: "detailer",
    area: "Kent",
    status: "Draft",
    brand: { mode: "local", name: "Kent Paint Protection" },
    partner: null,
    headline: "Make it look better than the day you bought it.",
    subhead:
      "Ceramic coating, paint correction and full detailing, at your home or at the unit. Tell us about your car and a local specialist will send you a price.",
    promises: ["Price before you commit", "Mobile or at the unit", "Reply the same day"],
    services: [
      { name: "Ceramic coating", detail: "Years of gloss and protection. Water beads off and washing takes minutes." },
      { name: "Paint correction", detail: "Swirls, scratches and dull paint machine-polished out before protection." },
      { name: "Enhancement detail", detail: "A deep clean inside and out with a one-step polish. Ideal before selling." },
    ],
    steps: [
      "Tell us about the car and what you'd like done.",
      "A local detailer sends you a price, often with a few photos of similar cars.",
      "Pick a date. Most work is done in a day; some coatings take longer.",
    ],
    faqs: [
      {
        q: "How much does ceramic coating cost?",
        a: "It depends on the car's size and how much correction the paint needs first. You'll get an exact price before booking.",
      },
      {
        q: "Can it be done at my house?",
        a: "Most detailing can. Coatings need a dry, covered space, so in winter those are usually done at the unit.",
      },
      {
        q: "Is it worth it on a new car?",
        a: "New cars are the best time: the paint is at its best, so less correction is needed before coating.",
      },
    ],
    formTitle: "Get a price",
    fields: [
      {
        id: "service",
        label: "What are you after?",
        type: "select",
        options: ["Ceramic coating", "Paint correction", "Enhancement detail", "Not sure, advise me"],
      },
      { id: "vehicle", label: "Make and model", type: "text", placeholder: "e.g. Ford Focus", half: true },
      {
        id: "condition",
        label: "Paint condition",
        type: "select",
        options: ["New or nearly new", "Some swirls or scratches", "Needs a lot of work"],
        half: true,
      },
      { id: "postcode", label: "Postcode", type: "text", autoComplete: "postal-code", half: true },
      {
        id: "where",
        label: "Where?",
        type: "select",
        options: ["At my home", "At their unit", "Either"],
        half: true,
      },
    ],
    responseTime: "the same day",
    theme: {
      bg: "#101418",
      surface: "#1a2027",
      ink: "#eef2f5",
      muted: "#a9b4bd",
      line: "#2c353e",
      accent: "#5fd0c4",
      accentInk: "#0b1316",
      art: "gloss",
    },
  },
];

export function findLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}

export function consentWording(page: LandingPage): string {
  const partner = page.partner ?? "[partner name]";
  if (page.brand.mode === "partner") {
    return `I agree to ${partner} contacting me about this quote. See the privacy notice below.`;
  }
  return `I agree to ${OPERATOR} passing my details to ${partner}, a local ${page.providerNoun}, so they can contact me about this quote. See the privacy notice below.`;
}

/** Checks a page must pass before it can go live. */
export function launchChecks(page: LandingPage) {
  return [
    {
      label: "A signed partner is named",
      ok: page.partner !== null,
      fix: "Sign up a partner and add their name to this page.",
    },
    {
      label: "Consent names who receives the details",
      ok: page.partner !== null,
      fix: "Happens automatically once a partner is named.",
    },
    {
      label: "Partner has approved how their name is used",
      ok: page.brand.mode === "local" || page.status !== "Draft",
      fix: "Show them the page and get a yes in writing.",
    },
    {
      label: "Privacy notice names who runs the page",
      ok: OPERATOR.length > 0,
      fix: "Set your trading name.",
    },
    {
      label: "No claims the partner hasn't confirmed",
      ok: page.status !== "Draft",
      fix: "Check prices, reply times and promises with the partner.",
    },
  ];
}
