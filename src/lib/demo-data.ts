// Demo data so we can agree the flow of work before connecting a database.
// Business names are invented. Phone numbers use Ofcom's 01632 960xxx range,
// which is reserved for drama and never connects to a real line.

export const SERVICE_AREA = "your area";

export type Owner = "You" | AgentName | "Homeowner" | "Contractor";

export type AgentName =
  | "Prospector"
  | "Intake"
  | "Qualifier"
  | "Compliance gate"
  | "Dispatcher"
  | "Follow-up"
  | "Billing clerk"
  | "Marketer"
  | "Analyst";

// ---------------------------------------------------------------------------
// The flow of work
// ---------------------------------------------------------------------------

export type StepStatus = "now" | "planned";

export type WorkflowStep = {
  title: string;
  owner: Owner;
  helper?: Owner;
  status: StepStatus;
  phase: number;
  detail: string;
  href?: string;
};

export type WorkflowStage = {
  name: string;
  summary: string;
  steps: WorkflowStep[];
};

export const workflow: WorkflowStage[] = [
  {
    name: "Find contractors",
    summary: "Sign up landscapers who will pay for leads, before any ads run.",
    steps: [
      {
        title: "Build the call list",
        owner: "You",
        helper: "Prospector",
        status: "now",
        phase: 1,
        detail: "Local landscapers with phone, area and services. The Prospector takes this over later.",
        href: "/dashboard/calls",
      },
      {
        title: "Call landscapers",
        owner: "You",
        status: "now",
        phase: 1,
        detail: "Ask which jobs they want, typical job value and what makes a lead worth paying for.",
        href: "/dashboard/calls",
      },
      {
        title: "Agree trial terms in writing",
        owner: "You",
        status: "now",
        phase: 1,
        detail: "Lead criteria, price, weekly cap, rejection window and payment terms.",
        href: "/dashboard/contractors",
      },
    ],
  },
  {
    name: "Bring in homeowner enquiries",
    summary: "Ads send homeowners to the landing page; agents check each enquiry before it's sent.",
    steps: [
      {
        title: "Run the landing page and ads",
        owner: "You",
        helper: "Marketer",
        status: "planned",
        phase: 2,
        detail: "The Marketer drafts copy and suggests budgets. You approve all spend.",
        href: "/quote",
      },
      {
        title: "Homeowner asks for a quote",
        owner: "Homeowner",
        status: "planned",
        phase: 2,
        detail: "Job type, postcode, timing, contact details and consent to share with a named landscaper.",
        href: "/quote",
      },
      {
        title: "Check and record the enquiry",
        owner: "Intake",
        status: "planned",
        phase: 3,
        detail: "Validates fields, removes duplicates and stores the consent record.",
        href: "/dashboard/leads",
      },
      {
        title: "Match against lead criteria",
        owner: "Qualifier",
        status: "planned",
        phase: 3,
        detail: "Uses only the criteria agreed with the contractor. Borderline leads come to you.",
        href: "/dashboard/approvals",
      },
      {
        title: "Pass the compliance check",
        owner: "Compliance gate",
        status: "planned",
        phase: 3,
        detail: "Nothing leaves without consent on file, a privacy notice and no promised outcomes.",
        href: "/dashboard/agents",
      },
      {
        title: "Send to the contractor",
        owner: "Dispatcher",
        status: "planned",
        phase: 4,
        detail: "One contractor per lead, within their weekly cap.",
        href: "/dashboard/leads",
      },
    ],
  },
  {
    name: "Close the loop",
    summary: "Find out what happened to each lead, get paid and learn what to change.",
    steps: [
      {
        title: "Ask the contractor what happened",
        owner: "Follow-up",
        status: "planned",
        phase: 4,
        detail: "Contacted, quoted, won or lost, and why.",
        href: "/dashboard/leads",
      },
      {
        title: "Invoice and handle disputes",
        owner: "Billing clerk",
        helper: "You",
        status: "planned",
        phase: 5,
        detail: "Drafts invoices under each contractor's terms. You approve every one.",
        href: "/dashboard/approvals",
      },
      {
        title: "Nightly report",
        owner: "Analyst",
        status: "planned",
        phase: 5,
        detail: "Spend, cost per qualified lead, contractor response and cash collected.",
        href: "/dashboard/activity",
      },
    ],
  },
];

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
  wants?: string;
  typicalJob?: string;
  notes?: string;
  nextStep?: string;
  nextDate?: string;
};

