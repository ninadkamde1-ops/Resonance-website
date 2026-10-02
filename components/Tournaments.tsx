"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin, Trophy } from "lucide-react";

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
      {/* Heading */}
      <div className="mb-16">
        <p className="text-[10px] font-bold tracking-[0.45em] text-yellow-400">
          02 // COMPETITION
        </p>

        <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-6xl font-black tracking-[-0.05em] md:text-8xl">
            ENTER
            <br />
            <span className="text-white/20">THE ARENA.</span>
          </h2>

          <p className="max-w-sm text-sm leading-7 text-white/35">
            Follow every battle, every tournament and every opportunity to
            compete under the Resonance banner.
          </p>
        </div>
      </div>

      {/* Tournament List */}
      <div className="space-y-4">
        {tournaments.map((tournament, index) => (
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
              border-white/10
              bg-white/[0.02]
              p-6
              transition-all
              duration-500
              hover:border-yellow-400/40
              hover:bg-yellow-400/[0.03]
              md:p-8
            "
          >
            {/* Yellow hover bar */}
            <div
              className="
                absolute
                bottom-0
                left-0
                top-0
                w-1
                origin-bottom
                scale-y-0
                bg-yellow-400
                transition-transform
                duration-500
                group-hover:scale-y-100
              "
            />

            <div className="grid gap-6 md:grid-cols-[100px_1fr_auto] md:items-center">
              {/* Number */}
              <div>
                <p className="text-xs font-black tracking-widest text-white/15">
                  0{index + 1}
                </p>

                <p className="mt-2 text-[9px] font-bold tracking-[0.3em] text-yellow-400">
                  {tournament.status}
                </p>
              </div>

              {/* Main */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-white/40">
                    {tournament.game}
                  </span>

                  <span className="text-[9px] font-bold tracking-widest text-white/20">
                    {tournament.teams}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-tight md:text-4xl">
                  {tournament.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-5 text-[10px] font-bold tracking-[0.2em] text-white/25">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={13} />
                    {tournament.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin size={13} />
                    {tournament.location}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-white/40
                  transition-all
                  duration-300
                  group-hover:border-yellow-400
                  group-hover:bg-yellow-400
                  group-hover:text-black
                "
              >
                <ArrowUpRight size={19} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8">
        <div className="flex items-center gap-3 text-white/20">
          <Trophy size={16} />

          <span className="text-[10px] font-bold tracking-[0.3em]">
            MORE TOURNAMENTS COMING
          </span>
        </div>

        <button className="text-[10px] font-bold tracking-[0.3em] text-yellow-400 transition hover:text-white">
          VIEW ALL →
        </button>
      </div>
    </section>
  );
}