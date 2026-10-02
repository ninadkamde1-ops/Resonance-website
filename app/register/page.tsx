"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Trophy,
  Users,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Tournament = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  game_id: string;
  max_teams: number | null;
  games: {
    name: string;
    short_name: string | null;
    players_per_team: number;
  } | null;
};

type PlayerForm = {
  name: string;
  ign: string;
  uid: string;
  email: string;
  phone: string;
  is_substitute: boolean;
};

export default function RegistrationPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);

  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");

  const [players, setPlayers] = useState<PlayerForm[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadTournaments();
  }, []);

  async function loadTournaments() {
    const { data, error } = await supabase
      .from("tournaments")
      .select(`
        id,
        name,
        description,
        status,
        game_id,
        max_teams,
        games (
          name,
          short_name,
          players_per_team
        )
      `)
      .in("status", ["upcoming", "registration"])
      .order("start_date", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setTournaments(data || []);
    }

    setLoading(false);
  }

  function selectTournament(tournament: Tournament) {
    setSelectedTournament(tournament);
    setSuccess("");
    setError("");

    const count =
      tournament.games?.players_per_team || 1;

    setPlayers(
      Array.from({ length: count }, () => ({
        name: "",
        ign: "",
        uid: "",
        email: "",
        phone: "",
        is_substitute: false,
      }))
    );
  }

  function updatePlayer(
    index: number,
    field: keyof PlayerForm,
    value: string | boolean
  ) {
    setPlayers((current) =>
      current.map((player, i) =>
        i === index
          ? {
              ...player,
              [field]: value,
            }
          : player
      )
    );
  }

  function addSubstitute() {
    if (players.some((p) => p.is_substitute)) {
      setError("Only one substitute is allowed.");
      return;
    }

    setPlayers((current) => [
      ...current,
      {
        name: "",
        ign: "",
        uid: "",
        email: "",
        phone: "",
        is_substitute: true,
      },
    ]);
  }

  function removeSubstitute() {
    setPlayers((current) =>
      current.filter((player) => !player.is_substitute)
    );
  }

  async function submitRegistration(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedTournament) {
      setError("Please select a tournament.");
      return;
    }

    if (!teamName.trim()) {
      setError("Team name is required.");
      return;
    }

    const mainPlayers = players.filter(
      (player) => !player.is_substitute
    );

    if (
      mainPlayers.length !==
      selectedTournament.games?.players_per_team
    ) {
      setError(
        `This tournament requires ${selectedTournament.games?.players_per_team} main players.`
      );
      return;
    }

    for (const player of mainPlayers) {
      if (!player.name.trim()) {
        setError("Every player must have a name.");
        return;
      }
    }

    setSubmitting(true);

    const { data, error } = await supabase.rpc(
      "submit_tournament_registration",
      {
        p_tournament_id: selectedTournament.id,
        p_team_name: teamName,
        p_team_tag: teamTag,
        p_players: players,
        p_payment_amount: null,
      }
    );

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setSuccess(
      `Registration submitted successfully! Registration ID: ${data}`
    );

    setTeamName("");
    setTeamTag("");

    const count =
      selectedTournament.games?.players_per_team || 1;

    setPlayers(
      Array.from({ length: count }, () => ({
        name: "",
        ign: "",
        uid: "",
        email: "",
        phone: "",
        is_substitute: false,
      }))
    );

    setSubmitting(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-yellow-400/20 border-t-yellow-400" />
          <p className="text-xs font-black tracking-[0.3em]">
            LOADING TOURNAMENTS...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-5 py-10 md:px-10">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-12 text-center">

          <p className="text-[9px] font-black tracking-[0.4em] text-yellow-400">
            RESONANCE ESPORTS
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
            TOURNAMENT
            <span className="text-yellow-400"> REGISTRATION</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/40">
            Register your squad and compete in the next
            Resonance tournament.
          </p>

        </div>

        {/* SUCCESS */}

        {success && (
          <div className="mb-8 flex gap-4 rounded-2xl border border-green-400/20 bg-green-400/[0.04] p-5">

            <CheckCircle2
              className="shrink-0 text-green-400"
              size={22}
            />

            <div>
              <p className="font-bold text-green-400">
                REGISTRATION SUCCESSFUL
              </p>

              <p className="mt-1 text-sm text-white/50">
                {success}
              </p>
            </div>

          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-8 flex gap-4 rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5">

            <AlertCircle
              className="shrink-0 text-red-400"
              size={22}
            />

            <p className="text-sm text-red-300">
              {error}
            </p>

          </div>
        )}

        {!selectedTournament ? (

          /* =========================
             TOURNAMENT SELECT
          ========================== */

          <section>

            <div className="mb-5 flex items-center gap-3">
              <Trophy
                size={20}
                className="text-yellow-400"
              />

              <h2 className="font-black tracking-wide">
                SELECT TOURNAMENT
              </h2>
            </div>

            {tournaments.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">

                <Trophy
                  size={40}
                  className="mx-auto mb-4 text-white/10"
                />

                <p className="font-bold text-white/40">
                  No tournaments are currently open.
                </p>

              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">

                {tournaments.map((tournament) => (

                  <button
                    key={tournament.id}
                    onClick={() =>
                      selectTournament(tournament)
                    }
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.03]"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[0.06]">
                        <Trophy
                          size={21}
                          className="text-yellow-400"
                        />
                      </div>

                      <ArrowRight
                        size={18}
                        className="text-white/20 transition group-hover:translate-x-1 group-hover:text-yellow-400"
                      />

                    </div>

                    <h3 className="mt-6 text-xl font-black">
                      {tournament.name}
                    </h3>

                    <p className="mt-2 text-xs text-yellow-400">
                      {tournament.games?.name}
                    </p>

                    {tournament.description && (
                      <p className="mt-3 text-sm text-white/35">
                        {tournament.description}
                      </p>
                    )}

                    <div className="mt-6 flex gap-4 text-[9px] font-bold tracking-widest text-white/30">

                      <span>
                        {tournament.games?.players_per_team}{" "}
                        PLAYERS
                      </span>

                      {tournament.max_teams && (
                        <span>
                          MAX {tournament.max_teams} TEAMS
                        </span>
                      )}

                    </div>

                  </button>

                ))}

              </div>
            )}

          </section>

        ) : (

          /* =========================
             REGISTRATION FORM
          ========================== */

          <form
            onSubmit={submitRegistration}
            className="space-y-8"
          >

            {/* SELECTED TOURNAMENT */}

            <section className="rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.03] p-6">

              <div className="flex items-center justify-between gap-5">

                <div>

                  <p className="text-[8px] font-black tracking-[0.3em] text-yellow-400">
                    TOURNAMENT
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {selectedTournament.name}
                  </h2>

                  <p className="mt-1 text-sm text-white/40">
                    {selectedTournament.games?.name}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedTournament(null)
                  }
                  className="text-xs font-bold text-white/30 hover:text-yellow-400"
                >
                  CHANGE
                </button>

              </div>

            </section>

            {/* TEAM */}

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">

              <div className="mb-7 flex items-center gap-3">

                <Users
                  size={20}
                  className="text-yellow-400"
                />

                <div>
                  <h2 className="font-black">
                    TEAM DETAILS
                  </h2>

                  <p className="text-xs text-white/30">
                    Enter your squad information.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="TEAM NAME *"
                  value={teamName}
                  onChange={setTeamName}
                  placeholder="Enter team name"
                />

                <Field
                  label="TEAM TAG"
                  value={teamTag}
                  onChange={setTeamTag}
                  placeholder="e.g. RNS"
                />

              </div>

            </section>

            {/* PLAYERS */}

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">

              <div className="mb-7 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <UserPlus
                    size={20}
                    className="text-yellow-400"
                  />

                  <div>
                    <h2 className="font-black">
                      PLAYERS
                    </h2>

                    <p className="text-xs text-white/30">
                      {selectedTournament.games?.players_per_team}{" "}
                      main players required
                    </p>
                  </div>

                </div>

                {!players.some(
                  (player) => player.is_substitute
                ) && (
                  <button
                    type="button"
                    onClick={addSubstitute}
                    className="rounded-lg border border-white/10 px-3 py-2 text-[9px] font-black tracking-widest text-white/40 transition hover:border-yellow-400/30 hover:text-yellow-400"
                  >
                    + SUBSTITUTE
                  </button>
                )}

              </div>

              <div className="space-y-5">

                {players.map((player, index) => (

                  <div
                    key={index}
                    className={`rounded-xl border p-5 ${
                      player.is_substitute
                        ? "border-purple-400/20 bg-purple-400/[0.03]"
                        : "border-white/10 bg-black"
                    }`}
                  >

                    <div className="mb-5 flex items-center justify-between">

                      <p className="text-[9px] font-black tracking-[0.2em] text-yellow-400">
                        {player.is_substitute
                          ? "SUBSTITUTE"
                          : `PLAYER ${String(index + 1).padStart(2, "0")}`}
                      </p>

                      {player.is_substitute && (
                        <button
                          type="button"
                          onClick={removeSubstitute}
                          className="text-[9px] font-bold text-red-400"
                        >
                          REMOVE
                        </button>
                      )}

                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                      <Field
                        label="NAME *"
                        value={player.name}
                        onChange={(value) =>
                          updatePlayer(
                            index,
                            "name",
                            value
                          )
                        }
                        placeholder="Full name"
                      />

                      <Field
                        label="IGN"
                        value={player.ign}
                        onChange={(value) =>
                          updatePlayer(
                            index,
                            "ign",
                            value
                          )
                        }
                        placeholder="In-game name"
                      />

                      <Field
                        label="UID"
                        value={player.uid}
                        onChange={(value) =>
                          updatePlayer(
                            index,
                            "uid",
                            value
                          )
                        }
                        placeholder="Game UID"
                      />

                      <Field
                        label="EMAIL"
                        value={player.email}
                        onChange={(value) =>
                          updatePlayer(
                            index,
                            "email",
                            value
                          )
                        }
                        placeholder="Email address"
                      />

                      <Field
                        label="PHONE"
                        value={player.phone}
                        onChange={(value) =>
                          updatePlayer(
                            index,
                            "phone",
                            value
                          )
                        }
                        placeholder="+91..."
                      />

                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-yellow-400 py-4 text-sm font-black tracking-[0.2em] text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "SUBMITTING..."
                : "SUBMIT REGISTRATION"}
            </button>

            <p className="text-center text-[10px] text-white/20">
              Registration will remain pending until verified
              by Resonance Esports administration.
            </p>

          </form>

        )}

      </div>

    </main>
  );
}


/* =========================
   FIELD
========================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-[9px] font-bold tracking-widest text-white/30">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-yellow-400/50"
      />

    </div>
  );
}