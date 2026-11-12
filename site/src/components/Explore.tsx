import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Play, Radio, Archive } from "lucide-react";
import recorded from "../data/recorded.json";
import { liveCall, type LiveState } from "./live";

type Scenario = { id: keyof typeof recorded.results; label: string; method: "GET" | "POST"; path: string; body?: unknown; note: string };

const SCENARIOS: Scenario[] = [
  { id: "crew", label: "Granite agents brief a responder", method: "POST", path: "/api/v1/ai/crew-briefing",
    body: { raw_text: "My elderly neighbour has not answered her door or phone since last night." },
    note: "CrewAI flow sets the priority, then a Triage Analyst and a Protocol Advisor (IBM Granite via Ollama) write a briefing grounded in protocols retrieved from Db2." },
  { id: "guidance", label: "Hybrid search with filters", method: "GET", path: "/api/v1/ai/guidance?query=someone%20is%20following%20me%20home%20at%20night&audience=women",
    note: "Haystack BM25 + IBMDb2EmbeddingRetriever, fused by DocumentJoiner, filtered on audience metadata with JSON_VALUE in Db2." },
  { id: "insights", label: "Response times from Db2 SQL", method: "GET", path: "/api/v1/community/insights",
    note: "Median, 90th percentile, hotspots and SLA breaches: all computed by IBM Db2 (MEDIAN, PERCENTILE_CONT, RANK OVER)." },
  { id: "health", label: "Live Db2 + model status", method: "GET", path: "/health",
    note: "Db2 server version, vector search (langchain-db2) and hybrid retrieval (ibm-db-haystack) status." },
];

export function Explore({ live }: { live: LiveState }) {
  const [active, setActive] = useState<Scenario>(SCENARIOS[0]);
  const [output, setOutput] = useState<unknown>(recorded.results[SCENARIOS[0].id]);
  const [source, setSource] = useState<"recorded" | "live">("recorded");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = (s: Scenario) => { setActive(s); setOutput(recorded.results[s.id]); setSource("recorded"); setError(null); };

  const runLive = async () => {
    if (!live.config) return;
    setLoading(true); setError(null);
    try {
      const data = active.path === "/health"
        ? await fetch(`${live.config.apiUrl}/health`).then((r) => r.json())
        : await liveCall(live.config.apiUrl, active.path, active.method === "POST" ? { method: "POST", body: JSON.stringify(active.body) } : undefined);
      setOutput(data); setSource("live");
    } catch (e) {
      setError(`Live call failed: ${(e as Error).message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col gap-2">
        {SCENARIOS.map((s) => (
          <button key={s.id} onClick={() => pick(s)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition ${active.id === s.id ? "border-signal/60 bg-signal/10 text-ink" : "border-line bg-surface text-ink-2 hover:border-line hover:text-ink"}`}>
            <span className="font-mono text-[11px] text-ink-3">{s.method}</span> {s.label}
          </button>
        ))}
        <p className="mt-2 text-xs leading-relaxed text-ink-3">{active.note}</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <code className="truncate font-mono text-xs text-ink-2">{active.method} {active.path}</code>
          <div className="flex items-center gap-2">
            {source === "live"
              ? <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 font-mono text-[11px] text-live"><Radio className="h-3 w-3" /> live response</span>
              : <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2"><Archive className="h-3 w-3" /> recorded {recorded.recorded_at}</span>}
            <button onClick={runLive} disabled={live.status !== "live" || loading}
              title={live.status === "live" ? "Call the real backend now" : "The live backend is offline right now"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-signal px-3 py-1.5 text-xs font-semibold text-bg disabled:cursor-not-allowed disabled:opacity-40">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />} Run live
            </button>
          </div>
        </div>
        {error && <p className="px-4 pt-3 text-xs text-sos">{error}</p>}
        <motion.pre key={`${active.id}-${source}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="max-h-[440px] overflow-auto p-4 font-mono text-[12px] leading-relaxed text-ink-2">
          {JSON.stringify(output, null, 2)}
        </motion.pre>
        <p className="border-t border-line px-4 py-2 text-[11px] text-ink-3">
          Recorded responses were captured from a real run on IBM Db2 ({recorded.db2}) with {recorded.models}. Nothing is mocked.
        </p>
      </div>
    </div>
  );
}
