// Demo data so we can agree the flow of work before connecting a database.
// Business names are invented. Phone numbers use Ofcom's 01632 960xxx range,
// which is reserved for drama and never connects to a real line.

export const SERVICE_AREA = "your area";

// ---------------------------------------------------------------------------
// Stages of the business and the flow of work
// ---------------------------------------------------------------------------

export type When = "Now" | "Next" | "Later";

export type Stage = {
  name: string;
  summary: string;
  when: When;
};

export const stages: Stage[] = [
  {
    name: "Find contractors",
    summary: "Sign up landscapers who'll pay for leads, before any ads run.",
    when: "Now",
  },
  {
    name: "Bring in enquiries",
    summary: "Ads and the landing page bring homeowners; rules check each enquiry.",
    when: "Next",
  },
  {
    name: "Close the loop",
    summary: "Find out what happened, get paid and learn what to change.",
    when: "Later",
  },
];

export type WorkflowStep = {
  stage: number;
  title: string;
  owner: string;
  ownerKind: "You" | "Rules" | "AI" | "Homeowner";
  detail: string;
  href?: string;
};

export const workflow: WorkflowStep[] = [
  {
    stage: 0,
    title: "Build the call list",
    owner: "You",
    ownerKind: "You",
    detail: "Local landscapers with phone, area and services. The Prospector writes call briefs later.",
    href: "/dashboard/calls",
  },
  {
    stage: 0,
    title: "Call landscapers",
    owner: "You",
    ownerKind: "You",
    detail: "Find out which jobs they want and what makes a lead worth paying for.",
    href: "/dashboard/calls/session",
  },
  {
    stage: 0,
    title: "Agree trial terms in writing",
    owner: "You",
    ownerKind: "You",
    detail: "Lead criteria, price, weekly cap, dispute window and payment.",
    href: "/dashboard/contractors",
  },
  {
    stage: 1,
    title: "Landing page and ads go live",
    owner: "You",
    ownerKind: "You",
    detail: "The Marketer drafts ads and suggests budgets. You approve all spend.",
    href: "/quote",
  },
  {
    stage: 1,
    title: "Homeowner asks for a quote",
    owner: "Homeowner",
    ownerKind: "Homeowner",
    detail: "Job, postcode, timing, contact details and consent to share with a named landscaper.",
    href: "/quote",
  },
  {
    stage: 1,
    title: "Lead checks",
    owner: "Rules",
    ownerKind: "Rules",
    detail: "Consent recorded, postcode in area, job type agreed, not a duplicate. Instant, no AI. Anything unclear comes to you.",
    href: "/dashboard/leads",
  },
  {
    stage: 1,
    title: "Lead sent to the contractor",
    owner: "Rules",
    ownerKind: "Rules",
    detail: "One contractor per lead, within their weekly cap, by their chosen method.",
    href: "/dashboard/leads",
  },
  {
    stage: 2,
    title: "Contractor reports the outcome",
    owner: "Follow-up",
    ownerKind: "AI",
    detail: "Asks a few days later: contacted, quoted, won or lost.",
    href: "/dashboard/leads",
  },
  {
    stage: 2,
    title: "Billing and the weekly numbers",
    owner: "Analyst",
    ownerKind: "AI",
    detail: "Credits and invoices follow the agreed rules; you approve money. The Analyst writes the report.",
    href: "/dashboard/activity",
  },
];

// The plan's first-week targets for finding contractors.
export const stageOneTargets = {
  prospects: 20,
  conversations: 5,
  interested: 3,
  trials: 1,
};

// ---------------------------------------------------------------------------
// Contractor calls
// ---------------------------------------------------------------------------

export type CallStatus =
  | "Not called"
  | "No answer"
  | "Call back"
  | "Interested"
  | "Trial agreed"
  | "Not interested";

export type Prospect = {
  id: string;
  business: string;
  contact: string;
  phone: string;
  area: string;
  services: string;
  status: CallStatus;
  tpsChecked: boolean;
  brief: string;
  wants?: string;
  typicalJob?: string;
  notes?: string;
  nextStep?: string;
  /** Days from today the next step is due. Negative means overdue. */
  dueInDays?: number;
};