export const prospects: Prospect[] = [
  {
    id: "P-01",
    business: "Fieldstone Patios",
    contact: "Dan",
    phone: "01632 960 101",
    area: "North of town",
    services: "Patios, driveways",
    status: "Trial agreed",
    tpsChecked: true,
    wants: "Porcelain and sandstone patios over 20m²",
    typicalJob: "£6k–£12k",
    notes: "Quiet Jan–Feb, wants to fill spring diary early. Prefers leads by SMS.",
    nextStep: "Send written trial terms",
    nextDate: "Mon 19 Oct",
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
    wants: "Full garden redesigns",
    typicalJob: "£10k+",
    notes: "Burnt by shared leads on a directory site. Exclusivity matters to her.",
    nextStep: "Call back with price per lead",
    nextDate: "Tue 20 Oct",
  },
  {
    id: "P-03",
    business: "Hollow Lane Landscaping",
    contact: "Mark",
    phone: "01632 960 338",
    area: "East villages",
    services: "Fencing, turf, patios",
    status: "Call back",
    tpsChecked: true,
    notes: "On a job, asked to call after 4pm.",
    nextStep: "Call after 4pm",
    nextDate: "Mon 19 Oct",
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
    nextStep: "Try again",
    nextDate: "Tue 20 Oct",
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
    notes: "Booked until summer from recommendations.",
    nextStep: "Check back in spring",
    nextDate: "Mon 1 Mar",
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
    nextStep: "Screen against TPS, then call",
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
    nextStep: "Screen against TPS, then call",
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
    nextStep: "Call",
    nextDate: "Mon 19 Oct",
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
  | "Qualified"
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
    id: "L-1007",
    received: "Sun 18 Oct, 19:42",
    name: "Sarah T.",
    postcode: "AB1 2",
    jobType: "New patio",
    timing: "Spring",
    budget: "£5k–£10k",
    consent: true,
    status: "New",
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
    note: "Postcode may be outside the agreed area.",
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
    jobType: "Patio repair",
    timing: "ASAP",
    budget: "Under £2k",
    consent: true,
    status: "Rejected",
    note: "Repair work isn't in the agreed criteria.",
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
  "Qualified",
  "Sent",
  "Contacted",
  "Quoted",
  "Won",
  "Lost",
  "Rejected",
];

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export type AgentMode = "Not built" | "Proposes" | "Acts";

export type Agent = {
  name: AgentName;
  job: string;
  runs: string;
  mode: AgentMode;
  phase: number;
  canDo: string[];
  rules: string[];
};

export const agents: Agent[] = [
  {
    name: "Prospector",
    job: "Finds local landscaping businesses and writes a short brief for each call.",
    runs: "Weekdays at 7am",
    mode: "Not built",
    phase: 2,
    canDo: ["Search Companies House", "Add a prospect", "Write a call brief"],
    rules: [
      "Uses public business information only.",
      "Flags every number for TPS/CTPS screening.",
      "Never phones, emails or messages anyone.",
    ],
  },
  {
    name: "Marketer",
    job: "Drafts ad copy and landing-page changes and suggests budgets from the results.",
    runs: "Mondays at 8am",
    mode: "Not built",
    phase: 2,
    canDo: ["Draft an ad", "Draft a page change", "Suggest a budget"],
    rules: [
      "Proposes only. Spend always needs your approval.",
      "Hard daily spend cap is set in code, not by the agent.",
      "No guaranteed outcomes or invented reviews.",
    ],
  },
  {
    name: "Intake",
    job: "Checks each new enquiry, removes duplicates and stores the consent record.",
    runs: "When a form is submitted",
    mode: "Not built",
    phase: 3,
    canDo: ["Save a lead", "Mark a duplicate", "Flag for review"],
    rules: [
      "Rejects any enquiry without recorded consent.",
      "Never changes what the homeowner wrote.",
    ],
  },
  {
    name: "Qualifier",
    job: "Compares each lead with the criteria agreed with the contractor.",
    runs: "After Intake",
    mode: "Not built",
    phase: 3,
    canDo: ["Mark qualified", "Mark rejected with a reason", "Send to review"],
    rules: [
      "Uses only the written, checkable criteria.",
      "Anything borderline comes to you.",
    ],
  },
  {
    name: "Compliance gate",
    job: "Checks everything before it leaves the system.",
    runs: "Before anything is sent or published",
    mode: "Not built",
    phase: 3,
    canDo: ["Pass", "Block with a reason"],
    rules: [
      "No lead is shared without consent on file.",
      "No page goes live without the privacy notice.",
      "No message promises jobs or revenue.",
    ],
  },
  {
    name: "Dispatcher",
    job: "Sends each qualified lead to the right contractor and confirms receipt.",
    runs: "After the compliance check",
    mode: "Not built",
    phase: 4,
    canDo: ["Send a lead to a contractor", "Send the homeowner a confirmation"],
    rules: [
      "One contractor per lead.",
      "Respects each contractor's weekly cap and pauses.",
      "Only sends to the contractor named in the consent wording.",
    ],
  },
  {
    name: "Follow-up",
    job: "Asks contractors what happened with each lead.",
    runs: "Daily at 9am",
    mode: "Not built",
    phase: 4,
    canDo: ["Message a contractor", "Update a lead's outcome"],
    rules: ["Only contacts contractors, never homeowners."],
  },
  {
    name: "Billing clerk",
    job: "Drafts invoices or deducts prepaid credits, and tracks disputes.",
    runs: "Fridays at 4pm",
    mode: "Not built",
    phase: 5,
    canDo: ["Draft an invoice", "Record a dispute"],
    rules: ["Drafts only. You approve every invoice, credit and refund."],
  },
  {
    name: "Analyst",
    job: "Writes the nightly report from the day's numbers.",
    runs: "Nightly at 11pm",
    mode: "Not built",
    phase: 5,
    canDo: ["Read all data", "Write the report"],
    rules: ["Read-only. Can't change any lead, contractor or payment."],
  },
];

// ---------------------------------------------------------------------------
// Approvals and activity (examples of what agents will produce)
// ---------------------------------------------------------------------------

export type Approval = {
  id: string;
  agent: AgentName;
  action: string;
  reason: string;
  kind: "Lead" | "Money" | "Prospects" | "Spend";
  raised: string;
};

export const approvals: Approval[] = [
  {
    id: "A-31",
    agent: "Qualifier",
    action: "Send L-1006 to review rather than qualify it",
    reason: "Postcode AB9 9 isn't in Fieldstone's agreed districts.",
    kind: "Lead",
    raised: "Sun 18 Oct, 14:06",
  },
  {
    id: "A-30",
    agent: "Prospector",
    action: "Add 6 businesses to the call list",
    reason: "Active companies registered for landscaping in the service area.",
    kind: "Prospects",
    raised: "Sun 18 Oct, 07:02",
  },
  {
    id: "A-29",
    agent: "Marketer",
    action: "Raise the daily ad cap from £15 to £20",
    reason: "Cost per qualified lead was £21 over the last 7 days, under the £30 target.",
    kind: "Spend",
    raised: "Sat 17 Oct, 08:00",
  },
  {
    id: "A-28",
    agent: "Billing clerk",
    action: "Deduct 2 credits from Fieldstone Patios",
    reason: "L-1004 and L-1005 were delivered and not disputed within 72 hours.",
    kind: "Money",
    raised: "Fri 16 Oct, 16:00",
  },
];

export type ActivityEntry = {
  when: string;
  who: Owner;
  what: string;
  result: "Done" | "Waiting for you" | "Blocked";
};

export const activity: ActivityEntry[] = [
  {
    when: "Sun 18 Oct, 19:42",
    who: "Intake",
    what: "Saved L-1007 with consent record.",
    result: "Done",
  },
  {
    when: "Sun 18 Oct, 14:06",
    who: "Qualifier",
    what: "L-1006 postcode outside agreed area. Sent to review.",
    result: "Waiting for you",
  },
  {
    when: "Sun 18 Oct, 07:02",
    who: "Prospector",
    what: "Found 6 new landscaping businesses. Proposed adding them to the call list.",
    result: "Waiting for you",
  },
  {
    when: "Sat 17 Oct, 23:00",
    who: "Analyst",
    what: "Nightly report: 2 raw enquiries, 1 qualified, £30 spent.",
    result: "Done",
  },
  {
    when: "Sat 17 Oct, 10:33",
    who: "Dispatcher",
    what: "Sent L-1005 to Fieldstone Patios by SMS.",
    result: "Done",
  },
  {
    when: "Wed 14 Oct, 17:20",
    who: "Compliance gate",
    what: "Blocked L-1002: no consent recorded.",
    result: "Blocked",
  },
];
