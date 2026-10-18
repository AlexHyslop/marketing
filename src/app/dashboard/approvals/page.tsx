import { ApprovalBatch } from "@/components/approval-batch";
import { DemoNotice, PageHeader } from "@/components/ui";
import { approvals } from "@/lib/demo-data";

export const metadata = { title: "Approvals | Lead desk" };

export default function ApprovalsPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Approvals"
        intro="Agents propose; you decide. Proposals arrive as one daily batch. Routine ones are pre-ticked so you can clear them in one go, and money or ad spend always waits for your decision."
      />
      <DemoNotice>Demo data. The buttons work so you can try the flow, but nothing is saved.</DemoNotice>
      <div className="rounded-lg border border-line bg-white p-5">
        <ApprovalBatch approvals={approvals} />
      </div>
    </div>
  );
}
