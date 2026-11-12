import { motion } from "motion/react";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, Clapperboard, Cpu, Database, Download, FileCode2,
  Github, Lock, Radio, ShieldCheck, Siren, Sparkles, TestTube2,
} from "lucide-react";
import { AI_STACK, DB2_FEATURES, DOCS, FILMS, FLOW, LINKS, PROBLEMS, RUN_STEPS, STATS } from "./data/content";
import { Code, Counter, Logo, Mark, Reveal, SectionHead, Spotlight, ThemeToggle, useTheme } from "./components/ui";
import { Phone, ProductDemo } from "./components/PhoneDemo";
import { Explore } from "./components/Explore";
import { useLive, type LiveState } from "./components/live";
import recorded from "./data/recorded.json";

const NAV = [["Product", "#product"], ["Live demo", "#demo"], ["Db2", "#db2"], ["AI", "#ai"], ["Proof", "#proof"], ["Docs", "#docs"]];
const TICKER = ["IBM Db2 12.1", "VECTOR(768)", "VECTOR_DISTANCE · COSINE", "IBM Granite 3.3", "granite-embedding:278m", "CrewAI Flow", "ibm-db-haystack", "langchain-db2 DB2VS", "MEDIAN · PERCENTILE_CONT", "78 tests · 96% coverage", "Bandit: 0 issues", "Runs 100% local"];

function LivePill({ live }: { live: LiveState }) {
  const on = live.status === "live";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] ${on ? "border-haven/40 bg-haven/10 text-haven" : "border-line bg-surface text-ink-3"}`}>
      <span className="relative flex h-2 w-2">
        {on && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-haven opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${on ? "bg-haven" : live.status === "checking" ? "bg-dawn" : "bg-ink-3"}`} />
      </span>
      {on ? `LIVE · ${live.db2?.replace("DB2/LINUXX8664 ", "Db2 ") ?? "Db2"}` : live.status === "checking" ? "CONNECTING" : "BACKEND OFFLINE · RECORDED MODE"}
    </span>
  );
}

function Nav({ live, dark, toggle }: { live: LiveState; dark: boolean; toggle: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <a href="#top" aria-label="NSIN home"><Logo /></a>
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="rounded-full px-3 py-1.5 text-sm text-ink-2 transition hover:bg-surface hover:text-ink">{l}</a>)}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden md:block"><LivePill live={live} /></span>
          <ThemeToggle dark={dark} toggle={toggle} />
          <a href={LINKS.app} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg sm:inline-flex">Open app <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
    </header>
  );
}

