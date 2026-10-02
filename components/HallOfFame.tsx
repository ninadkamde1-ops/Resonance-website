"use client";

import { motion } from "framer-motion";
import { Crown, Trophy } from "lucide-react";

const champions = [
  {
    year: "2026",
    tournament: "RESONANCE CHAMPIONSHIP",
    game: "BGMI",
    winner: "NOVA ESPORTS",
    accent: "#E6FF4A",
  },
  {
    year: "2026",
    tournament: "RESONANCE FREE FIRE CUP",
    game: "FREE FIRE",
    winner: "VOID",
    accent: "#FF4F81",
  },
  {
    year: "2026",
    tournament: "RESONANCE COD SHOWDOWN",
    game: "COD",
    winner: "TASK FORCE",
    accent: "#E6FF4A",
  },
];

export default function HallOfFame() {
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
      {/* CHAMPIONS */}
      {/* ========================================================= */}

      <div className="grid gap-5 md:grid-cols-3">
        {champions.map((champion, index) => (
          <motion.div
            key={champion.tournament}
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
              delay: index * 0.1,
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
                background: champion.accent,
              }}
            />

            {/* ================================================= */}
            {/* DECORATIVE CIRCLE */}
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
                borderColor: `${champion.accent}12`,
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
                borderColor: `${champion.accent}08`,
              }}
            />

            {/* ================================================= */}
            {/* YEAR + TROPHY */}
            {/* ================================================= */}

            <div className="relative flex items-center justify-between">
              <span className="text-5xl font-black text-[#F5F0FF]/[0.05]">
                {champion.year}
              </span>

              <Trophy
                size={22}
                style={{
                  color: champion.accent,
                  filter: `drop-shadow(0 0 8px ${champion.accent}50)`,
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
                  color: champion.accent,
                }}
              >
                {champion.game}
              </p>

              <h3 className="mt-4 text-2xl font-black text-[#F5F0FF]">
                {champion.tournament}
              </h3>

              {/* ================================================= */}
              {/* CHAMPION */}
              {/* ================================================= */}

              <div className="mt-10 border-t border-[#B78AFF]/10 pt-6">
                <p className="text-[9px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
                  CHAMPION
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <Crown
                    size={17}
                    style={{
                      color: champion.accent,
                      filter: `drop-shadow(0 0 6px ${champion.accent}60)`,
                    }}
                  />

                  <p className="text-lg font-black text-[#F5F0FF]">
                    {champion.winner}
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
                  background: `linear-gradient(
                    90deg,
                    transparent,
                    ${champion.accent},
                    transparent
                  )`,
                  boxShadow: `0 0 12px ${champion.accent}`,
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
                background: champion.accent,
                boxShadow: `0 0 15px ${champion.accent}`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}