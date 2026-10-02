"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ClipboardList,
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  CreditCard,
  Users,
  Trash2,
} from "lucide-react";

type Registration = {
  id: string;
  tournament_id: string;
  team_id: string;
  captain_player_id: string | null;
  registration_status: string;
  payment_status: string;
  payment_amount: number | null;
  registered_at: string;

  tournaments?: {
    name: string;
  } | null;

  teams?: {
    name: string;
    tag: string | null;
  } | null;

  players?: {
    name: string;
    ign: string | null;
  } | null;
};

type Tournament = {
  id: string;
  name: string;
};

export default function RegistrationsHQ() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    setMessage("");

    const [registrationsRes, tournamentsRes] = await Promise.all([
      supabase
        .from("tournament_registrations")
        .select(`
          id,
          tournament_id,
          team_id,
          captain_player_id,
          registration_status,
          payment_status,
          payment_amount,
          registered_at,
          tournaments(name),
          teams(name, tag),
          players(name, ign)
        `)
        .order("registered_at", { ascending: false }),

      supabase
        .from("tournaments")
        .select("id, name")
        .order("created_at", { ascending: false }),
    ]);

    if (registrationsRes.error) {
      console.error(registrationsRes.error);
      setMessage(registrationsRes.error.message);
    } else {
      setRegistrations(registrationsRes.data || []);
    }

    if (tournamentsRes.error) {
      console.error(tournamentsRes.error);
    } else {
      setTournaments(tournamentsRes.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateStatus(
    id: string,
    status: "pending" | "approved" | "rejected" | "cancelled"
  ) {
    const { error } = await supabase
      .from("tournament_registrations")
      .update({
        registration_status: status,
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(`Registration ${status}.`);
    loadData();
  }

  async function updatePayment(
    id: string,
    status: "pending" | "submitted" | "verified" | "rejected"
  ) {
    const { error } = await supabase
      .from("tournament_registrations")
      .update({
        payment_status: status,
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(`Payment marked ${status}.`);
    loadData();
  }

  async function deleteRegistration(id: string) {
    const confirmed = window.confirm(
      "Delete this registration permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("tournament_registrations")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Registration deleted.");
    loadData();
  }

  const filteredRegistrations = registrations.filter((registration) => {
    const query = search.toLowerCase();

    const matchesSearch =
      registration.teams?.name?.toLowerCase().includes(query) ||
      registration.teams?.tag?.toLowerCase().includes(query) ||
      registration.tournaments?.name?.toLowerCase().includes(query) ||
      registration.players?.name?.toLowerCase().includes(query);

    const matchesTournament =
      selectedTournament === "all" ||
      registration.tournament_id === selectedTournament;

    return matchesSearch && matchesTournament;
  });

  const pendingCount = registrations.filter(
    (r) => r.registration_status === "pending"
  ).length;

  const approvedCount = registrations.filter(
    (r) => r.registration_status === "approved"
  ).length;

  const paymentPending = registrations.filter(
    (r) =>
      r.payment_status === "pending" ||
      r.payment_status === "submitted"
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <ClipboardList
            size={28}
            className="text-yellow-400"
          />

          <h1 className="text-3xl md:text-4xl font-black">
            REGISTRATION HQ
          </h1>
        </div>

        <p className="mt-2 text-white/40">
          Control tournament registrations, teams and payments.
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/70">
          {message}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <Stat
          label="TOTAL"
          value={registrations.length}
          icon={<ClipboardList size={19} />}
        />

        <Stat
          label="PENDING"
          value={pendingCount}
          icon={<Clock3 size={19} />}
        />

        <Stat
          label="APPROVED"
          value={approvedCount}
          icon={<CheckCircle2 size={19} />}
        />

        <Stat
          label="PAYMENT ACTION"
          value={paymentPending}
          icon={<CreditCard size={19} />}
        />

      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team, tournament or captain..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-11 py-3 outline-none transition focus:border-yellow-400/50"
          />

        </div>

        <select
          value={selectedTournament}
          onChange={(e) =>
            setSelectedTournament(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm outline-none focus:border-yellow-400/50"
        >
          <option value="all">ALL TOURNAMENTS</option>

          {tournaments.map((tournament) => (
            <option
              key={tournament.id}
              value={tournament.id}
            >
              {tournament.name}
            </option>
          ))}
        </select>

      </div>

      {/* REGISTRATION LIST */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">

        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="font-black tracking-wide">
            REGISTRATION REGISTRY
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/30">
            Loading registrations...
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="p-16 text-center">

            <ClipboardList
              size={42}
              className="mx-auto mb-4 text-white/10"
            />

            <p className="font-bold text-white/40">
              No registrations found.
            </p>

            <p className="mt-2 text-xs text-white/20">
              Registrations will appear here once teams register.
            </p>

          </div>
        ) : (
          <div className="divide-y divide-white/10">

            {filteredRegistrations.map((registration) => (

              <div
                key={registration.id}
                className="p-6 transition hover:bg-white/[0.025]"
              >

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                  {/* TEAM INFO */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[0.06]">
                      <Users
                        size={21}
                        className="text-yellow-400"
                      />
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-black">
                          {registration.teams?.name ||
                            "Unknown Team"}
                        </h3>

                        {registration.teams?.tag && (
                          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-bold text-white/40">
                            [{registration.teams.tag}]
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-xs text-white/30">
                        {registration.tournaments?.name ||
                          "Unknown Tournament"}
                      </p>

                    </div>

                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    <Info
                      label="CAPTAIN"
                      value={
                        registration.players?.name ||
                        "Not assigned"
                      }
                    />

                    <Info
                      label="PAYMENT"
                      value={
                        registration.payment_status.toUpperCase()
                      }
                    />

                    <Info
                      label="AMOUNT"
                      value={
                        registration.payment_amount
                          ? `₹${registration.payment_amount}`
                          : "—"
                      }
                    />

                    <div>
                      <p className="text-[8px] font-bold tracking-widest text-white/20">
                        STATUS
                      </p>

                      <StatusBadge
                        status={
                          registration.registration_status
                        }
                      />
                    </div>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-wrap gap-2">

                  {registration.registration_status !==
                    "approved" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          registration.id,
                          "approved"
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-green-400/20 bg-green-400/[0.05] px-3 py-2 text-[9px] font-black tracking-widest text-green-400 transition hover:bg-green-400/10"
                    >
                      <CheckCircle2 size={14} />
                      APPROVE
                    </button>
                  )}

                  {registration.registration_status !==
                    "rejected" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          registration.id,
                          "rejected"
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.05] px-3 py-2 text-[9px] font-black tracking-widest text-red-400 transition hover:bg-red-400/10"
                    >
                      <XCircle size={14} />
                      REJECT
                    </button>
                  )}

                  {registration.payment_status !==
                    "verified" && (
                    <button
                      onClick={() =>
                        updatePayment(
                          registration.id,
                          "verified"
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/[0.05] px-3 py-2 text-[9px] font-black tracking-widest text-blue-400 transition hover:bg-blue-400/10"
                    >
                      <CreditCard size={14} />
                      VERIFY PAYMENT
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteRegistration(registration.id)
                    }
                    className="ml-auto flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[9px] font-black tracking-widest text-white/30 transition hover:border-red-400/20 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                    DELETE
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}


/* =========================
   STAT
========================= */

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
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">

      <div className="flex items-center justify-between">

        <span className="text-[9px] font-bold tracking-widest text-white/25">
          {label}
        </span>

        <span className="text-yellow-400">
          {icon}
        </span>

      </div>

      <p className="mt-6 text-3xl font-black">
        {value}
      </p>

    </div>
  );
}


/* =========================
   INFO
========================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[8px] font-bold tracking-widest text-white/20">
        {label}
      </p>

      <p className="mt-2 max-w-[150px] truncate text-xs font-bold text-white/60">
        {value}
      </p>
    </div>
  );
}


/* =========================
   STATUS
========================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    pending:
      "border-yellow-400/20 bg-yellow-400/5 text-yellow-400",

    approved:
      "border-green-400/20 bg-green-400/5 text-green-400",

    rejected:
      "border-red-400/20 bg-red-400/5 text-red-400",

    cancelled:
      "border-white/10 bg-white/5 text-white/30",
  };

  return (
    <span
      className={`mt-2 inline-block rounded-md border px-2 py-1 text-[8px] font-black tracking-widest ${
        styles[status] || styles.pending
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}