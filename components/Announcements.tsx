"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bell, Zap } from "lucide-react";

const announcements = [
  {
    date: "01 SEP 2026",
    tag: "TOURNAMENT",
    title: "Resonance Championship registrations are LIVE.",
    description:
      "Build your squad, register your team and prepare for the next battle.",
  },
  {
    date: "31 AUG 2026",
    tag: "MATCHDAY",
    title: "Qualifiers have officially begun.",
    description:
      "Follow the leaderboard and watch the competition unfold.",
  },
  {
    date: "28 AUG 2026",
    tag: "CLUB",
    title: "Resonance Esports is expanding.",
    description:
      "More games, more tournaments and more opportunities to compete.",
  },
];

export default function Announcements() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.45em] text-yellow-400">
            04 // TRANSMISSIONS
          </p>

          <h2 className="mt-5 text-6xl font-black tracking-[-0.05em] md:text-8xl">
            LATEST
            <br />
            <span className="text-white/20">NEWS.</span>
          </h2>
        </div>

        <Bell className="hidden text-yellow-400 md:block" size={28} />
      </div>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <motion.article
            key={announcement.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ x: 6 }}
            className="
              group relative overflow-hidden rounded-2xl
              border border-white/10 bg-white/[0.02]
              p-6 transition-all duration-500
              hover:border-yellow-400/40
              hover:bg-yellow-400/[0.03]
              md:p-8
            "
          >
            <div className="grid gap-6 md:grid-cols-[150px_1fr_auto] md:items-center">
              <div>
                <p className="text-[9px] font-bold tracking-[0.25em] text-white/25">
                  {announcement.date}
                </p>

                <p className="mt-3 flex items-center gap-2 text-[9px] font-black tracking-[0.25em] text-yellow-400">
                  <Zap size={11} />
                  {announcement.tag}
                </p>
              </div>

              <div>
                <h3 className="max-w-3xl text-xl font-black md:text-2xl">
                  {announcement.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/30">
                  {announcement.description}
                </p>
              </div>

              <button
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full border border-white/10
                  text-white/30 transition-all duration-300
                  group-hover:border-yellow-400
                  group-hover:bg-yellow-400
                  group-hover:text-black
                "
              >
                <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
