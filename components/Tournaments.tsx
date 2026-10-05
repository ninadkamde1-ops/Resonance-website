"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Tournament = {
  id: string;
  status: string | null;
  name: string;
  start_date: string | null;
  end_date: string | null;
  location: string | null;
  max_teams: number | null;

  games: {
    name: string;
    short_name: string | null;
  } | null;
};

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTournaments();
  }, []);

  async function loadTournaments() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tournaments")
      .select(`
        id,
        status,
        name,
        start_date,
        end_date,
        location,
        max_teams,

        games (
          name,
          short_name
        )
      `)
      .order("start_date", { ascending: true });

    if (error) {
      console.error("Tournaments error:", error);
      setTournaments([]);
      setLoading(false);
      return;
    }

    /*
      Normalize the Supabase relationship response.

      Supabase may return `games` as an array even though
      each tournament belongs to one game.
    */
    const normalizedTournaments = (data || []).map((row: any) => ({
      ...row,

      games: Array.isArray(row.games)
        ? row.games[0] ?? null
        : row.games ?? null,
    }));

    setTournaments(
      normalizedTournaments as Tournament[]
    );

    setLoading(false);
  }

  function formatDate(date: string | null) {
    if (!date) return "TBD";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function getStatusLabel(status: string | null) {
    switch (status) {
      case "registration":
        return "REGISTRATION OPEN";

      case "upcoming":
        return "UPCOMING";

      case "live":
        return "LIVE";

      case "completed":
        return "COMPLETED";

      default:
        return status?.toUpperCase() || "UNKNOWN";
    }
  }

  function getStatusClass(status: string | null) {
    switch (status) {
      case "registration":
        return "border-green-400/30 bg-green-400/10 text-green-400";

      case "live":
        return "border-red-400/30 bg-red-400/10 text-red-400";

      case "completed":
        return "border-gray-400/20 bg-gray-400/10 text-gray-400";

      default:
        return "border-yellow-400/30 bg-yellow-400/10 text-yellow-400";
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">

          <div className="mb-10">
            <div className="h-4 w-32 animate-pulse rounded bg-white/10" />

            <div className="mt-4 h-10 w-64 animate-pulse rounded bg-white/10" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))}

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-10">

          <div className="mb-3 flex items-center gap-3">

            <Trophy
              size={24}
              className="text-yellow-400"
            />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Compete
            </span>

          </div>

          <h2 className="text-4xl font-black text-white">
            Tournaments
          </h2>

          <p className="mt-3 max-w-2xl text-gray-400">
            Explore upcoming Resonance tournaments,
            register your team, and compete for the win.
          </p>

        </div>

        {tournaments.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">

            <Trophy
              size={42}
              className="mx-auto mb-4 text-gray-500"
            />

            <p className="text-gray-400">
              No tournaments available yet.
            </p>

          </div>
        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {tournaments.map((tournament) => (

              <div
                key={tournament.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/[0.05]"
              >

                {/* Glow */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl transition group-hover:bg-yellow-400/20" />

                <div className="relative">

                  {/* Status */}

                  <div className="mb-5 flex items-center justify-between gap-3">

                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-black tracking-wider ${getStatusClass(
                        tournament.status
                      )}`}
                    >
                      {getStatusLabel(tournament.status)}
                    </span>

                    {tournament.games && (
                      <span className="text-xs font-semibold text-gray-500">
                        {tournament.games.short_name ||
                          tournament.games.name}
                      </span>
                    )}

                  </div>

                  {/* Title */}

                  <h3 className="text-2xl font-black text-white transition group-hover:text-yellow-400">
                    {tournament.name}
                  </h3>

                  {/* Game */}

                  {tournament.games && (
                    <p className="mt-2 text-sm text-gray-400">
                      {tournament.games.name}
                    </p>
                  )}

                  {/* Information */}

                  <div className="mt-6 space-y-3">

                    <div className="flex items-center gap-3 text-sm text-gray-400">

                      <CalendarDays
                        size={17}
                        className="text-yellow-400"
                      />

                      <span>
                        {formatDate(tournament.start_date)}
                      </span>

                    </div>

                    {tournament.location && (
                      <div className="flex items-center gap-3 text-sm text-gray-400">

                        <MapPin
                          size={17}
                          className="text-yellow-400"
                        />

                        <span>
                          {tournament.location}
                        </span>

                      </div>
                    )}

                    {tournament.max_teams !== null && (
                      <div className="flex items-center gap-3 text-sm text-gray-400">

                        <Users
                          size={17}
                          className="text-yellow-400"
                        />

                        <span>
                          Up to {tournament.max_teams} teams
                        </span>

                      </div>
                    )}

                  </div>

                  {/* Action */}

                  <div className="mt-7">

                    {(
                      tournament.status === "registration" ||
                      tournament.status === "upcoming"
                    ) ? (

                      <Link
                        href={`/register?tournament=${tournament.id}`}
                        className="flex items-center justify-between rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-bold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                      >

                        <span>
                          Register Your Team
                        </span>

                        <ArrowRight size={17} />

                      </Link>

                    ) : (

                      <Link
                        href={`/tournaments/${tournament.id}`}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white transition hover:border-yellow-400/30 hover:text-yellow-400"
                      >

                        <span>
                          View Tournament
                        </span>

                        <ArrowRight size={17} />

                      </Link>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}