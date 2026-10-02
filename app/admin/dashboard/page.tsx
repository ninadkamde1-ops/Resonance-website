"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import {
  Activity,
  Bell,
  ClipboardList,
  Gamepad2,
  LogOut,
  Shield,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

type Staff = {
  display_name: string;
  role: string;
};

type Stats = {
  tournaments: number;
  teams: number;
  games: number;
  matches: number;
};

export default function AdminDashboard() {
  const [staff, setStaff] = useState<Staff | null>(null);

  const [stats, setStats] = useState<Stats>({
    tournaments: 0,
    teams: 0,
    games: 0,
    matches: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/admin";
        return;
      }

      const { data: staffData, error: staffError } = await supabase
        .from("staff")
        .select("display_name, role")
        .eq("id", user.id)
        .eq("is_active", true)
        .single();

      if (staffError || !staffData) {
        console.error("Staff verification failed:", staffError);

        await supabase.auth.signOut();

        window.location.href = "/admin";
        return;
      }

      setStaff(staffData);

      const [
        tournaments,
        teams,
        games,
        matches,
      ] = await Promise.all([
        supabase
          .from("tournaments")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("teams")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("games")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("matches")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setStats({
        tournaments: tournaments.count ?? 0,
        teams: teams.count ?? 0,
        games: games.count ?? 0,
        matches: matches.count ?? 0,
      });

      setLoading(false);
    }

    loadDashboard();
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    window.location.href = "/admin";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-yellow-400">
        <div className="text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-yellow-400/20 border-t-yellow-400" />

          <p className="text-xs font-black tracking-[0.4em]">
            AUTHENTICATING HQ...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-black md:block">

          <div className="flex h-full flex-col">

            {/* LOGO */}

            <div className="p-7">

              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400/50">
                  <span className="font-black text-yellow-400">
                    R
                  </span>
                </div>

                <div>
                  <p className="text-xs font-black tracking-[0.3em]">
                    RESONANCE
                  </p>

                  <p className="text-[8px] tracking-[0.35em] text-white/25">
                    HQ
                  </p>
                </div>
              </Link>

              {/* NAVIGATION */}

              <div className="mt-12 space-y-2">

                <NavItem
                  href="/admin/dashboard"
                  icon={<Activity size={16} />}
                  label="DASHBOARD"
                  active
                />

                <NavItem
                  href="/admin/dashboard/tournaments"
                  icon={<Trophy size={16} />}
                  label="TOURNAMENTS"
                />

                <NavItem
                  href="/admin/dashboard/games"
                  icon={<Gamepad2 size={16} />}
                  label="GAMES"
                />

                <NavItem
                  href="/admin/dashboard/teams"
                  icon={<Users size={16} />}
                  label="TEAMS"
                />

                <NavItem
                  href="/admin/dashboard/players"
                  icon={<Users size={16} />}
                  label="PLAYERS"
                />
                <NavItem
                 href="/admin/dashboard/registrations"
                 icon={<ClipboardList size={16} />}
                 label="REGISTRATIONS"
                />
                <NavItem
                  href="/admin/dashboard/matches"
                  icon={<Swords size={16} />}
                  label="MATCHES"
                />

                <NavItem
                  href="/admin/dashboard/announcements"
                  icon={<Bell size={16} />}
                  label="ANNOUNCEMENTS"
                />

                <NavItem
                  href="/admin/dashboard/staff"
                  icon={<Shield size={16} />}
                  label="STAFF"
                />

              </div>
            </div>

            {/* LOGOUT */}

            <div className="mt-auto border-t border-white/10 p-6">

              <button
                onClick={logout}
                className="flex items-center gap-3 text-xs font-bold tracking-widest text-white/30 transition hover:text-yellow-400"
              >
                <LogOut size={15} />

                LOG OUT
              </button>

            </div>

          </div>

        </aside>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <section className="min-w-0 flex-1">

          {/* TOP BAR */}

          <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">

            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] text-yellow-400">
                RESONANCE // COMMAND CENTER
              </p>

              <h1 className="mt-2 text-2xl font-black md:text-3xl">
                ADMIN HQ
              </h1>
            </div>

            <div className="text-right">

              <p className="text-xs font-bold">
                {staff?.display_name}
              </p>

              <p className="mt-1 text-[8px] font-bold tracking-[0.25em] text-yellow-400">
                {staff?.role?.toUpperCase()}
              </p>

            </div>

          </header>

          {/* CONTENT */}

          <div className="p-6 md:p-10">

            {/* TITLE */}

            <div className="mb-10">

              <p className="text-xs text-white/30">
                Welcome back.
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight">
                CLUB OVERVIEW
              </h2>

            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <DashboardStat
                icon={<Trophy size={18} />}
                label="TOURNAMENTS"
                value={stats.tournaments}
                href="/admin/dashboard/tournaments"
              />

              <DashboardStat
                icon={<Users size={18} />}
                label="TEAMS"
                value={stats.teams}
                href="/admin/dashboard/teams"
              />

              <DashboardStat
                icon={<Gamepad2 size={18} />}
                label="GAMES"
                value={stats.games}
                href="/admin/dashboard/games"
              />

              <DashboardStat
                icon={<Swords size={18} />}
                label="MATCHES"
                value={stats.matches}
                href="/admin/dashboard/matches"
              />

            </div>

            {/* =================================================
                LOWER PANELS
            ================================================= */}

            <div className="mt-10 grid gap-5 lg:grid-cols-2">

              {/* QUICK ACTIONS */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
                      SYSTEM
                    </p>

                    <h3 className="mt-3 text-xl font-black">
                      QUICK ACTIONS
                    </h3>
                  </div>

                  <Activity
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">

                  <QuickAction
                    href="/admin/dashboard/tournaments"
                    label="NEW TOURNAMENT"
                  />

                  <QuickAction
                    href="/admin/dashboard/games"
                    label="ADD GAME"
                  />

                  <QuickAction
                    href="/admin/dashboard/teams"
                    label="ADD TEAM"
                  />

                  <QuickAction
                    href="/admin/dashboard/announcements"
                    label="ANNOUNCEMENT"
                  />

                </div>

              </div>

              {/* SECURITY */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">

                <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
                  SECURITY
                </p>

                <h3 className="mt-3 text-xl font-black">
                  ACCESS STATUS
                </h3>

                <div className="mt-7 flex items-center gap-4 rounded-xl border border-green-400/20 bg-green-400/[0.03] p-5">

                  <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]" />

                  <div>

                    <p className="text-xs font-black">
                      AUTHENTICATED
                    </p>

                    <p className="mt-1 text-[9px] text-white/25">
                      Staff permissions verified
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}


/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[9px] font-bold tracking-[0.2em] transition-all duration-300 ${
        active
          ? "bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.08)]"
          : "text-white/30 hover:bg-yellow-400/[0.05] hover:text-yellow-400"
      }`}
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {icon}
      </span>

      {label}
    </Link>
  );
}


/* =========================================================
   DASHBOARD STAT
========================================================= */

function DashboardStat({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.03]"
    >

      <div className="flex items-center justify-between">

        <div className="text-yellow-400 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        <span className="text-[8px] font-bold tracking-widest text-white/20">
          LIVE
        </span>

      </div>

      <p className="mt-8 text-4xl font-black">
        {value}
      </p>

      <p className="mt-2 text-[9px] font-bold tracking-[0.3em] text-white/25">
        {label}
      </p>

    </Link>
  );
}


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-white/10 bg-black px-4 py-4 text-left text-[8px] font-black tracking-[0.2em] text-white/35 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/40 hover:text-yellow-400"
    >
      + {label}
    </Link>
  );
}


