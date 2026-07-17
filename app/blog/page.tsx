import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Img } from "@/components/Img";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts and insights on creativity, branding, strategy and marketing by Divya KC.",
};

export default function BlogPage() {
  const posts = content.blog ?? [];

  return (
    <section className="section-pad mx-auto max-w-7xl pb-24 pt-36">
      <SectionHeading
        eyebrow="Thoughts & Insights"
        title="The Blog"
        subtitle="Notes on creativity, branding, and building things that feel human."
      />

      <div className="mt-12 columns-1 gap-8 md:columns-2 lg:columns-3 [column-fill:_balance]">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.06}>
            <Link
              href={`/blog/${post.slug}`}
              className="group mb-8 block break-inside-avoid overflow-hidden rounded-3xl card-soft transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                { }
                <Img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "16 / 10" }}
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-charcoal/50">
                  <span>{formatDate(post.published_date)}</span>
                  <span>•</span>
                  <span>{post.read_time}</span>
                </div>
                <h3 className="mt-3 font-playfair text-2xl font-semibold leading-snug text-charcoal">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
