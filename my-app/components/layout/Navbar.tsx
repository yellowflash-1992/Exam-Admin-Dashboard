"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";

import {
  Bell,
  ChevronDown,
  Mail,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserCircle,
} from "lucide-react";

type NavbarProps = {
  user?: {
    username?: string | null;
    email?: string | null;
    fullName?: string | null;
    role?: string | null;
    theme?: string | null;
    notifications?: boolean;
    emailAlerts?: boolean;
  };
};

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(user?.theme !== "light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user?.notifications ?? true,
  );
  const [savingSettings, setSavingSettings] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setDarkMode(user?.theme !== "light");
    setNotificationsEnabled(user?.notifications ?? true);
  }, [user?.theme, user?.notifications]);

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
      "--card-foreground",
      darkMode ? "#F9FAFB" : "#0f172a",
    );
    document.documentElement.style.setProperty(
      "--muted",
      darkMode ? "#1A2332" : "#e2e8f0",
    );
    document.documentElement.style.setProperty(
      "--border",
      darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.14)",
    );
  }, [darkMode]);

  const pageTitle =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
        "Dashboard";

  const saveSettings = async (
    nextTheme: boolean,
    nextNotifications: boolean,
  ) => {
    setSavingSettings(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: nextTheme ? "dark" : "light",
          notifications: nextNotifications,
          emailAlerts: user?.emailAlerts ?? true,
        }),
      });

      if (!response.ok) throw new Error("Unable to save settings");
      router.refresh();
    } catch {
      setDarkMode(!nextTheme);
      setNotificationsEnabled(!nextNotifications);
    } finally {
      setSavingSettings(false);
    }
  };

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    void saveSettings(nextTheme, notificationsEnabled);
  };

  const toggleNotifications = () => {
    const nextNotifications = !notificationsEnabled;
    setNotificationsEnabled(nextNotifications);
    void saveSettings(darkMode, nextNotifications);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <div
        className="
 top-0 z-50
h-16
mx-2 mt-2
sm:mx-4
lg:mx-6
md:px-6
px-4
    sm:px-6

flex items-center justify-between

rounded-2xl mb-4

bg-[var(--card)]
backdrop-blur-2xl
backdrop-saturate-150

border border-[var(--border)]
shadow-xl shadow-black/20

"
      >
        {/* LEFT */}
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setSettingsOpen(false);
              setProfileOpen(false);
            }}
            className="
      rounded-xl
      p-2
      transition
      hover:bg-white/5
      md:hidden
    "
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-base font-bold capitalize sm:text-lg">
              {pageTitle}
            </h1>

            <p className="hidden text-xs opacity-60 md:block">
              National Examination Administration
            </p>
          </div>
        </div>
        {/* SEARCH */}

        <div
          className="hidden lg:flex items-center bg-[var(--muted)]
  rounded-xl px-4 py-2 w-[360px]"
        >
          <Search size={18} className="opacity-60" />

          <input
            placeholder="Search candidates, centers..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative">
          {/* Dark Mode */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={savingSettings}
            className="hidden rounded-lg p-2 hover:bg-[var(--muted)] disabled:opacity-50 md:block"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mail */}
          <button
            type="button"
            className="relative rounded-lg p-2 hover:bg-[var(--muted)]"
            aria-label="Open mail"
          >
            <Mail size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => setNotificationOpen((open) => !open)}
            className="relative rounded-lg p-2 hover:bg-[var(--muted)]"
            aria-label="Open notifications"
          >
            <Bell size={20} />

            {notificationsEnabled && (
              <span
                className="absolute -right-1 -top-1
      bg-red-500
      text-[10px]
      w-4
      h-4
      rounded-full
      flex
      items-center
      justify-center"
              >
                3
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-12 top-12 z-50 w-64 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm shadow-xl">
              <p className="font-semibold">Notifications</p>
              <p className="mt-2 opacity-60">
                {notificationsEnabled
                  ? "You have 3 dashboard updates."
                  : "Dashboard notifications are off."}
              </p>
              <Link
                href="/settings"
                onClick={() => setNotificationOpen(false)}
                className="mt-3 inline-block text-cyan-500 hover:underline"
              >
                Manage preferences
              </Link>
            </div>
          )}

          {/* Settings */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded-lg hover:bg-white/5"
            >
              <Settings size={20} />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 top-12 w-52 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl p-2 z-50">
                <Link
                  href="/settings"
                  onClick={() => {
                    setSettingsOpen((open) => !open);
                    setProfileOpen(false);
                  }}
                  className="block w-full text-left p-2 rounded-lg hover:bg-[var(--muted)]"
                >
                  ⚙ General Settings
                </Link>

                <button
                  type="button"
                  onClick={toggleTheme}
                  disabled={savingSettings}
                  className="w-full rounded-lg p-2 text-left hover:bg-[var(--muted)] disabled:opacity-50"
                >
                  {darkMode ? "☀ Appearance: dark" : "🌙 Appearance: light"}
                </button>

                <button className="w-full text-left p-2 rounded-lg hover:bg-[var(--muted)]">
                  🔐 Security
                </button>

                <button className="w-full text-left p-2 rounded-lg hover:bg-[var(--muted)]">
                  📥 Backup Data
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 border-l border-[var(--border)] pl-4"
            >
              <UserCircle size={36} className="text-cyan-400" />

              <div className="hidden lg:block text-left">
                <p className="font-semibold text-sm">
                  {user?.fullName || user?.username || "Administrator"}
                </p>

                <p className="text-xs opacity-60">
                  {user?.email || "admin@waec.gov.ng"}
                </p>
              </div>

              <ChevronDown size={16} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-60 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl overflow-hidden z-50">
                <div className="border-b border-[var(--border)] p-4">
                  <p className="font-semibold">
                    {user?.fullName || user?.username || "User"}
                  </p>

                  <p className="text-xs capitalize opacity-60">
                    {user?.role || "user"}
                  </p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => {
                    setProfileOpen((open) => !open);
                    setSettingsOpen(false);
                  }}
                  className="block w-full text-left p-3 hover:bg-[var(--muted)]"
                >
                  👤 My Profile
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    toggleTheme();
                  }}
                  disabled={savingSettings}
                  className="w-full p-3 text-left hover:bg-[var(--muted)] disabled:opacity-50"
                >
                  📊 Dashboard Preferences
                </button>

                <button
                  type="button"
                  onClick={toggleNotifications}
                  disabled={savingSettings}
                  className="w-full p-3 text-left hover:bg-[var(--muted)] disabled:opacity-50"
                >
                  {notificationsEnabled
                    ? "🔕 Turn off notifications"
                    : "🔔 Turn on notifications"}
                </button>

                <Link
                  href="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="block w-full text-left p-3 hover:bg-[var(--muted)]"
                >
                  📄 Activity Log
                </Link>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  ❓ Help Center
                </button>

                <div className="border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      void handleLogout();
                    }}
                    className="w-full text-left p-3 hover:bg-red-500/20 text-red-400"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="
        h-full
        max-h-screen
        w-[280px]
        max-w-[85vw]
        overflow-hidden
        bg-[var(--card)]
        p-4
        shadow-2xl
      "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-xl hover:bg-[var(--muted)]"
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            <Sidebar mobile onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
