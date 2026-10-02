"use client";

import Games from "@/components/Games";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Trophy,
  Users,
  Gamepad2,
  Swords,
  Zap,
} from "lucide-react";

import InteractiveBackground from "@/components/InteractiveBackground";
import Magnetic from "@/components/Magnetic";
import Tournaments from "@/components/Tournaments";
import Leaderboard from "@/components/Leaderboard";
import Announcements from "@/components/Announcements";
import HallOfFame from "@/components/HallOfFame";
import LiveStats from "@/components/LiveStats";

const stats = [
  {
    label: "TOURNAMENTS",
    value: "12",
    icon: Trophy,
  },
  {
    label: "TEAMS",
    value: "186",
    icon: Users,
  },
  {
    label: "GAMES",
    value: "05",
    icon: Gamepad2,
  },
  {
    label: "MATCHES",
    value: "842",
    icon: Swords,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1B1B1B] text-[#F5F5F0]">

      {/* ================= BACKGROUND ================= */}

      <InteractiveBackground />

      {/* ================= NAVBAR ================= */}

      <nav className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12">

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="group flex cursor-pointer items-center gap-3"
        >
          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#E6FF4A]/60
              transition-all
              duration-300
              group-hover:border-[#FF4F81]
              group-hover:shadow-[0_0_25px_rgba(230,255,74,0.25)]
            "
          >
            <span className="text-lg font-black text-[#E6FF4A]">
              R
            </span>

            <span className="absolute -right-1 -top-1 text-[#FF4F81]">
              <Zap size={10} fill="currentColor" />
            </span>
          </div>

          <div>
            <p className="text-sm font-black tracking-[0.35em] text-[#F5F5F0]">
              RESONANCE
            </p>

            <p className="text-[9px] tracking-[0.4em] text-[#FF4F81]">
              ESPORTS
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-8 text-[10px] font-bold tracking-[0.25em] md:flex">

          <a
            href="#games"
            className="text-[#F5F5F0]/55 transition-colors duration-300 hover:text-[#E6FF4A]"
          >
            GAMES
          </a>

          <a
            href="#tournaments"
            className="text-[#F5F5F0]/55 transition-colors duration-300 hover:text-[#E6FF4A]"
          >
            TOURNAMENTS
          </a>

          <a
            href="#leaderboard"
            className="text-[#F5F5F0]/55 transition-colors duration-300 hover:text-[#FF4F81]"
          >
            LEADERBOARD
          </a>

          <a
            href="#hall"
            className="text-[#F5F5F0]/55 transition-colors duration-300 hover:text-[#FF4F81]"
          >
            HALL OF FAME
          </a>
        </div>

        {/* Join Button */}

        <Magnetic strength={8}>
          <button
            className="
              group
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#E6FF4A]
              bg-[#E6FF4A]
              px-5
              py-2.5
              text-[10px]
              font-black
              tracking-[0.2em]
              text-[#1B1B1B]
              transition-all
              duration-300
              hover:bg-transparent
              hover:text-[#E6FF4A]
              hover:shadow-[0_0_35px_rgba(230,255,74,0.25)]
            "
          >
            JOIN US

            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </Magnetic>
      </nav>

      {/* ================= HERO ================= */}

      <section
        className="
          relative
          z-10
          flex
          min-h-[78vh]
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >

        {/* Top Label */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#FF4F81]" />

          <p className="text-[9px] font-bold tracking-[0.45em] text-[#E6FF4A]">
            SSPU // OFFICIAL ESPORTS CLUB
          </p>

          <span className="h-px w-8 bg-[#FF4F81]" />
        </motion.div>

        {/* Small Pink Text */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="
            mb-3
            text-xs
            font-black
            tracking-[0.5em]
            text-[#FF4F81]
          "
        >
          ENTER THE
        </motion.p>

        {/* MAIN TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.88,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            text-[16vw]
            font-black
            leading-[0.78]
            tracking-[-0.075em]
            md:text-[11rem]
          "
        >
          {/* Glow behind title */}

          <span
            className="
              absolute
              inset-0
              -z-10
              blur-3xl
              opacity-20
              bg-gradient-to-r
              from-[#E6FF4A]
              via-[#FF4F81]
              to-[#E6FF4A]
            "
          />

          {/* Gradient text */}

          <span
            className="
              bg-gradient-to-r
              from-[#E6FF4A]
              via-[#F5F5F0]
              to-[#FF4F81]
              bg-clip-text
              text-transparent
            "
          >
            RESONANCE
          </span>
        </motion.h1>

        {/* Tagline */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.55,
            duration: 0.7,
          }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-sm leading-7 text-[#F5F5F0]/55 md:text-base">
            Compete. Conquer. Create Legacy.
          </p>

          <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-[#E6FF4A]/70">
            THE COMPETITIVE GAMING ECOSYSTEM OF SSPU
          </p>
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.7,
          }}
          className="mt-10"
        >
          <Magnetic strength={10}>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                group
                flex
                items-center
                gap-4
                rounded-full
                bg-[#E6FF4A]
                px-7
                py-4
                text-xs
                font-black
                tracking-[0.2em]
                text-[#1B1B1B]
                shadow-[0_0_40px_rgba(230,255,74,0.15)]
                transition-all
                duration-300
                hover:shadow-[0_0_70px_rgba(230,255,74,0.35)]
              "
            >
              ENTER THE ARENA

              <ArrowDown
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              />
            </motion.button>
          </Magnetic>
        </motion.div>

        {/* Accent */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E6FF4A] shadow-[0_0_10px_#E6FF4A]" />

          <span className="text-[8px] tracking-[0.4em] text-[#F5F5F0]/25">
            SYSTEM ONLINE
          </span>

          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F81] shadow-[0_0_10px_#FF4F81]" />
        </motion.div>
      </section>

      {/* ================= STATS ================= */}

      <section
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-6xl
          grid-cols-2
          border-y
          border-[#F5F5F0]/10
          md:grid-cols-4
        "
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 30,
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
                duration: 0.5,
              }}
              className="
                group
                border-[#F5F5F0]/10
                p-8
                transition-all
                duration-300
                hover:bg-[#E6FF4A]
                hover:text-[#1B1B1B]
                md:border-r
                last:md:border-r-0
              "
            >
              <Icon
                size={18}
                className="
                  mb-6
                  text-[#FF4F81]
                  transition-colors
                  duration-300
                  group-hover:text-[#1B1B1B]
                "
              />

              <p className="text-4xl font-black tracking-tight">
                {stat.value}
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  tracking-[0.3em]
                  text-[#F5F5F0]/35
                  transition-colors
                  duration-300
                  group-hover:text-[#1B1B1B]/60
                "
              >
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* ================= EXISTING SECTIONS ================= */}

      <Games />

      <Tournaments />

      <Leaderboard />

      <Announcements />

      <HallOfFame />

      <LiveStats />

      {/* ================= FOOTER ================= */}

      <footer className="relative z-10 border-t border-[#F5F5F0]/10 px-6 py-12 text-center">
        <p className="text-[10px] tracking-[0.35em] text-[#F5F5F0]/25">
          RESONANCE ESPORTS © 2026
        </p>

        <p className="mt-3 text-[8px] tracking-[0.3em] text-[#FF4F81]/40">
          COMPETE • CONQUER • CREATE LEGACY
        </p>
      </footer>
    </main>
  );
}