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
    name: "Recruit tradespeople",
    summary: "Ads bring in tradespeople who'll pay 10% of jobs won. No cold calling.",
    when: "Now",
  },
  {
    name: "Bring in enquiries",
    summary: "Ads and the landing page bring homeowners; rules check each enquiry.",
    when: "Next",
  },
  {
    name: "Close the loop",
    summary: "Track which leads become jobs and collect 10% of each one.",
    when: "Later",
  },
];

export type WorkflowStep = {
  stage: number;
  title: string;
  owner: string;
  ownerKind: "You" | "Rules" | "AI" | "Homeowner" | "Tradesperson";
  detail: string;
  href?: string;
};

export const workflow: WorkflowStep[] = [
  {
    stage: 0,
    title: "Run recruitment ads",
    owner: "You",
    ownerKind: "You",
    detail: "Ads to local detailers point at the application page. The Marketer drafts them; you approve spend.",
    href: "/dashboard/adverts",
  },
  {
    stage: 0,
    title: "Tradesperson applies",
    owner: "Tradesperson",
    ownerKind: "Tradesperson",
    detail: "Services, area, prices, capacity, and agreement to the 10% terms, in a two-minute form.",
    href: "/join/car-detailing",
  },
  {
    stage: 0,
    title: "Check and approve",
    owner: "You",
    ownerKind: "You",
    detail: "Check their Google reviews and that the area's free, then approve. They get a welcome text with the terms.",
    href: "/dashboard/applications",
  },
  {
    stage: 1,
    title: "Landing page and ads go live",
    owner: "You",
    ownerKind: "You",
    detail: "The Marketer drafts ads and suggests budgets. You approve all spend.",
    href: "/dashboard/pages",
  },
  {
    stage: 1,
    title: "Homeowner asks for a quote",
    owner: "Homeowner",
    ownerKind: "Homeowner",
    detail: "Car, service, postcode, contact details and consent to share with a named detailer.",
    href: "/dashboard/pages",
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
    title: "Contractor reports quotes and wins",
    owner: "Follow-up",
    ownerKind: "AI",
    detail: "Asks at set points whether they quoted, won, and for how much. This is what you get paid on.",
    href: "/dashboard/leads",
  },
  {
    stage: 2,
    title: "Invoice 10% when the job's done",
    owner: "Commission",
    ownerKind: "Rules",
    detail: "When the contractor confirms a job is finished, a 10% invoice is drafted for you to approve.",
    href: "/dashboard/activity",
  },
];

// ---------------------------------------------------------------------------
// Contractors (buyers)
// ---------------------------------------------------------------------------

// Contractors pay nothing for leads. They pay 10% of the final value of any
// job they win from one of our enquiries, invoiced once the job is finished.
export const commissionRate = 0.1;
export const paymentTerms = "14 days from invoice";

export type Contractor = {
  id: string;
  business: string;
  contact: string;
  status: "Trial agreed" | "Terms sent" | "Active" | "Paused";
  jobTypes: string;
  areas: string;
  weeklyCap: number;
  delivery: string;
  reporting: string;
  termsSigned: boolean;
};

