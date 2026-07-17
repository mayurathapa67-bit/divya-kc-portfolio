import type { Metadata } from "next";
import { content } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Divya KC — creative direction and digital marketing.",
};

export default function ContactPage() {
  const { contact } = content;

  return (
    <section className="section-pad mx-auto max-w-6xl pb-24 pt-36">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-coral">
              Let&apos;s Connect
            </p>
            <h1 className="mt-4 font-playfair text-5xl font-semibold leading-tight text-charcoal sm:text-6xl">
              Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/60">
              Whether you have a fully-formed brief or just a feeling something could be
              more — I&apos;d love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-5">
              <Info label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <Info
                label="Phone"
                value={contact.phone}
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              />
              <Info label="Location" value={contact.location} />
              <div>
                <p className="text-xs uppercase tracking-wide text-charcoal/40">
                  Availability
                </p>
                <p className="mt-1 text-charcoal/70">{contact.availability}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {Array.isArray(contact.socials) &&
                  contact.socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-charcoal/15 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-charcoal/40"
                    >
                      {s.platform}
                    </a>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-3xl card-soft p-8 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-charcoal/40">{label}</p>
      {href ? (
        <a
          href={href}
          className="mt-1 block text-lg font-medium text-charcoal transition-colors hover:text-coral"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-lg font-medium text-charcoal">{value}</p>
      )}
    </div>
  );
}
