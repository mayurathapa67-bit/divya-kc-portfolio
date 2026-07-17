"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Login failed");
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl card-soft p-8"
      >
        <h1 className="font-playfair text-3xl font-semibold text-charcoal">
          Admin Access
        </h1>
        <p className="mt-2 text-sm text-charcoal/60">
          Enter your password to manage the portfolio.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-xl border border-charcoal/15 bg-white/60 px-4 py-3 outline-none focus:border-coral"
          autoFocus
        />
        {error && <p className="mt-3 text-sm font-medium text-coral">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full btn-gradient py-3 text-sm font-semibold disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/submissions", { cache: "no-store" })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  return authed;
}
