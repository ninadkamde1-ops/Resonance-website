"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, Swords } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Match = {
  id: string;
  round_name: string | null;
  match_number: number | null;
  team_a_score: number | null;
  team_b_score: number | null;
  scheduled_at: string | null;
  status: string | null;

  tournaments: {
    id: string;
    name: string;
    game_id: string;

    games: {
      name: string;
      short_name: string | null;
    } | null;
  } | null;

  team_a: {
    id: string;
    name: string;
    tag: string | null;
    logo_url: string | null;
  } | null;

  team_b: {
    id: string;
    name: string;
    tag: string | null;
    logo_url: string | null;
  } | null;
};

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    setLoading(true);

    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        round_name,
        match_number,
        team_a_score,
        team_b_score,
        scheduled_at,
        status,

        tournaments (
          id,
          name,
          game_id,

          games (
            name,
            short_name
          )
        ),

        team_a:teams!matches_team_a_id_fkey (
          id,
          name,
          tag,
          logo_url
        ),

        team_b:teams!matches_team_b_id_fkey (
          id,
          name,
          tag,
          logo_url
        )
      `)
      .order("scheduled_at", { ascending: true });

    if (error) {
      console.error("Matches error:", error);
      setMatches([]);
      setLoading(false);
      return;
    }

    /*
      Normalize Supabase relationship responses.
    */
    const normalizedMatches = (data || []).map((row: any) => ({
      ...row,

      tournaments: Array.isArray(row.tournaments)
        ? row.tournaments[0] ?? null
        : row.tournaments ?? null,

      team_a: Array.isArray(row.team_a)
        ? row.team_a[0] ?? null
        : row.team_a ?? null,

      team_b: Array.isArray(row.team_b)
        ? row.team_b[0] ?? null
        : row.team_b ?? null,
    }));

    setMatches(normalizedMatches as unknown as Match[]);
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

  function formatTime(date: string | null) {
    if (!date) return "TBD";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusClass(status: string | null) {
    switch (status?.toLowerCase()) {
      case "live":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="animate-pulse text-gray-400">
            Loading matches...
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
            <Swords
              size={24}
              className="text-yellow-400"
            />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Competition
            </span>
          </div>

          <h2 className="text-4xl font-black text-white">
            Matches
          </h2>

          <p className="mt-3 text-gray-400">
            Upcoming and completed tournament matches.
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <Swords
              size={40}
              className="mx-auto mb-4 text-gray-500"
            />

            <p className="text-gray-400">
              No matches scheduled yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">

            {matches.map((match) => {
              const teamA = match.team_a;
              const teamB = match.team_b;

              return (
                <div
                  key={match.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-yellow-400/20 hover:bg-white/[0.05]"
                >

                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                    <div>
                      <p className="text-sm font-bold text-white">
                        {match.tournaments?.name || "Tournament"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {match.tournaments?.games?.name || "Game"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${getStatusClass(
                        match.status
                      )}`}
                    >
                      {match.status || "upcoming"}
                    </span>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-5 text-xs text-gray-500">

                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} />

                      {formatDate(match.scheduled_at)}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={15} />

                      {formatTime(match.scheduled_at)}
                    </div>

                    {match.round_name && (
                      <div>
                        Round:{" "}
                        <span className="text-gray-300">
                          {match.round_name}
                        </span>
                      </div>
                    )}

                    {match.match_number !== null && (
                      <div>
                        Match:{" "}
                        <span className="text-gray-300">
                          #{match.match_number}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">

                    <div className="flex items-center justify-end gap-3 text-right">

                      <div>
                        <p className="font-bold text-white">
                          {teamA?.name || "TBD"}
                        </p>

                        {teamA?.tag && (
                          <p className="text-xs text-gray-500">
                            [{teamA.tag}]
                          </p>
                        )}
                      </div>

                      {teamA?.logo_url ? (
                        <img
                          src={teamA.logo_url}
                          alt={teamA.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 font-black text-yellow-400">
                          {teamA?.name?.charAt(0) || "A"}
                        </div>
                      )}

                    </div>

                    <div className="text-center">

                      <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                        VS
                      </p>

                      <div className="mt-2 text-xl font-black text-white">
                        {match.team_a_score ?? "-"}{" "}
                        <span className="text-gray-600">
                          :
                        </span>{" "}
                        {match.team_b_score ?? "-"}
                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      {teamB?.logo_url ? (
                        <img
                          src={teamB.logo_url}
                          alt={teamB.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 font-black text-yellow-400">
                          {teamB?.name?.charAt(0) || "B"}
                        </div>
                      )}

                      <div>
                        <p className="font-bold text-white">
                          {teamB?.name || "TBD"}
                        </p>

                        {teamB?.tag && (
                          <p className="text-xs text-gray-500">
                            [{teamB.tag}]
                          </p>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}