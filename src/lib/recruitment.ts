// Recruiting tradespeople with ads instead of calling them.
// Ads point at a /join page per trade; applications land in the dashboard.

import { OPERATOR, OPERATOR_CONTACT } from "./landing-pages";

export type RecruitPage = {
  slug: string;
  trade: string;
  providerNoun: string;
  area: string;
  headline: string;
  subhead: string;
  points: { title: string; detail: string }[];
  services: string[];
  terms: string[];
  faqs: { q: string; a: string }[];
};

export const recruitPages: RecruitPage[] = [
  {
    slug: "car-detailing",
    trade: "Car detailing",
    providerNoun: "detailer",
    area: "Kent",
    headline: "More coating and correction bookings. Nothing to pay upfront.",
    subhead: `${OPERATOR} runs local ads for ceramic coating and paint correction, then sends the enquiries to one detailer per area. No monthly fee and no paying per lead: you pay 10% of jobs you actually do.`,
    points: [
      {
        title: "Enquiries, not a directory",
        detail: "Homeowners fill in their car, paint condition and postcode. You get their details by text the moment they're checked.",
      },
      {
        title: "Yours alone",
        detail: "Each enquiry goes to one detailer only. You're never racing three others to the same customer.",
      },
      {
        title: "Pay only on work done",
        detail: "10% of the final price once the job's finished. If an enquiry doesn't turn into a booking, it costs you nothing.",
      },
    ],
    services: ["Ceramic coating", "Paint correction", "Enhancement detail", "Full valet", "Interior detail", "PPF or wrap"],
    terms: [
      "10% of the final price of any job you win from one of our enquiries, including later work for the same customer within 12 months.",
      "Tell us within 14 days whether you quoted, won or lost, and the final price.",
      "Invoiced when the job's finished, due within 14 days.",
      "Pause or leave whenever you like. No contract length, no fees.",
    ],
    faqs: [
      {
        q: "How many enquiries will I get?",
        a: "It depends on your area and the season, and we don't promise a number. Early on, expect a handful a month while we tune the ads.",
      },
      {
        q: "What if an enquiry is rubbish?",
        a: "You only pay on jobs you do, so a bad enquiry costs you nothing. Tell us anyway so we can tighten the ads.",
      },
      {
        q: "Who's behind this?",
        a: `${OPERATOR}, a small Kent business. Email ${OPERATOR_CONTACT} with any questions.`,
      },
    ],
  },
];

