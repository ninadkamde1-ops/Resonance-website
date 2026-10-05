"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal, Crown } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Standing = {
  id: string;
  tournament_id: string;
  team_id: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;

  teams: {
    id: string;
    name: string;
    tag: string | null;
    logo_url: string | null;
  } | null;

  tournaments: {
    id: string;
    name: string;
    game_id: string;
    start_date: string | null;
    status: string | null;
  } | null;
};

export default function Leaderboard() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    setLoading(true);

    const { data, error } = await supabase
      .from("standings")
      .select(`
        id,
        tournament_id,
        team_id,
        matches_played,
        wins,
        losses,
        draws,
        points,
        teams (
          id,
          name,
          tag,
          logo_url
        ),
        tournaments (
          id,
          name,
          game_id,
          start_date,
          status
        )
      `)
      .order("points", { ascending: false });

    if (error) {
      console.error("Leaderboard error:", error);
      setStandings([]);
      setLoading(false);
      return;
    }

    // Supabase relationships can be returned as arrays.
    // Convert them into the single-object shape used above.
    const normalizedStandings = (data || []).map((row: any) => ({
      ...row,

      teams: Array.isArray(row.teams)
        ? row.teams[0] ?? null
        : row.teams ?? null,

      tournaments: Array.isArray(row.tournaments)
        ? row.tournaments[0] ?? null
        : row.tournaments ?? null,
    }));

    setStandings(normalizedStandings as Standing[]);
    setLoading(false);
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="animate-pulse text-gray-400">
            Loading leaderboard...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <Trophy
              size={24}
              className="text-yellow-400"
            />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Rankings
            </span>
          </div>

          <h2 className="text-4xl font-black text-white">
            Leaderboard
          </h2>

          <p className="mt-3 text-gray-400">
            Track the top performing teams across
            Resonance tournaments.
          </p>
        </div>

        {/* EMPTY STATE */}
        {standings.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">

            <Trophy
              size={40}
              className="mx-auto mb-4 text-gray-500"
            />

            <p className="text-gray-400">
              No leaderboard data available yet.
            </p>

          </div>
        ) : (

          /* LEADERBOARD */
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-[70px_1fr_120px_100px_100px_100px] gap-4 border-b border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">

              <span>#</span>

              <span>Team</span>

              <span>Matches</span>

              <span>Wins</span>

              <span>Losses</span>

              <span>Points</span>

            </div>

            {/* ROWS */}
            {standings.map((standing, index) => {

              const team = standing.teams;

              return (
                <div
                  key={standing.id}
                  className="grid grid-cols-[70px_1fr_120px_100px_100px_100px] items-center gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[0.04]"
                >

                  {/* RANK */}
                  <div className="flex items-center">

                    {index === 0 ? (
                      <Crown
                        size={22}
                        className="text-yellow-400"
                      />
                    ) : index === 1 ? (
                      <Medal
                        size={22}
                        className="text-gray-300"
                      />
                    ) : index === 2 ? (
                      <Medal
                        size={22}
                        className="text-orange-400"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-500">
                        {index + 1}
                      </span>
                    )}

                  </div>

                  {/* TEAM */}
                  <div className="flex items-center gap-3">

                    {team?.logo_url ? (
                      <img
                        src={team.logo_url}
                        alt={team.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-yellow-400">
                        {team?.name?.charAt(0) || "T"}
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-white">
                        {team?.name || "Unknown Team"}
                      </p>

                      {team?.tag && (
                        <p className="text-xs text-gray-500">
                          [{team.tag}]
                        </p>
                      )}
                    </div>

                  </div>

                  {/* MATCHES */}
                  <span className="text-gray-300">
                    {standing.matches_played}
                  </span>

                  {/* WINS */}
                  <span className="font-semibold text-green-400">
                    {standing.wins}
                  </span>

                  {/* LOSSES */}
                  <span className="font-semibold text-red-400">
                    {standing.losses}
                  </span>

                  {/* POINTS */}
                  <span className="font-black text-yellow-400">
                    {standing.points}
                  </span>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}