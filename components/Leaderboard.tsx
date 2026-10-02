"use client";

import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import { useState } from "react";

const games = ["BGMI", "FREE FIRE", "COD", "CHESS", "VALORANT"];

const leaderboardData: Record<
  string,
  {
    team: string;
    matches: number;
    wins: number;
    points: number;
  }[]
> = {
  BGMI: [
    { team: "NOVA ESPORTS", matches: 18, wins: 12, points: 42 },
    { team: "ALPHA FORCE", matches: 18, wins: 10, points: 36 },
    { team: "SHADOW UNIT", matches: 18, wins: 9, points: 33 },
    { team: "PHANTOM X", matches: 18, wins: 8, points: 29 },
    { team: "TITAN FIVE", matches: 18, wins: 7, points: 26 },
  ],

  "FREE FIRE": [
    { team: "VOID", matches: 15, wins: 11, points: 39 },
    { team: "REAPERS", matches: 15, wins: 9, points: 34 },
    { team: "APEX", matches: 15, wins: 8, points: 30 },
    { team: "VORTEX", matches: 15, wins: 7, points: 27 },
    { team: "RAVENS", matches: 15, wins: 6, points: 23 },
  ],

  COD: [
    { team: "TASK FORCE", matches: 14, wins: 11, points: 38 },
    { team: "BLACKOUT", matches: 14, wins: 9, points: 33 },
    { team: "WARLORDS", matches: 14, wins: 8, points: 29 },
    { team: "SPECTRE", matches: 14, wins: 7, points: 25 },
    { team: "RENEGADES", matches: 14, wins: 5, points: 21 },
  ],

  CHESS: [
    { team: "KNIGHTFALL", matches: 10, wins: 8, points: 31 },
    { team: "CHECKMATE", matches: 10, wins: 7, points: 28 },
    { team: "ROOKS", matches: 10, wins: 6, points: 24 },
    { team: "QUEENS GAMBIT", matches: 10, wins: 5, points: 20 },
    { team: "PAWN STORM", matches: 10, wins: 4, points: 17 },
  ],

  VALORANT: [
    { team: "SENTINELS", matches: 12, wins: 10, points: 36 },
    { team: "PHANTOMS", matches: 12, wins: 8, points: 31 },
    { team: "RADIANTS", matches: 12, wins: 7, points: 27 },
    { team: "VANGUARD", matches: 12, wins: 6, points: 24 },
    { team: "OUTLAWS", matches: 12, wins: 4, points: 19 },
  ],
};

