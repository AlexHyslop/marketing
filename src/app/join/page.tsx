import type { Metadata } from "next";
import { RecruitTemplate } from "@/components/landing/recruit-template";
import { OPERATOR } from "@/lib/landing-pages";
import { recruitCopy } from "@/lib/recruitment";

export const metadata: Metadata = {
  title: `Local customers, sent to you | ${OPERATOR}`,
  description: recruitCopy.subhead,
};

export default function JoinPage() {
  return <RecruitTemplate />;
}
