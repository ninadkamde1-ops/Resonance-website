"use client";

import { motion } from "framer-motion";
import { Crown, Trophy } from "lucide-react";

const champions = [
  {
    year: "2026",
    tournament: "RESONANCE CHAMPIONSHIP",
    game: "BGMI",
    winner: "NOVA ESPORTS",
  },
  {
    year: "2026",
    tournament: "RESONANCE FREE FIRE CUP",
    game: "FREE FIRE",
    winner: "VOID",
  },
  {
    year: "2026",
    tournament: "RESONANCE COD SHOWDOWN",
    game: "COD",
    winner: "TASK FORCE",
  },
];

export default function HallOfFame() {
  return (
    <section
      id="hall"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10"
    >
      {/* Header */}
      <div className="mb-14">
        <p className="text-[10px] font-bold tracking-[0.45em] text-yellow-400">
          05 // LEGACY
        </p>

        <h2 className="mt-5 text-6xl font-black tracking-[-0.05em] md:text-8xl">
          HALL OF
          <br />
          <span className="text-white/20">FAME.</span>
        </h2>
      </div>

      {/* Champions */}
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
              border-white/10
              bg-white/[0.02]
              p-8
              transition-all
              duration-500
              hover:border-yellow-400/50
            "
          >
            {/* Decorative circle */}
            <div
              className="
                absolute
                -right-20
                -top-20
                h-56
                w-56
                rounded-full
                border
                border-yellow-400/5
                transition-transform
                duration-700
                group-hover:scale-125
              "
            />

            {/* Year + Trophy */}
            <div className="flex items-center justify-between">
              <span className="text-5xl font-black text-white/[0.05]">
                {champion.year}
              </span>

              <Trophy
                size={22}
                className="text-yellow-400"
              />
            </div>

            {/* Information */}
            <div className="relative mt-20">
              <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
                {champion.game}
              </p>

              <h3 className="mt-4 text-2xl font-black">
                {champion.tournament}
              </h3>

              {/* Champion */}
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-[9px] font-bold tracking-[0.3em] text-white/20">
                  CHAMPION
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <Crown
                    size={17}
                    className="text-yellow-400"
                  />

                  <p className="text-lg font-black">
                    {champion.winner}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom glow */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-[2px]
                w-0
                bg-yellow-400
                transition-all
                duration-500
                group-hover:w-full
              "
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}