export const prospects: Prospect[] = [
  {
    id: "P-03",
    business: "Hollow Lane Landscaping",
    contact: "Mark",
    phone: "01632 960 338",
    area: "East villages",
    services: "Fencing, turf, patios",
    status: "Call back",
    tpsChecked: true,
    brief: "Small team, mostly fencing and turf. Patio photos on their Facebook page from this summer.",
    notes: "On a job last time, asked to call after 4pm.",
    nextStep: "Call after 4pm",
    dueInDays: 0,
  },
  {
    id: "P-08",
    business: "Greenway Outdoor Spaces",
    contact: "Unknown",
    phone: "01632 960 858",
    area: "East villages",
    services: "Garden makeovers",
    status: "Not called",
    tpsChecked: true,
    brief: "Limited company, two directors. Website shows full garden makeovers and planting.",
    nextStep: "First call",
    dueInDays: 0,
  },
  {
    id: "P-01",
    business: "Fieldstone Patios",
    contact: "Dan",
    phone: "01632 960 101",
    area: "North of town",
    services: "Patios, driveways",
    status: "Trial agreed",
    tpsChecked: true,
    brief: "Patio specialist, strong reviews, quiet in the winter months.",
    wants: "Porcelain and sandstone patios over 20m²",
    typicalJob: "£6k–£12k",
    notes: "Wants to fill the spring diary early. Prefers leads by SMS.",
    nextStep: "Send trial terms, then call to confirm",
    dueInDays: -1,
  },
  {
    id: "P-02",
    business: "Oak & Bramble Gardens",
    contact: "Priya",
    phone: "01632 960 214",
    area: "Town centre",
    services: "Garden makeovers, planting",
    status: "Interested",
    tpsChecked: true,
    brief: "Design-led, higher-end makeovers. Previously listed on a directory site.",
    wants: "Full garden redesigns",
    typicalJob: "£10k+",
    notes: "Burnt by shared leads before. Exclusivity matters to her.",
    nextStep: "Call back with price per lead",
    dueInDays: 1,
  },
  {
    id: "P-04",
    business: "Brookside Garden Design",
    contact: "Unknown",
    phone: "01632 960 452",
    area: "West side",
    services: "Design, hard landscaping",
    status: "No answer",
    tpsChecked: true,
    brief: "Sole trader. Instagram shows patios and raised beds.",
    nextStep: "Try again",
    dueInDays: 1,
  },
  {
    id: "P-06",
    business: "Meadowbank Gardens",
    contact: "Unknown",
    phone: "01632 960 629",
    area: "South villages",
    services: "Maintenance, makeovers",
    status: "Not called",
    tpsChecked: false,
    brief: "Mostly maintenance contracts; some makeovers listed.",
    nextStep: "Screen against TPS, then call",
    dueInDays: 2,
  },
  {
    id: "P-07",
    business: "Kestrel Landscapes",
    contact: "Unknown",
    phone: "01632 960 744",
    area: "Town centre",
    services: "Patios, decking",
    status: "Not called",
    tpsChecked: false,
    brief: "Patios and decking. New business, few reviews yet, so may be hungry for work.",
    nextStep: "Screen against TPS, then call",
    dueInDays: 2,
  },
  {
    id: "P-05",
    business: "Ridgeline Hard Landscaping",
    contact: "Steve",
    phone: "01632 960 517",
    area: "North of town",
    services: "Patios, retaining walls",
    status: "Not interested",
    tpsChecked: true,
    brief: "Established firm with a long waiting list.",
    notes: "Booked until summer from recommendations.",
    nextStep: "Check back in spring",
    dueInDays: 134,
  },
];

export const callStatuses: CallStatus[] = [
  "Not called",
  "No answer",
  "Call back",
  "Interested",
  "Trial agreed",
  "Not interested",
];

export function dueLabel(days?: number): string {
  if (days === undefined) return "No date";
  if (days < 0) return days === -1 ? "Overdue by a day" : `Overdue by ${-days} days`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 14) return `In ${days} days`;
  return `In ${Math.round(days / 7)} weeks`;
}

export function byDue(a: Prospect, b: Prospect): number {
  return (a.dueInDays ?? 9999) - (b.dueInDays ?? 9999);
}

export function callsDueToday(): Prospect[] {
  return prospects
    .filter((p) => p.dueInDays !== undefined && p.dueInDays <= 0 && p.status !== "Not interested")
    .sort(byDue);
}

export const callScript = {
  opening:
    "Hi, is that [name]? I'm [your name]. I'm looking at bringing more patio and garden renovation enquiries to a few landscapers around [area]. Are you taking on more projects at the moment?",
  questions: [
    "What jobs would you most like more of?",
    "Where does most of your work come from now?",
    "What's a typical job worth to you?",
    "What would make an enquiry worth paying for?",
    "Would you be open to testing a small number of leads?",
  ],
  pitch:
    "I'm setting up local advertising to bring in genuine homeowner enquiries, and I'm looking for a few landscapers to test it with. You'd only pay for leads that meet criteria we agree upfront.",
};

// ---------------------------------------------------------------------------
// Contractors (buyers)
// ---------------------------------------------------------------------------

