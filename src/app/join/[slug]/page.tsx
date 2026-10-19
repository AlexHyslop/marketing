import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruitTemplate } from "@/components/landing/recruit-template";
import { OPERATOR } from "@/lib/landing-pages";
import { findTrade, recruitCopy, trades } from "@/lib/recruitment";

// Same page for every trade; the slug only picks the example job and the
// trade the form starts on, so each ad can link to its own trade.
export function generateStaticParams() {
  return trades.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!findTrade(slug)) return {};
  return { title: `Local customers, sent to you | ${OPERATOR}`, description: recruitCopy.subhead };
}

export default async function JoinTradePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trade = findTrade(slug);
  if (!trade) notFound();
  return <RecruitTemplate trade={trade} />;
}
