"use client";

import { useState } from "react";
import { MagneticButton } from "./MagneticButton";

const PROJECT_TYPES = [
  "Brand Campaign",
  "Digital Marketing",
  "Creative Direction",
  "Social Media",
  "Content Creation",
  "Something else",
];

const BUDGETS = ["< $2k", "$2k – $5k", "$5k – $10k", "$10k+"];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[1],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
      setForm({
        name: "",
        email: "",
        projectType: PROJECT_TYPES[0],
        budget: BUDGETS[1],
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl card-soft p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-coral to-gold text-3xl">
          ✦
        </div>
        <h3 className="mt-5 font-playfair text-3xl font-semibold text-charcoal">
          Message sent!
        </h3>
        <p className="mt-3 text-charcoal/60">
          Thank you — I&apos;ll get back to you within a day or two. In the meantime,
          go make something beautiful.
        </p>
        <div className="mt-6">
          <MagneticButton onClick={() => setStatus("idle")} variant="outline">
            Send another
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Your name">
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Jane Doe"
          className="input"
        />
      </Field>

      <Field label="Email">
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="jane@studio.com"
          className="input"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Project type">
          <select
            value={form.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            className="input"
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget">
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="input"
          >
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell me about your brand and what you're dreaming of…"
          className="input resize-none"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm font-medium text-coral">{error}</p>
      )}

      <div className="flex items-center gap-4">
        <MagneticButton type="submit">
          {status === "sending" ? "Sending…" : "Send Message"}
        </MagneticButton>
        <span className="text-xs text-charcoal/40">
          Usually replies within 48 hours.
        </span>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(26, 26, 26, 0.12);
          background: rgba(255, 255, 255, 0.6);
          padding: 0.9rem 1.1rem;
          font-size: 0.95rem;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .input:focus {
          border-color: #ff6b6b;
          box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.12);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-charcoal">{label}</span>
      {children}
    </label>
  );
}
