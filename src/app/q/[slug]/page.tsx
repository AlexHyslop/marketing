import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingTemplate } from "@/components/landing/landing-template";
import { findLandingPage, landingPages } from "@/lib/landing-pages";

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findLandingPage(slug);
  if (!page) return {};
  return {
    title: `${page.trade} in ${page.area} | ${page.brand.name}`,
    description: page.subhead,
  };
}

export default async function LandingPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findLandingPage(slug);
  if (!page) notFound();
  return <LandingTemplate page={page} />;
}
