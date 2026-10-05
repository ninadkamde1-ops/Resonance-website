"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Medal,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Game = {
  id: string;
  name: string;
  short_name: string | null;
};

type Standing = {
  id: string;
  tournament_id: string;
  team_id: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;

  teams: {
    id: string;
    name: string;
    tag: string | null;
    logo_url: string | null;
  } | null;

  tournaments: {
    id: string;
    name: string;
    game_id: string;
    start_date: string | null;
    status: string | null;
  } | null;
};

export default function Leaderboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] =
    useState<string>("");

  const [standings, setStandings] =
    useState<Standing[]>([]);

  const [loadingGames, setLoadingGames] =
    useState(true);

  const [loadingStandings, setLoadingStandings] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [selectedTournament, setSelectedTournament] =
    useState<string | null>(null);

  /* ========================================================= */
  /* LOAD ACTIVE GAMES */
  /* ========================================================= */

  useEffect(() => {
    async function loadGames() {
      const { data, error } = await supabase
        .from("games")
        .select(
          "id, name, short_name",
        )
        .eq("is_active", true)
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        console.error(
          "LEADERBOARD GAMES ERROR:",
          error,
        );

        setError(
          "Unable to load competitive games.",
        );

        setLoadingGames(false);
        return;
      }

      const gameData =
        (data || []) as Game[];

      setGames(gameData);

      if (gameData.length > 0) {
        setSelectedGame(gameData[0].id);
      }

      setLoadingGames(false);
    }

    loadGames();
  }, []);

  /* ========================================================= */
  /* LOAD LATEST TOURNAMENT STANDINGS */
  /* ========================================================= */

  useEffect(() => {
    if (!selectedGame) return;

    async function loadStandings() {
      setLoadingStandings(true);
      setError(null);

      /*
       * First find tournaments belonging
       * to the selected game.
       */

      const {
        data: tournaments,
        error: tournamentError,
      } = await supabase
        .from("tournaments")
        .select(
          `
            id,
            name,
            game_id,
            start_date,
            status
          `,
        )
        .eq("game_id", selectedGame)
        .order("start_date", {
          ascending: false,
          nullsFirst: false,
        })
        .limit(1);

      if (tournamentError) {
        console.error(
          "LEADERBOARD TOURNAMENT ERROR:",
          tournamentError,
        );

        setStandings([]);
        setLoadingStandings(false);
        setError(
          "Unable to load tournament data.",
        );

        return;
      }

      if (
        !tournaments ||
        tournaments.length === 0
      ) {
        setStandings([]);
        setSelectedTournament(null);
        setLoadingStandings(false);
        return;
      }

      const tournament =
        tournaments[0];

      setSelectedTournament(
        tournament.id,
      );

      /*
       * Now load standings for that tournament.
       */

      const {
        data,
        error: standingsError,
      } = await supabase
        .from("standings")
        .select(
          `
            id,
            tournament_id,
            team_id,
            matches_played,
            wins,
            losses,
            draws,
            points,
            teams (
              id,
              name,
              tag,
              logo_url
            ),
            tournaments (
              id,
              name,
              game_id,
              start_date,
              status
            )
          `,
        )
        .eq(
          "tournament_id",
          tournament.id,
        )
        .order("points", {
          ascending: false,
        })
        .order("wins", {
          ascending: false,
        })
        .order("matches_played", {
          ascending: true,
        });

      if (standingsError) {
        console.error(
          "LEADERBOARD STANDINGS ERROR:",
          standingsError,
        );

        setStandings([]);
        setLoadingStandings(false);
        setError(
          "Unable to load leaderboard.",
        );

        return;
      }

      setStandings(
        (data || []) as Standing[],
      );

      setLoadingStandings(false);
    }

    loadStandings();
  }, [selectedGame]);

  /* ========================================================= */
  /* CURRENT GAME */
  /* ========================================================= */

  const currentGame = games.find(
    (game) =>
      game.id === selectedGame,
  );

  /* ========================================================= */
  /* RENDER */
  /* ========================================================= */

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
            Every victory counts. Track the teams
            dominating each competitive title.
          </p>

        </div>

      </div>

      {/* ========================================================= */}
      {/* GAME SELECTOR */}
      {/* ========================================================= */}

      {!loadingGames &&
        games.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">

            {games.map(
              (game, index) => {

                const isActive =
                  selectedGame ===
                  game.id;

                const accent =
                  index % 2 === 0
                    ? "#E6FF4A"
                    : "#FF4F81";

                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() =>
                      setSelectedGame(
                        game.id,
                      )
                    }
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
                      borderColor:
                        isActive
                          ? accent
                          : "rgba(183,138,255,0.15)",

                      background:
                        isActive
                          ? accent
                          : "rgba(26,10,46,0.7)",

                      color:
                        isActive
                          ? "#241044"
                          : "rgba(245,240,255,0.4)",

                      boxShadow:
                        isActive
                          ? `0 0 25px ${accent}25`
                          : "none",
                    }}
                  >
                    {game.short_name ||
                      game.name}
                  </button>
                );
              },
            )}

          </div>
        )}

      {/* ========================================================= */}
      {/* LOADING GAMES */}
      {/* ========================================================= */}

      {loadingGames && (
        <div className="relative overflow-hidden rounded-2xl border border-[#B78AFF]/15 bg-[#1A0A2E]/80 py-20 text-center backdrop-blur-sm">

          <motion.div
            animate={{
              opacity: [
                0.3,
                1,
                0.3,
              ],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="mx-auto mb-5 h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_18px_#E6FF4A]"
          />

          <p className="text-[10px] font-black tracking-[0.4em] text-[#E6FF4A]">
            LOADING ARENAS...
          </p>

        </div>
      )}

      {/* ========================================================= */}
      {/* LOADING STANDINGS */}
      {/* ========================================================= */}

      {!loadingGames &&
        loadingStandings && (
          <div className="relative overflow-hidden rounded-2xl border border-[#B78AFF]/15 bg-[#1A0A2E]/80 py-24 text-center shadow-[0_20px_80px_rgba(76,29,149,0.12)] backdrop-blur-sm">

            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#FF4F81]/[0.035] blur-[100px]" />

            <motion.div
              animate={{
                opacity: [
                  0.3,
                  1,
                  0.3,
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="relative mx-auto mb-5 h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_18px_#E6FF4A]"
            />

            <p className="relative text-[10px] font-black tracking-[0.4em] text-[#E6FF4A]">
              LOADING RANKINGS...
            </p>

          </div>
        )}

      {/* ========================================================= */}
      {/* ERROR */}
      {/* ========================================================= */}

      {!loadingGames &&
        !loadingStandings &&
        error && (
          <div className="rounded-2xl border border-[#FF4F81]/20 bg-[#1A0A2E]/80 px-6 py-12 text-center">

            <Trophy
              size={32}
              className="mx-auto mb-4 text-[#FF4F81]"
            />

            <p className="text-sm font-black tracking-[0.2em] text-[#FF4F81]">
              {error}
            </p>

          </div>
        )}

      {/* ========================================================= */}
      {/* LEADERBOARD */}
      {/* ========================================================= */}

      {!loadingGames &&
        !loadingStandings &&
        !error &&
        standings.length > 0 && (
          <>
            <div className="relative overflow-hidden rounded-2xl border border-[#B78AFF]/15 bg-[#1A0A2E]/80 shadow-[0_20px_80px_rgba(76,29,149,0.12)] backdrop-blur-sm">

              {/* Purple glow */}

              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[100px]" />

              {/* Pink glow */}

              <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#FF4F81]/[0.035] blur-[100px]" />

              {/* ================================================= */}
              {/* TABLE HEADER */}
              {/* ================================================= */}

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

                <span>
                  RANK
                </span>

                <span>
                  TEAM
                </span>

                <span>
                  MATCHES
                </span>

                <span>
                  WINS
                </span>

                <span className="text-right">
                  POINTS
                </span>

              </div>

              {/* ================================================= */}
              {/* ROWS */}
              {/* ================================================= */}

              {standings.map(
                (standing, index) => {

                  const rankAccent =
                    index === 0
                      ? "#E6FF4A"
                      : index === 1
                        ? "#FF4F81"
                        : "#B78AFF";

                  const teamName =
                    standing.teams?.name ||
                    standing.teams?.tag ||
                    "UNKNOWN TEAM";

                  return (
                    <motion.div
                      key={standing.id}
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
                        delay:
                          index * 0.06,
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
                          background:
                            rankAccent,
                          boxShadow:
                            `0 0 15px ${rankAccent}`,
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
                              filter:
                                "drop-shadow(0 0 7px rgba(230,255,74,0.45))",
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
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </span>
                        )}

                      </div>

                      {/* ================================================= */}
                      {/* TEAM */}
                      {/* ================================================= */}

                      <div>

                        <div className="flex items-center gap-3">

                          {standing
                            .teams
                            ?.logo_url && (
                            <img
                              src={
                                standing
                                  .teams
                                  .logo_url
                              }
                              alt=""
                              className="h-8 w-8 rounded-lg object-cover"
                            />
                          )}

                          <div>

                            <p className="text-sm font-black text-[#F5F0FF] transition-colors duration-300 group-hover:text-white md:text-base">
                              {teamName}
                            </p>

                            {standing
                              .teams
                              ?.tag && (
                              <p className="mt-1 text-[8px] font-bold tracking-[0.25em] text-[#F5F0FF]/20">
                                {
                                  standing
                                    .teams
                                    .tag
                                }
                              </p>
                            )}

                            <p className="mt-1 text-[8px] font-bold tracking-[0.25em] text-[#F5F0FF]/20 md:hidden">
                              {
                                standing.wins
                              }{" "}
                              WINS ·{" "}
                              {
                                standing.matches_played
                              }{" "}
                              MATCHES
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* ================================================= */}
                      {/* MATCHES */}
                      {/* ================================================= */}

                      <span className="hidden text-xs font-bold text-[#F5F0FF]/30 md:block">
                        {
                          standing.matches_played
                        }
                      </span>

                      {/* ================================================= */}
                      {/* WINS */}
                      {/* ================================================= */}

                      <span className="hidden text-xs font-bold text-[#F5F0FF]/30 md:block">
                        {standing.wins}
                      </span>

                      {/* ================================================= */}
                      {/* POINTS */}
                      {/* ================================================= */}

                      <div className="text-right">

                        <span
                          className="text-xl font-black"
                          style={{
                            color:
                              rankAccent,
                          }}
                        >
                          {standing.points}
                        </span>

                        <span className="ml-1 text-[8px] font-black tracking-widest text-[#F5F0FF]/20">
                          PTS
                        </span>

                      </div>

                    </motion.div>
                  );
                },
              )}

            </div>

            {/* ========================================================= */}
            {/* FOOTER */}
            {/* ========================================================= */}

            <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <p className="text-[9px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
                  CURRENT GAME //{" "}
                  {currentGame?.short_name ||
                    currentGame?.name ||
                    "—"}
                </p>

                {standings[0]
                  ?.tournaments
                  ?.name && (
                  <p className="mt-2 text-[9px] font-black tracking-[0.2em] text-[#F5F0FF]/10">
                    TOURNAMENT //{" "}
                    {
                      standings[0]
                        .tournaments
                        .name
                    }
                  </p>
                )}

              </div>

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E6FF4A] shadow-[0_0_10px_#E6FF4A]" />

                <p className="text-[9px] font-black tracking-[0.3em] text-[#E6FF4A]">
                  LIVE RANKINGS
                </p>

              </div>

            </div>
          </>
        )}

      {/* ========================================================= */}
      {/* EMPTY STATE */}
      {/* ========================================================= */}

      {!loadingGames &&
        !loadingStandings &&
        !error &&
        standings.length === 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center">

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF4F81]/50 to-transparent" />

            <Trophy
              size={34}
              className="mx-auto text-[#F5F0FF]/10"
            />

            <p className="mt-5 text-[10px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
              NO RANKINGS AVAILABLE
            </p>

            <p className="mt-2 text-xs text-[#F5F0FF]/10">
              Standings will appear here once
              tournament results are recorded.
            </p>

          </div>
        )}

    </section>
  );
}