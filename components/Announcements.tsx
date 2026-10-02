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
    accent: "#E6FF4A",
  },
  {
    date: "31 AUG 2026",
    tag: "MATCHDAY",
    title: "Qualifiers have officially begun.",
    description:
      "Follow the leaderboard and watch the competition unfold.",
    accent: "#FF4F81",
  },
  {
    date: "28 AUG 2026",
    tag: "CLUB",
    title: "Resonance Esports is expanding.",
    description:
      "More games, more tournaments and more opportunities to compete.",
    accent: "#E6FF4A",
  },
];

export default function Announcements() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10">

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="mb-14 flex items-end justify-between">

        <div>

          <div className="flex items-center gap-3">

            <span className="h-[2px] w-8 bg-[#FF4F81]" />

            <p className="text-[10px] font-black tracking-[0.45em] text-[#FF4F81]">
              04 // TRANSMISSIONS
            </p>

          </div>

          <h2 className="mt-5 text-6xl font-black uppercase tracking-[-0.05em] md:text-8xl">

            LATEST

            <br />

            <span className="text-[#F5F0FF]/20 transition-colors duration-500 hover:text-[#E6FF4A]/40">
              NEWS.
            </span>

          </h2>

        </div>

        <Bell
          className="hidden text-[#E6FF4A] md:block"
          size={28}
        />

      </div>

      {/* ========================================================= */}
      {/* ANNOUNCEMENTS */}
      {/* ========================================================= */}

      <div className="space-y-4">

        {announcements.map((announcement, index) => (

          <motion.article
            key={announcement.title}

            initial={{
              opacity: 0,
              y: 25,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              delay: index * 0.08,
              duration: 0.5,
            }}

            whileHover={{
              x: 6,
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
          >

            {/* ================================================= */}
            {/* PURPLE ATMOSPHERE */}
            {/* ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-52
                w-52
                rounded-full
                opacity-0
                blur-3xl
                transition-opacity
                duration-700
                group-hover:opacity-20
              "
              style={{
                background: announcement.accent,
              }}
            />

            {/* Pink secondary glow */}

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
            {/* CONTENT */}
            {/* ================================================= */}

            <div className="relative grid gap-6 md:grid-cols-[150px_1fr_auto] md:items-center">

              {/* Date / Tag */}

              <div>

                <p className="text-[9px] font-black tracking-[0.25em] text-[#F5F0FF]/25">
                  {announcement.date}
                </p>

                <p
                  className="mt-3 flex items-center gap-2 text-[9px] font-black tracking-[0.25em]"
                  style={{
                    color: announcement.accent,
                  }}
                >

                  <Zap
                    size={11}
                    style={{
                      filter: `drop-shadow(0 0 5px ${announcement.accent})`,
                    }}
                  />

                  {announcement.tag}

                </p>

              </div>

              {/* Main */}

              <div>

                <h3 className="max-w-3xl text-xl font-black text-[#F5F0FF] transition-colors duration-300 group-hover:text-white md:text-2xl">
                  {announcement.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F5F0FF]/30 transition-colors duration-300 group-hover:text-[#F5F0FF]/45">
                  {announcement.description}
                </p>

              </div>

              {/* Action */}

              <button
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  bg-[#241044]/50
                  text-[#F5F0FF]/30
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
                style={{
                  borderColor: `${announcement.accent}35`,
                }}
              >

                <ArrowUpRight
                  size={17}
                  style={{
                    color: announcement.accent,
                  }}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />

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
                    background: announcement.accent,
                  }}
                />

              </button>

            </div>

            {/* ================================================= */}
            {/* ENERGY BAR */}
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
                    ${announcement.accent},
                    transparent
                  )`,
                }}
              />

            </div>

            {/* Side accent */}

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
                background: announcement.accent,
                boxShadow: `0 0 15px ${announcement.accent}`,
              }}
            />

          </motion.article>

        ))}

      </div>

    </section>
  );
}