"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Tab =
  | "overview"
  | "header"
  | "hero"
  | "about"
  | "services"
  | "portfolio"
  | "blog"
  | "testimonials"
  | "contact"
  | "footer"
  | "submissions"
  | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "header", label: "Header / Nav" },
  { id: "hero", label: "Home Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact / Footer" },
  { id: "submissions", label: "Submissions" },
  { id: "settings", label: "Settings" },
];

type AnyObj = Record<string, unknown>;

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/submissions", { cache: "no-store" })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <p className="text-charcoal/60">Checking access…</p>
      </div>
    );
  }

  if (authed === false) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-charcoal/10 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-gold text-lg">
              ✦
            </span>
            <div>
              <p className="font-playfair text-lg font-semibold text-charcoal">
                Divya KC — Admin
              </p>
              <p className="text-xs text-charcoal/50">Portfolio control centre</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-charcoal/15 px-4 py-2 text-sm font-medium text-charcoal hover:border-charcoal/40"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 md:flex-row">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:gap-1 md:pr-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-charcoal text-ivory"
                  : "text-charcoal/60 hover:bg-charcoal/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1">
          {tab === "overview" && <OverviewTab />}
          {tab === "header" && <HeaderEditor />}
          {tab === "hero" && <HeroEditor />}
          {tab === "about" && <AboutEditor />}
          {tab === "services" && <ServicesEditor />}
          {tab === "portfolio" && <PortfolioEditor />}
          {tab === "blog" && <BlogEditor />}
          {tab === "testimonials" && <TestimonialsEditor />}
          {tab === "contact" && <ContactEditor />}
          {tab === "submissions" && <SubmissionsTab />}
          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable field primitives                                          */
/* ------------------------------------------------------------------ */

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-3xl card-soft p-6">
      <h2 className="mb-1 font-playfair text-2xl font-semibold text-charcoal">
        {title}
      </h2>
      {hint && <p className="mb-4 text-sm text-charcoal/50">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-sm font-semibold text-charcoal">{label}</span>
      {children}
    </label>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-charcoal/15 bg-white/60 p-3 outline-none focus:border-coral"
      />
    </Field>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-charcoal/15 bg-white/60 p-3 outline-none focus:border-coral"
      />
    </Field>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    setErr("");
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: dataUrl, folder: "divya-kc-portfolio" }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label}>
      <input
        value={value}
        placeholder="https://… or /images/…"
        onChange={(e) => onChange(e.target.value)}
        className="mb-2 w-full rounded-xl border border-charcoal/15 bg-white/60 p-3 outline-none focus:border-coral"
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) upload(f);
        }}
        onClick={() => inputRef.current?.click()}
        className="mb-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-charcoal/20 p-5 text-center transition-colors hover:border-coral"
      >
        <p className="text-2xl">🖼️</p>
        <p className="mt-1 text-sm text-charcoal/60">
          {uploading ? "Uploading…" : "Click or drag an image from your computer"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
          }}
        />
      </div>

      {err && <p className="mb-2 text-sm text-coral">{err}</p>}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt={label}
          className="max-h-40 rounded-lg border border-charcoal/10 object-contain"
        />
      ) : (
        <p className="text-xs text-charcoal/40">No image set.</p>
      )}
    </Field>
  );
}

