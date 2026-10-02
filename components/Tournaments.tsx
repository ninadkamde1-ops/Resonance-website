"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Trophy,
} from "lucide-react";

const tournaments = [
  {
    status: "LIVE",
    game: "BGMI",
    title: "RESONANCE CHAMPIONSHIP",
    date: "31 AUG — 10 SEP 2026",
    location: "SSPU / ONLINE",
    teams: "64 TEAMS",
  },
  {
    status: "UPCOMING",
    game: "FREE FIRE",
    title: "RESONANCE FREE FIRE CUP",
    date: "SEPTEMBER 2026",
    location: "ONLINE",
    teams: "32 TEAMS",
  },
  {
    status: "UPCOMING",
    game: "COD",
    title: "RESONANCE COD SHOWDOWN",
    date: "OCTOBER 2026",
    location: "SSPU LAN",
    teams: "32 TEAMS",
  },
];

export default function Tournaments() {
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
            Follow every battle, every tournament and every opportunity to
            compete under the Resonance banner.
          </p>

        </div>
      </div>

      {/* ========================================================= */}
      {/* TOURNAMENT LIST */}
      {/* ========================================================= */}

      <div className="space-y-4">

        {tournaments.map((tournament, index) => {

          const isLive = tournament.status === "LIVE";

          const accent = isLive
            ? "#E6FF4A"
            : "#FF4F81";

          return (
            <motion.div
              key={tournament.title}

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
              {/* PURPLE CARD GLOW */}
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
                    0{index + 1}
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
                      {tournament.status}
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
                      {tournament.game}
                    </span>

                    {/* Teams */}

                    <span className="text-[9px] font-black tracking-widest text-[#F5F0FF]/20">
                      {tournament.teams}
                    </span>

                  </div>

                  <h3 className="mt-4 text-2xl font-black uppercase tracking-tight text-[#F5F0FF] transition-colors duration-300 group-hover:text-white md:text-4xl">
                    {tournament.title}
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

                      {tournament.date}

                    </span>

                    <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[#F5F0FF]/45">

                      <MapPin
                        size={13}
                        style={{
                          color: accent,
                        }}
                      />

                      {tournament.location}

                    </span>

                  </div>

                </div>

                {/* ================================================= */}
                {/* ACTION */}
                {/* ================================================= */}

                <button
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
        })}

      </div>

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