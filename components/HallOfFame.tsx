"use client";

import { motion } from "framer-motion";
import { Crown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Champion = {
  id: string;
  position: number;
  title: string | null;
  created_at: string;

  tournaments: {
    id: string;
    name: string;
    start_date: string | null;
    game_id: string;
    games: {
      name: string;
      short_name: string | null;
    } | null;
  } | null;

  teams: {
    id: string;
    name: string;
    tag: string | null;
    logo_url: string | null;
  } | null;
};

const accents = [
  "#E6FF4A",
  "#FF4F81",
];

export default function HallOfFame() {
  const [champions, setChampions] =
    useState<Champion[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadChampions() {
      const { data, error } = await supabase
        .from("winners")
        .select(`
          id,
          position,
          title,
          created_at,
          tournaments (
            id,
            name,
            start_date,
            game_id,
            games (
              name,
              short_name
            )
          ),
          teams (
            id,
            name,
            tag,
            logo_url
          )
        `)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "PUBLIC HALL OF FAME ERROR:",
          error,
        );

        setChampions([]);
        setLoading(false);
        return;
      }

      const normalizedChampions = (data || []).map((row: any) => ({
        ...row,
        tournaments: Array.isArray(row.tournaments)
          ? row.tournaments[0] ?? null
          : row.tournaments ?? null,
        teams: Array.isArray(row.teams)
          ? row.teams[0] ?? null
          : row.teams ?? null,
      }));

      setChampions(normalizedChampions as Champion[]);

      setLoading(false);
    }

    loadChampions();
  }, []);

  function getYear(
    champion: Champion,
  ) {
    const date =
      champion.tournaments
        ?.start_date ||
      champion.created_at;

    return new Date(date).getFullYear();
  }

  return (
    <section
      id="hall"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10"
    >

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="mb-14">

        <div className="flex items-center gap-3">

          <span className="h-[2px] w-8 bg-[#E6FF4A]" />

          <p className="text-[10px] font-black tracking-[0.45em] text-[#E6FF4A]">
            05 // LEGACY
          </p>

        </div>

        <h2 className="mt-5 text-6xl font-black uppercase tracking-[-0.05em] md:text-8xl">

          HALL OF

          <br />

          <span className="text-[#F5F0FF]/20 transition-colors duration-500 hover:text-[#FF4F81]/40">
            FAME.
          </span>

        </h2>

      </div>

      {/* ========================================================= */}
      {/* LOADING */}
      {/* ========================================================= */}

      {loading && (
        <div className="relative overflow-hidden rounded-3xl border border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center backdrop-blur-sm">

          <motion.div
            animate={{
              opacity: [
                0.3,
                1,
                0.3,
              ],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="mx-auto mb-5 h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_18px_#E6FF4A]"
          />

          <p className="text-[10px] font-black tracking-[0.4em] text-[#E6FF4A]">
            LOADING LEGACY...
          </p>

        </div>
      )}

      {/* ========================================================= */}
      {/* CHAMPIONS */}
      {/* ========================================================= */}

      {!loading &&
        champions.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">

            {champions.map(
              (champion, index) => {

                const accent =
                  accents[
                    index %
                      accents.length
                  ];

                const game =
                  champion
                    .tournaments
                    ?.games?.name ||
                  "COMPETITION";

                const tournament =
                  champion
                    .tournaments
                    ?.name ||
                  "UNKNOWN TOURNAMENT";

                const winner =
                  champion
                    .teams?.name ||
                  "UNKNOWN TEAM";

                const position =
                  champion.position;

                const title =
                  champion.title ||
                  (position === 1
                    ? "CHAMPION"
                    : position === 2
                      ? "RUNNER UP"
                      : position === 3
                        ? "THIRD PLACE"
                        : "WINNER");

                return (
                  <motion.div
                    key={champion.id}

                    initial={{
                      opacity: 0,
                      y: 40,
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}

                    viewport={{
                      once: true,
                    }}

                    transition={{
                      delay:
                        index * 0.1,
                      duration: 0.6,
                    }}

                    whileHover={{
                      y: -8,
                    }}

                    className="
                      group
                      relative
                      min-h-[360px]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#B78AFF]/15
                      bg-[#1A0A2E]/85
                      p-8
                      backdrop-blur-sm
                      transition-all
                      duration-500
                      hover:border-[#B78AFF]/35
                      hover:bg-[#241044]
                      hover:shadow-[0_20px_70px_rgba(124,58,237,0.18)]
                    "
                  >

                    {/* ================================================= */}
                    {/* ATMOSPHERIC GLOW */}
                    {/* ================================================= */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        opacity-[0.035]
                        blur-3xl
                        transition-all
                        duration-700
                        group-hover:scale-125
                        group-hover:opacity-[0.12]
                      "
                      style={{
                        background:
                          accent,
                      }}
                    />

                    {/* ================================================= */}
                    {/* DECORATIVE CIRCLES */}
                    {/* ================================================= */}

                    <div
                      className="
                        absolute
                        -right-20
                        -top-20
                        h-56
                        w-56
                        rounded-full
                        border
                        transition-transform
                        duration-700
                        group-hover:scale-125
                      "
                      style={{
                        borderColor:
                          `${accent}12`,
                      }}
                    />

                    <div
                      className="
                        absolute
                        -right-10
                        -top-10
                        h-36
                        w-36
                        rounded-full
                        border
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                      style={{
                        borderColor:
                          `${accent}08`,
                      }}
                    />

                    {/* ================================================= */}
                    {/* YEAR + TROPHY */}
                    {/* ================================================= */}

                    <div className="relative flex items-center justify-between">

                      <span className="text-5xl font-black text-[#F5F0FF]/[0.05]">
                        {getYear(
                          champion,
                        )}
                      </span>

                      <Trophy
                        size={22}
                        style={{
                          color:
                            accent,
                          filter:
                            `drop-shadow(0 0 8px ${accent}50)`,
                        }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />

                    </div>

                    {/* ================================================= */}
                    {/* INFORMATION */}
                    {/* ================================================= */}

                    <div className="relative mt-20">

                      <p
                        className="text-[9px] font-black tracking-[0.3em]"
                        style={{
                          color:
                            accent,
                        }}
                      >
                        {game}
                      </p>

                      <h3 className="mt-4 text-2xl font-black text-[#F5F0FF]">
                        {tournament}
                      </h3>

                      {/* ================================================= */}
                      {/* CHAMPION */}
                      {/* ================================================= */}

                      <div className="mt-10 border-t border-[#B78AFF]/10 pt-6">

                        <p className="text-[9px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
                          {title.toUpperCase()}
                        </p>

                        <div className="mt-3 flex items-center gap-3">

                          {champion
                            .teams
                            ?.logo_url ? (
                            <img
                              src={
                                champion
                                  .teams
                                  .logo_url
                              }
                              alt=""
                              className="h-8 w-8 rounded-lg object-cover"
                            />
                          ) : (
                            <Crown
                              size={17}
                              style={{
                                color:
                                  accent,
                                filter:
                                  `drop-shadow(0 0 6px ${accent}60)`,
                              }}
                            />
                          )}

                          <p className="text-lg font-black text-[#F5F0FF]">
                            {winner}
                          </p>

                        </div>

                      </div>

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
                          background:
                            `linear-gradient(
                              90deg,
                              transparent,
                              ${accent},
                              transparent
                            )`,
                          boxShadow:
                            `0 0 12px ${accent}`,
                        }}
                      />

                    </div>

                    {/* ================================================= */}
                    {/* LEFT ACCENT */}
                    {/* ================================================= */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-[2px]
                        origin-bottom
                        scale-y-0
                        transition-transform
                        duration-500
                        group-hover:scale-y-100
                      "
                      style={{
                        background:
                          accent,
                        boxShadow:
                          `0 0 15px ${accent}`,
                      }}
                    />

                  </motion.div>
                );
              },
            )}

          </div>
        )}

      {/* ========================================================= */}
      {/* EMPTY STATE */}
      {/* ========================================================= */}

      {!loading &&
        champions.length === 0 && (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center">

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF4F81]/50 to-transparent" />

            <Trophy
              size={34}
              className="mx-auto text-[#F5F0FF]/10"
            />

            <p className="mt-5 text-[10px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
              NO CHAMPIONS YET
            </p>

            <p className="mt-2 text-xs text-[#F5F0FF]/10">
              Champions will appear here after
              tournaments are completed.
            </p>

          </div>
        )}

    </section>
  );
}