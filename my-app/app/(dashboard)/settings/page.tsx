"use client";

import { Bell, Check, Moon, Save, Shield, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const response = await fetch("/api/settings");
      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = (await response.json()) as {
        user?: {
          theme?: "dark" | "light";
          notifications?: boolean;
          emailAlerts?: boolean;
          fullName?: string;
          email?: string;
          role?: string;
        };
      };

      if (data.user) {
        const isDark = data.user.theme !== "light";
        setDarkMode(isDark);
        setNotifications(data.user.notifications ?? true);
        setEmailAlerts(data.user.emailAlerts ?? true);
      }

      setLoading(false);
    }

    void loadSettings();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background",
      darkMode ? "#0B1220" : "#f8fafc",
    );
    document.documentElement.style.setProperty(
      "--foreground",
      darkMode ? "#E5E7EB" : "#0f172a",
    );
    document.documentElement.style.setProperty(
      "--card",
      darkMode ? "#111827" : "#ffffff",
    );
    document.documentElement.style.setProperty(
      "--muted",
      darkMode ? "#1A2332" : "#e2e8f0",
    );
    document.documentElement.style.setProperty(
      "--border",
      darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.12)",
    );
  }, [darkMode]);

  const handleSave = async () => {
    setSaved(true);

    await fetch("/api/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        theme: darkMode ? "dark" : "light",
        notifications,
        emailAlerts,
      }),
    });

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage application settings and configurations"
      />

      {/* Appearance */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Moon size={19} className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Appearance</h2>
            <p className="text-sm opacity-60">
              Customize how the dashboard looks.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-sm opacity-60">Loading theme settings...</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">Dark mode</p>
                <p className="text-sm opacity-50">
                  Use the dark dashboard appearance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                className={`
                relative
                w-12
                h-6
                rounded-full
                transition
                ${darkMode ? "bg-cyan-500" : "bg-slate-500"}
              `}
              >
                <span
                  className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  rounded-full
                  bg-white
                  transition
                  ${darkMode ? "left-7" : "left-1"}
                `}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDarkMode(false)}
                className={`
                flex items-center gap-3 rounded-xl border p-4 text-left
                transition
                ${
                  !darkMode
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-[var(--border)] hover:bg-[var(--muted)]"
                }
              `}
              >
                <Sun size={20} />

                <div>
                  <p className="font-medium">Light</p>
                  <p className="text-xs opacity-50">
                    Light dashboard appearance
                  </p>
                </div>

                {!darkMode && (
                  <Check size={17} className="ml-auto text-cyan-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setDarkMode(true)}
                className={`
                flex items-center gap-3 rounded-xl border p-4 text-left
                transition
                ${
                  darkMode
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-[var(--border)] hover:bg-[var(--muted)]"
                }
              `}
              >
                <Moon size={20} />

                <div>
                  <p className="font-medium">Dark</p>
                  <p className="text-xs opacity-50">
                    Dark dashboard appearance
                  </p>
                </div>

                {darkMode && (
                  <Check size={17} className="ml-auto text-cyan-400" />
                )}
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Bell size={19} className="text-blue-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm opacity-60">
              Control dashboard notification preferences.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="font-medium">Dashboard notifications</p>
              <p className="text-sm opacity-50">
                Receive important examination and administration alerts.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-5 w-5 accent-cyan-500"
            />
          </label>

          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="font-medium">Email alerts</p>
              <p className="text-sm opacity-50">
                Receive important alerts by email.
              </p>
            </div>

            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="h-5 w-5 accent-cyan-500"
            />
          </label>
        </div>
      </Card>

      {/* Administrator */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <User size={19} className="text-purple-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Administrator</h2>
            <p className="text-sm opacity-60">
              Current dashboard administrator information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs opacity-60">Name</label>
            <div className="mt-1 rounded-xl border border-[var(--border)] bg-[var(--muted)] px-4 py-3">
              WAEC Administrator
            </div>
          </div>

          <div>
            <label className="text-xs opacity-60">Email</label>
            <div className="mt-1 rounded-xl border border-[var(--border)] bg-[var(--muted)] px-4 py-3">
              admin@waec.gov.ng
            </div>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Shield size={19} className="text-red-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="text-sm opacity-60">
              Security controls will be connected to authentication later.
            </p>
          </div>
        </div>

        <div className="text-sm opacity-70">
          Security controls are connected to the active authenticated user
          session.
        </div>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-5
            py-2.5
            text-sm
            font-semibold
            text-black
            transition
            hover:bg-cyan-400
          "
        >
          {saved ? <Check size={17} /> : <Save size={17} />}
          {saved ? "Saved" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
