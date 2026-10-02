"use client";
import Games from "@/components/Games";
import { motion } from "framer-motion";

import {
  ArrowDown,
  Trophy,
  Users,
  Gamepad2,
  Swords,
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
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      
      {/* ================= BACKGROUND ================= */}

      <InteractiveBackground />

      {/* ================= NAVBAR ================= */}

      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400/50">
            <span className="text-lg font-black text-yellow-400">
              R
            </span>
          </div>

          <div>
            <p className="text-sm font-black tracking-[0.35em]">
              RESONANCE
            </p>

            <p className="text-[9px] tracking-[0.4em] text-white/40">
              ESPORTS
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 text-xs font-semibold tracking-widest text-white/50 md:flex">
          <a
            href="#games"
            className="transition duration-300 hover:text-yellow-400"
          >
            GAMES
          </a>

          <a
            href="#tournaments"
            className="transition duration-300 hover:text-yellow-400"
          >
            TOURNAMENTS
          </a>

          <a
            href="#hall"
            className="transition duration-300 hover:text-yellow-400"
          >
            HALL OF FAME
          </a>
        </div>

        {/* Join Button */}
        <Magnetic strength={8}>
          <button
            className="
              rounded-full
              border border-yellow-400/50
              px-5 py-2
              text-xs
              font-bold
              tracking-widest
              text-yellow-400
              transition-all
              duration-300
              hover:bg-yellow-400
              hover:text-black
              hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]
            "
          >
            JOIN US
          </button>
        </Magnetic>
      </nav>

      {/* ================= HERO ================= */}

      <section className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        
        {/* Eyebrow */}
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
            duration: 0.6,
          }}
          className="mb-6 text-xs font-bold tracking-[0.5em] text-yellow-400"
        >
          SSPU // OFFICIAL ESPORTS CLUB
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            text-[15vw]
            font-black
            leading-[0.8]
            tracking-[-0.07em]
            md:text-[10rem]
          "
        >
          RESONANCE
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="
            mt-8
            max-w-xl
            text-sm
            leading-7
            text-white/45
            md:text-base
          "
        >
          Compete. Conquer. Create Legacy.
          <br />
          The competitive gaming ecosystem of SSPU.
        </motion.p>

        {/* Enter Arena */}
        <div className="mt-10">
          <Magnetic strength={10}>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="
                group
                flex
                items-center
                gap-3
                rounded-full
                bg-yellow-400
                px-7
                py-4
                text-sm
                font-black
                tracking-widest
                text-black
                shadow-[0_0_35px_rgba(250,204,21,0.15)]
                transition-shadow
                duration-300
                hover:shadow-[0_0_55px_rgba(250,204,21,0.35)]
              "
            >
              ENTER THE ARENA

              <ArrowDown
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              />
            </motion.button>
          </Magnetic>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-16 text-[9px] tracking-[0.4em] text-white/20"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </section>

      {/* ================= STATS ================= */}

      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 border-y border-white/10 md:grid-cols-4">
        
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
                border-white/10
                p-8
                transition-all
                duration-300
                hover:bg-yellow-400
                hover:text-black
                md:border-r
                last:md:border-r-0
              "
            >
              <Icon
                size={18}
                className="
                  mb-6
                  text-yellow-400
                  transition-colors
                  duration-300
                  group-hover:text-black
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
                  text-white/35
                  transition-colors
                  duration-300
                  group-hover:text-black/60
                "
              >
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* ================= PREVIEW SECTION ================= */}

      <Games />

      <Tournaments />

      <Leaderboard />

      <Announcements />

      <HallOfFame />

      <LiveStats />

      {/* ================= FOOTER ================= */}

      <footer className="relative z-10 border-t border-white/10 px-6 py-12 text-center">
        <p className="text-[10px] tracking-[0.35em] text-white/25">
          RESONANCE ESPORTS © 2026
        </p>
      </footer>

    </main>
  );
}