export const contractors: Contractor[] = [
  {
    id: "C-01",
    business: "Fieldstone Patios",
    contact: "Dan",
    status: "Active",
    jobTypes: "Patios over 20m², porcelain or sandstone",
    areas: "AB1, AB2 and AB3",
    weeklyCap: 5,
    delivery: "SMS, then email copy",
    reporting: "Tells us within 14 days if a lead quoted, won or lost, and the job value",
    termsSigned: true,
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
  /** How long the lead has been waiting for a decision. */
  waitingMinutes?: number;
  /** What the rules would do on their own. Shown while you check every lead. */
  rulesSuggest?: "Send" | "Reject";
  /** Quote or final job value, as the contractor reports it. */
  jobValue?: number;
  /** Where the commission on a won job has got to. */
  commission?: CommissionStage;
};

export type CommissionStage = "Job booked" | "Ready to invoice" | "Invoiced" | "Paid";

// While trust is being built, every lead comes to you. Automatic sending
// switches on once your decisions have matched the rules 19 times in 20.
export const reviewMode = { agreed: 0, needed: 19, window: 20 };

export const leads: Lead[] = [
  {
    id: "L-1008",
    received: "Sun 18 Oct, 21:58",
    name: "Priya M.",
    postcode: "AB1 4",
    jobType: "New patio",
    timing: "Within 3 months",
    budget: "£5k–£10k",
    consent: true,
    status: "Needs review",
    note: "All checks passed.",
    waitingMinutes: 31,
    rulesSuggest: "Send",
  },
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
    note: "Postcode AB9 is outside Fieldstone's agreed area.",
    waitingMinutes: 504,
    rulesSuggest: "Reject",
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
    note: "Patio repair isn't in the agreed job types.",
    waitingMinutes: 167,
    rulesSuggest: "Reject",
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
    status: "Contacted",
    assignedTo: "Fieldstone Patios",
    note: "Dan has visited and is pricing it up.",
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
    jobValue: 8400,
  },
  {
    id: "L-1001",
    received: "Thu 8 Oct, 18:40",
    name: "Grace L.",
    postcode: "AB1 2",
    jobType: "New patio",
    timing: "As soon as possible",
    budget: "£5k–£10k",
    consent: true,
    status: "Won",
    assignedTo: "Fieldstone Patios",
    jobValue: 7800,
    commission: "Ready to invoice",
    note: "Finished Sat 17 Oct.",
  },
  {
    id: "L-1000",
    received: "Wed 7 Oct, 12:15",
    name: "Owen P.",
    postcode: "AB3 1",
    jobType: "New patio",
    timing: "Spring",
    budget: "£5k–£10k",
    consent: true,
    status: "Lost",
    assignedTo: "Fieldstone Patios",
    note: "Homeowner went with a cheaper quote.",
  },
  {
    id: "L-0998",
    received: "Mon 28 Sep, 09:05",
    name: "Nadia B.",
    postcode: "AB2 5",
    jobType: "Patio and garden together",
    timing: "Within 3 months",
    budget: "£10k+",
    consent: true,
    status: "Won",
    assignedTo: "Fieldstone Patios",
    jobValue: 9200,
    commission: "Invoiced",
    note: "Invoiced Fri 16 Oct, due Fri 30 Oct.",
  },
  {
    id: "L-0996",
    received: "Thu 24 Sep, 20:11",
    name: "Chris D.",
    postcode: "AB1 3",
    jobType: "New patio",
    timing: "As soon as possible",
    budget: "£5k–£10k",
    consent: true,
    status: "Won",
    assignedTo: "Fieldstone Patios",
    jobValue: 6500,
    commission: "Paid",
    note: "Paid Thu 15 Oct.",
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

export function waitingLabel(minutes?: number): string {
  if (minutes === undefined) return "";
  if (minutes < 60) return `Waiting ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `Waiting ${hours}h ${minutes % 60}m` : `Waiting ${Math.floor(hours / 24)} days`;
}

export function money(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}

export function commissionOn(value: number): number {
  return Math.round(value * commissionRate);
}

/** Totals for the commission panel: what's paid, owed, ready and possible. */
export function commissionSummary(list: Lead[] = leads) {
  const sum = (filter: (l: Lead) => boolean) =>
    list.filter(filter).reduce((total, l) => total + commissionOn(l.jobValue ?? 0), 0);
  return {
    paid: sum((l) => l.commission === "Paid"),
    invoiced: sum((l) => l.commission === "Invoiced"),
    readyToInvoice: sum((l) => l.commission === "Ready to invoice"),
    booked: sum((l) => l.commission === "Job booked"),
    quoted: sum((l) => l.status === "Quoted"),
    jobsWon: list.filter((l) => l.status === "Won").length,
    valueWon: list.filter((l) => l.status === "Won").reduce((t, l) => t + (l.jobValue ?? 0), 0),
  };
}

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
    name: "Commission",
    kind: "Rules",
    job: "Works out 10% of each finished job and drafts the invoice.",
    runs: "When a contractor confirms a job is finished",
    mode: "Not built",
    when: "Later",
    canDo: ["Draft an invoice", "Draft a payment reminder", "Mark an invoice paid"],
    rules: [
      "Commission is 10% of the final job value the contractor confirms.",
      "Every invoice and reminder needs your approval.",
      "Drafts a reminder when an invoice is unpaid after 14 days.",
    ],
  },
  {
    name: "Vetting",
    kind: "AI",
    job: "Looks up each new applicant's Google reviews and website and writes a one-paragraph summary for your review.",
    runs: "When an application arrives",
    mode: "Not built",
    when: "Next",
    canDo: ["Look up a business on Google", "Write a vetting summary"],
    rules: [
      "Public business information only.",
      "Recommends; never approves or declines anyone.",
      "Never contacts the applicant.",
    ],
  },
  {
    name: "Follow-up",
    kind: "AI",
    job: "Asks contractors what happened with each lead: quoted, won, for how much, and when it's finished. This is what you get paid on.",
    runs: "Daily at 9am",
    mode: "Not built",
    when: "Next",
    canDo: ["Message a contractor", "Update a lead's outcome and job value"],
    rules: [
      "Asks after 3 days, 2 weeks, then monthly until the lead is won or lost.",
      "Records job values exactly as the contractor states them.",
      "Only contacts contractors, never homeowners.",
    ],
  },
  {
    name: "Marketer",
    kind: "AI",
    job: "Drafts recruitment and homeowner ads and landing-page changes, and suggests budgets from results.",
    runs: "Mondays at 8am",
    mode: "Not built",
    when: "Now",
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
    from: "Vetting",
    action: "Attach a vetting summary to Gloss Lab Detailing's application",
    reason: "Found their Google listing and Instagram; summary covers reviews and recent work.",
    kind: "Prospects",
    routine: true,
  },
  {
    id: "A-32",
    from: "Marketer",
    action: "Pause recruitment ad R3 and move its budget to R2",
    reason: "R2 has brought 2 applications for £14; R3 none after £9.",
    kind: "Spend",
    routine: false,
  },
  {
    id: "A-31",
    from: "Follow-up",
    action: "Update L-1005 to contacted",
    reason: "Dan replied that he's visited and is pricing it up.",
    kind: "Lead",
    routine: true,
  },
  {
    id: "A-28",
    from: "Commission",
    action: "Send Fieldstone Patios an invoice for £780",
    reason: "Dan confirmed L-1001 (new patio, £7,800) is finished. 10% commission, due in 14 days.",
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
  { when: "Mon 19 Oct, 09:12", who: "Applications", what: "Gloss Lab Detailing applied from ad R2.", result: "Waiting for you" },
  { when: "Sun 18 Oct, 20:47", who: "Applications", what: "Medway Mobile Valeting applied from ad R1. Flagged: no coating or correction.", result: "Waiting for you" },
  { when: "Sun 18 Oct, 19:42", who: "Lead checks", what: "L-1007: job type unclear. Sent to your review.", result: "Waiting for you" },
  { when: "Sun 18 Oct, 14:06", who: "Lead checks", what: "L-1006: postcode may be outside the area. Sent to your review.", result: "Waiting for you" },
  { when: "Sat 17 Oct, 23:00", who: "Analyst", what: "Nightly report: 2 enquiries, 1 sent, £30 spent, £780 commission ready to invoice.", result: "Done" },
  { when: "Sat 17 Oct, 16:10", who: "Follow-up", what: "Dan confirmed L-1001 is finished at £7,800. Drafted a £780 invoice for your approval.", result: "Waiting for you" },
  { when: "Sat 17 Oct, 10:33", who: "Lead delivery", what: "Sent L-1005 to Fieldstone Patios by SMS.", result: "Done" },
  { when: "Wed 14 Oct, 17:20", who: "Lead checks", what: "Rejected L-1002: no consent recorded.", result: "Blocked" },
];
