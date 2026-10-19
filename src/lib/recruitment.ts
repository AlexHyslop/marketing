// Recruiting tradespeople with ads instead of calling them.
// Ads point at a /join page per trade; applications land in the dashboard.

import { OPERATOR, OPERATOR_CONTACT } from "./landing-pages";
import type { PhotoKey } from "./photos";

// One general page explains what we do. The trade only picks which trade
// the form starts on, so each ad set can link to its own trade.
// Public copy deliberately contains no numbers: prices are agreed per partner.

export type Trade = {
  slug: string;
  label: string;
  /** One provider, in a sentence: "plumber". */
  noun: string;
  photo: PhotoKey;
};

// Trades with their own /join page. Any other trade can still apply.
export const trades: Trade[] = [
  { slug: "plumbing", label: "Plumbing and heating", noun: "plumber", photo: "plumbing" },
  { slug: "electrical", label: "Electrical", noun: "electrician", photo: "electrical" },
  { slug: "roofing", label: "Roofing", noun: "roofer", photo: "roofing" },
  { slug: "decorating", label: "Painting and decorating", noun: "decorator", photo: "painting" },
  { slug: "carpentry", label: "Carpentry and joinery", noun: "carpenter", photo: "carpentry" },
  { slug: "landscaping", label: "Landscaping and patios", noun: "landscaper", photo: "layingPatio" },
  { slug: "car-detailing", label: "Car detailing", noun: "detailer", photo: "polishing" },
];

export const moreTrades = [
  "Building and extensions",
  "Plastering",
  "Kitchens and bathrooms",
  "Fencing and gates",
  "Driveways",
  "Gardening",
  "Cleaning",
  "Removals",
  "Locksmiths",
  "Windows and doors",
];

export function findTrade(slug: string): Trade | undefined {
  return trades.find((t) => t.slug === slug);
}

export const recruitCopy = {
  area: "Kent",
  headline: "We find you local customers. You only pay for the enquiries you get.",
  subhead: `${OPERATOR} runs adverts in your area, checks every enquiry, and sends it to one tradesperson only. No sign-up fee, no monthly fee, no contract.`,
  pay: {
    title: "What you pay for",
    paid: "Each enquiry we send you, at a price agreed before you start",
    free: [
      "Signing up",
      "The adverts we run",
      "Months when we don't send you anything",
      "Fake enquiries, or ones outside your area",
    ],
  },
  steps: [
    { title: "We advertise", detail: "Local ads on Facebook, Instagram and Google, paid for by us. Customers fill in a short form." },
    { title: "We check each enquiry", detail: "Real contact details, in your area, for work you do." },
    { title: "You get it, alone", detail: "Straight to your phone. It never goes to anyone else." },
    { title: "You pay for that enquiry", detail: "Only the ones you receive. Nothing else, ever." },
  ],
  terms: [
    "You pay a fixed price for each enquiry we send you, agreed with you before you start.",
    "Each enquiry goes to you only. We never sell it to anyone else.",
    "Fake enquiries, wrong numbers and ones outside your area are free. Just tell us soon after you get them.",
    "We invoice for the enquiries you've received, so you always know what you're paying for.",
    "Pause or leave whenever you like. No contract, no fees.",
  ],
  faqs: [
    {
      q: "How many enquiries will I get?",
      a: "It depends on your area and the season, and we don't promise a number. You can set a limit, so you never get more than you can handle.",
    },
    {
      q: "What if an enquiry is rubbish?",
      a: "If it's fake, a wrong number or outside your area, you don't pay for it. Tell us and we'll take it off your bill.",
    },
    {
      q: "Why only one tradesperson per enquiry?",
      a: "Because nobody wins work racing several others to the same phone call. It keeps every enquiry worth answering.",
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
    angle: "We find the customers",
    imageHeadline: "We find you local customers.",
    imageSub: "You only pay for the enquiries you get.",
    image: "/ads/trades-we-find-customers.png",
    primaryText:
      "Kent tradespeople: we run local adverts, check every enquiry, and send it straight to you.\n\nNo sign-up fee. No monthly fee. No contract. You only pay for the enquiries you actually receive.\n\nApply today and we'll be in touch.",
    headline: "Local customers, sent to you",
    cta: "Apply now",
    link: "/join",
    status: "Ready",
  },
  {
    id: "R2",
    audience: "Tradespeople",
    angle: "Exclusive enquiries",
    imageHeadline: "Your enquiries. Nobody else's.",
    imageSub: "Each one goes to you alone. No racing others to the same customer.",
    image: "/ads/trades-exclusive.png",
    primaryText:
      "Tired of paying for leads that go to every tradesperson in town?\n\nWe send each enquiry to one tradesperson only: a local customer, checked, with the details of the job already filled in.\n\nYou only pay for the enquiries you get. Fake ones and wrong numbers are free.",
    headline: "Enquiries that are yours alone",
    cta: "Learn more",
    link: "/join",
    status: "Ready",
  },
  {
    id: "R3",
    audience: "Tradespeople",
    angle: "Quiet months",
    imageHeadline: "Quiet months ahead?",
    imageSub: "Fill the diary with local enquiries. Pay only for the ones you get.",
    image: "/ads/trades-quiet-months.png",
    primaryText:
      "We run local adverts for your trade and pass you the enquiries, checked and ready to call.\n\nNo monthly fee and nothing to sign. You only pay for the enquiries you receive.\n\nKent tradespeople, apply today.",
    headline: "Fill your diary",
    cta: "Apply now",
    link: "/join",
    status: "Draft",
  },
];

export const recruitTargeting = {
  platform: "Facebook and Instagram",
  location: "Kent, around 25 miles from your main towns",
  audience:
    "One ad set per trade, each linking to its own page (/join/car-detailing, /join/landscaping). Target interests for that trade plus people who manage a Facebook Page. Exclude anyone who has already applied.",
  budget: "£5–£10 a day for a week, split across the two Ready ads",
  goal: "Applications. Judge on cost per approved tradesperson, not clicks.",
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
  typicalJob: string;
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
    typicalJob: "£450–£900",
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
    typicalJob: "£80–£150, valets only",
    capacity: "5 more a week",
    delivery: "Text",
    fromAd: "R1 We find the customers",
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
    typicalJob: "£600–£1,200",
    capacity: "2 more a week",
    delivery: "Text",
    fromAd: "R1 We find the customers",
    status: "Approved",
  },
];

export const recruitTargets = { applications: 10, approved: 3, active: 1 };
