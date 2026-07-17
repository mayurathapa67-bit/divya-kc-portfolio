import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { getPost } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { Img } from "@/components/Img";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export function generateStaticParams() {
  return (content.blog ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="pb-24 pt-32">
      <div className="section-pad mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-charcoal/60 underline-offset-4 hover:underline"
        >
          ← Back to blog
        </Link>
        <div className="mt-6 flex items-center gap-3 text-sm text-charcoal/50">
          <span className="rounded-full bg-gradient-to-r from-coral/15 to-purple/15 px-3 py-1 font-semibold text-charcoal">
            {post.category}
          </span>
          <span>{new Date(post.published_date).toLocaleDateString("en-AU")}</span>
          <span>•</span>
          <span>{post.read_time}</span>
        </div>
        <h1 className="mt-4 font-playfair text-5xl font-semibold leading-tight text-charcoal">
          {post.title}
        </h1>
      </div>

      <div className="section-pad mx-auto mt-10 max-w-3xl">
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          { }
          <Img
            src={post.featured_image}
            alt={post.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>

      <div className="section-pad mx-auto mt-12 max-w-3xl">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <p className="mb-6 text-lg leading-relaxed text-charcoal/75">{p}</p>
          </Reveal>
        ))}

        <div className="mt-12 rounded-3xl bg-charcoal p-8 text-ivory">
          <p className="font-playfair text-2xl font-semibold">
            Enjoyed this? Let&apos;s make something together.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full btn-gradient px-6 py-3 text-sm font-semibold"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </article>
  );
}
