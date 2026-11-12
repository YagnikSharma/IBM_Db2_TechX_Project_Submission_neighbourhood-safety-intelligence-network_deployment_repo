import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/** Fades and lifts content in when it scrolls into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Animated number that counts up once visible. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const spring = useSpring(value, { duration: 1600, bounce: 0 });
  const [shown, setShown] = useState(0);
  useEffect(() => { if (inView) value.set(to); }, [inView, to, value]);
  useEffect(() => spring.on("change", (v) => setShown(Math.round(v))), [spring]);
  return <span ref={ref}>{shown}{suffix}</span>;
}

/** Card with a cursor-following spotlight glow. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos({ x: -999, y: -999 })}
      className={`relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-signal/40 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-100"
        style={{ background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, #2dd4bf1f, transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

export function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-ink-2">{sub}</p>}
    </Reveal>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-bg/80 p-4 font-mono text-[12.5px] leading-relaxed text-signal-2">
      {children}
    </pre>
  );
}
