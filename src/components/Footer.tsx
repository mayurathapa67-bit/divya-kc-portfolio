import Link from "next/link";
import { getContent } from "@/lib/data";

export function Footer() {
  const { contact, nav } = getContent();

  return (
    <footer className="relative mt-24 border-t border-charcoal/10 bg-charcoal text-ivory">
      <div className="section-pad mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-playfair text-3xl font-semibold">Divya KC</p>
            <p className="mt-3 max-w-xs text-sm text-ivory/60">
              Creative Director & Digital Marketing Specialist. Building brands that
              feel human, from Sydney to Kathmandu.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs uppercase tracking-widest text-ivory/40">Explore</p>
            <ul className="mt-4 space-y-2">
              {Array.isArray(nav.links) &&
                nav.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs uppercase tracking-widest text-ivory/40">Connect</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="text-sm text-ivory/70">{contact.location}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              {Array.isArray(contact.socials) &&
                contact.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory"
                  >
                    {s.platform}
                  </a>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Divya KC. All rights reserved.</p>
          <p>Crafted with warmth &amp; a little 3D magic.</p>
        </div>
      </div>
    </footer>
  );
}
