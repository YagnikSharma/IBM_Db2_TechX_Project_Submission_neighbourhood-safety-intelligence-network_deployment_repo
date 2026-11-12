import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, animate } from "motion/react";
import { Moon, Sun } from "lucide-react";

/** NSIN mark: a roof (home), a rising echo (signal / hope) and a warm light under the roof (someone safe). */
export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="nsin-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A6BFF" />
          <stop offset="1" stopColor="#0B2E8F" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#nsin-g)" />
      <path d="M18 26 32 13l14 13" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 40 32 23l18 17" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="44" r="5" fill="#FFB547" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark className="h-8 w-8" />
      <span className="leading-none">
        <span className="block text-[17px] font-semibold tracking-[-0.03em] text-ink">nsin</span>
        {!compact && <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-3">safety network</span>}
      </span>
    </span>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionHead({ num, label, title, dim, text }: { num: string; label: string; title: ReactNode; dim?: ReactNode; text?: ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="eyebrow"><span className="eyebrow-num">{num}</span>{label}</p>
      <h2 className="h-sec mt-5">{title}{dim && <><br /><span className="dim">{dim}</span></>}</h2>
      {text && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-2">{text}</p>}
    </Reveal>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/** Spotlight card: a soft glow follows the pointer (React Bits-style, written for this site). */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={`group relative overflow-hidden card ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), var(--glow-b), transparent 60%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const s = localStorage.getItem("nsin-theme");
      if (s) return s === "dark";
    } catch { /* storage blocked */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("nsin-theme", dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);
  return [dark, () => setDark((d) => !d)] as const;
}

export function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink-2 transition hover:text-ink">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Code({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-2xl bg-code-bg p-4 font-mono text-[12px] leading-relaxed text-code-ink">{children}</pre>;
}