export type Contractor = {
  id: string;
  business: string;
  contact: string;
  status: "Trial agreed" | "Terms sent" | "Active" | "Paused";
  jobTypes: string;
  areas: string;
  pricePerLead: string;
  weeklyCap: number;
  delivery: string;
  disputeWindow: string;
  payment: string;
  termsSigned: boolean;
};

export const contractors: Contractor[] = [
  {
    id: "C-01",
    business: "Fieldstone Patios",
    contact: "Dan",
    status: "Terms sent",
    jobTypes: "Patios over 20m², porcelain or sandstone",
    areas: "Postcode districts to agree",
    pricePerLead: "£50 (to confirm)",
    weeklyCap: 5,
    delivery: "SMS, then email copy",
    disputeWindow: "72 hours",
    payment: "Prepaid credits, 5 at a time",
    termsSigned: false,
  },
];

// ---------------------------------------------------------------------------
// Homeowner leads
// ---------------------------------------------------------------------------

export type LeadStatus =
  | "New"
  | "Needs review"
  | "Sent"
  | "Contacted"
  | "Quoted"
  | "Won"
  | "Lost"
  | "Rejected";

export type Lead = {
  id: string;
  received: string;
  name: string;
  postcode: string;
  jobType: string;
  timing: string;
  budget: string;
  consent: boolean;
  status: LeadStatus;
  assignedTo?: string;
  note?: string;
};

export const leads: Lead[] = [
  {
    id: "L-1006",
    received: "Sun 18 Oct, 14:05",
    name: "James O.",
    postcode: "AB9 9",
    jobType: "Garden makeover",
    timing: "This year",
    budget: "Not sure",
    consent: true,
    status: "Needs review",
    note: "Postcode may be outside Fieldstone's area.",
  },
  {
    id: "L-1007",
    received: "Sun 18 Oct, 19:42",
    name: "Sarah T.",
    postcode: "AB1 2",
    jobType: "Patio repair",
    timing: "Spring",
    budget: "£2k–£5k",
    consent: true,
    status: "Needs review",
    note: "Repair work isn't clearly in the agreed job types.",
  },
  {
    id: "L-1005",
    received: "Sat 17 Oct, 10:31",
    name: "Helen R.",
    postcode: "AB1 4",
    jobType: "New patio",
    timing: "Within 3 months",
    budget: "£10k+",
    consent: true,
    status: "Sent",
    assignedTo: "Fieldstone Patios",
  },
  {
    id: "L-1004",
    received: "Fri 16 Oct, 21:17",
    name: "Tom W.",
    postcode: "AB1 3",
    jobType: "New patio",
    timing: "Spring",
    budget: "£5k–£10k",
    consent: true,
    status: "Quoted",
    assignedTo: "Fieldstone Patios",
  },
  {
    id: "L-1003",
    received: "Thu 15 Oct, 08:56",
    name: "Asif K.",
    postcode: "AB1 2",
    jobType: "Fence repair",
    timing: "ASAP",
    budget: "Under £2k",
    consent: true,
    status: "Rejected",
    note: "Fencing isn't in the agreed criteria.",
  },
  {
    id: "L-1002",
    received: "Wed 14 Oct, 17:20",
    name: "Test lead",
    postcode: "AB1 1",
    jobType: "New patio",
    timing: "Spring",
    budget: "£5k–£10k",
    consent: false,
    status: "Rejected",
    note: "No consent recorded, so it can't be shared.",
  },
];

export const leadStatuses: LeadStatus[] = [
  "New",
  "Needs review",
  "Sent",
  "Contacted",
  "Quoted",
  "Won",
  "Lost",
  "Rejected",
];

// ---------------------------------------------------------------------------
// Rules and AI agents
// ---------------------------------------------------------------------------

export type AgentMode = "Not built" | "Proposes" | "Acts";

export type Worker = {
  name: string;
  kind: "Rules" | "AI";
  job: string;
  runs: string;
  mode: AgentMode;
  when: When;
  canDo: string[];
  rules: string[];
};

