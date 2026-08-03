"use client";

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

  return (
    <>
      <div
        className="
sticky top-0 z-50
h-16
mx-2 mt-2
sm:mx-4
lg:mx-6
px-6

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
        <div className="flex items-center gap-4">
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu size={22} />
          </button>

          <div>
            <h1 className="font-bold text-lg hidden sm:block">
              WAEC Dashboard
            </h1>

            <p className="text-xs opacity-60 hidden md:block">
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
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded-lg hover:bg-white/5"
            >
              <Settings size={20} />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 top-12 w-52 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl p-2 z-50">
                <button className="w-full text-left p-2 rounded-lg hover:bg-[var(--muted)]">
                  ⚙ General Settings
                </button>

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
                  <p className="font-semibold">WAEC Administrator</p>

                  <p className="text-xs opacity-60">
                    National Examination Administrator
                  </p>
                </div>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  👤 My Profile
                </button>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  📊 Dashboard Preferences
                </button>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  🔔 Notifications
                </button>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  📄 Activity Log
                </button>

                <button className="w-full text-left p-3 hover:bg-[var(--muted)]">
                  ❓ Help Center
                </button>

                <div className="border-t border-[var(--border)]">
                  <button className="w-full text-left p-3 hover:bg-red-500/20 text-red-400">
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
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="w-64 h-full bg-[var(--card)] p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Menu</h2>

              <button onClick={() => setOpen(false)} className="text-2xl">
                ×
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
