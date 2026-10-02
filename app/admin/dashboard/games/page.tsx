"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Gamepad2, Plus, Power, Trash2 } from "lucide-react";

type Game = {
  id: string;
  name: string;
  short_name: string;
  category: string | null;
  players_per_team: number | null;
  is_active: boolean;
};

export default function GamesAdmin() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [category, setCategory] = useState("");
  const [players, setPlayers] = useState("");

  async function loadGames() {
    setLoading(true);

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      setMessage(`LOAD ERROR: ${error.message}`);
      console.error(error);
    } else {
      setGames(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadGames();
  }, []);

  async function addGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("ADD GAME BUTTON WORKED");

    setSaving(true);
    setMessage("");

    if (!name.trim() || !shortName.trim()) {
      setMessage("GAME NAME AND SHORT NAME ARE REQUIRED.");
      setSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("CURRENT USER:", user);

    if (!user) {
      setMessage("SESSION EXPIRED. PLEASE LOGIN AGAIN.");
      setSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from("games")
      .insert({
        name: name.trim(),
        short_name: shortName.trim(),
        category: category.trim() || null,
        players_per_team: players
          ? Number(players)
          : null,
        is_active: true,
      })
      .select()
      .single();

    console.log("INSERT RESULT:", data, error);

    if (error) {
      setMessage(`ERROR: ${error.message}`);
      setSaving(false);
      return;
    }

    setMessage(`${data.name} CREATED SUCCESSFULLY.`);

    setName("");
    setShortName("");
    setCategory("");
    setPlayers("");

    await loadGames();

    setSaving(false);
  }

  async function toggleGame(game: Game) {
    const { error } = await supabase
      .from("games")
      .update({
        is_active: !game.is_active,
      })
      .eq("id", game.id);

    if (error) {
      setMessage(`ERROR: ${error.message}`);
      return;
    }

    await loadGames();
  }

  async function deleteGame(game: Game) {
    const confirmed = window.confirm(
      `Delete ${game.name}?`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("games")
      .delete()
      .eq("id", game.id);

    if (error) {
      setMessage(`ERROR: ${error.message}`);
      return;
    }

    setMessage(`${game.name} DELETED.`);
    await loadGames();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <a
              href="/admin/dashboard"
              className="mb-6 flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-white/25 hover:text-yellow-400"
            >
              <ArrowLeft size={13} />
              BACK TO HQ
            </a>

            <p className="text-[9px] font-bold tracking-[0.4em] text-yellow-400">
              RESONANCE // SYSTEM
            </p>

            <h1 className="mt-3 text-5xl font-black">
              GAMES
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setMessage("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-xs font-black tracking-widest text-black"
          >
            <Plus size={16} />
            ADD GAME
          </button>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.05] px-5 py-4 text-xs font-bold tracking-widest text-yellow-400">
            {message}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={addGame}
            className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.03] p-6 md:p-8"
          >
            <p className="text-[9px] font-bold tracking-[0.3em] text-yellow-400">
              NEW TITLE
            </p>

            <h2 className="mt-2 text-2xl font-black">
              ADD COMPETITIVE GAME
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              <Input
                label="GAME NAME"
                value={name}
                onChange={setName}
                placeholder="Apex Legends"
              />

              <Input
                label="SHORT NAME"
                value={shortName}
                onChange={setShortName}
                placeholder="APEX"
              />

              <Input
                label="CATEGORY"
                value={category}
                onChange={setCategory}
                placeholder="Battle Royale"
              />

              <Input
                label="PLAYERS PER TEAM"
                value={players}
                onChange={setPlayers}
                placeholder="3"
                type="number"
              />

            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-7 rounded-xl bg-yellow-400 px-6 py-3 text-xs font-black tracking-widest text-black disabled:opacity-50"
            >
              {saving ? "CREATING..." : "CREATE GAME"}
            </button>
          </form>
        )}

        <div className="mt-10 space-y-3">

          {loading ? (
            <p className="text-xs tracking-widest text-white/25">
              LOADING...
            </p>
          ) : (
            games.map((game) => (
              <div
                key={game.id}
                className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:grid-cols-[60px_1fr_auto] md:items-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black text-yellow-400">
                  <Gamepad2 size={19} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-black">
                      {game.name}
                    </h2>

                    <span className="rounded-full border border-white/10 px-2 py-1 text-[8px] font-bold tracking-widest text-white/30">
                      {game.short_name}
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-[8px] font-bold tracking-widest ${
                        game.is_active
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {game.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>

                  <p className="mt-2 text-[9px] font-bold tracking-[0.2em] text-white/20">
                    {game.category ?? "NO CATEGORY"}
                    {" • "}
                    {game.players_per_team ?? "?"}
                    {" PLAYERS / TEAM"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleGame(game)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-yellow-400"
                  >
                    <Power size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteGame(game)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/20 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label>
      <span className="text-[8px] font-bold tracking-[0.3em] text-white/30">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400/50"
      />
    </label>
  );
}