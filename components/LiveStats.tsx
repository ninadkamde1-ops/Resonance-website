"use client";

import { useEffect, useState } from "react";
import { Trophy, Users, Gamepad2, Swords } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Stats = {
  tournaments: number;
  teams: number;
  games: number;
  matches: number;
};

export default function LiveStats() {
  const [stats, setStats] = useState<Stats>({
    tournaments: 0,
    teams: 0,
    games: 0,
    matches: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [
        tournaments,
        teams,
        games,
        matches,
      ] = await Promise.all([
        supabase
          .from("tournaments")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("teams")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("games")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("is_active", true),

        supabase
          .from("matches")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setStats({
        tournaments: tournaments.count ?? 0,
        teams: teams.count ?? 0,
        games: games.count ?? 0,
        matches: matches.count ?? 0,
      });

      setLoading(false);
    }

    loadStats();
  }, []);

  const statsList = [
    {
      label: "TOURNAMENTS",
      value: stats.tournaments,
      icon: Trophy,
    },
    {
      label: "TEAMS",
      value: stats.teams,
      icon: Users,
    },
    {
      label: "GAMES",
      value: stats.games,
      icon: Gamepad2,
    },
    {
      label: "MATCHES",
      value: stats.matches,
      icon: Swords,
    },
  ];

  return (
    <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 border-y border-white/10 md:grid-cols-4">
      {statsList.map((stat, index) => {
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
            }}
            className="group border-white/10 p-8 transition hover:bg-yellow-400 hover:text-black md:border-r last:md:border-r-0"
          >
            <Icon
              size={18}
              className="mb-6 text-yellow-400 transition group-hover:text-black"
            />

            <p className="text-4xl font-black tracking-tight">
              {loading ? "--" : stat.value}
            </p>

            <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-white/35 group-hover:text-black/60">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </section>
  );
}