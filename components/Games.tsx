"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Crosshair,
  Crown,
  Gamepad2,
  Ghost,
  Swords,
  Trophy,
  ArrowUpRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Game = {
  id: string;
  name: string;
  short_name: string;
  category: string | null;
  players_per_team: number | null;
  is_active: boolean;
};

const icons = [
  Crosshair,
  Ghost,
  Swords,
  Crown,
  Trophy,
  Gamepad2,
];

const accents = [
  {
    color: "#E6FF4A",
    soft: "rgba(230,255,74,0.08)",
    border: "rgba(230,255,74,0.35)",
  },
  {
    color: "#FF4F81",
    soft: "rgba(255,79,129,0.08)",
    border: "rgba(255,79,129,0.35)",
  },
];

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      const { data, error } = await supabase
        .from("games")
        .select(
          "id, name, short_name, category, players_per_team, is_active"
        )
        .eq("is_active", true)
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        console.error("Games error:", error);
        setGames([]);
        setLoading(false);
        return;
      }

      setGames(data ?? []);
      setLoading(false);
    }

    loadGames();
  }, []);

  return (
    <section
      id="games"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10"
    >
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="mb-16 flex flex-col justify-between gap-10 md:flex-row md:items-end">

        <div>
          <div className="flex items-center gap-3">

            <span className="h-[2px] w-8 bg-[#E6FF4A]" />

            <p className="text-[10px] font-black tracking-[0.45em] text-[#E6FF4A]">
              01 // COMPETITIVE TITLES
            </p>

          </div>

          <h2 className="mt-5 text-6xl font-black uppercase leading-[0.82] tracking-[-0.07em] md:text-8xl">

            THE

            <br />

            <span className="text-[#F5F0FF]/20 transition-colors duration-500 hover:text-[#FF4F81]/40">
              GAMES.
            </span>

          </h2>
        </div>

        <div className="max-w-sm">

          <div className="mb-4 flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_12px_#E6FF4A]" />

            <span className="text-[9px] font-black tracking-[0.35em] text-[#F5F0FF]/30">
              ACTIVE ARENAS
            </span>

          </div>

          <p className="text-sm leading-7 text-[#F5F0FF]/40">
            Multiple arenas. Different strategies. One competitive ecosystem.
            Choose your battlefield.
          </p>

        </div>

      </div>

      {/* ========================================================= */}
      {/* LOADING */}
      {/* ========================================================= */}

      {loading && (
        <div className="relative overflow-hidden rounded-3xl border border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center backdrop-blur-sm">

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6FF4A] to-transparent" />

          <motion.div
            animate={{
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="mx-auto mb-5 h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_18px_#E6FF4A]"
          />

          <p className="text-[10px] font-black tracking-[0.4em] text-[#E6FF4A]">
            LOADING ARENAS...
          </p>

        </div>
      )}

      {/* ========================================================= */}
      {/* GAMES */}
      {/* ========================================================= */}

      {!loading && (
        <div className="grid gap-5 md:grid-cols-2">

          {games.map((game, index) => {

            const Icon = icons[index % icons.length];
            const accent = accents[index % accents.length];

            return (
              <motion.div
                key={game.id}

                initial={{
                  opacity: 0,
                  y: 50,
                  rotateX: 8,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}

                viewport={{
                  once: true,
                  margin: "-80px",
                }}

                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}

                whileHover={{
                  y: -8,
                  rotateX: 1,
                  rotateY: -1,
                }}

                style={
                  {
                    "--accent": accent.color,
                    "--accent-soft": accent.soft,
                    "--accent-border": accent.border,
                  } as React.CSSProperties
                }

                className="
                  group
                  relative
                  min-h-[300px]
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#B78AFF]/15
                  bg-[#1A0A2E]/85
                  p-7
                  shadow-[0_15px_60px_rgba(76,29,149,0.12)]
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  hover:border-[var(--accent-border)]
                  hover:bg-[#241044]
                  hover:shadow-[0_20px_70px_rgba(124,58,237,0.2)]
                "
              >

                {/* ================================================= */}
                {/* CARD GLOW */}
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
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-700
                    group-hover:opacity-30
                  "
                  style={{
                    background: accent.color,
                  }}
                />

                {/* Pink secondary glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-24
                    h-52
                    w-52
                    rounded-full
                    bg-[#FF4F81]
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-700
                    group-hover:opacity-[0.06]
                  "
                />

                {/* ================================================= */}
                {/* TOP LINE */}
                {/* ================================================= */}

                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* ================================================= */}
                {/* NUMBER */}
                {/* ================================================= */}

                <div className="absolute right-7 top-6 flex items-center gap-3">

                  <span
                    className="text-[10px] font-black tracking-[0.2em] opacity-30 transition-all duration-500 group-hover:opacity-100"
                    style={{
                      color: accent.color,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-70"
                    style={{
                      color: accent.color,
                    }}
                  />

                </div>

                {/* ================================================= */}
                {/* DECORATIVE CIRCLES */}
                {/* ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -right-32
                    h-72
                    w-72
                    rounded-full
                    border
                    border-[#B78AFF]/10
                    transition-all
                    duration-700
                    group-hover:scale-125
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -right-24
                    h-48
                    w-48
                    rounded-full
                    border
                    opacity-0
                    transition-all
                    duration-700
                    group-hover:scale-110
                    group-hover:opacity-100
                  "
                  style={{
                    borderColor: accent.border,
                  }}
                />

                {/* ================================================= */}
                {/* ICON */}
                {/* ================================================= */}

                <motion.div
                  whileHover={{
                    rotate: -8,
                    scale: 1.08,
                  }}

                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#B78AFF]/15
                    bg-[#241044]
                    transition-all
                    duration-500
                    group-hover:bg-[var(--accent)]
                  "
                >

                  <Icon
                    size={22}
                    className="relative z-10 text-[#F5F0FF] transition-colors duration-500 group-hover:text-[#241044]"
                  />

                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{
                      background: accent.color,
                    }}
                  />

                </motion.div>

                {/* ================================================= */}
                {/* CONTENT */}
                {/* ================================================= */}

                <div className="relative mt-20">

                  <div className="flex items-center gap-3">

                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: accent.color,
                        boxShadow: `0 0 12px ${accent.color}`,
                      }}
                    />

                    <p
                      className="text-[9px] font-black tracking-[0.35em]"
                      style={{
                        color: accent.color,
                      }}
                    >
                      {game.category ?? "COMPETITIVE"}
                    </p>

                  </div>

                  <h3 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#F5F0FF] md:text-4xl">
                    {game.name}
                  </h3>

                  <div className="mt-5 flex items-center gap-3">

                    <span className="text-[10px] font-black tracking-[0.25em] text-[#F5F0FF]/25">
                      {game.players_per_team ?? "?"} PLAYERS / TEAM
                    </span>

                    <span className="h-px w-8 bg-[#B78AFF]/20" />

                    <span
                      className="text-[9px] font-black tracking-[0.2em] opacity-0 transition-all duration-500 group-hover:opacity-100"
                      style={{
                        color: accent.color,
                      }}
                    >
                      {game.short_name}
                    </span>

                  </div>

                </div>

                {/* ================================================= */}
                {/* BOTTOM ENERGY BAR */}
                {/* ================================================= */}

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78AFF]/10">

                  <div
                    className="h-full w-0 transition-all duration-700 group-hover:w-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
                    }}
                  />

                </div>

                {/* ================================================= */}
                {/* SIDE ACCENT */}
                {/* ================================================= */}

                <div
                  className="absolute bottom-8 left-0 h-10 w-[2px] scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{
                    background: accent.color,
                  }}
                />

              </motion.div>
            );
          })}

          {/* ===================================================== */}
          {/* COMING SOON */}
          {/* ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            whileHover={{
              y: -5,
            }}

            className="
              group
              relative
              flex
              min-h-[300px]
              items-center
              justify-center
              overflow-hidden
              rounded-[24px]
              border
              border-dashed
              border-[#FF4F81]/25
              bg-[#1A0A2E]/70
              transition-all
              duration-500
              hover:border-[#FF4F81]/60
              hover:bg-[#241044]
              hover:shadow-[0_20px_60px_rgba(255,79,129,0.08)]
            "
          >

            {/* Decorative grid */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-20
              "
              style={{
                backgroundImage:
                  "linear-gradient(rgba(183,138,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(183,138,255,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative text-center">

              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}

                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}

                className="
                  mx-auto
                  mb-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#FF4F81]/25
                  bg-[#FF4F81]/[0.06]
                "
              >

                <Gamepad2
                  size={25}
                  className="text-[#FF4F81]/60 transition-colors duration-500 group-hover:text-[#FF4F81]"
                />

              </motion.div>

              <p className="text-[9px] font-black tracking-[0.4em] text-[#FF4F81]/60">
                NEXT ARENA
              </p>

              <p className="mt-3 text-2xl font-black uppercase tracking-tight text-[#F5F0FF]/20 transition-colors duration-500 group-hover:text-[#F5F0FF]/50">
                Coming Soon
              </p>

              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#FF4F81] to-transparent" />

            </div>

          </motion.div>

        </div>
      )}

      {/* ========================================================= */}
      {/* EMPTY STATE */}
      {/* ========================================================= */}

      {!loading && games.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center">

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF4F81]/50 to-transparent" />

          <Gamepad2
            className="mx-auto text-[#F5F0FF]/10"
            size={34}
          />

          <p className="mt-5 text-[10px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
            NO ACTIVE GAMES
          </p>

        </div>
      )}

    </section>
  );
}