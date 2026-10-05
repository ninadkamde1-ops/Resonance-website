"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Trophy,
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

function formatDate(
  startDate: string | null,
  endDate: string | null,
) {
  if (!startDate && !endDate) {
    return "DATE TBA";
  }

  const format = (value: string) =>
    new Date(value)
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();

  if (startDate && endDate && startDate !== endDate) {
    return `${format(startDate)} — ${format(endDate)}`;
  }

  return format(startDate || endDate!);
}

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<
    Tournament[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTournaments() {
      const { data, error } = await supabase
        .from("tournaments")
        .select(`
          id,
          name,
          status,
          start_date,
          end_date,
          location,
          max_teams,
          games (
            name,
            short_name
          )
        `)
        .order("start_date", {
          ascending: true,
        });

      if (error) {
        console.error(
          "PUBLIC TOURNAMENTS ERROR:",
          error,
        );

        setLoading(false);
        return;
      }

      setTournaments(
        (data || []) as Tournament[],
      );

      setLoading(false);
    }

    loadTournaments();
  }, []);

  return (
    <section
      id="tournaments"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10"
    >
      {/* ========================================================= */}
      {/* HEADING */}
      {/* ========================================================= */}

      <div className="mb-16">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[#FF4F81]" />

          <p className="text-[10px] font-black tracking-[0.45em] text-[#FF4F81]">
            02 // COMPETITION
          </p>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-6xl font-black uppercase tracking-[-0.05em] md:text-8xl">
            ENTER
            <br />

            <span className="text-[#F5F0FF]/20 transition-colors duration-500 hover:text-[#E6FF4A]/40">
              THE ARENA.
            </span>
          </h2>

          <p className="max-w-sm text-sm leading-7 text-[#F5F0FF]/40">
            Follow every battle, every tournament and
            every opportunity to compete under the
            Resonance banner.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TOURNAMENT LIST */}
      {/* ========================================================= */}

      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#FF4F81]/20 border-t-[#FF4F81]" />

          <p className="text-sm font-black tracking-[0.25em] text-[#FF4F81]">
            LOADING TOURNAMENTS...
          </p>
        </div>
      ) : tournaments.length === 0 ? (
        <div className="rounded-2xl border border-[#B78AFF]/15 bg-[#1A0A2E]/80 p-12 text-center">
          <Trophy
            size={28}
            className="mx-auto mb-4 text-[#FF4F81]"
          />

          <p className="text-sm font-black tracking-[0.2em] text-[#F5F0FF]/50">
            NO TOURNAMENTS AVAILABLE
          </p>

          <p className="mt-2 text-xs text-[#F5F0FF]/25">
            New Resonance tournaments will appear
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tournaments.map(
            (tournament, index) => {
              const normalizedStatus =
                tournament.status?.toLowerCase();

              const isLive =
                normalizedStatus === "live" ||
                normalizedStatus === "ongoing";

              const accent = isLive
                ? "#E6FF4A"
                : "#FF4F81";

              return (
                <motion.div
                  key={tournament.id}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    x: 8,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#B78AFF]/15
                    bg-[#1A0A2E]/80
                    p-6
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:bg-[#241044]
                    hover:shadow-[0_15px_60px_rgba(124,58,237,0.15)]
                    md:p-8
                  "
                  style={{
                    ["--accent" as string]: accent,
                  }}
                >
                  {/* ================================================= */}
                  {/* CARD GLOW */}
                  {/* ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-32
                      -top-32
                      h-64
                      w-64
                      rounded-full
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-700
                      group-hover:opacity-20
                    "
                    style={{
                      background: accent,
                    }}
                  />

                  {/* Pink atmospheric glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-24
                      left-1/3
                      h-48
                      w-48
                      rounded-full
                      bg-[#FF4F81]
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-700
                      group-hover:opacity-[0.035]
                    "
                  />

                  {/* ================================================= */}
                  {/* ACCENT BAR */}
                  {/* ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      top-0
                      w-1
                      origin-bottom
                      scale-y-0
                      transition-transform
                      duration-500
                      group-hover:scale-y-100
                    "
                    style={{
                      background: accent,
                      boxShadow: `0 0 18px ${accent}`,
                    }}
                  />

                  {/* Top energy line */}

                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-0
                      h-px
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                  />

                  {/* ================================================= */}
                  {/* CONTENT GRID */}
                  {/* ================================================= */}

                  <div className="relative grid gap-6 md:grid-cols-[100px_1fr_auto] md:items-center">
                    {/* ================================================= */}
                    {/* NUMBER / STATUS */}
                    {/* ================================================= */}

                    <div>
                      <p className="text-xs font-black tracking-widest text-[#F5F0FF]/15">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: accent,
                            boxShadow: `0 0 10px ${accent}`,
                          }}
                        />

                        <p
                          className="text-[9px] font-black tracking-[0.3em]"
                          style={{
                            color: accent,
                          }}
                        >
                          {(
                            tournament.status ||
                            "UPCOMING"
                          ).toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* ================================================= */}
                    {/* MAIN */}
                    {/* ================================================= */}

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Game */}

                        <span
                          className="
                            rounded-full
                            border
                            px-3
                            py-1
                            text-[9px]
                            font-black
                            tracking-[0.25em]
                            transition-all
                            duration-300
                          "
                          style={{
                            borderColor: `${accent}40`,
                            color: accent,
                            background: `${accent}08`,
                          }}
                        >
                          {tournament.games?.name ??
                            "UNKNOWN GAME"}
                        </span>

                        {/* Teams */}

                        <span className="text-[9px] font-black tracking-widest text-[#F5F0FF]/20">
                          {tournament.max_teams ??
                            0}{" "}
                          TEAMS
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-black uppercase tracking-tight text-[#F5F0FF] transition-colors duration-300 group-hover:text-white md:text-4xl">
                        {tournament.name}
                      </h3>

                      {/* Details */}

                      <div className="mt-4 flex flex-wrap gap-5 text-[10px] font-black tracking-[0.2em] text-[#F5F0FF]/25">
                        <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[#F5F0FF]/45">
                          <CalendarDays
                            size={13}
                            style={{
                              color: accent,
                            }}
                          />

                          {formatDate(
                            tournament.start_date,
                            tournament.end_date,
                          )}
                        </span>

                        <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[#F5F0FF]/45">
                          <MapPin
                            size={13}
                            style={{
                              color: accent,
                            }}
                          />

                          {tournament.location ??
                            "ONLINE"}
                        </span>
                      </div>
                    </div>

                    {/* ================================================= */}
                    {/* ACTION */}
                    {/* ================================================= */}

                    <button
                      type="button"
                      aria-label={`View ${tournament.name}`}
                      className="
                        relative
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#B78AFF]/15
                        bg-[#241044]/50
                        text-[#F5F0FF]/35
                        transition-all
                        duration-300
                        group-hover:scale-110
                      "
                      style={{
                        borderColor: `${accent}35`,
                      }}
                    >
                      <ArrowUpRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{
                          color: accent,
                        }}
                      />

                      {/* Button glow */}

                      <span
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          opacity-0
                          blur-md
                          transition-opacity
                          duration-300
                          group-hover:opacity-30
                        "
                        style={{
                          background: accent,
                        }}
                      />
                    </button>
                  </div>

                  {/* ================================================= */}
                  {/* BOTTOM ENERGY BAR */}
                  {/* ================================================= */}

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78AFF]/10">
                    <div
                      className="
                        h-full
                        w-0
                        transition-all
                        duration-700
                        group-hover:w-full
                      "
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            },
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* BOTTOM CTA */}
      {/* ========================================================= */}

      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-[#B78AFF]/15 pt-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-[#F5F0FF]/20">
          <Trophy
            size={16}
            className="text-[#E6FF4A]"
          />

          <span className="text-[10px] font-black tracking-[0.3em]">
            MORE TOURNAMENTS COMING
          </span>
        </div>

        <button
          type="button"
          className="
            text-left
            text-[10px]
            font-black
            tracking-[0.3em]
            text-[#FF4F81]
            transition-all
            duration-300
            hover:text-[#E6FF4A]
            hover:tracking-[0.4em]
          "
        >
          VIEW ALL →
        </button>
      </div>
    </section>
  );
}