function StringListField({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <Field label={label}>
      {items.map((it, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input
            value={it}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 rounded-xl border border-charcoal/15 bg-white/60 p-2.5 outline-none focus:border-coral"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="rounded-xl border border-charcoal/15 px-3 text-coral hover:border-coral"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-1 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add
      </button>
    </Field>
  );
}

/* A card with a title bar used to group one list item (project, post, etc.) */
function ItemCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded-2xl border border-charcoal/10 bg-white/40 p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-playfair text-lg font-semibold text-charcoal">{title}</p>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-coral/30 px-3 py-1 text-xs font-medium text-coral hover:border-coral"
          >
            Remove
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Save hook — commits the whole content object to GitHub             */
/* ------------------------------------------------------------------ */

function useSave() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (content: AnyObj) => {
    setSaving(true);
    setError("");
    setSaved(false);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    setSaving(false);
    if (!res.ok) {
      setError(json.error ?? "Failed to save");
      return;
    }
    setSaved(true);
  };

  return { saved, error, saving, save };
}

/* ------------------------------------------------------------------ */
/* Overview                                                           */
/* ------------------------------------------------------------------ */

function OverviewTab() {
  const [counts, setCounts] = useState({ submissions: 0, portfolio: 0, blog: 0 });
  useEffect(() => {
    fetch("/api/submissions", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) =>
        setCounts({
          submissions: Array.isArray(d.submissions) ? d.submissions.length : 0,
          portfolio: 6,
          blog: 4,
        })
      )
      .catch(() => undefined);
  }, []);
  const cards = [
    { label: "Submissions", value: counts.submissions, accent: "from-coral to-gold" },
    { label: "Portfolio items", value: counts.portfolio, accent: "from-purple to-coral" },
    { label: "Blog posts", value: counts.blog, accent: "from-teal to-gold" },
  ];
  return (
    <div className="space-y-6">
      <Section title="Welcome back, Divya">
        <p className="text-charcoal/60">
          Your portfolio is live. Use the tabs on the left to edit every part of
          the site — header, home hero, about, services, portfolio, blog,
          testimonials and contact. Changes commit to GitHub and redeploy.
        </p>
      </Section>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-3xl card-soft overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${c.accent}`} />
            <div className="p-6">
              <p className="font-playfair text-4xl font-semibold text-charcoal">
                {c.value}
              </p>
              <p className="mt-1 text-sm text-charcoal/50">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header / Nav                                                       */
/* ------------------------------------------------------------------ */

function HeaderEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);

  useEffect(() => {
    load(setData);
  }, []);

  if (!data) return <Section title="Header / Navigation"><p className="text-charcoal/50">Loading…</p></Section>;

  const nav = (data.nav ?? {}) as AnyObj;
  const links = Array.isArray(nav.links) ? (nav.links as AnyObj[]) : [];

  const setNav = (patch: AnyObj) => setData({ ...data, nav: { ...nav, ...patch } });
  const setLink = (i: number, patch: AnyObj) => {
    const next = links.map((l, j) => (j === i ? { ...l, ...patch } : l));
    setNav({ links: next });
  };

  return (
    <Section title="Header / Navigation" hint="Edit the logo and the menu links shown across the whole site.">
      <Input label="Logo text" value={String(nav.logo ?? "")} onChange={(v) => setNav({ logo: v })} />
      <ImageField label="Logo image (optional URL)" value={String(nav.logoImage ?? "")} onChange={(v) => setNav({ logoImage: v })} />

      <p className="mb-2 text-sm font-semibold text-charcoal">Menu links</p>
      {links.map((l, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input
            value={String(l.label ?? "")}
            placeholder="Label"
            onChange={(e) => setLink(i, { label: e.target.value })}
            className="flex-1 rounded-xl border border-charcoal/15 bg-white/60 p-2.5 outline-none focus:border-coral"
          />
          <input
            value={String(l.href ?? "")}
            placeholder="/path"
            onChange={(e) => setLink(i, { href: e.target.value })}
            className="flex-1 rounded-xl border border-charcoal/15 bg-white/60 p-2.5 outline-none focus:border-coral"
          />
          <button
            type="button"
            onClick={() => setNav({ links: links.filter((_, j) => j !== i) })}
            className="rounded-xl border border-charcoal/15 px-3 text-coral hover:border-coral"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setNav({ links: [...links, { label: "New", href: "/" }] })}
        className="mb-4 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add link
      </button>

      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Hero (home)                                                        */
/* ------------------------------------------------------------------ */

function HeroEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="Home Hero"><p className="text-charcoal/50">Loading…</p></Section>;

  const hero = (data.hero ?? {}) as AnyObj;
  const setHero = (patch: AnyObj) => setData({ ...data, hero: { ...hero, ...patch } });

  return (
    <Section title="Home Hero" hint="The first thing visitors see on the homepage.">
      <Input label="Title (name)" value={String(hero.title ?? "")} onChange={(v) => setHero({ title: v })} />
      <Input label="Role" value={String(hero.role ?? "")} onChange={(v) => setHero({ role: v })} />
      <Input label="Tagline (big headline)" value={String(hero.tagline ?? "")} onChange={(v) => setHero({ tagline: v })} />
      <TextArea label="Subtitle" value={String(hero.subtitle ?? "")} onChange={(v) => setHero({ subtitle: v })} rows={2} />
      <Input label="Primary button text" value={String(hero.cta_primary ?? "")} onChange={(v) => setHero({ cta_primary: v })} />
      <Input label="Secondary button text" value={String(hero.cta_secondary ?? "")} onChange={(v) => setHero({ cta_secondary: v })} />
      <ImageField label="Hero image" value={String(hero.image ?? "")} onChange={(v) => setHero({ image: v })} />
      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                             */
/* ------------------------------------------------------------------ */

function AboutEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="About"><p className="text-charcoal/50">Loading…</p></Section>;

  const about = (data.about ?? {}) as AnyObj;
  const setAbout = (patch: AnyObj) => setData({ ...data, about: { ...about, ...patch } });
  const personal = (about.personal ?? {}) as AnyObj;
  const photos = Array.isArray(personal.photos) ? (personal.photos as string[]) : [];
  const expertise = Array.isArray(about.expertise) ? (about.expertise as string[]) : [];
  const experience = Array.isArray(about.experience) ? (about.experience as AnyObj[]) : [];

  const setPersonal = (patch: AnyObj) =>
    setAbout({ personal: { ...personal, ...patch } });

  return (
    <Section title="About" hint="Edit the About page and the about preview on the homepage. Photos below appear on the site.">
      <Input label="Headline" value={String(about.headline ?? "")} onChange={(v) => setAbout({ headline: v })} />
      <TextArea label="Bio" value={String(about.bio ?? "")} onChange={(v) => setAbout({ bio: v })} rows={5} />
      <TextArea label="Philosophy" value={String(about.philosophy ?? "")} onChange={(v) => setAbout({ philosophy: v })} />
      <TextArea label="Story" value={String(about.story ?? "")} onChange={(v) => setAbout({ story: v })} rows={5} />
      <ImageField label="About page image" value={String(about.image ?? "")} onChange={(v) => setAbout({ image: v })} />

      <h3 className="mb-2 mt-4 font-playfair text-xl font-semibold text-charcoal">Photos (shown on site)</h3>
      {photos.map((p, i) => (
        <div key={i} className="mb-3">
          <ImageField label={`Photo ${i + 1}`} value={p} onChange={(v) => {
            const next = [...photos];
            next[i] = v;
            setPersonal({ photos: next });
          }} />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setPersonal({ photos: [...photos, ""] })}
        className="mb-4 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add photo
      </button>

      <StringListField label="Expertise tags" items={expertise} onChange={(v) => setAbout({ expertise: v })} />

      <h3 className="mb-2 mt-4 font-playfair text-xl font-semibold text-charcoal">Experience timeline</h3>
      {experience.map((exp, i) => (
        <ItemCard
          key={i}
          title={String(exp.role ?? `Item ${i + 1}`)}
          onRemove={() => setAbout({ experience: experience.filter((_, j) => j !== i) })}
        >
          <Input label="Role" value={String(exp.role ?? "")} onChange={(v) => {
            const next = experience.map((e, j) => (j === i ? { ...e, role: v } : e));
            setAbout({ experience: next });
          }} />
          <Input label="Company" value={String(exp.company ?? "")} onChange={(v) => {
            const next = experience.map((e, j) => (j === i ? { ...e, company: v } : e));
            setAbout({ experience: next });
          }} />
          <Input label="Duration" value={String(exp.duration ?? "")} onChange={(v) => {
            const next = experience.map((e, j) => (j === i ? { ...e, duration: v } : e));
            setAbout({ experience: next });
          }} />
          <TextArea label="Story" value={String(exp.story ?? "")} onChange={(v) => {
            const next = experience.map((e, j) => (j === i ? { ...e, story: v } : e));
            setAbout({ experience: next });
          }} />
        </ItemCard>
      ))}
      <button
        type="button"
        onClick={() => setAbout({ experience: [...experience, { role: "", company: "", duration: "", story: "" }] })}
        className="mb-4 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add experience
      </button>

      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                          */
/* ------------------------------------------------------------------ */

function ServicesEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="Services"><p className="text-charcoal/50">Loading…</p></Section>;

  const services = Array.isArray(data.services) ? (data.services as AnyObj[]) : [];
  const setServices = (next: AnyObj[]) => setData({ ...data, services: next });

  return (
    <Section title="Services" hint="Each card on the Services page. Icon accepts: compass, target, rocket, sparkles, palette.">
      {services.map((s, i) => (
        <ItemCard
          key={i}
          title={String(s.title ?? `Service ${i + 1}`)}
          onRemove={() => setServices(services.filter((_, j) => j !== i))}
        >
          <Input label="Title" value={String(s.title ?? "")} onChange={(v) => {
            const next = services.map((x, j) => (j === i ? { ...x, title: v } : x));
            setServices(next);
          }} />
          <TextArea label="Description" value={String(s.description ?? "")} onChange={(v) => {
            const next = services.map((x, j) => (j === i ? { ...x, description: v } : x));
            setServices(next);
          }} />
          <Input label="Icon key" value={String(s.icon ?? "")} onChange={(v) => {
            const next = services.map((x, j) => (j === i ? { ...x, icon: v } : x));
            setServices(next);
          }} />
          <Input label="Price (optional)" value={String(s.price ?? "")} onChange={(v) => {
            const next = services.map((x, j) => (j === i ? { ...x, price: v } : x));
            setServices(next);
          }} />
          <ImageField label="Cover image (optional)" value={String(s.cover ?? "")} onChange={(v) => {
            const next = services.map((x, j) => (j === i ? { ...x, cover: v } : x));
            setServices(next);
          }} />
          <StringListField
            label="Deliverables"
            items={Array.isArray(s.deliverables) ? (s.deliverables as string[]) : []}
            onChange={(v) => {
              const next = services.map((x, j) => (j === i ? { ...x, deliverables: v } : x));
              setServices(next);
            }}
          />
        </ItemCard>
      ))}
      <button
        type="button"
        onClick={() => setServices([...services, { title: "", description: "", icon: "sparkles", deliverables: [""] }])}
        className="rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add service
      </button>
      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio                                                         */
/* ------------------------------------------------------------------ */

function PortfolioEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="Portfolio"><p className="text-charcoal/50">Loading…</p></Section>;

  const portfolio = Array.isArray(data.portfolio) ? (data.portfolio as AnyObj[]) : [];
  const setPortfolio = (next: AnyObj[]) => setData({ ...data, portfolio: next });

  return (
    <Section title="Portfolio" hint="Projects shown on the Work page and homepage. Images appear in galleries across the site.">
      {portfolio.map((p, i) => {
        const images = Array.isArray(p.images) ? (p.images as string[]) : [];
        const results = (p.results ?? {}) as AnyObj;
        const testimonial = (p.testimonial ?? {}) as AnyObj;
        return (
          <ItemCard
            key={i}
            title={String(p.title ?? `Project ${i + 1}`)}
            onRemove={() => setPortfolio(portfolio.filter((_, j) => j !== i))}
          >
            <Input label="Slug (URL id, no spaces)" value={String(p.slug ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, slug: v } : x));
              setPortfolio(next);
            }} />
            <Input label="Title" value={String(p.title ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, title: v } : x));
              setPortfolio(next);
            }} />
            <Input label="Category" value={String(p.category ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, category: v } : x));
              setPortfolio(next);
            }} />
            <Input label="Client" value={String(p.client ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, client: v } : x));
              setPortfolio(next);
            }} />
            <Input label="Published date" value={String(p.published_date ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, published_date: v } : x));
              setPortfolio(next);
            }} />
            <TextArea label="Description" value={String(p.description ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, description: v } : x));
              setPortfolio(next);
            }} />
            <TextArea label="Challenge" value={String(p.challenge ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, challenge: v } : x));
              setPortfolio(next);
            }} />
            <TextArea label="Strategy" value={String(p.strategy ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, strategy: v } : x));
              setPortfolio(next);
            }} />

            <h4 className="mb-2 mt-2 text-sm font-semibold text-charcoal">Results</h4>
            <Input label="Engagement" value={String(results.engagement ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, results: { ...results, engagement: v } } : x));
              setPortfolio(next);
            }} />
            <Input label="Reach" value={String(results.reach ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, results: { ...results, reach: v } } : x));
              setPortfolio(next);
            }} />
            <Input label="Conversions" value={String(results.conversions ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, results: { ...results, conversions: v } } : x));
              setPortfolio(next);
            }} />

            <h4 className="mb-2 mt-2 text-sm font-semibold text-charcoal">Testimonial</h4>
            <TextArea label="Quote" value={String(testimonial.quote ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, testimonial: { ...testimonial, quote: v } } : x));
              setPortfolio(next);
            }} />
            <Input label="Name" value={String(testimonial.name ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, testimonial: { ...testimonial, name: v } } : x));
              setPortfolio(next);
            }} />
            <Input label="Role" value={String(testimonial.role ?? "")} onChange={(v) => {
              const next = portfolio.map((x, j) => (j === i ? { ...x, testimonial: { ...testimonial, role: v } } : x));
              setPortfolio(next);
            }} />

            <h4 className="mb-2 mt-2 text-sm font-semibold text-charcoal">Images</h4>
            {images.map((img, k) => (
              <div key={k} className="mb-3">
                <ImageField label={`Image ${k + 1}`} value={img} onChange={(v) => {
                  const ni = [...images];
                  ni[k] = v;
                  const next = portfolio.map((x, j) => (j === i ? { ...x, images: ni } : x));
                  setPortfolio(next);
                }} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const next = portfolio.map((x, j) => (j === i ? { ...x, images: [...images, ""] } : x));
                setPortfolio(next);
              }}
              className="mb-2 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
            >
              + Add image
            </button>
          </ItemCard>
        );
      })}
      <button
        type="button"
        onClick={() => setPortfolio([...portfolio, {
          slug: `project-${portfolio.length + 1}`,
          title: "",
          category: "",
          client: "",
          description: "",
          challenge: "",
          strategy: "",
          results: { engagement: "", reach: "", conversions: "" },
          images: [""],
          testimonial: { quote: "", name: "", role: "" },
          published_date: "",
        }])}
        className="rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add project
      </button>
      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Blog                                                              */
/* ------------------------------------------------------------------ */

function BlogEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="Blog"><p className="text-charcoal/50">Loading…</p></Section>;

  const blog = Array.isArray(data.blog) ? (data.blog as AnyObj[]) : [];
  const setBlog = (next: AnyObj[]) => setData({ ...data, blog: next });

  return (
    <Section title="Blog" hint="Blog posts. Content supports blank-line-separated paragraphs.">
      {blog.map((p, i) => (
        <ItemCard
          key={i}
          title={String(p.title ?? `Post ${i + 1}`)}
          onRemove={() => setBlog(blog.filter((_, j) => j !== i))}
        >
          <Input label="Slug (URL id, no spaces)" value={String(p.slug ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, slug: v } : x));
            setBlog(next);
          }} />
          <Input label="Title" value={String(p.title ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, title: v } : x));
            setBlog(next);
          }} />
          <Input label="Category" value={String(p.category ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, category: v } : x));
            setBlog(next);
          }} />
          <Input label="Read time" value={String(p.read_time ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, read_time: v } : x));
            setBlog(next);
          }} />
          <Input label="Published date" value={String(p.published_date ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, published_date: v } : x));
            setBlog(next);
          }} />
          <TextArea label="Excerpt" value={String(p.excerpt ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, excerpt: v } : x));
            setBlog(next);
          }} />
          <TextArea label="Content (separate paragraphs with a blank line)" value={String(p.content ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, content: v } : x));
            setBlog(next);
          }} rows={6} />
          <ImageField label="Featured image" value={String(p.featured_image ?? "")} onChange={(v) => {
            const next = blog.map((x, j) => (j === i ? { ...x, featured_image: v } : x));
            setBlog(next);
          }} />
        </ItemCard>
      ))}
      <button
        type="button"
        onClick={() => setBlog([...blog, {
          slug: `post-${blog.length + 1}`,
          title: "",
          excerpt: "",
          content: "",
          category: "",
          featured_image: "",
          published_date: "",
          read_time: "5 min read",
        }])}
        className="rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add post
      </button>
      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                      */
/* ------------------------------------------------------------------ */

function TestimonialsEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="Testimonials"><p className="text-charcoal/50">Loading…</p></Section>;

  const testimonials = Array.isArray(data.testimonials) ? (data.testimonials as AnyObj[]) : [];
  const setTestimonials = (next: AnyObj[]) => setData({ ...data, testimonials: next });

  return (
    <Section title="Testimonials" hint="Client quotes shown on the homepage.">
      {testimonials.map((t, i) => (
        <ItemCard
          key={i}
          title={String(t.name ?? `Testimonial ${i + 1}`)}
          onRemove={() => setTestimonials(testimonials.filter((_, j) => j !== i))}
        >
          <TextArea label="Quote" value={String(t.quote ?? "")} onChange={(v) => {
            const next = testimonials.map((x, j) => (j === i ? { ...x, quote: v } : x));
            setTestimonials(next);
          }} />
          <Input label="Name" value={String(t.name ?? "")} onChange={(v) => {
            const next = testimonials.map((x, j) => (j === i ? { ...x, name: v } : x));
            setTestimonials(next);
          }} />
          <Input label="Role" value={String(t.role ?? "")} onChange={(v) => {
            const next = testimonials.map((x, j) => (j === i ? { ...x, role: v } : x));
            setTestimonials(next);
          }} />
          <Input label="Company" value={String(t.company ?? "")} onChange={(v) => {
            const next = testimonials.map((x, j) => (j === i ? { ...x, company: v } : x));
            setTestimonials(next);
          }} />
          <ImageField label="Avatar image" value={String(t.avatar ?? "")} onChange={(v) => {
            const next = testimonials.map((x, j) => (j === i ? { ...x, avatar: v } : x));
            setTestimonials(next);
          }} />
        </ItemCard>
      ))}
      <button
        type="button"
        onClick={() => setTestimonials([...testimonials, { quote: "", name: "", role: "", company: "", avatar: "" }])}
        className="rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add testimonial
      </button>
      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact / Footer                                                  */
/* ------------------------------------------------------------------ */

function ContactEditor() {
  const { saved, error, saving, save } = useSave();
  const [data, setData] = useState<AnyObj | null>(null);
  useEffect(() => { load(setData); }, []);
  if (!data) return <Section title="Contact / Footer"><p className="text-charcoal/50">Loading…</p></Section>;

  const contact = (data.contact ?? {}) as AnyObj;
  const setContact = (patch: AnyObj) => setData({ ...data, contact: { ...contact, ...patch } });
  const socials = Array.isArray(contact.socials) ? (contact.socials as AnyObj[]) : [];

  return (
    <Section title="Contact & Footer" hint="Contact details, social links and footer info used across the site.">
      <Input label="Email" value={String(contact.email ?? "")} onChange={(v) => setContact({ email: v })} />
      <Input label="Phone" value={String(contact.phone ?? "")} onChange={(v) => setContact({ phone: v })} />
      <Input label="Location" value={String(contact.location ?? "")} onChange={(v) => setContact({ location: v })} />
      <TextArea label="Availability" value={String(contact.availability ?? "")} onChange={(v) => setContact({ availability: v })} />

      <h3 className="mb-2 mt-4 font-playfair text-xl font-semibold text-charcoal">Social links</h3>
      {socials.map((s, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input
            value={String(s.platform ?? "")}
            placeholder="Platform"
            onChange={(e) => {
              const next = socials.map((x, j) => (j === i ? { ...x, platform: e.target.value } : x));
              setContact({ socials: next });
            }}
            className="flex-1 rounded-xl border border-charcoal/15 bg-white/60 p-2.5 outline-none focus:border-coral"
          />
          <input
            value={String(s.url ?? "")}
            placeholder="https://…"
            onChange={(e) => {
              const next = socials.map((x, j) => (j === i ? { ...x, url: e.target.value } : x));
              setContact({ socials: next });
            }}
            className="flex-1 rounded-xl border border-charcoal/15 bg-white/60 p-2.5 outline-none focus:border-coral"
          />
          <button
            type="button"
            onClick={() => setContact({ socials: socials.filter((_, j) => j !== i) })}
            className="rounded-xl border border-charcoal/15 px-3 text-coral hover:border-coral"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setContact({ socials: [...socials, { platform: "", url: "" }] })}
        className="mb-4 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-coral"
      >
        + Add social
      </button>

      <SaveBar saved={saved} error={error} saving={saving} onSave={() => save(data)} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Submissions                                                       */
/* ------------------------------------------------------------------ */

function SubmissionsTab() {
  const [subs, setSubs] = useState<
    Array<{
      id: string;
      name: string;
      email: string;
      message: string;
      createdAt: string;
      url?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/submissions", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.submissions)) setSubs(d.submissions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <Section title="Submissions">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
        </span>
        <span className="text-sm font-semibold text-teal">Live</span>
        <span className="text-xs text-charcoal/40">· refreshes every 8s</span>
      </div>
      {loading && subs.length === 0 ? (
        <p className="text-charcoal/50">Loading…</p>
      ) : subs.length === 0 ? (
        <p className="text-charcoal/50">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {subs.map((s) => (
            <div key={s.id} className="rounded-2xl border border-charcoal/10 bg-white/50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-charcoal">
                  {s.name}{" "}
                  <a href={`mailto:${s.email}`} className="text-coral underline">
                    {s.email}
                  </a>
                </p>
                <span className="flex items-center gap-2 text-xs text-charcoal/40">
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-coral underline">
                      GitHub issue ↗
                    </a>
                  )}
                  {new Date(s.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-charcoal/70">
                {s.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Settings                                                          */
/* ------------------------------------------------------------------ */

function SettingsTab() {
  const [repo, setRepo] = useState(
    process.env.NEXT_PUBLIC_GITHUB_REPO ?? "mayurathapa67-bit/divya-kc-portfolio"
  );
  return (
    <Section title="Settings">
      <label className="mb-1 block text-sm font-semibold text-charcoal">
        GitHub repository
      </label>
      <input
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        className="mb-4 w-full rounded-xl border border-charcoal/15 bg-white/60 p-3 outline-none focus:border-coral"
      />
      <p className="text-sm text-charcoal/60">
        Content edits are committed here on save and trigger a redeploy. Contact
        form submissions are stored as GitHub Issues in this repo. All of this is
        wired via <code>GITHUB_TOKEN</code>, <code>GITHUB_REPO</code> and{" "}
        <code>GITHUB_BRANCH</code>. Cloudinary powers image uploads.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Save bar                                                          */
/* ------------------------------------------------------------------ */

function SaveBar({
  saved,
  error,
  saving,
  onSave,
}: {
  saved: boolean;
  error: string;
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-full btn-gradient px-6 py-2.5 text-sm font-semibold disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
      {saved && <span className="text-sm text-teal">Saved &amp; committed ✓</span>}
      {error && <span className="text-sm text-coral">{error}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared loader                                                     */
/* ------------------------------------------------------------------ */

function load(setter: (v: AnyObj) => void) {
  fetch("/api/content", { cache: "no-store" })
    .then((r) => r.json())
    .then((d) => {
      if (d.content) setter(d.content as AnyObj);
    })
    .catch(() => undefined);
}