function Hero({ live }: { live: LiveState }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="aurora animate-drift -z-10 left-[-10%] top-[-10%] h-[520px] w-[520px]" style={{ background: "var(--glow-a)" }} />
      <div className="aurora animate-drift -z-10 right-[-8%] top-[10%] h-[560px] w-[560px]" style={{ background: "var(--glow-b)", animationDelay: "-5s" }} />
      <div className="aurora animate-drift -z-10 bottom-[-20%] left-[30%] h-[420px] w-[420px]" style={{ background: "var(--glow-c)", animationDelay: "-9s" }} />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:pt-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-ink-2">DB2HACK 2026 · IBM DB2 TECHX</span>
            <LivePill live={live} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-[clamp(2.8rem,7.4vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            Help arrives<br />before the group<br />chat <span className="hope-text">finishes typing.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
            NSIN turns a neighbourhood into a safety network. SOS, incidents, a child's walk home and an elder's daily check-in, triaged by
            IBM Granite agents and grounded in protocols searched <b className="text-ink">inside IBM Db2</b>. Everything runs locally; nothing about a resident leaves the machine.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_var(--brand)] transition hover:-translate-y-0.5">Try the live app <ArrowRight className="h-4 w-4" /></a>
            <a href="#film" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold"><Clapperboard className="h-4 w-4" />Watch the film</a>
            <a href={LINKS.apk} className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-[15px] font-medium text-ink-2 hover:text-ink"><Download className="h-4 w-4" />Android APK</a>
          </motion.div>
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold tracking-tight"><Counter to={s.value} suffix={s.suffix} /></p>
                <p className="mt-1 text-xs leading-snug text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl" style={{ background: "radial-gradient(circle, var(--glow-a), transparent 65%)" }} />
          <Phone />
          <p className="mt-4 text-center font-mono text-[11px] text-ink-3">↑ the real web app, live. Tap a demo login.</p>
        </motion.div>
      </div>
      <div className="overflow-hidden border-y border-line bg-surface/60 py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono text-[12px] text-ink-3">
          {[...TICKER, ...TICKER].map((t, i) => <span key={i} className="inline-flex items-center gap-10">{t}<span className="text-dawn">✦</span></span>)}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="product" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="01" label="The problem" title="Neighbourhoods already help." dim="They just can't see who needs it first."
        text="Today a cry for help lands in the same group chat as a lost-parcel message. NSIN gives every report a priority, an owner, a status and a permanent record." />
      <div className="grid gap-4 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Reveal key={p.tag} delay={i * 0.08}>
            <Spotlight className="h-full p-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sos">{p.tag}</span>
              <p className="mt-4 text-lg leading-snug">{p.text}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <div className="card grid gap-6 p-7 md:grid-cols-4">
          {[[Siren, "Two-step SOS", "Hold, confirm, sent. GPS and trusted contacts attached."], [Radio, "Child commute", "Live journey with expected arrival and alerts."], [ShieldCheck, "Elder check-ins", "A missed check-in escalates to family, then responders."], [Sparkles, "Granite briefings", "Every responder gets a short, cited plan."]].map(([I, t, d]) => {
            const Icon = I as typeof Siren;
            return (
              <div key={t as string}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand"><Icon className="h-5 w-5" /></span>
                <p className="mt-4 font-semibold">{t as string}</p>
                <p className="mt-1 text-sm text-ink-2">{d as string}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function Flow() {
  return (
    <section className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="02" label="How it works" title="From one sentence" dim="to a dispatched responder." />
        <div className="relative grid gap-4 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-brand via-dawn to-haven lg:block" />
          {FLOW.map((f, i) => (
            <Reveal key={f.step} delay={i * 0.1}>
              <div className="card relative h-full p-6">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-ink font-mono text-sm text-bg">{f.step}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.text}</p>
                <code className="mt-5 block rounded-xl bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-ink-2">{f.sql}</code>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Demo({ live }: { live: LiveState }) {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="03" label="Live demo" title="Not a mock-up." dim="The real app, on a real Db2."
        text={<>This is the actual NSIN web app, served from this site and talking to our backend (IBM Db2 12.1 + Granite on Ollama) through a secure tunnel. Sign in with a demo account, raise a report, and watch Granite triage it. Switch to desktop, or go immersive.</>} />
      <Reveal><ProductDemo live={live} /></Reveal>
    </section>
  );
}

function Db2() {
  return (
    <section id="db2" className="relative overflow-hidden border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="04" label="Inside IBM Db2" title="Db2 is not just storage here." dim="It is the brain's memory."
          text="Vectors, retrieval, analytics, metadata filters and access control all run in Db2 SQL. Python only orchestrates." />
        <div className="grid gap-4 md:grid-cols-2">
          {DB2_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.08}>
              <Spotlight className="h-full p-7">
                <div className="flex items-center gap-3"><Database className="h-5 w-5 text-brand" /><h3 className="text-lg font-semibold">{f.title}</h3></div>
                <p className="mb-5 mt-2 text-sm leading-relaxed text-ink-2">{f.text}</p>
                <Code>{f.code}</Code>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Orbit() {
  const items = AI_STACK;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-[6%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-[24%] rounded-full border border-line" />
      <div className="absolute inset-0 animate-orbit">
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <div key={it.pkg} className="absolute" style={{ left: `${50 + 44 * Math.cos(a)}%`, top: `${50 + 44 * Math.sin(a)}%`, transform: "translate(-50%,-50%)" }}>
              <div className="animate-orbit-rev whitespace-nowrap rounded-2xl border border-line bg-surface px-3 py-2 text-center shadow-card">
                <p className="text-xs font-semibold">{it.fw}</p>
                <p className="font-mono text-[10px] text-ink-3">{it.pkg}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-[34%] grid place-items-center rounded-full bg-gradient-to-br from-brand to-[#0B2E8F] text-center text-white shadow-[0_20px_60px_-15px_var(--brand)]">
        <div><Database className="mx-auto h-7 w-7" /><p className="mt-1 text-sm font-semibold">IBM Db2</p><p className="font-mono text-[10px] opacity-80">VECTOR · SQL</p></div>
      </div>
    </div>
  );
}

function AI() {
  return (
    <section id="ai" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="05" label="AI on Db2" title="Three IBM Db2 AI packages." dim="One local model family."
        text="Each framework does the job it is best at, and every one of them reads from and writes to the same Db2." />
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal><Orbit /></Reveal>
        <div className="grid gap-3">
          {AI_STACK.map((a, i) => (
            <Reveal key={a.pkg} delay={i * 0.06}>
              <div className="card flex gap-4 p-5">
                <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-dawn" />
                <div><p className="font-semibold">{a.fw} <span className="ml-1 font-mono text-[11px] font-normal text-ink-3">{a.pkg}</span></p><p className="mt-1 text-sm leading-relaxed text-ink-2">{a.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof({ live }: { live: LiveState }) {
  const checks = [
    [TestTube2, "78 passed · 96% coverage", "pytest against a real Db2 TESTDB and real Granite models. Zero mocks."],
    [Lock, "Least-privilege Db2 role", "Tests rerun as a data-only login; DDL and audit edits are denied."],
    [ShieldCheck, "Bandit: 0 issues · pip-audit clean", "Static security scan and dependency audit on the backend."],
    [Check, `Recorded ${recorded.recorded_at}`, `Responses below are from ${recorded.db2}, Granite crew in ${recorded.crew_seconds}s on CPU.`],
  ] as const;
  return (
    <section id="proof" className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="06" label="Proof" title="Don't trust the slides." dim="Call the API yourself." />
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {checks.map(([I, t, d]) => (
            <Reveal key={t}><div className="card h-full p-5"><I className="h-5 w-5 text-haven" /><p className="mt-3 font-semibold">{t}</p><p className="mt-1 text-sm text-ink-2">{d}</p></div></Reveal>
          ))}
        </div>
        <Reveal><Explore live={live} /></Reveal>
      </div>
    </section>
  );
}

function Film() {
  const slot = (url: string, label: string, ratio: string, w: string) => (
    <div className={`${w} overflow-hidden rounded-3xl border border-line bg-ink`} style={{ aspectRatio: ratio }}>
      {url ? <iframe src={url} title={label} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : (
        <div className="relative grid h-full place-items-center overflow-hidden text-center text-white">
          <div className="aurora animate-drift left-[10%] top-[10%] h-60 w-60" style={{ background: "rgba(255,154,61,.35)" }} />
          <div className="aurora animate-drift bottom-[5%] right-[5%] h-60 w-60" style={{ background: "rgba(31,94,255,.45)" }} />
          <div className="relative"><Mark className="mx-auto h-14 w-14" /><p className="mt-4 font-semibold">{label}</p><p className="mt-1 font-mono text-[11px] opacity-70">premiering soon</p></div>
        </div>
      )}
    </div>
  );
  return (
    <section id="film" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="07" label="The film" title="Two minutes." dim="Every frame is a real run." />
      <Reveal className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
        {slot(FILMS.landscape, "The NSIN film · 16:9", "16/9", "w-full md:flex-[3]")}
        {slot(FILMS.reel, "The 60-second reel · 9:16", "9/16", "w-full max-w-[320px] md:flex-1")}
      </Reveal>
    </section>
  );
}

function Docs() {
  return (
    <section id="docs" className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
        <SectionHead num="08" label="Documentation" title="Read how it's built." dim="Every decision is written down." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOCS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.06}>
              <a href={d.href} target="_blank" rel="noreferrer" className="group block h-full">
                <Spotlight className="h-full p-6 transition group-hover:-translate-y-1">
                  <BookOpen className="h-5 w-5 text-brand" />
                  <p className="mt-4 flex items-center gap-1 text-lg font-semibold">{d.title}<ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" /></p>
                  <p className="mt-1 text-sm text-ink-2">{d.text}</p>
                </Spotlight>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Run() {
  return (
    <section id="run" className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <SectionHead num="09" label="Run it" title="Three commands." dim="Your laptop, your Db2." />
      <div className="grid gap-4 lg:grid-cols-3">
        {RUN_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="card h-full p-6">
              <span className="font-mono text-xs text-ink-3">STEP {i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mb-4 mt-1 text-sm text-ink-2">{s.text}</p>
              <Code>{s.code}</Code>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-[#0B2E8F] p-10 text-white">
          <div className="aurora animate-drift right-[-5%] top-[-30%] h-80 w-80" style={{ background: "rgba(255,170,90,.45)" }} />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div><p className="text-3xl font-semibold tracking-tight">Safer streets start with one report.</p><p className="mt-2 opacity-80">Open the app, or take NSIN with you on Android.</p></div>
            <div className="flex flex-wrap gap-3">
              <a href={LINKS.app} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#0B2E8F]">Open the app <ArrowUpRight className="h-4 w-4" /></a>
              <a href={LINKS.apk} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold"><Download className="h-4 w-4" />Android APK</a>
              <a href={LINKS.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold"><Github className="h-4 w-4" />Source</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function App() {
  const live = useLive();
  const [dark, toggle] = useTheme();
  return (
    <div className="min-h-screen overflow-x-clip">
      <Nav live={live} dark={dark} toggle={toggle} />
      <main>
        <Hero live={live} />
        <Problem />
        <Flow />
        <Demo live={live} />
        <Db2 />
        <AI />
        <Proof live={live} />
        <Film />
        <Docs />
        <Run />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo />
          <p>Built for <a className="underline-offset-4 hover:underline" href={LINKS.hackathon}>Db2Hack 2026</a> · IBM Db2 TechX. Open source.</p>
          <div className="flex gap-4"><a href={LINKS.repo} className="inline-flex items-center gap-1 hover:text-ink"><FileCode2 className="h-4 w-4" />Submission</a><a href={LINKS.site} className="inline-flex items-center gap-1 hover:text-ink"><Github className="h-4 w-4" />Site repo</a></div>
        </div>
      </footer>
    </div>
  );
}
