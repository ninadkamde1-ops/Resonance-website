"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  Swords,
  Radio,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Match = {
  id: string;
  round_name: string | null;
  match_number: number | null;
  team_a_score: number | null;
  team_b_score: number | null;
  scheduled_at: string | null;
  status: string | null;

  tournaments:
    | {
        id: string;
        name: string;
        game_id: string;
        games:
          | {
              name: string;
              short_name: string | null;
            }
          | null;
      }
    | null;

  team_a:
    | {
        id: string;
        name: string;
        tag: string | null;
        logo_url: string | null;
      }
    | null;

  team_b:
    | {
        id: string;
        name: string;
        tag: string | null;
        logo_url: string | null;
      }
    | null;
};

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

function getStatus(status: string | null) {
  const value = status?.toLowerCase();

  if (value === "live" || value === "ongoing") {
    return {
      label: "LIVE",
      className:
        "border-red-400/30 bg-red-500/10 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.15)]",
    };
  }

  if (value === "completed" || value === "finished") {
    return {
      label: "COMPLETED",
      className:
        "border-white/10 bg-white/5 text-white/50",
    };
  }

  return {
    label: "UPCOMING",
    className:
      "border-[#E6FF4A]/30 bg-[#E6FF4A]/10 text-[#E6FF4A]",
  };
}

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
      .order("scheduled_at", {
        ascending: true,
        nullsFirst: false,
      });

    if (error) {
      console.error("MATCHES LOAD ERROR:", error);
      setMatches([]);
      setLoading(false);
      return;
    }

    setMatches((data as Match[]) || []);
    setLoading(false);
  }

  return (
    <section className="relative overflow-hidden bg-[#12051F] px-6 py-24 text-white sm:px-10 lg:px-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-[#FF4F81]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#FF4F81]">
                Battle Arena
              </span>
            </div>

            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
              Matches
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Follow every Resonance battle — from upcoming clashes to
              live matches and completed results.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#E6FF4A]/20 bg-[#E6FF4A]/5 px-4 py-2">
            <Swords className="h-4 w-4 text-[#E6FF4A]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#E6FF4A]">
              Match Center
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl border border-white/5 bg-white/[0.03]"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && matches.length === 0 && (
          <div className="rounded-3xl border border-[#FF4F81]/10 bg-white/[0.02] px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FF4F81]/20 bg-[#FF4F81]/5">
              <Swords className="h-7 w-7 text-[#FF4F81]" />
            </div>

            <h3 className="text-xl font-black uppercase">
              No matches yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm text-white/35">
              Match schedules and results will appear here once they are
              created from Resonance Admin HQ.
            </p>
          </div>
        )}

        {/* Matches */}
        {!loading && matches.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2">
            {matches.map((match, index) => {
              const status = getStatus(match.status);

              return (
                <motion.article
                  key={match.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#1A0A2E]/70 p-6 backdrop-blur-xl transition hover:border-[#FF4F81]/30 hover:shadow-[0_20px_70px_rgba(124,58,237,0.15)]"
                >
                  {/* Top line */}
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#FF4F81] via-[#7C3AED] to-[#E6FF4A] opacity-70" />

                  {/* Match header */}
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-[#E6FF4A]" />

                        <span className="text-xs font-black uppercase tracking-wider text-white/70">
                          {match.tournaments?.name || "Tournament"}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/35">
                        <span>
                          {match.tournaments?.games?.name ||
                            "Game"}
                        </span>

                        {match.round_name && (
                          <>
                            <span>•</span>
                            <span>{match.round_name}</span>
                          </>
                        )}

                        {match.match_number !== null && (
                          <>
                            <span>•</span>
                            <span>
                              Match {match.match_number}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-black tracking-widest ${status.className}`}
                    >
                      {status.label}
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    {/* Team A */}
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {match.team_a?.logo_url ? (
                          <img
                            src={match.team_a.logo_url}
                            alt={match.team_a.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-black text-[#FF4F81]">
                            {match.team_a?.tag?.slice(0, 3) ||
                              "TBA"}
                          </span>
                        )}
                      </div>

                      <h3 className="truncate text-sm font-black uppercase">
                        {match.team_a?.name || "TBA"}
                      </h3>

                      {match.team_a?.tag && (
                        <p className="mt-1 text-[10px] font-bold tracking-widest text-white/30">
                          {match.team_a.tag}
                        </p>
                      )}
                    </div>

                    {/* VS / Score */}
                    <div className="text-center">
                      {match.status?.toLowerCase() === "live" ||
                      match.status?.toLowerCase() === "ongoing" ? (
                        <div className="mb-2 flex items-center justify-center gap-1.5">
                          <Radio className="h-3 w-3 animate-pulse text-red-400" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-red-300">
                            Live
                          </span>
                        </div>
                      ) : null}

                      {match.team_a_score !== null &&
                      match.team_b_score !== null ? (
                        <div className="flex items-center gap-2 text-2xl font-black">
                          <span>{match.team_a_score}</span>
                          <span className="text-white/20">:</span>
                          <span>{match.team_b_score}</span>
                        </div>
                      ) : (
                        <div className="text-sm font-black uppercase tracking-widest text-white/20">
                          VS
                        </div>
                      )}
                    </div>

                    {/* Team B */}
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {match.team_b?.logo_url ? (
                          <img
                            src={match.team_b.logo_url}
                            alt={match.team_b.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-black text-[#E6FF4A]">
                            {match.team_b?.tag?.slice(0, 3) ||
                              "TBA"}
                          </span>
                        )}
                      </div>

                      <h3 className="truncate text-sm font-black uppercase">
                        {match.team_b?.name || "TBA"}
                      </h3>

                      {match.team_b?.tag && (
                        <p className="mt-1 text-[10px] font-bold tracking-widest text-white/30">
                          {match.team_b.tag}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <CalendarDays className="h-4 w-4 text-[#FF4F81]" />

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-white/20">
                          Date
                        </p>
                        <p className="mt-0.5 font-bold text-white/60">
                          {formatDate(match.scheduled_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock3 className="h-4 w-4 text-[#E6FF4A]" />

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-white/20">
                          Time
                        </p>
                        <p className="mt-0.5 font-bold text-white/60">
                          {formatTime(match.scheduled_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {match.tournaments?.name && (
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/20">
                      <MapPin className="h-3 w-3" />
                      Match Center
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}