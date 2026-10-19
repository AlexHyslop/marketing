// Recruiting tradespeople with ads instead of calling them.
// Ads point at a /join page per trade; applications land in the dashboard.

import { OPERATOR, OPERATOR_CONTACT } from "./landing-pages";

// One general page explains what we do. The trade only changes a few words:
// the example job, and which trade the form starts on.

export type Trade = {
  slug: string;
  label: string;
  /** One provider, in a sentence: "detailer". */
  noun: string;
  /** A realistic job for the worked example. */
  exampleJob: { name: string; price: number };
};

export const trades: Trade[] = [
  { slug: "car-detailing", label: "Car detailing", noun: "detailer", exampleJob: { name: "ceramic coating", price: 600 } },
  { slug: "landscaping", label: "Landscaping and patios", noun: "landscaper", exampleJob: { name: "new patio", price: 7500 } },
];

export function findTrade(slug: string): Trade | undefined {
  return trades.find((t) => t.slug === slug);
}

export const recruitCopy = {
  area: "Kent",
  headline: "We find you local customers. You pay 10% when you win the job.",
  subhead: `${OPERATOR} runs adverts in your area, checks every enquiry, and sends it to one tradesperson only. No sign-up fee, no monthly fee, no paying for leads.`,
  steps: [
    { title: "We advertise", detail: "Local ads on Facebook, Instagram and Google, paid for by us." },
    { title: "We check each enquiry", detail: "Real contact details, in your area, for work you do." },
    { title: "You get it, alone", detail: "Straight to your phone. It never goes to anyone else." },
    { title: "You do the job", detail: "Then pay us 10% of the final price. No job, nothing to pay." },
  ],
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
      a: "It costs you nothing, because you only pay on jobs you do. Tell us anyway so we can tighten the ads.",
    },
    {
      q: "Why only one tradesperson per enquiry?",
      a: "Because nobody wins jobs racing four others to the same phone call. It keeps the enquiries worth answering.",
    },
    {
      q: "Who's behind this?",
      a: `${OPERATOR}, a small Kent business. Email ${OPERATOR_CONTACT} with any questions.`,
    },
  ],
};

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
