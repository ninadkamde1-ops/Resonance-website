"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Plus,
  Trophy,
  Users,
} from "lucide-react";

type Game = {
  id: string;
  name: string;
};

type Tournament = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  location: string | null;
  max_teams: number | null;
  game_id: string;
  games: {
    name: string;
  } | null;
};

export default function TournamentsAdmin() {
  const [games, setGames] = useState<Game[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [status, setStatus] = useState("upcoming");

  async function loadData() {
    setLoading(true);

    const [gamesResult, tournamentsResult] = await Promise.all([
      supabase
        .from("games")
        .select("id, name")
        .eq("is_active", true)
        .order("name"),

      supabase
        .from("tournaments")
        .select(`
          id,
          name,
          description,
          status,
          start_date,
          end_date,
          location,
          max_teams,
          game_id,
          games (
            name
          )
        `)
        .order("created_at", { ascending: false }),
    ]);

    if (gamesResult.error) {
      setMessage(`GAME ERROR: ${gamesResult.error.message}`);
    }

    if (tournamentsResult.error) {
      setMessage(
        `TOURNAMENT ERROR: ${tournamentsResult.error.message}`
      );
    }

    setGames(gamesResult.data ?? []);

    const normalizedTournaments: Tournament[] = (
  tournamentsResult.data ?? []
).map((tournament) => ({
  id: tournament.id,
  name: tournament.name,
  description: tournament.description,
  status: tournament.status,
  start_date: tournament.start_date,
  end_date: tournament.end_date,
  location: tournament.location,
  max_teams: tournament.max_teams,
  game_id: tournament.game_id,

  games: tournament.games?.[0] ?? null,
}));

setTournaments(normalizedTournaments);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createTournament(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    if (!name.trim() || !gameId) {
      setMessage("TOURNAMENT NAME AND GAME ARE REQUIRED.");
      return;
    }

    if (!startDate) {
      setMessage("START DATE & TIME ARE REQUIRED.");
      return;
    }

    if (!endDate) {
      setMessage("END DATE & TIME ARE REQUIRED.");
      return;
    }

    // Browser datetime-local returns:
    // YYYY-MM-DDTHH:mm
    //
    // We convert it into a proper ISO timestamp
    // before sending it to Supabase.
    const startTimestamp = new Date(startDate).toISOString();
    const endTimestamp = new Date(endDate).toISOString();

    if (new Date(endTimestamp) <= new Date(startTimestamp)) {
      setMessage("END DATE & TIME MUST BE AFTER START DATE & TIME.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("tournaments")
      .insert({
        name: name.trim(),
        game_id: gameId,
        description: description.trim() || null,
        status,
        start_date: startTimestamp,
        end_date: endTimestamp,
        location: location.trim() || null,
        max_teams: maxTeams
          ? Number(maxTeams)
          : null,
      });

    if (error) {
      setMessage(`ERROR: ${error.message}`);
      setSaving(false);
      return;
    }

    setMessage("TOURNAMENT CREATED SUCCESSFULLY.");

    setName("");
    setGameId("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setMaxTeams("");
    setStatus("upcoming");

    setShowForm(false);

    await loadData();

    setSaving(false);
  }

  function formatDate(date: string | null) {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "INVALID DATE";
    }

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">

          <div>

            <a
              href="/admin/dashboard"
              className="mb-6 flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-white/25 transition hover:text-yellow-400"
            >
              <ArrowLeft size={13} />
              BACK TO HQ
            </a>

            <p className="text-[9px] font-bold tracking-[0.4em] text-yellow-400">
              RESONANCE // COMPETITION
            </p>

            <h1 className="mt-3 text-5xl font-black">
              TOURNAMENTS
            </h1>

          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setMessage("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-xs font-black tracking-widest text-black transition hover:bg-yellow-300"
          >
            <Plus size={16} />
            NEW TOURNAMENT
          </button>

        </div>

        {/* MESSAGE */}

        {message && (
          <div className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.05] px-5 py-4 text-xs font-bold tracking-widest text-yellow-400">
            {message}
          </div>
        )}

        {/* CREATE FORM */}

        {showForm && (
          <form
            onSubmit={createTournament}
            className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.03] p-6 md:p-8"
          >

            <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
              NEW EVENT
            </p>

            <h2 className="mt-2 text-2xl font-black">
              CREATE TOURNAMENT
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              {/* TOURNAMENT NAME */}

              <Field
                label="TOURNAMENT NAME"
                value={name}
                onChange={setName}
                placeholder="Resonance Championship 2026"
                required
              />

              {/* GAME */}

              <label>
                <span className="text-[8px] font-bold tracking-[0.3em] text-white/30">
                  GAME
                </span>

                <select
                  required
                  value={gameId}
                  onChange={(e) =>
                    setGameId(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400/50"
                >
                  <option value="">
                    Select game
                  </option>

                  {games.map((game) => (
                    <option
                      key={game.id}
                      value={game.id}
                    >
                      {game.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* START DATE */}

              <Field
                label="START DATE & TIME"
                value={startDate}
                onChange={setStartDate}
                type="datetime-local"
                required
              />

              {/* END DATE */}

              <Field
                label="END DATE & TIME"
                value={endDate}
                onChange={setEndDate}
                type="datetime-local"
                required
              />

              {/* LOCATION */}

              <Field
                label="LOCATION"
                value={location}
                onChange={setLocation}
                placeholder="SSPU / ONLINE"
              />

              {/* MAX TEAMS */}

              <Field
                label="MAXIMUM TEAMS"
                value={maxTeams}
                onChange={setMaxTeams}
                placeholder="64"
                type="number"
              />

              {/* STATUS */}

              <label>
                <span className="text-[8px] font-bold tracking-[0.3em] text-white/30">
                  STATUS
                </span>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400/50"
                >
                  <option value="upcoming">
                    Upcoming
                  </option>

                  <option value="registration">
                    Registration
                  </option>

                  <option value="live">
                    Live
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>
                </select>
              </label>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label>

                  <span className="text-[8px] font-bold tracking-[0.3em] text-white/30">
                    DESCRIPTION
                  </span>

                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Tournament details..."
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400/50"
                  />

                </label>

              </div>

            </div>

            {/* DATE INFO */}

            <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">

              <div className="flex gap-3">

                <CalendarDays
                  size={16}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <p className="text-[10px] leading-5 text-white/35">
                  Select the date and time using the calendar
                  picker. Your browser will automatically handle
                  the correct date format.
                </p>

              </div>

            </div>

            {/* CREATE BUTTON */}

            <button
              type="submit"
              disabled={saving}
              className="mt-7 rounded-xl bg-yellow-400 px-6 py-3 text-xs font-black tracking-widest text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "CREATING..."
                : "CREATE TOURNAMENT"}
            </button>

          </form>
        )}

        {/* TOURNAMENT LIST */}

        <div className="mt-10">

          {loading ? (

            <p className="text-xs font-bold tracking-widest text-white/25">
              LOADING TOURNAMENTS...
            </p>

          ) : tournaments.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">

              <Trophy
                className="mx-auto text-white/10"
                size={32}
              />

              <p className="mt-5 text-xs font-bold tracking-[0.3em] text-white/20">
                NO TOURNAMENTS YET
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {tournaments.map((tournament) => (

                <div
                  key={tournament.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-yellow-400/30 md:p-7"
                >

                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                    <div className="flex gap-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black text-yellow-400">
                        <Trophy size={20} />
                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-xl font-black">
                            {tournament.name}
                          </h2>

                          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 text-[8px] font-bold tracking-widest text-yellow-400">
                            {tournament.games?.name ??
                              "UNKNOWN GAME"}
                          </span>

                          <span className="rounded-full border border-white/10 px-3 py-1 text-[8px] font-bold tracking-widest text-white/30">
                            {tournament.status.toUpperCase()}
                          </span>

                        </div>

                        {tournament.description && (
                          <p className="mt-3 max-w-2xl text-sm text-white/30">
                            {tournament.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-5 text-[9px] font-bold tracking-[0.2em] text-white/20">

                          {/* START */}

                          {tournament.start_date && (
                            <span className="flex items-center gap-2">
                              <CalendarDays size={13} />

                              {formatDate(
                                tournament.start_date
                              )}
                            </span>
                          )}

                          {/* LOCATION */}

                          {tournament.location && (
                            <span className="flex items-center gap-2">
                              <MapPin size={13} />

                              {tournament.location}
                            </span>
                          )}

                          {/* MAX TEAMS */}

                          {tournament.max_teams && (
                            <span className="flex items-center gap-2">
                              <Users size={13} />

                              {tournament.max_teams} TEAMS
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}


/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>

      <span className="text-[8px] font-bold tracking-[0.3em] text-white/30">
        {label}
      </span>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400/50"
      />

    </label>
  );
}