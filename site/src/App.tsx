import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Download, ExternalLink, Github, Play, ShieldAlert, Smartphone, Sparkles } from "lucide-react";
import { AI_STACK, DB2_FEATURES, FLOW, LINKS, PROBLEMS, RUN_STEPS, STATS } from "./data/content";
import { Code, CountUp, Eyebrow, Reveal, SectionTitle, SpotlightCard } from "./components/ui";
import { PhoneDemo } from "./components/PhoneDemo";
import { Explore } from "./components/Explore";
import { useLive } from "./components/live";

function LivePill({ status, db2 }: { status: string; db2?: string }) {
  const live = status === "live";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] ${live ? "border-live/40 bg-live/10 text-live" : "border-line bg-surface text-ink-2"}`}>
      <span className="relative flex h-2 w-2">
        {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${live ? "bg-live" : "bg-ink-3"}`} />
      </span>
      {status === "checking" ? "checking live backend…" : live ? `live on ${db2 ?? "IBM Db2"}` : "live demo offline · recorded results below"}
    </span>
  );
}

export default function App() {
  const live = useLive();
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-x-hidden">
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-semibold"><img src="/favicon.svg" alt="" className="h-7 w-7" /> NSIN</a>
          <nav className="hidden gap-7 text-sm text-ink-2 md:flex">
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#db2" className="hover:text-ink">IBM Db2</a>
            <a href="#ai" className="hover:text-ink">AI</a>
            <a href="#app" className="hover:text-ink">App</a>
            <a href="#explore" className="hover:text-ink">Explore</a>
          </nav>
          <a href={LINKS.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-ink-2 hover:text-ink"><Github className="h-4 w-4" /> Code</a>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="relative">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="absolute left-1/2 top-[-200px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
          <div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="eyebrow">Db2Hack 2026 · built on IBM Db2</span>
              <LivePill status={live.status} db2={live.db2} />
            </motion.div>
            <motion.h1 initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.7 }}
              className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Help, before the <span className="shiny">group chat</span> finishes typing.
            </motion.h1>
            <motion.p initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
              className="mt-6 max-w-xl text-lg text-ink-2">
              NSIN turns a neighbourhood's SOS alerts, incident reports, child commutes and elder check-ins into one prioritised, auditable record in <b className="text-ink">IBM Db2</b>, with <b className="text-ink">IBM Granite</b> agents that cite their sources and run entirely on your machine.
            </motion.p>
            <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-9 flex flex-wrap gap-3">
              <a href={LINKS.apk} download className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3 font-semibold text-bg shadow-[0_0_40px_-8px_#2dd4bf] transition hover:bg-signal-2">
                <Download className="h-4 w-4" /> Get the Android app
              </a>
              {live.status === "live" && live.config
                ? <a href={live.config.appUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-live/50 bg-live/10 px-5 py-3 font-semibold text-live"><Play className="h-4 w-4" /> Try it live</a>
                : <a href="#explore" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold text-ink hover:border-signal/50"><Sparkles className="h-4 w-4 text-signal" /> See it work</a>}
              <a href="#how" className="inline-flex items-center gap-2 px-2 py-3 text-ink-2 hover:text-ink">How it works <ArrowRight className="h-4 w-4" /></a>
            </motion.div>
          </div>
          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="justify-self-center">
            <PhoneDemo compact />
          </motion.div>
        </div>

        {/* stats */}
        <div className="mx-auto max-w-6xl px-5 pb-24">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface p-6">
                <p className="text-4xl font-semibold text-ink"><CountUp to={s.value} suffix={s.suffix} /></p>
                <p className="mt-2 text-sm text-ink-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* problem */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle eyebrow="The problem" title={<>Emergencies don't belong in a <span className="text-sos">group chat</span>.</>}
          sub="The people who can help fastest live next door. Today they coordinate in a scrolling feed with no priority, no status and no record." />
        <div className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.08}>
              <SpotlightCard>
                <ShieldAlert className="h-6 w-6 text-sos" />
                <h3 className="mt-4 text-xl font-semibold">{p.tag}</h3>
                <p className="mt-2 text-ink-2">{p.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle eyebrow="How it works" title="From a tap to a resolved incident." sub="Every step is a real write to IBM Db2, so the timeline can't drift from what actually happened." />
        <div className="relative grid gap-5 md:grid-cols-2">
          {FLOW.map((f, i) => (
            <Reveal key={f.step} delay={i * 0.06}>
              <SpotlightCard className="h-full">
                <p className="font-mono text-sm text-signal">{f.step}</p>
                <h3 className="mt-2 text-2xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-ink-2">{f.text}</p>
                <Code>{f.sql}</Code>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* db2 */}
      <section id="db2" className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ibm/[0.04] to-transparent" />
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="Under the hood · IBM Db2 12.1" title={<>Db2 isn't the storage. <span className="text-ibm">It's the engine.</span></>}
            sub="Vectors, analytics, JSON filters and least-privilege security all run inside Db2, not in application code." />
          <div className="grid gap-5 md:grid-cols-2">
            {DB2_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <SpotlightCard className="h-full">
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-ink-2">{f.text}</p>
                  <Code>{f.code}</Code>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ai */}
      <section id="ai" className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle eyebrow="AI that shows its sources" title="Three IBM Db2 integrations. One local model family."
          sub="Every answer cites the protocol passage it came from. The rule-based priority stays in charge, and the agents explain and advise." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {AI_STACK.map((a, i) => (
            <Reveal key={a.pkg} delay={i * 0.06}>
              <SpotlightCard className="h-full">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">{a.fw}</p>
                <h3 className="mt-2 font-mono text-lg text-signal">{a.pkg}</h3>
                <p className="mt-3 text-sm text-ink-2">{a.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* app */}
      <section id="app" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Hold it in your hand</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Your neighbourhood, one tap away.</h2>
              <p className="mt-4 text-lg text-ink-2">These are real screens from the running app, on real Db2 data. Swipe through them, scroll inside them, then install the Android build and point it at your own backend.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={LINKS.apk} download className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3 font-semibold text-bg"><Smartphone className="h-4 w-4" /> Download APK</a>
                <a href={LINKS.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-signal/50"><ExternalLink className="h-4 w-4" /> Source code</a>
              </div>
              <p className="mt-4 text-xs text-ink-3">Debug build for Android 7.0+. Allow installs from your browser, then set your backend's address in the app's Settings.</p>
            </Reveal>
          </div>
          <Reveal className="justify-self-center"><PhoneDemo /></Reveal>
        </div>
      </section>

      {/* explore */}
      <section id="explore" className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle eyebrow="Don't take our word for it" title="Explore real responses."
          sub="Pick a scenario. When the live backend is online, run it against IBM Db2 and Granite right now; otherwise you see a response recorded from a real run." />
        <Reveal><Explore live={live} /></Reveal>
      </section>

      {/* run it */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle eyebrow="Start here" title="Run NSIN in three steps." sub="Everything is local: your Db2, your models, your data." />
        <div className="grid gap-5 md:grid-cols-3">
          {RUN_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <SpotlightCard className="h-full">
                <p className="font-mono text-sm text-signal">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-2">{s.text}</p>
                <Code>{s.code}</Code>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-3">
          <p>NSIN · Neighbourhood Safety Intelligence Network · built by Yagnik Sharma for <a href={LINKS.hackathon} className="text-ink-2 hover:text-ink" target="_blank" rel="noreferrer">Db2Hack 2026</a></p>
          <p className="font-mono">IBM Db2 · IBM Granite · Haystack · CrewAI · LangChain</p>
        </div>
      </footer>
    </div>
  );
}
