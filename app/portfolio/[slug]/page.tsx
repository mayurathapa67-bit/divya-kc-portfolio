import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { getProject, getContent } from "@/lib/data";
import { ProjectHero3D } from "@/components/3d/ProjectHero3D";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ImageGallery } from "@/components/ImageGallery";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export function generateStaticParams() {
  return (content.portfolio ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getContent().portfolio ?? [];
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];
  const prev = all[(idx - 1 + all.length) % all.length];

  return (
    <article className="pb-24 pt-28">
      {/* HERO */}
      <div className="section-pad mx-auto max-w-6xl">
        <Link
          href="/portfolio"
          className="text-sm font-semibold text-charcoal/60 underline-offset-4 hover:underline"
        >
          ← Back to work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-coral/15 to-purple/15 px-4 py-1.5 text-xs font-semibold text-charcoal">
            {project.category}
          </span>
          <span className="text-sm text-charcoal/50">{project.client}</span>
        </div>
        <h1 className="mt-4 max-w-4xl font-playfair text-5xl font-semibold leading-tight text-charcoal sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/60">
          {project.description}
        </p>
      </div>

      <div className="section-pad mx-auto mt-10 max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          <ProjectHero3D image={project.images[0]} title={project.title} />
        </div>
      </div>

      {/* STORY */}
      <section className="section-pad mx-auto mt-20 max-w-4xl">
        <Reveal>
          <h2 className="font-playfair text-3xl font-semibold text-charcoal">The Challenge</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
            {project.challenge}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-12 font-playfair text-3xl font-semibold text-charcoal">
            The Strategy
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
            {project.strategy}
          </p>
        </Reveal>
      </section>

      {/* RESULTS */}
      <section className="section-pad mx-auto mt-20 max-w-5xl">
        <SectionHeading eyebrow="Impact" title="The Results" />
        <div className="mt-10 grid gap-8 rounded-3xl card-soft p-10 sm:grid-cols-3">
          <AnimatedCounter label="Engagement" value={project.results.engagement} />
          <AnimatedCounter label="Reach" value={project.results.reach} />
          <AnimatedCounter label="Conversions" value={project.results.conversions} />
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad mx-auto mt-20 max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="A closer look" />
        <div className="mt-10">
          <ImageGallery images={project.images} alt={project.title} />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-pad mx-auto mt-20 max-w-4xl text-center">
        <Reveal>
          <blockquote className="font-cormorant text-3xl font-medium italic leading-snug text-charcoal sm:text-4xl">
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-charcoal">
            {project.testimonial.name}
            <span className="block font-normal text-charcoal/50">
              {project.testimonial.role}
            </span>
          </p>
        </Reveal>
      </section>

      {/* NEXT / PREV */}
      <section className="section-pad mx-auto mt-20 grid max-w-6xl gap-6 sm:grid-cols-2">
        <Link
          href={`/portfolio/${prev.slug}`}
          className="group rounded-3xl card-soft p-8 transition-transform hover:-translate-y-1"
        >
          <p className="text-xs uppercase tracking-wide text-charcoal/40">Previous</p>
          <p className="mt-2 font-playfair text-2xl font-semibold text-charcoal group-hover:text-coral">
            {prev.title}
          </p>
        </Link>
        <Link
          href={`/portfolio/${next.slug}`}
          className="group rounded-3xl card-soft p-8 text-right transition-transform hover:-translate-y-1"
        >
          <p className="text-xs uppercase tracking-wide text-charcoal/40">Next</p>
          <p className="mt-2 font-playfair text-2xl font-semibold text-charcoal group-hover:text-coral">
            {next.title}
          </p>
        </Link>
      </section>
    </article>
  );
}