export function findRecruitPage(slug: string) {
  return recruitPages.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Advert drafts
// ---------------------------------------------------------------------------

export type AdDraft = {
  id: string;
  audience: "Tradespeople" | "Homeowners";
  trade: string;
  angle: string;
  /** The big words on the image. */
  imageHeadline: string;
  imageSub: string;
  image: string;
  primaryText: string;
  headline: string;
  cta: string;
  link: string;
  status: "Draft" | "Ready" | "Live" | "Paused";
};

export const adDrafts: AdDraft[] = [
  {
    id: "R1",
    audience: "Tradespeople",
    trade: "Car detailing",
    angle: "No upfront cost",
    imageHeadline: "More coating bookings.",
    imageSub: "Nothing to pay unless you do the job.",
    image: "/ads/detailers-no-upfront.png",
    primaryText:
      "Detailers in Kent: we run local ads for ceramic coating and paint correction and send the enquiries to one detailer per area.\n\nNo monthly fee. No paying per lead. You pay 10% of jobs you actually do.\n\nTaking on a few detailers to start. Apply in two minutes.",
    headline: "Get more coating jobs in Kent",
    cta: "Apply now",
    link: "/join/car-detailing",
    status: "Ready",
  },
  {
    id: "R2",
    audience: "Tradespeople",
    trade: "Car detailing",
    angle: "Exclusive enquiries",
    imageHeadline: "Your enquiries. Nobody else's.",
    imageSub: "One detailer per area. No bidding against four others.",
    image: "/ads/detailers-exclusive.png",
    primaryText:
      "Tired of paying for leads that go to every detailer in town?\n\nWe send each enquiry to one detailer only: a homeowner near you who wants coating or correction, with their car and paint condition already filled in.\n\nYou pay 10% of the jobs you win, and nothing for the ones you don't.",
    headline: "Exclusive detailing enquiries",
    cta: "Learn more",
    link: "/join/car-detailing",
    status: "Ready",
  },
  {
    id: "R3",
    audience: "Tradespeople",
    trade: "Car detailing",
    angle: "Winter diary",
    imageHeadline: "Quiet winter ahead?",
    imageSub: "Fill the diary with coating and correction work.",
    image: "/ads/detailers-winter.png",
    primaryText:
      "Winter is when people book paint correction and get a coating on before the salt hits.\n\nWe run the ads and pass you enquiries from homeowners near you. You only pay 10% when a job's done.\n\nKent detailers, apply in two minutes.",
    headline: "Fill your winter diary",
    cta: "Apply now",
    link: "/join/car-detailing",
    status: "Draft",
  },
];

export const recruitTargeting = {
  platform: "Facebook and Instagram",
  location: "Kent, 25 miles around your main towns",
  audience:
    "Interests such as auto detailing, car care, ceramic coating and valeting businesses, with people who manage a Facebook Page. Exclude anyone who has already applied.",
  budget: "£5–£10 a day for 7 days, split across the two Ready ads",
  goal: "Applications. Judge on cost per approved detailer, not clicks.",
  note: "Avoid job-ad language such as 'hiring' or 'vacancy'. This is a business offer, and wording it as a job can put the ad into Meta's restricted employment category.",
};

// ---------------------------------------------------------------------------
// Applications from tradespeople (demo)
// ---------------------------------------------------------------------------

export type ApplicationStatus = "New" | "Approved" | "Declined" | "Active";

export type Application = {
  id: string;
  received: string;
  business: string;
  name: string;
  phone: string;
  town: string;
  radius: string;
  setup: "Mobile" | "Unit" | "Both";
  services: string[];
  coatingPrice: string;
  capacity: string;
  delivery: string;
  instagram?: string;
  fromAd: string;
  status: ApplicationStatus;
  /** Why it may be a poor fit, from the rules. */
  flag?: string;
};

export const applications: Application[] = [
  {
    id: "AP-14",
    received: "Mon 19 Oct, 09:12",
    business: "Gloss Lab Detailing",
    name: "Ryan",
    phone: "01632 960 211",
    town: "Maidstone",
    radius: "15 miles",
    setup: "Both",
    services: ["Ceramic coating", "Paint correction", "Enhancement detail"],
    coatingPrice: "£450–£900",
    capacity: "3 more a week",
    delivery: "WhatsApp",
    instagram: "@glosslab.example",
    fromAd: "R2 Exclusive enquiries",
    status: "New",
  },
  {
    id: "AP-13",
    received: "Sun 18 Oct, 20:47",
    business: "Medway Mobile Valeting",
    name: "Kerry",
    phone: "01632 960 377",
    town: "Gillingham",
    radius: "10 miles",
    setup: "Mobile",
    services: ["Full valet", "Interior detail"],
    coatingPrice: "Doesn't offer coatings",
    capacity: "5 more a week",
    delivery: "Text",
    fromAd: "R1 No upfront cost",
    status: "New",
    flag: "Doesn't offer coating or correction, which is what the homeowner ads sell.",
  },
  {
    id: "AP-12",
    received: "Sun 18 Oct, 11:05",
    business: "Weald Paint Studio",
    name: "Tom",
    phone: "01632 960 418",
    town: "Tonbridge",
    radius: "20 miles",
    setup: "Unit",
    services: ["Ceramic coating", "Paint correction", "PPF or wrap"],
    coatingPrice: "£600–£1,200",
    capacity: "2 more a week",
    delivery: "Text",
    fromAd: "R1 No upfront cost",
    status: "Approved",
  },
];

export const recruitTargets = { applications: 10, approved: 3, active: 1 };
