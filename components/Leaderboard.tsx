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
      {/* Header */}
      <div className="mb-12">
        <p className="text-[10px] font-bold tracking-[0.45em] text-yellow-400">
          03 // RANKINGS
        </p>

        <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-6xl font-black tracking-[-0.05em] md:text-8xl">
            POINTS
            <br />
            <span className="text-white/20">TABLE.</span>
          </h2>

          <p className="max-w-sm text-sm leading-7 text-white/35">
            Every victory counts. Track the teams dominating each competitive
            title.
          </p>
        </div>
      </div>

      {/* Game Selector */}
      <div className="mb-8 flex flex-wrap gap-2">
        {games.map((game) => (
          <button
            key={game}
            onClick={() => setSelectedGame(game)}
            className={`
              rounded-full
              border
              px-5
              py-3
              text-[9px]
              font-black
              tracking-[0.2em]
              transition-all
              duration-300
              ${
                selectedGame === game
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-white/10 bg-white/[0.02] text-white/40 hover:border-yellow-400/40 hover:text-yellow-400"
              }
            `}
          >
            {game}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {/* Table Header */}
        <div className="hidden grid-cols-[90px_1fr_130px_130px_130px] border-b border-white/10 bg-white/[0.03] px-6 py-4 text-[9px] font-bold tracking-[0.25em] text-white/25 md:grid">
          <span>RANK</span>
          <span>TEAM</span>
          <span>MATCHES</span>
          <span>WINS</span>
          <span className="text-right">POINTS</span>
        </div>

        {/* Rows */}
        {teams.map((team, index) => (
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
              grid
              grid-cols-[55px_1fr_auto]
              items-center
              border-b
              border-white/10
              px-5
              py-6
              transition-all
              duration-300
              last:border-b-0
              hover:bg-yellow-400/[0.04]
              md:grid-cols-[90px_1fr_130px_130px_130px]
              md:px-6
            "
          >
            {/* Rank */}
            <div>
              {index === 0 ? (
                <Crown
                  size={19}
                  className="text-yellow-400"
                />
              ) : index === 1 ? (
                <Medal
                  size={19}
                  className="text-white/40"
                />
              ) : index === 2 ? (
                <Trophy
                  size={18}
                  className="text-white/25"
                />
              ) : (
                <span className="text-xs font-black text-white/20">
                  0{index + 1}
                </span>
              )}
            </div>

            {/* Team */}
            <div>
              <p className="text-sm font-black md:text-base">
                {team.team}
              </p>

              <p className="mt-1 text-[8px] font-bold tracking-[0.25em] text-white/20 md:hidden">
                {team.wins} WINS · {team.matches} MATCHES
              </p>
            </div>

            {/* Matches */}
            <span className="hidden text-xs font-bold text-white/30 md:block">
              {team.matches}
            </span>

            {/* Wins */}
            <span className="hidden text-xs font-bold text-white/30 md:block">
              {team.wins}
            </span>

            {/* Points */}
            <div className="text-right">
              <span className="text-xl font-black text-yellow-400">
                {team.points}
              </span>

              <span className="ml-1 text-[8px] font-bold tracking-widest text-white/20">
                PTS
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-[9px] font-bold tracking-[0.3em] text-white/20">
          CURRENT GAME // {selectedGame}
        </p>

        <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
          LIVE RANKINGS
        </p>
      </div>
    </section>
  );
}