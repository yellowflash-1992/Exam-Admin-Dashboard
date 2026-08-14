"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "./Sidebar";

import {
  Bell,
  ChevronDown,
  Mail,
  Menu,
  Moon,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // const pathname = usePathname();
  const router = useRouter();

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

bg-black/30
backdrop-blur-2xl
backdrop-saturate-150

border border-white/10
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
            <h1 className="text-base font-bold sm:text-lg">Dashboard</h1>

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
          <button className="hidden md:block p-2 rounded-lg hover:bg-white/5">
            <Moon size={20} />
          </button>

          {/* Mail */}
          <button className="relative p-2 rounded-lg hover:bg-white/5">
            <Mail size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-white/5">
            <Bell size={20} />

            <span
              className="absolute -top-1 -right-1
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
          </button>

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

                <button className="w-full text-left p-2 rounded-lg hover:bg-[var(--muted)]">
                  🌙 Appearance
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
                <p className="font-semibold text-sm">Super Admin</p>

                <p className="text-xs opacity-60">admin@waec.gov.ng</p>
              </div>

              <ChevronDown size={16} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-60 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-[var(--border)]">
                  <p className="font-semibold">Administrator</p>

                  <p className="text-xs opacity-60">
                    National Examination Administrator
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

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  📊 Dashboard Preferences
                </button>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  🔔 Notifications
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
                      router.push("/");
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
