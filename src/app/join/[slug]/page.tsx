import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruitTemplate } from "@/components/landing/recruit-template";
import { OPERATOR } from "@/lib/landing-pages";
import { findRecruitPage, recruitPages } from "@/lib/recruitment";

export function generateStaticParams() {
  return recruitPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = findRecruitPage(slug);
  if (!page) return {};
  return { title: `${page.trade} enquiries in ${page.area} | ${OPERATOR}`, description: page.subhead };
}

export default async function JoinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findRecruitPage(slug);
  if (!page) notFound();
  return <RecruitTemplate page={page} />;
}
