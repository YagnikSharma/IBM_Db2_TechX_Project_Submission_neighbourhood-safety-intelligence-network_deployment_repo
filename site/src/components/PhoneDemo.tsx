import { useEffect, useRef, useState } from "react";
import { Expand, ExternalLink, Monitor, RotateCcw, Smartphone, X } from "lucide-react";
import type { LiveState } from "./live";

const APP = "/app/";

/** Scales a fixed-size iframe to fit its container, so the real app renders at true phone/desktop width. */
function Scaled({ w, h, src, title, frameKey }: { w: number; h: number; src: string; title: string; frameKey: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setS(Math.min(1, el.clientWidth / w)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ height: h * s }}>
      <iframe key={frameKey} src={src} title={title} loading="lazy"
        className="absolute left-0 top-0 origin-top-left border-0 bg-white"
        style={{ width: w, height: h, transform: `scale(${s})` }} />
    </div>
  );
}

/** The real NSIN web app, running inside a phone. */
export function Phone({ frameKey = 0, path = "auth" }: { frameKey?: number; path?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[330px] rounded-[3rem] border border-line bg-[#0b0f1a] p-3 shadow-[0_40px_80px_-30px_rgba(14,21,37,.45)]">
      <div className="overflow-hidden rounded-[2.3rem] bg-[#0f172a]">
        <div className="relative flex h-8 items-center justify-between px-6 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="absolute left-1/2 top-1.5 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1"><span className="h-2 w-3 rounded-[2px] border border-white/80" />5G</span>
        </div>
        <Scaled w={390} h={844} src={APP + path} title="NSIN web app on a phone" frameKey={frameKey} />
      </div>
    </div>
  );
}

function Browser({ frameKey }: { frameKey: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto truncate rounded-md bg-surface px-3 py-1 font-mono text-[11px] text-ink-3">{location.host}/app/</span>
      </div>
      <Scaled w={1280} h={800} src={APP + "auth"} title="NSIN web app on desktop" frameKey={frameKey} />
    </div>
  );
}

export function ProductDemo({ live }: { live: LiveState }) {
  const [mode, setMode] = useState<"phone" | "desktop">("phone");
  const [k, setK] = useState(0);
  const [full, setFull] = useState(false);
  const tab = (m: typeof mode, icon: React.ReactNode, label: string) => (
    <button onClick={() => setMode(m)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${mode === m ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"}`}>
      {icon}{label}
    </button>
  );
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-line bg-surface p-1">
          {tab("phone", <Smartphone className="h-4 w-4" />, "Phone")}
          {tab("desktop", <Monitor className="h-4 w-4" />, "Desktop")}
        </div>
        <button onClick={() => setFull(true)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-2 hover:text-ink"><Expand className="h-4 w-4" />Immersive</button>
        <a href={APP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-2 hover:text-ink"><ExternalLink className="h-4 w-4" />New tab</a>
        <button onClick={() => setK((x) => x + 1)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-3 hover:text-ink"><RotateCcw className="h-4 w-4" />Reset</button>
      </div>
      {live.status !== "live" && (
        <p className="mb-6 rounded-2xl border border-dawn/40 bg-dawn/10 px-4 py-3 text-sm text-ink-2">
          {live.status === "checking" ? "Connecting to the live backend…" :
            "The live backend (Db2 + Granite on our machine) is offline right now. The app still opens, but sign-in needs the backend. The recorded real responses below show what it returns."}
        </p>
      )}
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_300px]">
        <div className={mode === "phone" ? "mx-auto w-full max-w-[360px] lg:col-span-2" : "lg:col-span-2"}>
          {mode === "phone" ? <Phone frameKey={k} /> : <Browser frameKey={k} />}
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Resident", "resident@neighbourhood.org", "Raise an SOS, report an incident, track a child's commute."],
          ["Responder", "responder@neighbourhood.org", "Claim incidents, read the Granite briefing, resolve."],
          ["Admin", "admin@neighbourhood.org", "Db2 SQL analytics: medians, P90, hotspots."],
        ].map(([r, e, t]) => (
          <div key={r} className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-sm font-semibold">{r}</p>
            <p className="mt-1 font-mono text-[11px] text-ink-3">{e} · Password123!</p>
            <p className="mt-2 text-sm text-ink-2">{t}</p>
          </div>
        ))}
      </div>
      {full && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="font-mono text-xs text-ink-3">NSIN · live web app · real Db2 backend</span>
            <button onClick={() => setFull(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line"><X className="h-4 w-4" /></button>
          </div>
          <iframe src={APP + "auth"} title="NSIN web app, full screen" className="h-full w-full flex-1 border-0 bg-white" />
        </div>
      )}
    </div>
  );
}