export const workers: Worker[] = [
  {
    name: "Lead checks",
    kind: "Rules",
    job: "Checks every enquiry the moment it arrives.",
    runs: "When a form is submitted",
    mode: "Not built",
    when: "Next",
    canDo: ["Save a lead", "Reject with a reason", "Send to your review"],
    rules: [
      "Rejects anything without recorded consent.",
      "Postcode must be in the contractor's agreed area.",
      "Job type must match the agreed list.",
      "Same phone or email within 30 days counts as a duplicate.",
      "Never changes what the homeowner wrote.",
    ],
  },
  {
    name: "Lead delivery",
    kind: "Rules",
    job: "Sends each checked lead to the right contractor and confirms to the homeowner.",
    runs: "After lead checks pass",
    mode: "Not built",
    when: "Next",
    canDo: ["Send a lead by SMS or email", "Send the homeowner a confirmation"],
    rules: [
      "One contractor per lead.",
      "Stops at the contractor's weekly cap or when they're paused.",
      "Only sends to the contractor named in the consent wording.",
    ],
  },
  {
    name: "Billing",
    kind: "Rules",
    job: "Deducts prepaid credits or drafts invoices under each contractor's terms.",
    runs: "After the dispute window closes",
    mode: "Not built",
    when: "Later",
    canDo: ["Draft a credit or invoice", "Record a dispute"],
    rules: ["Drafts only. You approve every invoice, credit and refund."],
  },
  {
    name: "Prospector",
    kind: "AI",
    job: "Finds local landscapers and writes a short brief for each call.",
    runs: "Weekdays at 7am",
    mode: "Not built",
    when: "Next",
    canDo: ["Search Companies House", "Add a prospect", "Write a call brief"],
    rules: [
      "Public business information only.",
      "Flags every number for TPS/CTPS screening.",
      "Never phones, emails or messages anyone.",
    ],
  },
  {
    name: "Follow-up",
    kind: "AI",
    job: "Asks contractors what happened with each lead and reads their replies.",
    runs: "Daily at 9am",
    mode: "Not built",
    when: "Later",
    canDo: ["Message a contractor", "Update a lead's outcome"],
    rules: ["Only contacts contractors, never homeowners."],
  },
  {
    name: "Marketer",
    kind: "AI",
    job: "Drafts ads and landing-page changes, and suggests budgets from results.",
    runs: "Mondays at 8am",
    mode: "Not built",
    when: "Later",
    canDo: ["Draft an ad", "Draft a page change", "Suggest a budget"],
    rules: [
      "Proposes only. Spend always needs your approval.",
      "The daily spend cap is set in code, not by the agent.",
      "No guaranteed outcomes or invented reviews.",
    ],
  },
  {
    name: "Analyst",
    kind: "AI",
    job: "Writes the nightly report from the day's numbers.",
    runs: "Nightly at 11pm",
    mode: "Not built",
    when: "Later",
    canDo: ["Read all data", "Write the report"],
    rules: ["Read-only. Can't change any lead, contractor or payment."],
  },
];

// ---------------------------------------------------------------------------
// Approvals and activity (examples of what will appear)
// ---------------------------------------------------------------------------

export type Approval = {
  id: string;
  from: string;
  action: string;
  reason: string;
  kind: "Prospects" | "Lead" | "Money" | "Spend";
  /** Routine items are pre-ticked in the daily batch; money and spend never are. */
  routine: boolean;
};

export const approvals: Approval[] = [
  {
    id: "A-30",
    from: "Prospector",
    action: "Add 6 businesses to the call list",
    reason: "Active companies registered for landscaping in the service area.",
    kind: "Prospects",
    routine: true,
  },
  {
    id: "A-32",
    from: "Prospector",
    action: "Write call briefs for tomorrow's 2 calls",
    reason: "Briefs use each business's website and public reviews.",
    kind: "Prospects",
    routine: true,
  },
  {
    id: "A-28",
    from: "Billing",
    action: "Deduct 2 credits from Fieldstone Patios",
    reason: "L-1004 and L-1005 were delivered and not disputed within 72 hours.",
    kind: "Money",
    routine: false,
  },
  {
    id: "A-29",
    from: "Marketer",
    action: "Raise the daily ad cap from £15 to £20",
    reason: "Cost per qualified lead was £21 over 7 days, under the £30 target.",
    kind: "Spend",
    routine: false,
  },
];

export type ActivityEntry = {
  when: string;
  who: string;
  what: string;
  result: "Done" | "Waiting for you" | "Blocked";
};

export const activity: ActivityEntry[] = [
  { when: "Sun 18 Oct, 19:42", who: "Lead checks", what: "L-1007: job type unclear. Sent to your review.", result: "Waiting for you" },
  { when: "Sun 18 Oct, 14:06", who: "Lead checks", what: "L-1006: postcode may be outside the area. Sent to your review.", result: "Waiting for you" },
  { when: "Sun 18 Oct, 07:02", who: "Prospector", what: "Found 6 landscaping businesses. Proposed adding them to the call list.", result: "Waiting for you" },
  { when: "Sat 17 Oct, 23:00", who: "Analyst", what: "Nightly report: 2 enquiries, 1 sent, £30 spent.", result: "Done" },
  { when: "Sat 17 Oct, 10:33", who: "Lead delivery", what: "Sent L-1005 to Fieldstone Patios by SMS.", result: "Done" },
  { when: "Wed 14 Oct, 17:20", who: "Lead checks", what: "Rejected L-1002: no consent recorded.", result: "Blocked" },
];
