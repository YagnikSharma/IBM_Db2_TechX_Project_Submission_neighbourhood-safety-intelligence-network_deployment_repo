import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, ClipboardList, ShieldCheck, Users } from "lucide-react";

export const SCREENS = [
  { id: "home", label: "Home", icon: ShieldCheck, src: "/screens/resident.png", caption: "Resident home: one-tap SOS, your reports, your emergency circle." },
  { id: "report", label: "Report", icon: ClipboardList, src: "/screens/report.png", caption: "Free-text report → AI triage with a priority and a cited protocol." },
  { id: "responder", label: "Respond", icon: Bell, src: "/screens/responder.png", caption: "Responder queue, P1 first. Claim, en route, on scene, resolved." },
  { id: "community", label: "Insights", icon: Users, src: "/screens/community.png", caption: "Response times and hotspots, computed inside IBM Db2." },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return <>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</>;
}

/** A realistic phone: real app screenshots scroll inside the screen, swipe or tap the tab bar to switch. */
export function PhoneDemo({ initial = 0, compact = false }: { initial?: number; compact?: boolean }) {
  const [index, setIndex] = useState(initial);
  const screen = SCREENS[index];
  const go = (dir: number) => setIndex((i) => (i + dir + SCREENS.length) % SCREENS.length);

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${compact ? "w-[260px]" : "w-[300px] sm:w-[320px]"} aspect-[9/19.5]`}>
        {/* side buttons */}
        <span className="absolute -left-[3px] top-[18%] h-10 w-[3px] rounded-l bg-[#2a2f3a]" />
        <span className="absolute -left-[3px] top-[28%] h-16 w-[3px] rounded-l bg-[#2a2f3a]" />
        <span className="absolute -right-[3px] top-[24%] h-20 w-[3px] rounded-r bg-[#2a2f3a]" />
        {/* frame */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#3a4150] via-[#1d222c] to-[#3a4150] p-[3px] shadow-[0_40px_120px_-20px_#2dd4bf40]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.85rem] bg-black p-[10px]">
            <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-white">
              {/* status bar */}
              <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between bg-[#0f172a] px-6 text-[12px] font-semibold text-white">
                <Clock />
                <span className="flex items-center gap-1 text-[10px]">
                  <span className="tracking-tighter">●●●●</span> 5G <span className="ml-1 inline-block h-[10px] w-5 rounded-[3px] border border-white/80 p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-white" /></span>
                </span>
              </div>
              <div className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
              {/* screen content: swipe between screens, scroll within a screen */}
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={screen.id}
                  className="absolute inset-0 overflow-y-auto pt-11 pb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  initial={{ x: "100%", opacity: 0.6 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-35%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
                >
                  <img src={screen.src} alt={screen.caption} draggable={false} className="w-full select-none" loading="lazy" />
                </motion.div>
              </AnimatePresence>
              {/* tab bar */}
              <nav className="absolute inset-x-0 bottom-0 z-20 grid h-14 grid-cols-4 border-t border-slate-200 bg-white/95 backdrop-blur">
                {SCREENS.map((s, i) => {
                  const Icon = s.icon;
                  const active = i === index;
                  return (
                    <button key={s.id} onClick={() => setIndex(i)} aria-label={s.label}
                      className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${active ? "text-teal-600" : "text-slate-400"}`}>
                      <Icon className="h-[18px] w-[18px]" />
                      {s.label}
                    </button>
                  );
                })}
              </nav>
              <div className="absolute bottom-1.5 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-slate-900/80" />
            </div>
          </div>
        </div>
      </div>
      {!compact && <p className="mt-6 max-w-xs text-center text-sm text-ink-2">{screen.caption} <span className="text-ink-3">Swipe or tap the tabs.</span></p>}
    </div>
  );
}
