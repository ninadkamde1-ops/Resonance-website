"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Users,
  Plus,
  Trash2,
  UserRound,
  Shield,
  Search,
  X,
} from "lucide-react";

type Team = {
  id: string;
  name: string;
  tag: string | null;
};

type Player = {
  id: string;
  team_id: string;
  name: string;
  ign: string | null;
  uid: string | null;
  email: string | null;
  phone: string | null;
  is_substitute: boolean;
  created_at: string;
  teams?: {
    name: string;
    tag: string | null;
  } | null;
};

export default function PlayersHQ() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    ign: "",
    uid: "",
    email: "",
    phone: "",
    team_id: "",
    is_substitute: false,
  });

  async function loadData() {
    setLoading(true);

    const [playersRes, teamsRes] = await Promise.all([
      supabase
        .from("players")
        .select(
          "id, team_id, name, ign, uid, email, phone, is_substitute, created_at, teams(name, tag)"
        )
        .order("created_at", { ascending: false }),

      supabase
        .from("teams")
        .select("id, name, tag")
        .order("name", { ascending: true }),
    ]);

    if (playersRes.error) {
      console.error(playersRes.error);
      setMessage(playersRes.error.message);
    } else {
      const normalizedPlayers: Player[] = (playersRes.data ?? []).map(
        (player) => ({
          id: player.id,
          team_id: player.team_id,
          name: player.name,
          ign: player.ign,
          uid: player.uid,
          email: player.email,
          phone: player.phone,
          is_substitute: player.is_substitute,
          created_at: player.created_at,
          teams: player.teams?.[0] ?? null,
        })
      );

      setPlayers(normalizedPlayers);
    }

    if (teamsRes.error) {
      console.error(teamsRes.error);
      setMessage(teamsRes.error.message);
    } else {
      setTeams(teamsRes.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createPlayer(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!form.name.trim()) {
      setMessage("Player name is required.");
      return;
    }

    if (!form.team_id) {
      setMessage("Please select a team.");
      return;
    }

    const { error } = await supabase.from("players").insert({
      name: form.name.trim(),
      ign: form.ign.trim() || null,
      uid: form.uid.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      team_id: form.team_id,
      is_substitute: form.is_substitute,
    });

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    setMessage("Player added successfully.");

    setForm({
      name: "",
      ign: "",
      uid: "",
      email: "",
      phone: "",
      team_id: "",
      is_substitute: false,
    });

    setShowForm(false);
    loadData();
  }

  async function deletePlayer(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    setMessage("Player deleted.");
    loadData();
  }

  const filteredPlayers = players.filter((player) => {
    const query = search.toLowerCase();

    return (
      player.name.toLowerCase().includes(query) ||
      (player.ign || "").toLowerCase().includes(query) ||
      (player.teams?.name || "").toLowerCase().includes(query) ||
      (player.teams?.tag || "").toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-yellow-400" size={28} />

            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Players HQ
            </h1>
          </div>

          <p className="text-white/50">
            Manage players, IDs, teams and substitutes.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
        >
          <Plus size={20} />
          Add Player
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      )}

      {/* SEARCH */}
      <div className="relative mb-8 max-w-xl">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search player, IGN or team..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 outline-none focus:border-yellow-400/50"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat
          label="Total Players"
          value={players.length}
          icon={<Users size={20} />}
        />

        <Stat
          label="Teams"
          value={teams.length}
          icon={<Shield size={20} />}
        />

        <Stat
          label="Substitutes"
          value={players.filter((p) => p.is_substitute).length}
          icon={<UserRound size={20} />}
        />

        <Stat
          label="Active Players"
          value={players.filter((p) => !p.is_substitute).length}
          icon={<UserRound size={20} />}
        />
      </div>

      {/* PLAYERS */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="font-bold text-xl">Player Registry</h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-white/40">
            Loading players...
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div className="p-12 text-center">
            <Users
              size={42}
              className="mx-auto mb-4 text-white/20"
            />

            <p className="text-white/50">
              No players found.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-white/[0.03] transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                    <UserRound
                      size={22}
                      className="text-yellow-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold">
                        {player.name}
                      </h3>

                      {player.is_substitute && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20">
                          SUBSTITUTE
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-white/40 mt-1">
                      {player.ign || "No IGN"} •{" "}
                      {player.teams?.name || "No team"}
                      {player.teams?.tag
                        ? ` [${player.teams.tag}]`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-right text-sm">
                    <p className="text-white/30">UID</p>

                    <p className="text-white/70">
                      {player.uid || "—"}
                    </p>
                  </div>

                  <button
                    onClick={() => deletePlayer(player.id)}
                    className="p-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition"
                    title="Delete player"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#090909] shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold">
                  Add Player
                </h2>

                <p className="text-sm text-white/40 mt-1">
                  Add a player to an existing team.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={createPlayer}
              className="p-6 space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Player Name *"
                  value={form.name}
                  onChange={(value) =>
                    setForm({ ...form, name: value })
                  }
                  placeholder="Ninad Kamde"
                />

                <Input
                  label="IGN"
                  value={form.ign}
                  onChange={(value) =>
                    setForm({ ...form, ign: value })
                  }
                  placeholder="Player IGN"
                />

                <Input
                  label="UID"
                  value={form.uid}
                  onChange={(value) =>
                    setForm({ ...form, uid: value })
                  }
                  placeholder="Game UID"
                />

                <Input
                  label="Email"
                  value={form.email}
                  onChange={(value) =>
                    setForm({ ...form, email: value })
                  }
                  placeholder="player@email.com"
                />

                <Input
                  label="Phone"
                  value={form.phone}
                  onChange={(value) =>
                    setForm({ ...form, phone: value })
                  }
                  placeholder="+91..."
                />

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Team *
                  </label>

                  <select
                    value={form.team_id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        team_id: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-yellow-400/50"
                  >
                    <option
                      value=""
                      className="bg-black"
                    >
                      Select team
                    </option>

                    {teams.map((team) => (
                      <option
                        key={team.id}
                        value={team.id}
                        className="bg-black"
                      >
                        {team.name}
                        {team.tag
                          ? ` [${team.tag}]`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_substitute}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_substitute: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-yellow-400"
                />

                <span className="text-sm text-white/70">
                  Mark as substitute player
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
              >
                Create Player
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function Input({
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
      <label className="block text-sm text-white/60 mb-2">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-yellow-400/50"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/40 text-sm">
          {label}
        </span>

        <span className="text-yellow-400">
          {icon}
        </span>
      </div>

      <p className="text-3xl font-black">
        {value}
      </p>
    </div>
  );
}