"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  Zap,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Announcement = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};

const accents = [
  "#E6FF4A",
  "#FF4F81",
];

export default function Announcements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      const { data, error } = await supabase
        .from("announcements")
        .select(`
          id,
          title,
          description,
          category,
          image_url,
          is_published,
          published_at,
          created_at
        `)
        .eq("is_published", true)
        .order("published_at", {
          ascending: false,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "PUBLIC ANNOUNCEMENTS ERROR:",
          error,
        );

        setAnnouncements([]);
        setLoading(false);
        return;
      }

      setAnnouncements(
        (data || []) as Announcement[],
      );

      setLoading(false);
    }

    loadAnnouncements();
  }, []);

  function formatDate(
    publishedAt: string | null,
    createdAt: string,
  ) {
    const value =
      publishedAt || createdAt;

    return new Date(value)
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  }

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
      {/* LOADING */}
      {/* ========================================================= */}

      {loading && (
        <div className="relative overflow-hidden rounded-3xl border border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center backdrop-blur-sm">

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E6FF4A] to-transparent" />

          <motion.div
            animate={{
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="mx-auto mb-5 h-2 w-2 rounded-full bg-[#E6FF4A] shadow-[0_0_18px_#E6FF4A]"
          />

          <p className="text-[10px] font-black tracking-[0.4em] text-[#E6FF4A]">
            LOADING TRANSMISSIONS...
          </p>

        </div>
      )}

      {/* ========================================================= */}
      {/* ANNOUNCEMENTS */}
      {/* ========================================================= */}

      {!loading && announcements.length > 0 && (
        <div className="space-y-4">

          {announcements.map(
            (announcement, index) => {

              const accent =
                accents[
                  index % accents.length
                ];

              return (
                <motion.article
                  key={announcement.id}

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
                  {/* ATMOSPHERE */}
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
                      background: accent,
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

                    {/* DATE / TAG */}

                    <div>

                      <p className="text-[9px] font-black tracking-[0.25em] text-[#F5F0FF]/25">
                        {formatDate(
                          announcement.published_at,
                          announcement.created_at,
                        )}
                      </p>

                      <p
                        className="mt-3 flex items-center gap-2 text-[9px] font-black tracking-[0.25em]"
                        style={{
                          color: accent,
                        }}
                      >

                        <Zap
                          size={11}
                          style={{
                            filter: `drop-shadow(0 0 5px ${accent})`,
                          }}
                        />

                        {(
                          announcement.category ||
                          "ANNOUNCEMENT"
                        ).toUpperCase()}

                      </p>

                    </div>

                    {/* ================================================= */}
                    {/* MAIN */}
                    {/* ================================================= */}

                    <div>

                      <h3 className="max-w-3xl text-xl font-black text-[#F5F0FF] transition-colors duration-300 group-hover:text-white md:text-2xl">
                        {announcement.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F5F0FF]/30 transition-colors duration-300 group-hover:text-[#F5F0FF]/45">
                        {announcement.description}
                      </p>

                    </div>

                    {/* ================================================= */}
                    {/* ACTION */}
                    {/* ================================================= */}

                    <button
                      type="button"
                      aria-label={`View ${announcement.title}`}
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
                        borderColor: `${accent}35`,
                      }}
                    >

                      <ArrowUpRight
                        size={17}
                        style={{
                          color: accent,
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
                          background: accent,
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
                          ${accent},
                          transparent
                        )`,
                      }}
                    />

                  </div>

                  {/* ================================================= */}
                  {/* SIDE ACCENT */}
                  {/* ================================================= */}

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
                      background: accent,
                      boxShadow: `0 0 15px ${accent}`,
                    }}
                  />

                </motion.article>
              );
            },
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* EMPTY STATE */}
      {/* ========================================================= */}

      {!loading &&
        announcements.length === 0 && (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#B78AFF]/15 bg-[#1A0A2E]/70 py-24 text-center">

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF4F81]/50 to-transparent" />

            <Bell
              className="mx-auto text-[#F5F0FF]/10"
              size={34}
            />

            <p className="mt-5 text-[10px] font-black tracking-[0.3em] text-[#F5F0FF]/20">
              NO ACTIVE TRANSMISSIONS
            </p>

            <p className="mt-2 text-xs text-[#F5F0FF]/10">
              New Resonance announcements will
              appear here.
            </p>

          </div>
        )}

    </section>
  );
}