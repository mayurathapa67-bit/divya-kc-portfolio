"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "overview" | "content" | "portfolio" | "blog" | "submissions" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "content", label: "Content" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog", label: "Blog" },
  { id: "submissions", label: "Submissions" },
  { id: "settings", label: "Settings" },
];

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
          {tab === "content" && <ContentTab />}
          {tab === "portfolio" && <PortfolioTab />}
          {tab === "blog" && <BlogTab />}
          {tab === "submissions" && <SubmissionsTab />}
          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl card-soft p-6">
      <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
        {title}
      </h2>
      {children}
    </div>
  );
}

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
          Your portfolio is live and looking beautiful. Manage your content, review
          enquiries, and keep the magic growing.
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

function ContentTab() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.content) setData(d.content as Record<string, unknown>);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const setPath = (path: string[], value: unknown) => {
    setData((prev) => {
      const next = prev ? structuredClone(prev) : {};
      let cursor: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (typeof cursor[key] !== "object" || cursor[key] === null) {
          cursor[key] = {};
        }
        cursor = cursor[key] as Record<string, unknown>;
      }
      cursor[path[path.length - 1]] = value;
      return next;
    });
    setSaved(false);
  };

  const save = async () => {
    setError("");
    setSaved(false);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: data }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      error?: string;
      commitUrl?: string;
    };
    if (!res.ok) {
      setError(json.error ?? "Failed to save");
      return;
    }
    setSaved(true);
  };

  if (loading) return <Section title="Content Editor"><p className="text-charcoal/50">Loading…</p></Section>;
  if (!data) return <Section title="Content Editor"><p className="text-charcoal/50">Could not load content.</p></Section>;

  const about = (data.about ?? {}) as Record<string, unknown>;
  const hero = (data.hero ?? {}) as Record<string, unknown>;
  const contact = (data.contact ?? {}) as Record<string, unknown>;
  const personal = (about.personal ?? {}) as Record<string, unknown>;
  const photos = Array.isArray(personal.photos) ? (personal.photos as string[]) : [];

  return (
    <Section title="Content Editor">
      <p className="mb-5 text-sm text-charcoal/60">
        Edit the live site content below. Saving commits changes to GitHub and
        redeploys the site.
      </p>

      <h3 className="mb-3 mt-2 font-playfair text-xl font-semibold text-charcoal">Hero</h3>
      <Editor label="Title" value={String(hero.title ?? "")} onChange={(v) => setPath(["hero", "title"], v)} />
      <Editor label="Role" value={String(hero.role ?? "")} onChange={(v) => setPath(["hero", "role"], v)} />
      <Editor label="Tagline" value={String(hero.tagline ?? "")} onChange={(v) => setPath(["hero", "tagline"], v)} />
      <Editor label="Subtitle" value={String(hero.subtitle ?? "")} onChange={(v) => setPath(["hero", "subtitle"], v)} />

      <h3 className="mb-3 mt-6 font-playfair text-xl font-semibold text-charcoal">About</h3>
      <TextArea label="Headline" value={String(about.headline ?? "")} onChange={(v) => setPath(["about", "headline"], v)} />
      <TextArea label="Bio" value={String(about.bio ?? "")} rows={5} onChange={(v) => setPath(["about", "bio"], v)} />
      <TextArea label="Philosophy" value={String(about.philosophy ?? "")} onChange={(v) => setPath(["about", "philosophy"], v)} />
      <TextArea label="Story" value={String(about.story ?? "")} rows={5} onChange={(v) => setPath(["about", "story"], v)} />
      <Editor label="About image URL" value={String(about.image ?? "")} onChange={(v) => setPath(["about", "image"], v)} />

      <h3 className="mb-3 mt-6 font-playfair text-xl font-semibold text-charcoal">About photos (shown on main site)</h3>
      {photos.length === 0 && <p className="mb-3 text-sm text-charcoal/40">No photos set.</p>}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-charcoal/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p} alt={`About ${i + 1}`} className="h-32 w-full object-cover" />
          </div>
        ))}
      </div>
      {photos.map((p, i) => (
        <Editor
          key={i}
          label={`Photo ${i + 1} URL`}
          value={p}
          onChange={(v) => {
            const next = [...photos];
            next[i] = v;
            setPath(["about", "personal", "photos"], next);
          }}
        />
      ))}

      <h3 className="mb-3 mt-6 font-playfair text-xl font-semibold text-charcoal">Contact</h3>
      <Editor label="Email" value={String(contact.email ?? "")} onChange={(v) => setPath(["contact", "email"], v)} />
      <Editor label="Phone" value={String(contact.phone ?? "")} onChange={(v) => setPath(["contact", "phone"], v)} />
      <Editor label="Location" value={String(contact.location ?? "")} onChange={(v) => setPath(["contact", "location"], v)} />
      <TextArea label="Availability" value={String(contact.availability ?? "")} onChange={(v) => setPath(["contact", "availability"], v)} />

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={save}
          className="rounded-full btn-gradient px-6 py-2.5 text-sm font-semibold"
        >
          Save changes
        </button>
        {saved && <span className="text-sm text-teal">Saved &amp; committed ✓</span>}
        {error && <span className="text-sm text-coral">{error}</span>}
      </div>
    </Section>
  );
}

function Editor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-sm font-semibold text-charcoal">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-charcoal/15 bg-white/60 p-3 outline-none focus:border-coral"
      />
    </label>
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
    <label className="mb-4 block">
      <span className="mb-1 block text-sm font-semibold text-charcoal">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-charcoal/15 bg-white/60 p-3 outline-none focus:border-coral"
      />
    </label>
  );
}

function PortfolioTab() {
  return (
    <Section title="Portfolio Manager">
      <p className="mb-4 text-charcoal/60">
        Add or edit projects. Upload images to Cloudinary and they&apos;ll appear in your
        gallery. Changes commit via GitHub sync.
      </p>
      <Uploader />
      <div className="mt-4 rounded-xl border border-dashed border-charcoal/20 p-6 text-sm text-charcoal/50">
        Project list editing is powered by the GitHub-backed content store. Use the
        uploader above to add imagery, then update <code>src/lib/content.ts</code> or
        connect the GitHub API in Settings.
      </div>
    </Section>
  );
}

function BlogTab() {
  return (
    <Section title="Blog Manager">
      <p className="mb-4 text-charcoal/60">
        Draft and publish articles. Use the uploader to add featured images.
      </p>
      <Uploader />
      <div className="mt-4 rounded-xl border border-dashed border-charcoal/20 p-6 text-sm text-charcoal/50">
        Blog posts are managed through the GitHub-backed content store. Add a new entry
        in <code>src/lib/content.ts</code> or wire the GitHub API in Settings.
      </div>
    </Section>
  );
}

function Uploader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setLoading(true);
    setError("");
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
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white/50 p-5">
      <p className="mb-3 text-sm font-semibold text-charcoal">Image upload (Cloudinary)</p>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-charcoal/20 p-8 text-center"
        onClick={() => inputRef.current?.click()}
      >
        <p className="text-3xl">🖼️</p>
        <p className="mt-2 text-sm text-charcoal/60">
          Drag &amp; drop an image, or click to browse
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </div>
      {loading && <p className="mt-3 text-sm text-charcoal/50">Uploading…</p>}
      {error && <p className="mt-3 text-sm text-coral">{error}</p>}
      {url && (
        <div className="mt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Uploaded" className="max-h-40 rounded-lg" />
          <p className="mt-2 break-all text-xs text-charcoal/50">{url}</p>
        </div>
      )}
    </div>
  );
}

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
