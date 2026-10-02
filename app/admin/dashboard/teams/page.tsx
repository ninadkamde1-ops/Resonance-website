"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

type Team = {
  id: string;
  name: string;
  tag: string;
  logo_url: string | null;
  created_at: string;
};

export default function TeamsAdmin() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  async function loadTeams() {
    setLoading(true);

    const { data, error } = await supabase
      .from("teams")
      .select("id, name, tag, logo_url, created_at")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("TEAM LOAD ERROR:", error);
      setMessage(`ERROR: ${error.message}`);
      setLoading(false);
      return;
    }

    setTeams(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadTeams();
  }, []);

  async function createTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    if (!name.trim() || !tag.trim()) {
      setMessage("TEAM NAME AND TAG ARE REQUIRED.");
      setSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("SESSION EXPIRED. PLEASE LOGIN AGAIN.");
      setSaving(false);
      return;
    }

    console.log("CREATING TEAM:", {
      name,
      tag,
      logoUrl,
      user: user.id,
    });

    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: name.trim(),
        tag: tag.trim().toUpperCase(),
        logo_url: logoUrl.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.error("TEAM CREATE ERROR:", error);
      setMessage(`ERROR: ${error.message}`);
      setSaving(false);
      return;
    }

    console.log("TEAM CREATED:", data);

    setMessage(`${data.name} CREATED SUCCESSFULLY.`);

    setName("");
    setTag("");
    setLogoUrl("");

    setShowForm(false);

    await loadTeams();

    setSaving(false);
  }

  async function deleteTeam(team: Team) {
    const confirmed = window.confirm(
      `Delete ${team.name} (${team.tag})?`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", team.id);

    if (error) {
      console.error("TEAM DELETE ERROR:", error);
      setMessage(`ERROR: ${error.message}`);
      return;
    }

    setMessage(`${team.name} DELETED.`);

    await loadTeams();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">

          <div>

            <Link
              href="/admin/dashboard"
              className="mb-6 flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-white/25 transition hover:text-yellow-400"
            >
              <ArrowLeft size={13} />
              BACK TO HQ
            </Link>

            <p className="text-[9px] font-bold tracking-[0.4em] text-yellow-400">
              RESONANCE // COMPETITION
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight">
              TEAMS
            </h1>

            <p className="mt-3 text-sm text-white/25">
              Manage registered esports teams.
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setMessage("");
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-yellow-400
              px-5
              py-3
              text-xs
              font-black
              tracking-widest
              text-black
              transition
              hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]
            "
          >
            <Plus size={16} />
            ADD TEAM
          </button>

        </div>

        {/* =====================================================
            MESSAGE
        ===================================================== */}

        {message && (
          <motion.div
            initial={{
              opacity: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-6
              rounded-xl
              border
              border-yellow-400/20
              bg-yellow-400/[0.05]
              px-5
              py-4
              text-xs
              font-bold
              tracking-widest
              text-yellow-400
            "
          >
            {message}
          </motion.div>
        )}

        {/* =====================================================
            CREATE TEAM FORM
        ===================================================== */}

        {showForm && (
          <motion.form
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            onSubmit={createTeam}
            className="
              mt-8
              rounded-2xl
              border
              border-yellow-400/20
              bg-yellow-400/[0.03]
              p-6
              md:p-8
            "
          >

            <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
              NEW REGISTRATION
            </p>

            <h2 className="mt-2 text-2xl font-black">
              CREATE TEAM
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              {/* TEAM NAME */}

              <Field
                label="TEAM NAME"
                value={name}
                onChange={setName}
                placeholder="Velocity Esports"
                required
              />

              {/* TAG */}

              <Field
                label="TEAM TAG"
                value={tag}
                onChange={setTag}
                placeholder="VLT"
                required
              />

              {/* LOGO */}

              <div className="md:col-span-2">

                <Field
                  label="LOGO URL"
                  value={logoUrl}
                  onChange={setLogoUrl}
                  placeholder="https://..."
                />

                <p className="mt-2 text-[8px] tracking-[0.2em] text-white/15">
                  OPTIONAL — USE A PUBLIC IMAGE URL
                </p>

              </div>

            </div>

            {/* PREVIEW */}

            {logoUrl && (
              <div className="mt-6 flex items-center gap-4 rounded-xl border border-white/10 bg-black p-4">

                <img
                  src={logoUrl}
                  alt="Team logo preview"
                  className="h-14 w-14 rounded-xl object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />

                <div>

                  <p className="text-xs font-black">
                    {name || "TEAM NAME"}
                  </p>

                  <p className="mt-1 text-[9px] font-bold tracking-[0.25em] text-yellow-400">
                    {tag || "TAG"}
                  </p>

                </div>

              </div>
            )}

            <div className="mt-7 flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="
                  rounded-xl
                  bg-yellow-400
                  px-6
                  py-3
                  text-xs
                  font-black
                  tracking-widest
                  text-black
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving ? "CREATING..." : "CREATE TEAM"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
                  rounded-xl
                  border
                  border-white/10
                  px-6
                  py-3
                  text-xs
                  font-bold
                  tracking-widest
                  text-white/40
                  transition
                  hover:text-white
                "
              >
                CANCEL
              </button>

            </div>

          </motion.form>
        )}

        {/* =====================================================
            TEAM COUNT
        ===================================================== */}

        <div className="mt-10 flex items-center gap-3">

          <Users
            size={16}
            className="text-yellow-400"
          />

          <p className="text-[9px] font-bold tracking-[0.3em] text-white/30">
            {teams.length} REGISTERED TEAMS
          </p>

        </div>

        {/* =====================================================
            TEAM LIST
        ===================================================== */}

        <div className="mt-5">

          {loading ? (

            <div className="py-20 text-center">

              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-yellow-400/20 border-t-yellow-400" />

              <p className="mt-5 text-[9px] font-bold tracking-[0.3em] text-white/20">
                LOADING TEAMS...
              </p>

            </div>

          ) : teams.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">

              <Shield
                size={32}
                className="mx-auto text-white/10"
              />

              <p className="mt-5 text-xs font-bold tracking-[0.3em] text-white/20">
                NO TEAMS REGISTERED
              </p>

              <p className="mt-2 text-[9px] tracking-[0.2em] text-white/10">
                CREATE YOUR FIRST TEAM ABOVE
              </p>

            </div>

          ) : (

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {teams.map((team, index) => (

                <motion.div
                  key={team.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-yellow-400/40
                    hover:bg-yellow-400/[0.03]
                  "
                >

                  {/* Glow */}

                  <div className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-yellow-400/[0.04]
                    blur-3xl
                    transition
                    group-hover:bg-yellow-400/[0.08]
                  " />

                  {/* Team */}

                  <div className="relative flex items-center gap-4">

                    <div className="
                      flex
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/10
                      bg-black
                    ">

                      {team.logo_url ? (

                        <img
                          src={team.logo_url}
                          alt={team.name}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <Shield
                          size={23}
                          className="text-yellow-400"
                        />

                      )}

                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-lg font-black">
                        {team.name}
                      </p>

                      <p className="mt-1 text-[9px] font-black tracking-[0.3em] text-yellow-400">
                        {team.tag}
                      </p>

                    </div>

                  </div>

                  {/* Footer */}

                  <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                    <div className="flex items-center gap-2">

                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />

                      <span className="text-[8px] font-bold tracking-[0.25em] text-white/20">
                        REGISTERED
                      </span>

                    </div>

                    <button
                      type="button"
                      onClick={() => deleteTeam(team)}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        text-white/20
                        transition
                        hover:border-red-400/30
                        hover:text-red-400
                      "
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}


/* =========================================================
   INPUT FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">

      <span className="text-[8px] font-bold tracking-[0.3em] text-white/30">
        {label}
      </span>

      <input
        type="text"
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          mt-2
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          px-4
          py-3
          text-sm
          text-white
          outline-none
          transition
          placeholder:text-white/15
          focus:border-yellow-400/50
          focus:ring-1
          focus:ring-yellow-400/20
        "
      />

    </label>
  );
}