export default function Leaderboard() {
  const [selectedGame, setSelectedGame] = useState("BGMI");

  const teams = leaderboardData[selectedGame];

  return (
    <section
      id="leaderboard"
      className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-10"
    >
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="mb-12">

        <div className="flex items-center gap-3">

          <span className="h-[2px] w-8 bg-[#E6FF4A]" />

          <p className="text-[10px] font-black tracking-[0.45em] text-[#E6FF4A]">
            03 // RANKINGS
          </p>

        </div>

        <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <h2 className="text-6xl font-black uppercase tracking-[-0.05em] md:text-8xl">

            POINTS

            <br />

            <span className="text-[#F5F0FF]/20 transition-colors duration-500 hover:text-[#FF4F81]/40">
              TABLE.
            </span>

          </h2>

          <p className="max-w-sm text-sm leading-7 text-[#F5F0FF]/40">
            Every victory counts. Track the teams dominating each competitive
            title.
          </p>

        </div>
      </div>

      {/* ========================================================= */}
      {/* GAME SELECTOR */}
      {/* ========================================================= */}

      <div className="mb-8 flex flex-wrap gap-2">

        {games.map((game, index) => {

          const isActive = selectedGame === game;

          const accent =
            index % 2 === 0
              ? "#E6FF4A"
              : "#FF4F81";

          return (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className="
                rounded-full
                border
                px-5
                py-3
                text-[9px]
                font-black
                tracking-[0.2em]
                transition-all
                duration-300
              "
              style={{
                borderColor: isActive
                  ? accent
                  : "rgba(183,138,255,0.15)",

                background: isActive
                  ? accent
                  : "rgba(26,10,46,0.7)",

                color: isActive
                  ? "#241044"
                  : "rgba(245,240,255,0.4)",

                boxShadow: isActive
                  ? `0 0 25px ${accent}25`
                  : "none",
              }}
            >
              {game}
            </button>
          );
        })}

      </div>

      {/* ========================================================= */}
      {/* LEADERBOARD */}
      {/* ========================================================= */}

      <div className="relative overflow-hidden rounded-2xl border border-[#B78AFF]/15 bg-[#1A0A2E]/80 shadow-[0_20px_80px_rgba(76,29,149,0.12)] backdrop-blur-sm">

        {/* Purple glow */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[100px]" />

        {/* Pink glow */}

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#FF4F81]/[0.035] blur-[100px]" />

        {/* ======================================================= */}
        {/* TABLE HEADER */}
        {/* ======================================================= */}

        <div
          className="
            relative
            hidden
            grid-cols-[90px_1fr_130px_130px_130px]
            border-b
            border-[#B78AFF]/15
            bg-[#241044]/60
            px-6
            py-4
            text-[9px]
            font-black
            tracking-[0.25em]
            text-[#F5F0FF]/25
            md:grid
          "
        >
          <span>RANK</span>

          <span>TEAM</span>

          <span>MATCHES</span>

          <span>WINS</span>

          <span className="text-right">POINTS</span>
        </div>

        {/* ======================================================= */}
        {/* ROWS */}
        {/* ======================================================= */}

        {teams.map((team, index) => {

          const rankAccent =
            index === 0
              ? "#E6FF4A"
              : index === 1
                ? "#FF4F81"
                : "#B78AFF";

          return (
            <motion.div
              key={`${selectedGame}-${team.team}`}

              initial={{
                opacity: 0,
                x: -20,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 0.35,
                delay: index * 0.06,
              }}

              className="
                group
                relative
                grid
                grid-cols-[55px_1fr_auto]
                items-center
                border-b
                border-[#B78AFF]/10
                px-5
                py-6
                transition-all
                duration-300
                last:border-b-0
                hover:bg-[#241044]
                md:grid-cols-[90px_1fr_130px_130px_130px]
                md:px-6
              "
            >

              {/* Hover line */}

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
                  background: rankAccent,
                  boxShadow: `0 0 15px ${rankAccent}`,
                }}
              />

              {/* ================================================= */}
              {/* RANK */}
              {/* ================================================= */}

              <div>

                {index === 0 ? (
                  <Crown
                    size={19}
                    className="text-[#E6FF4A]"
                    style={{
                      filter: "drop-shadow(0 0 7px rgba(230,255,74,0.45))",
                    }}
                  />
                ) : index === 1 ? (
                  <Medal
                    size={19}
                    className="text-[#FF4F81]"
                  />
                ) : index === 2 ? (
                  <Trophy
                    size={18}
                    className="text-[#B78AFF]"
                  />
                ) : (
                  <span className="text-xs font-black text-[#F5F0FF]/20">
                    0{index + 1}
                  </span>
                )}

              </div>

              {/* ================================================= */}
              {/* TEAM */}
              {/* ================================================= */}

              <div>

                <p className="text-sm font-black text-[#F5F0FF] transition-colors duration-300 group-hover:text-white md:text-base">
                  {team.team}
                </p>

                <p className="mt-1 text-[8px] font-bold tracking-[0.25em] text-[#F5F0FF]/20 md:hidden">
                  {team.wins} WINS · {team.matches} MATCHES
                </p>

              </div>

              {/* ================================================= */}
              {/* MATCHES */}
              {/* ================================================= */}

              <span className="hidden text-xs font-bold text-[#F5F0FF]/30 md:block">
                {team.matches}
              </span>

              {/* ================================================= */}
              {/* WINS */}
              {/* ================================================= */}

              <span className="hidden text-xs font-bold text-[#F5F0FF]/30 md:block">
                {team.wins}
              </span>

              {/* ================================================= */}
              {/* POINTS */}
              {/* ================================================= */}

              <div className="text-right">

                <span
                  className="text-xl font-black"
                  style={{
                    color:
                      index === 0
                        ? "#E6FF4A"
                        : index === 1
                          ? "#FF4F81"
                          : "#B78AFF",
                  }}
                >
                  {team.points}
                </span>

                <span className="ml-1 text-[8px] font-black tracking-widest text-[#F5F0FF]/20">
                  PTS
                </span>

              </div>

            </motion.div>
          );
        })}

      </div>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <p className="text-[9px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
          CURRENT GAME // {selectedGame}
        </p>

        <div className="flex items-center gap-2">

          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E6FF4A] shadow-[0_0_10px_#E6FF4A]" />

          <p className="text-[9px] font-black tracking-[0.3em] text-[#E6FF4A]">
            LIVE RANKINGS
          </p>

        </div>

      </div>

    </section>
  );
}