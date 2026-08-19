"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({
    username: "admin",
    fullName: "",
    email: "",
    password: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("/api/me");
      const data = (await response.json()) as { user?: unknown };

      if (data.user) {
        router.push("/dashboard");
      }
    }

    void checkSession();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          username: form.username,
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        user?: unknown;
      };

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,#020817,#0f172a_40%,#111827)] px-4 py-10 text-white">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="grid md:grid-cols-2">
          <div className="relative hidden min-h-[620px] overflow-hidden bg-slate-950/90 p-8 md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.2),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.15),_transparent_25%)]" />
            <div className="relative z-10">
              <div className="mb-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
                Exam Admin
              </div>
              <h1 className="max-w-sm text-4xl font-bold leading-tight">
                Secure exam management for real teams.
              </h1>
            </div>

            <div className="relative z-10 space-y-5">
              {[
                "Live candidate insights",
                "Secure admin controls",
                "Real-time dashboard reporting",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Welcome
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  {mode === "login" ? "Log in" : "Create account"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-cyan-200 transition hover:bg-white/10"
              >
                {mode === "login" ? "Need an account?" : "Have an account?"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Full name
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="Jane Admin"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Username
                </label>
                <input
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder={mode === "login" ? "admin" : "yourname"}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {mode === "signup" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder={
                    mode === "login" ? "admin" : "Enter a secure password"
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Creating account..."
                  : mode === "login"
                    ? "Log in"
                    : "Sign up"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-cyan-100">
              <p className="font-medium">Default admin access:</p>
              <p className="mt-1">Username: admin</p>
              <p>Password: admin</p>
            </div>

            <p className="mt-6 text-center text-sm text-slate-300">
              Need a quick start?{" "}
              <Link href="/dashboard" className="font-medium text-cyan-300">
                Go to dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
