import type { Metadata } from "next";
import { getContent } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServicesSceneInner } from "@/components/3d/ServicesScene";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative direction, brand strategy, digital marketing campaigns, social media and content creation by Divya KC.",
};

const ICONS: Record<string, string> = {
  compass: "🧭",
  target: "🎯",
  rocket: "🚀",
  sparkles: "✨",
  palette: "🎨",
};

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We talk, listen, and dig into what makes your brand tick.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "A clear, human plan that everyone can rally behind.",
  },
  {
    step: "03",
    title: "Creation",
    desc: "The magic happens — visuals, words, and motion that feel alive.",
  },
  {
    step: "04",
    title: "Results",
    desc: "We launch, learn, and let the work speak for itself.",
  },
];

export default function ServicesPage() {
  const content = getContent();
  const services = content.services ?? [];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-36">
        <div className="section-pad mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-coral">
              What I Do
            </p>
            <h1 className="mt-4 font-playfair text-6xl font-semibold sm:text-7xl">
              Let&apos;s Create <span className="text-gradient">Together</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/60">
              Strategy you can trust, creativity you&apos;ll love — delivered with warmth
              and a little 3D magic.
            </p>
          </Reveal>
        </div>
        <div className="section-pad mx-auto mt-10 h-[320px] max-w-5xl">
          <ServicesSceneInner />
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="section-pad mx-auto max-w-7xl py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-3xl card-soft p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-gold text-2xl shadow-soft">
                  {ICONS[s.icon] ?? "✦"}
                </div>
                <h3 className="mt-5 font-playfair text-2xl font-semibold text-charcoal">
                  {s.title}
                </h3>
                {s.price && (
                  <p className="mt-1 text-sm font-semibold text-purple">{s.price}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {Array.isArray(s.deliverables) &&
                    s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-charcoal/70"
                      >
                        <span className="mt-1 text-coral">✦</span>
                        {d}
                      </li>
                    ))}
                </ul>
                <div className="mt-auto pt-6">
                  <MagneticButton href="/contact" variant="outline" className="w-full">
                    Get Started
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden bg-charcoal py-24 text-ivory">
        <div className="section-pad mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="The Process"
            subtitle="Four steps from hello to 'wow'."
            className="[&_h2]:text-ivory [&_p]:text-ivory/60"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="rounded-3xl border border-ivory/10 bg-ivory/5 p-7">
                  <span className="font-playfair text-4xl font-semibold text-gold">
                    {p.step}
                  </span>
                  <h3 className="mt-4 font-playfair text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad mx-auto max-w-3xl py-24">
        <SectionHeading eyebrow="Good to know" title="Questions, answered" />
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
