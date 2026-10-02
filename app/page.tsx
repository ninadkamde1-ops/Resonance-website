"use client";

import Games from "@/components/Games";
import { motion } from "framer-motion";

import {
  ArrowDown,
  Trophy,
  Users,
  Gamepad2,
  Swords,
  ArrowUpRight,
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
    <main className="min-h-screen overflow-hidden bg-[#12051F] text-[#F5F0FF]">

      {/* ========================================================= */}
      {/* PURPLE ATMOSPHERE */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#12051F]">

        {/* Main purple atmosphere */}
        <div className="absolute left-1/2 top-[-15%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#3B1475]/25 blur-[160px]" />

        <div className="absolute left-[-15%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#5B21B6]/20 blur-[150px]" />

        <div className="absolute right-[-15%] top-[55%] h-[550px] w-[550px] rounded-full bg-[#7C3AED]/15 blur-[160px]" />

        {/* Pink atmosphere */}
        <div className="absolute left-[15%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-[#FF4F81]/[0.045] blur-[150px]" />

        {/* Lime atmosphere */}
        <div className="absolute right-[15%] bottom-[5%] h-[350px] w-[350px] rounded-full bg-[#E6FF4A]/[0.035] blur-[150px]" />

      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE BACKGROUND / LIGHTNING */}
      {/* ========================================================= */}

      <InteractiveBackground />

      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <nav className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12">

        {/* Resonance Logo */}

        <a
          href="/"
          className="group flex items-center gap-3"
        >

          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#E6FF4A]/30 bg-[#241044]/80 backdrop-blur-md">

            <img
              src="/resonance-logo.png"
              alt="Resonance"
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_25px_#E6FF4A] transition-opacity duration-500 group-hover:opacity-30" />

          </div>

          <div>
            <p className="text-sm font-black tracking-[0.35em]">
              RESONANCE
            </p>

            <p className="text-[8px] font-bold tracking-[0.4em] text-[#E6FF4A]/50">
              ESPORTS
            </p>
          </div>

        </a>

        {/* Navigation */}

        <div className="hidden items-center gap-9 text-[10px] font-black tracking-[0.25em] text-[#F5F0FF]/35 md:flex">

          <a
            href="#games"
            className="transition-colors duration-300 hover:text-[#E6FF4A]"
          >
            GAMES
          </a>

          <a
            href="#tournaments"
            className="transition-colors duration-300 hover:text-[#E6FF4A]"
          >
            TOURNAMENTS
          </a>

          <a
            href="#hall"
            className="transition-colors duration-300 hover:text-[#E6FF4A]"
          >
            HALL OF FAME
          </a>

        </div>

        {/* Join */}

        <Magnetic strength={8}>

          <button
            className="
              rounded-full
              border border-[#E6FF4A]/50
              bg-[#241044]/70
              px-5
              py-2.5
              text-[10px]
              font-black
              tracking-[0.2em]
              text-[#E6FF4A]
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-[#E6FF4A]
              hover:text-[#241044]
              hover:shadow-[0_0_35px_rgba(230,255,74,0.3)]
            "
          >
            JOIN US
          </button>

        </Magnetic>

      </nav>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative z-10 flex min-h-[82vh] flex-col items-center justify-center px-6 text-center">

        {/* Purple ambient glow */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5B21B6]/20 blur-[140px]" />

        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#7C3AED]/15 blur-[110px]" />

        {/* Lime glow */}

        <div className="pointer-events-none absolute left-[42%] top-[38%] h-[220px] w-[220px] rounded-full bg-[#E6FF4A]/[0.025] blur-[100px]" />

        {/* Pink glow */}

        <div className="pointer-events-none absolute right-[35%] top-[45%] h-[220px] w-[220px] rounded-full bg-[#FF4F81]/[0.03] blur-[100px]" />

        {/* System label */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-8 flex items-center gap-3"
        >

          <span className="h-[1px] w-8 bg-[#E6FF4A]/50" />

          <p className="text-[9px] font-black tracking-[0.45em] text-[#E6FF4A]">
            SSPU // OFFICIAL ESPORTS CLUB
          </p>

          <span className="h-[1px] w-8 bg-[#E6FF4A]/50" />

        </motion.div>

        {/* ===================================================== */}
        {/* LOGO */}
        {/* ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.82,
            y: 25,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >

          {/* Purple logo glow */}

          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/25 blur-[90px]" />

          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E6FF4A]/[0.04] blur-[60px]" />

          <motion.img
            src="/resonance-logo.png"
            alt="Resonance Esports"
            className="
              relative
              z-10
              h-auto
              w-[260px]
              object-contain
              drop-shadow-[0_0_35px_rgba(124,58,237,0.35)]
              md:w-[390px]
            "
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </motion.div>

        {/* ===================================================== */}
        {/* HERO TITLE */}
        {/* ===================================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-5
            max-w-5xl
            text-5xl
            font-black
            uppercase
            leading-[0.82]
            tracking-[-0.07em]
            md:text-8xl
          "
        >

          WHERE

          <br />

          <span className="text-[#E6FF4A]">
            COMPETITION
          </span>

          <br />

          <span className="bg-gradient-to-r from-[#F5F0FF]/30 via-[#B78AFF]/30 to-[#FF4F81]/30 bg-clip-text text-transparent">
            RESONATES.
          </span>

        </motion.h1>

        {/* ===================================================== */}
        {/* DESCRIPTION */}
        {/* ===================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 0.7,
          }}
          className="
            mt-8
            max-w-xl
            text-sm
            leading-7
            text-[#F5F0FF]/40
            md:text-base
          "
        >

          Compete. Conquer. Create Legacy.

          <br />

          The competitive gaming ecosystem of SSPU.

        </motion.p>

        {/* ===================================================== */}
        {/* CTA */}
        {/* ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.6,
          }}
          className="mt-10"
        >

          <Magnetic strength={10}>

            <motion.a
              href="#games"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
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
                text-[11px]
                font-black
                tracking-[0.2em]
                text-[#241044]
                shadow-[0_0_35px_rgba(230,255,74,0.12)]
                transition-all
                duration-300
                hover:shadow-[0_0_65px_rgba(230,255,74,0.3)]
              "
            >

              ENTER THE ARENA

              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />

            </motion.a>

          </Magnetic>

        </motion.div>

        {/* ===================================================== */}
        {/* LIVE STATUS */}
        {/* ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.1,
            duration: 0.8,
          }}
          className="mt-14 flex items-center gap-4"
        >

          <span className="relative flex h-2 w-2">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6FF4A] opacity-50" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_12px_#E6FF4A]" />

          </span>

          <span className="text-[8px] font-black tracking-[0.35em] text-[#F5F0FF]/25">
            RESONANCE SYSTEM ONLINE
          </span>

        </motion.div>

        {/* Scroll */}

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-12 flex flex-col items-center gap-3"
        >

          <span className="text-[8px] font-bold tracking-[0.4em] text-[#F5F0FF]/15">
            SCROLL TO EXPLORE
          </span>

          <ArrowDown
            size={13}
            className="text-[#E6FF4A]/50"
          />

        </motion.div>

      </section>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 border-y border-[#B78AFF]/15 bg-[#1A0A2E]/60 backdrop-blur-sm md:grid-cols-4">

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
                relative
                border-[#B78AFF]/15
                p-8
                transition-all
                duration-300
                hover:bg-[#E6FF4A]
                hover:text-[#241044]
                md:border-r
                last:md:border-r-0
              "
            >

              <div className="absolute left-0 top-0 h-px w-0 bg-[#E6FF4A] transition-all duration-500 group-hover:w-full" />

              <Icon
                size={18}
                className="
                  mb-6
                  text-[#E6FF4A]
                  transition-colors
                  duration-300
                  group-hover:text-[#241044]
                "
              />

              <p className="text-4xl font-black tracking-tight">
                {stat.value}
              </p>

              <p
                className="
                  mt-2
                  text-[9px]
                  font-black
                  tracking-[0.3em]
                  text-[#F5F0FF]/30
                  transition-colors
                  duration-300
                  group-hover:text-[#241044]/60
                "
              >
                {stat.label}
              </p>

              <ArrowUpRight
                size={14}
                className="
                  absolute
                  right-6
                  top-7
                  text-[#F5F0FF]/10
                  transition-all
                  duration-300
                  group-hover:text-[#241044]/50
                "
              />

            </motion.div>
          );

        })}

      </section>

      {/* ========================================================= */}
      {/* CONTENT SECTIONS */}
      {/* ========================================================= */}

      <div className="relative z-10 bg-[#12051F]/90">

        <Games />

        <Tournaments />

        <Leaderboard />

        <Announcements />

        <HallOfFame />

        <LiveStats />

      </div>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer className="relative z-10 border-t border-[#B78AFF]/15 bg-[#1A0A2E] px-6 py-14 text-center">

        <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[#E6FF4A] to-transparent" />

        <p className="text-[9px] font-black tracking-[0.4em] text-[#F5F0FF]/20">
          RESONANCE ESPORTS © 2026
        </p>

        <p className="mt-3 text-[8px] tracking-[0.3em] text-[#E6FF4A]/30">
          COMPETE // CREATE // RESONATE
        </p>

      </footer>

    </main>
  );
}