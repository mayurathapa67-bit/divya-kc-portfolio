import type { Metadata } from "next";
import { content } from "@/lib/content";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { SectionHeading } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected brand campaigns, digital marketing, creative direction and social media work by Divya KC.",
};

export default function PortfolioPage() {
  const count = (content.portfolio ?? []).length;

  return (
    <section className="section-pad mx-auto max-w-7xl pb-24 pt-36">
      <SectionHeading
        eyebrow={`${count} Projects`}
        title="The Work"
        subtitle="A living gallery of brands I've helped dream into being. Filter by what moves you."
      />
      <div className="mt-12">
        <PortfolioGrid />
      </div>
    </section>
  );
}
