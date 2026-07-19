import Link from "next/link";
import { getContent } from "@/lib/data";
import { SafeScene } from "@/components/3d/SafeScene";
import { MagneticButton } from "@/components/MagneticButton";
import { Img } from "@/components/Img";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export default function HomePage() {
  const content = getContent();
  const { hero, portfolio, services } = content;
  const featured = (portfolio ?? []).slice(0, 3);
  const previewServices = (services ?? []).slice(0, 3);
  const safeHeroImage = hero?.image ?? "/images/hero-divya.jpg";

  const heroFallback = (
    <div className="absolute inset-0 bg-gradient-to-br from-coral/20 via-gold/10 to-purple/20" />
  );

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SafeScene
            variant="hero"
            fallback={heroFallback}
            mobileFallback={heroFallback}
            className="h-full w-full"
          />
        </div>
        <div className="section-pad mx-auto grid w-full max-w-7xl items-center gap-10 pt-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
                {hero.role}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-playfair text-6xl font-semibold leading-[0.95] text-charcoal sm:text-7xl lg:text-8xl">
                {hero.tagline.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      i === 1
                        ? "text-gradient"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/60">
                {hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-4">
                <MagneticButton href="/portfolio">See My Work</MagneticButton>
                <MagneticButton href="/contact" variant="outline">
                  Let&apos;s Talk
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <div className="relative md:col-span-5">
            <Reveal delay={0.2}>
              <div className="animate-float-y mx-auto max-w-sm">
                <div className="card-soft overflow-hidden rounded-[2rem]">
                  { }
                  <Img
                    src={safeHeroImage}
                    alt={hero.title}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section-pad mx-auto max-w-7xl py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Projects"
            subtitle="A few brands I've helped bring to life — each one a small piece of magic."
          />
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4"
          >
            View all work →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="group block overflow-hidden rounded-3xl card-soft transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  { }
                  <Img
                    src={p.images[0]}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-semibold text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                    {p.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="relative overflow-hidden bg-charcoal py-24 text-ivory">
        <div className="section-pad mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem]">
              { }
              <Img
                src={content.about.image}
                alt={content.about.headline}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {content.about.headline}
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-semibold sm:text-5xl">
              The human behind the magic
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/70">
              {content.about.bio}
            </p>
            <blockquote className="mt-8 border-l-2 border-coral pl-5 font-cormorant text-2xl italic text-ivory">
              &ldquo;{content.about.philosophy}&rdquo;
            </blockquote>
            <div className="mt-8">
              <MagneticButton href="/about" variant="outline" className="!text-ivory !border-ivory/20">
                Read my story
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-pad mx-auto max-w-7xl py-24">
        <SectionHeading
          eyebrow="What I Do"
          title="Services with soul"
          subtitle="Strategy you can trust, creativity you'll love, delivered with care."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {previewServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl card-soft p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-gold text-xl">
                  {iconFor(s.icon)}
                </div>
                <h3 className="mt-5 font-playfair text-2xl font-semibold text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services"
            className="text-sm font-semibold text-charcoal underline decoration-coral decoration-2 underline-offset-4"
          >
            Explore all services →
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad mx-auto max-w-7xl py-24">
        <SectionHeading
          eyebrow="Kind Words"
          title="What clients say"
          subtitle="The work matters, but the relationships matter more."
        />
        <div className="mt-12">
          <TestimonialCarousel testimonials={content.testimonials} />
        </div>
      </section>
    </>
  );
}

function iconFor(name: string): string {
  const map: Record<string, string> = {
    compass: "🧭",
    target: "🎯",
    rocket: "🚀",
    sparkles: "✨",
    palette: "🎨",
  };
  return map[name] ?? "✦";
}
