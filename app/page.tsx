"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Trophy, Users, Gamepad2, Swords, Network, Activity } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Games from "@/components/Games";
import Tournaments from "@/components/Tournaments";
import Matches from "@/components/Matches";
import Leaderboard from "@/components/Leaderboard";
import Announcements from "@/components/Announcements";
import HallOfFame from "@/components/HallOfFame";
import LiveStats from "@/components/LiveStats";

const stats = [
  { label: "TOURNAMENTS", value: "12", icon: Trophy },
  { label: "TEAMS", value: "186", icon: Users },
  { label: "GAMES", value: "05", icon: Gamepad2 },
  { label: "MATCHES", value: "842", icon: Swords },
];

function PhotonicCore() {
  return (
    <div className="photonic-stage relative mx-auto aspect-square w-full max-w-[570px]">
      <div className="photonic-grid absolute inset-0 rounded-full" />
      <div className="photonic-halo absolute inset-[10%] rounded-full" />
      <div className="photonic-orbit photonic-orbit-one absolute inset-[9%] rounded-full" />
      <div className="photonic-orbit photonic-orbit-two absolute inset-[19%] rounded-full" />
      <div className="photonic-orbit photonic-orbit-three absolute inset-[29%] rounded-full" />
      <div className="photonic-beam photonic-beam-one" />
      <div className="photonic-beam photonic-beam-two" />
      <div className="photonic-beam photonic-beam-three" />
      <motion.div
        className="absolute inset-[17%] z-10"
        animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 500 500" className="h-full w-full overflow-visible drop-shadow-[0_0_55px_rgba(62,198,255,0.28)]" role="img" aria-label="Glowing geometric photonic crystal with optical light paths">
          <defs>
            <linearGradient id="crystalMain" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#effcff" stopOpacity=".98"/><stop offset="25%" stopColor="#8cecff" stopOpacity=".88"/><stop offset="58%" stopColor="#647cff" stopOpacity=".76"/><stop offset="100%" stopColor="#b18cff" stopOpacity=".9"/></linearGradient>
            <linearGradient id="crystalSide" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8df4ff" stopOpacity=".7"/><stop offset="100%" stopColor="#3446a8" stopOpacity=".35"/></linearGradient>
            <linearGradient id="crystalLight" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff" stopOpacity=".9"/><stop offset="100%" stopColor="#66dfff" stopOpacity=".05"/></linearGradient>
            <filter id="crystalGlow"><feGaussianBlur stdDeviation="13"/></filter>
          </defs>
          <path d="M250 35 425 145 390 355 250 465 110 355 75 145Z" fill="#4adfff" opacity=".15" filter="url(#crystalGlow)"/>
          <path d="M250 340 390 410 250 478 110 410Z" fill="#152b65" fillOpacity=".65" stroke="#75dcff" strokeOpacity=".5" strokeWidth="2"/>
          <path d="M110 410 110 385 250 450 250 478Z" fill="#14204b" stroke="#70dfff" strokeOpacity=".35"/>
          <path d="M390 410 390 385 250 450 250 478Z" fill="#26347a" stroke="#a58cff" strokeOpacity=".4"/>
          <path d="M250 35 375 125 345 300 250 370 155 300 125 125Z" fill="url(#crystalMain)" fillOpacity=".16" stroke="#b5f4ff" strokeWidth="3"/>
          <path d="M250 35 250 370 155 300 125 125Z" fill="url(#crystalSide)" fillOpacity=".8"/>
          <path d="M250 35 375 125 345 300 250 370Z" fill="url(#crystalMain)" fillOpacity=".48"/>
          <path d="M250 35 310 145 250 245 190 145Z" fill="url(#crystalLight)" fillOpacity=".72" stroke="#e5fcff" strokeOpacity=".75"/>
          <path d="M190 145 250 245 250 370 155 300Z" fill="#4e9fff" fillOpacity=".26" stroke="#9cecff" strokeOpacity=".55"/>
          <path d="M310 145 250 245 250 370 345 300Z" fill="#9d8aff" fillOpacity=".25" stroke="#c7b5ff" strokeOpacity=".55"/>
          <path d="M125 125 190 145 155 300 95 250Z" fill="#7deaff" fillOpacity=".22" stroke="#a8f4ff" strokeOpacity=".65"/>
          <path d="M375 125 310 145 345 300 405 250Z" fill="#a78bfa" fillOpacity=".23" stroke="#d6c6ff" strokeOpacity=".65"/>
          <path d="M250 65 250 340 M145 132 250 245 355 132 M155 300 250 245 345 300 M190 145 250 35 310 145" fill="none" stroke="#e5fcff" strokeOpacity=".7" strokeWidth="2"/>
          <circle cx="250" cy="245" r="9" fill="#f4ffff"/><circle cx="250" cy="245" r="22" fill="#8cecff" opacity=".25" filter="url(#crystalGlow)"/>
          <circle cx="125" cy="125" r="5" fill="#b7f6ff"/><circle cx="375" cy="125" r="5" fill="#d5c4ff"/><circle cx="155" cy="300" r="5" fill="#8deaff"/><circle cx="345" cy="300" r="5" fill="#c4aaff"/>
        </svg>
      </motion.div>
      <div className="photonic-scan absolute inset-[12%] rounded-full" />
      <div className="absolute left-[4%] top-[28%] z-20 flex items-center gap-2 rounded-full border border-cyan-200/20 bg-[#081322]/75 px-3 py-2 backdrop-blur-xl"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]"/><span className="text-[8px] font-bold tracking-[0.2em] text-cyan-100/80">OPTICAL CORE</span></div>
      <div className="absolute bottom-[20%] right-[1%] z-20 flex items-center gap-2 rounded-full border border-violet-200/20 bg-[#101027]/75 px-3 py-2 backdrop-blur-xl"><Activity size={12} className="text-violet-300"/><span className="text-[8px] font-bold tracking-[0.2em] text-violet-100/80">LIVE SIGNAL</span></div>
      <div className="absolute bottom-[7%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold tracking-[0.42em] text-cyan-100/35">CONNECTING THE COMPETITIVE UNIVERSE</div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-[#eef7ff]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-35rem] h-[65rem] w-[65rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.09] blur-[160px]"/>
        <div className="absolute -left-64 top-[35%] h-[38rem] w-[38rem] rounded-full bg-blue-600/[0.09] blur-[150px]"/>
        <div className="absolute -right-64 top-[55%] h-[38rem] w-[38rem] rounded-full bg-violet-600/[0.10] blur-[160px]"/>
        <div className="photonic-noise absolute inset-0 opacity-[0.12]"/>
      </div>

      <nav className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-cyan-200/25 bg-cyan-300/[0.08]"><img src="/resonance-logo.png" alt="Resonance" className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110"/></div>
          <div><p className="text-sm font-black tracking-[0.3em] text-white">RESONANCE</p><p className="mt-0.5 text-[8px] font-bold tracking-[0.42em] text-cyan-200/55">ESPORTS NETWORK</p></div>
        </a>
        <div className="hidden items-center gap-8 text-[9px] font-black tracking-[0.22em] text-white/45 md:flex"><a href="#games" className="transition hover:text-cyan-200">GAMES</a><a href="#tournaments" className="transition hover:text-cyan-200">TOURNAMENTS</a><a href="#hall" className="transition hover:text-cyan-200">HALL OF FAME</a></div>
        <Magnetic strength={7}><a href="#tournaments" className="inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/[0.08] px-5 py-3 text-[9px] font-black tracking-[0.2em] text-cyan-100 backdrop-blur-xl transition hover:border-cyan-100/70 hover:bg-cyan-200 hover:text-[#06101d]">JOIN THE NETWORK <ArrowUpRight size={13}/></a></Magnetic>
      </nav>

      <section className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl items-center gap-6 px-6 pb-20 pt-10 md:px-10 lg:min-h-[780px] lg:grid-cols-[1.02fr_0.98fr] lg:gap-0">
        <div className="relative z-20 order-2 lg:order-1">
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="mb-8 flex items-center gap-3"><span className="h-px w-9 bg-cyan-300/70"/><span className="text-[9px] font-black tracking-[0.38em] text-cyan-200">SSPU // OFFICIAL ESPORTS CLUB</span></motion.div>
          <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.85,ease:[.16,1,.3,1]}} className="max-w-3xl text-[clamp(3.4rem,8vw,7.4rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">WHERE<br/><span className="photonic-gradient-text">COMPETITION</span><br/><span className="text-white/65">RESONATES.</span></motion.h1>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.7}} className="mt-8 max-w-xl text-sm leading-7 text-slate-300/55 md:text-base">Compete. Conquer. Create Legacy.<br/>The competitive gaming ecosystem of Symbiosis Skills and Professional University.</motion.p>
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.55,duration:.65}} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={9}><motion.a href="#games" whileHover={{scale:1.04}} whileTap={{scale:.97}} className="group inline-flex items-center gap-4 rounded-full bg-cyan-200 px-7 py-4 text-[10px] font-black tracking-[0.2em] text-[#06101d] shadow-[0_0_35px_rgba(103,232,249,0.14)] transition hover:shadow-[0_0_55px_rgba(103,232,249,0.3)]">EXPLORE THE ARENA <ArrowDown size={15} className="transition-transform group-hover:translate-y-1"/></motion.a></Magnetic>
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] text-white/35"><Network size={14} className="text-violet-300"/>BUILT FOR THE COMPETITIVE</div>
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.85,duration:.8}} className="mt-14 flex items-center gap-3"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50"/><span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]"/></span><span className="text-[8px] font-black tracking-[0.32em] text-white/30">RESONANCE SYSTEM ONLINE</span></motion.div>
        </div>
        <motion.div initial={{opacity:0,scale:.88,x:20}} animate={{opacity:1,scale:1,x:0}} transition={{delay:.18,duration:1,ease:[.16,1,.3,1]}} className="relative order-1 flex items-center justify-center lg:order-2"><PhotonicCore/></motion.div>
        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"><span className="text-[8px] font-bold tracking-[0.4em] text-white/20">SCROLL TO EXPLORE</span><ArrowDown size={13} className="text-cyan-200/45"/></div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 border-y border-cyan-100/10 bg-[#0a1425]/65 backdrop-blur-xl md:grid-cols-4">
        {stats.map((stat,index)=>{const Icon=stat.icon;return <motion.div key={stat.label} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08,duration:.5}} className="group relative border-cyan-100/10 p-7 transition-colors duration-300 hover:bg-cyan-200/[0.08] md:border-r last:md:border-r-0 md:p-8"><div className="absolute left-0 top-0 h-px w-0 bg-cyan-200 transition-all duration-500 group-hover:w-full"/><Icon size={18} className="mb-6 text-cyan-200/75 transition group-hover:text-cyan-100"/><p className="text-4xl font-black tracking-tight text-white">{stat.value}</p><p className="mt-2 text-[9px] font-black tracking-[0.28em] text-white/35">{stat.label}</p><ArrowUpRight size={14} className="absolute right-6 top-7 text-white/15 transition group-hover:text-cyan-100/70"/></motion.div>;})}
      </section>

      <div className="relative z-10 bg-[#050914]/95"><Games/><Tournaments/><Matches/><Leaderboard/><Announcements/><HallOfFame/><LiveStats/></div>

      <footer className="relative z-10 overflow-hidden border-t border-cyan-100/10 bg-[#070d1a] px-6 py-14 text-center"><div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"/><p className="text-[9px] font-black tracking-[0.4em] text-white/30">RESONANCE ESPORTS © 2026</p><p className="mt-3 text-[8px] tracking-[0.3em] text-cyan-200/40">COMPETE // CREATE // RESONATE</p></footer>
    </main>
  );
}
