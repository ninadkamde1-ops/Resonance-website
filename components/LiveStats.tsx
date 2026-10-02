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
      accent: "#E6FF4A",
    },
    {
      label: "TEAMS",
      value: stats.teams,
      icon: Users,
      accent: "#FF4F81",
    },
    {
      label: "GAMES",
      value: stats.games,
      icon: Gamepad2,
      accent: "#E6FF4A",
    },
    {
      label: "MATCHES",
      value: stats.matches,
      icon: Swords,
      accent: "#FF4F81",
    },
  ];

  return (
    <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 border-y border-[#B78AFF]/15 md:grid-cols-4">
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
              duration: 0.5,
            }}
            className="
              group
              relative
              overflow-hidden
              border-[#B78AFF]/15
              bg-[#1A0A2E]/70
              p-8
              backdrop-blur-sm
              transition-all
              duration-500
              hover:bg-[#241044]
              hover:shadow-[0_15px_50px_rgba(124,58,237,0.15)]
              md:border-r
              last:md:border-r-0
            "
          >
            {/* Background glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-32
                w-32
                rounded-full
                opacity-0
                blur-3xl
                transition-opacity
                duration-500
                group-hover:opacity-20
              "
              style={{
                background: stat.accent,
              }}
            />

            {/* Icon */}

            <Icon
              size={18}
              className="relative mb-6 transition-transform duration-300 group-hover:scale-110"
              style={{
                color: stat.accent,
                filter: `drop-shadow(0 0 7px ${stat.accent}50)`,
              }}
            />

            {/* Number */}

            <p className="relative text-4xl font-black tracking-tight text-[#F5F0FF]">
              {loading ? (
                <span className="text-[#B78AFF]/30">--</span>
              ) : (
                stat.value
              )}
            </p>

            {/* Label */}

            <p className="relative mt-2 text-[10px] font-black tracking-[0.3em] text-[#F5F0FF]/35 transition-colors duration-300 group-hover:text-[#F5F0FF]/60">
              {stat.label}
            </p>

            {/* Bottom energy line */}

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B78AFF]/10">
              <div
                className="
                  h-full
                  w-0
                  transition-all
                  duration-500
                  group-hover:w-full
                "
                style={{
                  background: `linear-gradient(
                    90deg,
                    transparent,
                    ${stat.accent},
                    transparent
                  )`,
                  boxShadow: `0 0 12px ${stat.accent}`,
                }}
              />
            </div>

            {/* Active corner */}

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
                background: stat.accent,
                boxShadow: `0 0 12px ${stat.accent}`,
              }}
            />
          </motion.div>
        );
      })}
    </section>
  );
}