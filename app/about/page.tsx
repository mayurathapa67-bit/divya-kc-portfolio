import type { Metadata } from "next";
import { content } from "@/lib/content";
import { SafeScene } from "@/components/3d/SafeScene";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: content.about.bio,
};

export default function AboutPage() {
  const { about } = content;
  const experience = Array.isArray(about.experience) ? about.experience : [];
  const expertise = Array.isArray(about.expertise) ? about.expertise : [];
  const hobbies = Array.isArray(about.personal.hobbies) ? about.personal.hobbies : [];
  const photos = Array.isArray(about.personal.photos) ? about.personal.photos : [];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal pb-20 pt-36 text-ivory">
        <div className="absolute inset-0 opacity-40">
          <SafeScene
            variant="particles"
            fallback={<div className="h-full w-full bg-transparent" />}
            mobileFallback={<div className="h-full w-full bg-transparent" />}
            className="h-full w-full"
          />
        </div>
        <div className="section-pad relative mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {about.headline}
            </p>
            <h1 className="mt-4 font-playfair text-5xl font-semibold sm:text-7xl">
              The Story
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory/70">
              {about.bio}
            </p>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-pad mx-auto max-w-5xl py-24">
        <SectionHeading eyebrow="The Journey" title="Where I've been" />
        <div className="mt-12 space-y-10">
          {experience.map((exp, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="grid gap-4 rounded-3xl card-soft p-8 md:grid-cols-[180px_1fr]">
                <div>
                  <p className="font-playfair text-xl font-semibold text-charcoal">
                    {exp.role}
                  </p>
                  <p className="mt-1 text-sm text-coral">{exp.company}</p>
                  <p className="mt-1 text-xs text-charcoal/50">{exp.duration}</p>
                </div>
                <p className="text-base leading-relaxed text-charcoal/70">{exp.story}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral/10 via-gold/10 to-purple/10 py-28">
        <div className="section-pad mx-auto max-w-4xl text-center">
          <Reveal>
            <blockquote className="font-cormorant text-4xl font-medium italic leading-snug text-charcoal sm:text-6xl">
              &ldquo;{about.philosophy}&rdquo;
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-charcoal/60">
              {about.story}
            </p>
          </Reveal>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section-pad mx-auto max-w-7xl py-24">
        <SectionHeading eyebrow="Expertise" title="What I bring to the table" />
        <div className="mt-10 flex flex-wrap gap-3">
          {expertise.map((tag, i) => (
            <Reveal key={tag} delay={i * 0.04}>
              <span className="inline-block rounded-full border border-charcoal/10 bg-white/60 px-5 py-2.5 text-sm font-medium text-charcoal shadow-sm">
                {tag}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PERSONAL TOUCH */}
      <section className="section-pad mx-auto max-w-7xl py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-[420px]">
            <SafeScene
              variant="framed"
              fallback={
                <div className="grid h-full grid-cols-2 gap-4">
                  {photos.map((p, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={p} alt="" className="rounded-2xl object-cover" />
                  ))}
                </div>
              }
              mobileFallback={
                <div className="grid h-full grid-cols-2 gap-4">
                  {photos.map((p, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={p} alt="" className="rounded-2xl object-cover" />
                  ))}
                </div>
              }
              className="h-full w-full"
              sceneProps={{ photos }}
            />
          </div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-coral">
              Off the clock
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-semibold text-charcoal">
              The human stuff
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/60">
              When I&apos;m not building brands, you&apos;ll find me chasing light with my
              camera, getting lost in a new city, or elbow-deep in paint. These are the
              things that keep the creativity honest.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {hobbies.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-gradient-to-r from-coral/15 to-purple/15 px-4 py-2 text-sm font-medium text-charcoal"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <MagneticButton href="/contact">Say hello</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
