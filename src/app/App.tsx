import { useState } from "react";
import {
  StickyNote,
  Code2,
  Bug,
  Sparkles,
  Network,
  ArrowRight,
  Terminal,
  Zap,
  GitBranch,
  ChevronRight,
  Search,
  BookOpen,
  Layers,
  Activity,
  Star,
  Check,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 1 — Dark Indigo · Bento Grid · Plus Jakarta Sans
// Hero centered, features in asymmetric bento grid
// ─────────────────────────────────────────────────────────────────────────────

function Layout1() {
  const glass = (opacity = 0.05): React.CSSProperties => ({
    background: `rgba(255,255,255,${opacity})`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "18px",
  });

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 20% 40%, #160d35 0%, #080b1a 55%, #04060f 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#c4bfe8",
      }}
    >
      {/* Blobs */}
      {[
        { top: "-12%", left: "-8%", size: "52vw", color: "rgba(109,58,255,0.2)" },
        { top: "45%", right: "-8%", size: "40vw", color: "rgba(0,210,255,0.12)" },
        { bottom: "-10%", left: "35%", size: "38vw", color: "rgba(180,60,255,0.1)" },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: "blur(48px)",
          }}
        />
      ))}

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-50"
        style={{
          background: "rgba(8,11,26,0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 0 14px rgba(124,58,237,0.5)" }}
          >
            <Terminal size={13} color="#fff" />
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: "#f0edff" }}>
            devvault
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs" style={{ color: "#7a739e" }}>
          {["Features", "Graph", "AI", "Pricing"].map((n) => (
            <a key={n} href="#" className="hover:text-violet-400 transition-colors">{n}</a>
          ))}
        </div>
        <button
          className="text-xs font-semibold px-4 py-2 rounded-lg"
          style={{ background: "rgba(124,58,237,0.18)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          Get access →
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-20">
        {/* Centered hero */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium mb-5"
            style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)", fontFamily: "'JetBrains Mono',monospace" }}
          >
            <Zap size={9} /> now in private beta
          </span>
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5"
            style={{ color: "#f0edff" }}
          >
            Your developer brain,
            <br />
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              finally organized.
            </span>
          </h1>
          <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8" style={{ color: "#7a739e" }}>
            Notes, snippets, bugs, AI assistant, and a live knowledge graph — one frictionless workspace built for developers who think in code.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", boxShadow: "0 0 28px rgba(124,58,237,0.45)" }}
            >
              Start free <ArrowRight size={14} />
            </button>
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.05)", color: "#c4bfe8", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Search size={13} /> Live demo
            </button>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Wide feature — AI */}
          <div
            className="md:col-span-7 p-6 relative overflow-hidden"
            style={{ ...glass(0.05), boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.12), transparent 60%)" }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(167,139,250,0.15)" }}>
                  <Sparkles size={14} style={{ color: "#a78bfa" }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: "#f0edff" }}>AI Assistant</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#f0edff" }}>Ask questions across your entire knowledge base</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#7a739e" }}>
                Context-aware AI that understands your notes and code. Ask questions, get summaries, generate docs.
              </p>
              {/* Chat bubbles */}
              <div className="flex flex-col gap-2">
                {[
                  { role: "user", msg: "Find my rate limiter implementation" },
                  { role: "ai", msg: "Found in snippets/middleware.ts — token bucket algo, written 2 weeks ago. Related: 3 notes on backpressure." },
                ].map(({ role, msg }) => (
                  <div
                    key={role}
                    className={`text-[11px] px-3 py-2 rounded-xl max-w-[80%] leading-relaxed ${role === "user" ? "self-end ml-auto" : ""}`}
                    style={{
                      background: role === "user" ? "rgba(124,58,237,0.25)" : "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: role === "user" ? "#c4b5fd" : "#a0a0b8",
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Knowledge Graph */}
          <div
            className="md:col-span-5 p-6 relative overflow-hidden flex flex-col justify-between"
            style={{ ...glass(0.04), minHeight: 200 }}
          >
            <div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgba(56,189,248,0.15)" }}>
                <Network size={14} style={{ color: "#38bdf8" }} />
              </div>
              <h3 className="text-sm font-bold mb-1.5" style={{ color: "#f0edff" }}>Knowledge Graph</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#7a739e" }}>Visualize connections between notes, snippets, and bugs.</p>
            </div>
            {/* Graph viz */}
            <svg viewBox="0 0 200 110" className="w-full mt-4" style={{ opacity: 0.7 }}>
              {[
                [100, 55], [40, 30], [165, 28], [30, 80], [170, 80],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  {i > 0 && <line x1={100} y1={55} x2={cx} y2={cy} stroke="rgba(167,139,250,0.3)" strokeWidth={1} />}
                  <circle cx={cx} cy={cy} r={i === 0 ? 10 : 6} fill={i === 0 ? "rgba(124,58,237,0.6)" : "rgba(56,189,248,0.4)"} />
                </g>
              ))}
            </svg>
          </div>

          {/* Notes */}
          <div className="md:col-span-4 p-5" style={glass(0.04)}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgba(167,139,250,0.12)" }}>
              <StickyNote size={14} style={{ color: "#a78bfa" }} />
            </div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#f0edff" }}>Smart Notes</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#7a739e" }}>Capture ideas with rich markdown and auto-tagging.</p>
            <div className="mt-3 space-y-1.5">
              {["API rate limiting strategies", "useDebounce hook pattern", "DB index gotchas"].map((n) => (
                <div key={n} className="flex items-center gap-2 text-[11px]" style={{ color: "#7a739e", fontFamily: "'JetBrains Mono',monospace" }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: "#a78bfa" }} /> {n}
                </div>
              ))}
            </div>
          </div>

          {/* Snippets */}
          <div className="md:col-span-4 p-5" style={glass(0.04)}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgba(56,189,248,0.12)" }}>
              <Code2 size={14} style={{ color: "#38bdf8" }} />
            </div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#f0edff" }}>Snippet Vault</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#7a739e" }}>80+ languages, syntax highlighted, instantly searchable.</p>
            <div
              className="mt-3 rounded-lg px-3 py-2 text-[10px] leading-relaxed"
              style={{ background: "rgba(0,0,0,0.35)", fontFamily: "'JetBrains Mono',monospace", color: "#7a739e" }}
            >
              <span style={{ color: "#38bdf8" }}>const</span> debounce = <span style={{ color: "#a78bfa" }}>(fn, ms)</span> =&gt; ...
            </div>
          </div>

          {/* Bugs */}
          <div className="md:col-span-4 p-5" style={glass(0.04)}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgba(248,113,113,0.12)" }}>
              <Bug size={14} style={{ color: "#f87171" }} />
            </div>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#f0edff" }}>Bug Tracker</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#7a739e" }}>Log bugs with stack traces and severity flows.</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {[["#412 critical", "#f87171"], ["#408 open", "#fbbf24"], ["#399 closed", "#4ade80"]].map(([l, c]) => (
                <span key={l} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${c}18`, color: c, fontFamily: "'JetBrains Mono',monospace" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs mb-4" style={{ color: "#7a739e" }}>Join 12,000+ developers · Free forever on solo plan</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="you@company.com"
              className="px-4 py-2.5 rounded-xl text-sm outline-none w-64"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0edff" }}
            />
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              Join beta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 2 — Light Mint · Two-column split hero · Outfit
// Left: sticky headline + nav · Right: app preview panel that scrolls past
// ─────────────────────────────────────────────────────────────────────────────

function Layout2() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: StickyNote, title: "Smart Notes", desc: "Capture ideas instantly. Rich markdown, auto-tagging, and cross-linked context that always surfaces what you need next.", preview: "notes" },
    { icon: Code2, title: "Snippet Vault", desc: "Store and retrieve code fragments with syntax highlighting across 80+ languages. Tag, search, and share in seconds.", preview: "snippets" },
    { icon: Bug, title: "Bug Tracker", desc: "Log bugs with stack traces, severity labels, and status flows — embedded right in your dev workflow.", preview: "bugs" },
    { icon: Sparkles, title: "AI Assistant", desc: "Ask questions across your entire knowledge base. Context-aware AI that understands your notes and code.", preview: "ai" },
    { icon: Network, title: "Knowledge Graph", desc: "See the connections between notes, snippets, and bugs. Find patterns hidden in your own thinking.", preview: "graph" },
  ];

  const lightGlass: React.CSSProperties = {
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(16,185,129,0.15)",
    borderRadius: "16px",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #f0fdf8 0%, #ecfdf5 40%, #f0fdfa 100%)",
        fontFamily: "'Outfit', sans-serif",
        color: "#1a3d30",
      }}
    >
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-50"
        style={{
          background: "rgba(240,253,248,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(16,185,129,0.12)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#059669" }}>
            <Terminal size={13} color="#fff" />
          </div>
          <span className="text-sm font-bold" style={{ color: "#064e3b" }}>devvault</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium" style={{ color: "#4d7a68" }}>
          {["Features", "Graph", "AI", "Pricing"].map((n) => (
            <a key={n} href="#" className="hover:text-emerald-600 transition-colors">{n}</a>
          ))}
        </div>
        <button
          className="text-xs font-bold px-4 py-2 rounded-full"
          style={{ background: "#059669", color: "#fff" }}
        >
          Get started
        </button>
      </nav>

      {/* Two-column split */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* LEFT — Sticky headline + feature selector */}
          <div className="md:w-[42%] md:sticky md:top-24">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-5"
              style={{ background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.2)", fontFamily: "'DM Mono',monospace" }}
            >
              <Zap size={9} /> private beta
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5" style={{ color: "#064e3b" }}>
              One workspace for every developer thought.
            </h1>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#4d7a68" }}>
              devvault connects your notes, code, bugs, and AI into a single knowledge graph that grows smarter with every commit.
            </p>

            {/* Feature nav */}
            <div className="flex flex-col gap-1">
              {features.map(({ icon: Icon, title }, i) => (
                <button
                  key={title}
                  onClick={() => setActiveFeature(i)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group"
                  style={{
                    background: activeFeature === i ? "rgba(5,150,105,0.1)" : "transparent",
                    border: `1px solid ${activeFeature === i ? "rgba(5,150,105,0.25)" : "transparent"}`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: activeFeature === i ? "#059669" : "rgba(16,185,129,0.1)" }}
                  >
                    <Icon size={13} color={activeFeature === i ? "#fff" : "#059669"} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: activeFeature === i ? "#064e3b" : "#4d7a68" }}
                  >
                    {title}
                  </span>
                  <ChevronRight
                    size={13}
                    className="ml-auto transition-opacity"
                    style={{ color: "#059669", opacity: activeFeature === i ? 1 : 0 }}
                  />
                </button>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl text-sm font-bold text-center"
                style={{ background: "#059669", color: "#fff", boxShadow: "0 4px 20px rgba(5,150,105,0.3)" }}
              >
                Start free
              </button>
              <button
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-center"
                style={{ background: "rgba(5,150,105,0.08)", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" }}
              >
                See demo
              </button>
            </div>
          </div>

          {/* RIGHT — Feature detail panel + stats */}
          <div className="md:w-[58%] space-y-4">
            {/* Active feature card */}
            <div style={{ ...lightGlass, padding: "28px", boxShadow: "0 8px 40px rgba(5,150,105,0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = features[activeFeature].icon;
                  return (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#059669" }}>
                      <Icon size={18} color="#fff" />
                    </div>
                  );
                })()}
                <div>
                  <div className="text-base font-bold" style={{ color: "#064e3b" }}>{features[activeFeature].title}</div>
                  <div className="text-[11px]" style={{ color: "#4d7a68", fontFamily: "'DM Mono',monospace" }}>{features[activeFeature].preview}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#4d7a68" }}>{features[activeFeature].desc}</p>
              {/* Mock preview */}
              <div
                className="rounded-xl p-4 text-xs"
                style={{ background: "rgba(5,150,105,0.05)", border: "1px solid rgba(5,150,105,0.12)" }}
              >
                {activeFeature === 0 && (
                  <div style={{ fontFamily: "'DM Mono',monospace", color: "#4d7a68" }}>
                    <div className="font-semibold mb-1.5" style={{ color: "#064e3b" }}>## API Rate Limiting</div>
                    <div>Use token bucket for burst-friendly limits.</div>
                    <div className="mt-1 text-[10px]" style={{ color: "#059669" }}>→ linked: useDebounce.ts · 2 related bugs</div>
                  </div>
                )}
                {activeFeature === 1 && (
                  <div style={{ fontFamily: "'DM Mono',monospace", color: "#4d7a68" }}>
                    <span style={{ color: "#059669" }}>function</span> debounce(fn, delay) {"{"}<br />
                    &nbsp;&nbsp;let timer;<br />
                    &nbsp;&nbsp;<span style={{ color: "#059669" }}>return</span> (...args) =&gt; {"{"}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;clearTimeout(timer); timer = setTimeout(fn, delay);<br />
                    &nbsp;&nbsp;{"}"};<br />
                    {"}"}
                  </div>
                )}
                {activeFeature === 2 && (
                  <div className="space-y-1.5" style={{ fontFamily: "'DM Mono',monospace" }}>
                    {[["#412", "Memory leak in useEffect", "critical"], ["#408", "Auth token refresh race", "high"], ["#399", "Tooltip z-index on mobile", "low"]].map(([id, title, sev]) => (
                      <div key={id} className="flex items-center gap-2">
                        <span style={{ color: "#059669" }}>{id}</span>
                        <span style={{ color: "#4d7a68", flex: 1 }}>{title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: sev === "critical" ? "#fee2e2" : sev === "high" ? "#fef3c7" : "#f0fdf4", color: sev === "critical" ? "#dc2626" : sev === "high" ? "#d97706" : "#059669" }}>{sev}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeFeature === 3 && (
                  <div className="space-y-2" style={{ fontFamily: "'DM Mono',monospace" }}>
                    <div className="px-3 py-1.5 rounded-lg self-end ml-auto inline-block text-[11px]" style={{ background: "rgba(5,150,105,0.15)", color: "#059669" }}>
                      What patterns do I use for caching?
                    </div>
                    <div className="text-[11px] leading-relaxed" style={{ color: "#4d7a68" }}>
                      Found 4 patterns in your notes: LRU cache (notes/caching.md), Redis TTL strategy (snippets/redis.ts), stale-while-revalidate hook, and memoize util.
                    </div>
                  </div>
                )}
                {activeFeature === 4 && (
                  <svg viewBox="0 0 300 120" className="w-full">
                    {[[150,60],[60,30],[240,30],[50,90],[250,90],[150,10]].map(([x,y],i) => (
                      <g key={i}>
                        {i > 0 && <line x1={150} y1={60} x2={x} y2={y} stroke="rgba(5,150,105,0.25)" strokeWidth={1.5} />}
                        <circle cx={x} cy={y} r={i===0?10:5} fill={i===0?"rgba(5,150,105,0.7)":"rgba(5,150,105,0.3)"} />
                        {i===0 && <circle cx={x} cy={y} r={16} fill="none" stroke="rgba(5,150,105,0.2)" strokeWidth={1} />}
                      </g>
                    ))}
                  </svg>
                )}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[["12k+","Developers"],["4.2M","Notes stored"],["99.9%","Uptime"],["<50ms","AI latency"]].map(([v,l]) => (
                <div key={l} className="p-4 rounded-xl" style={lightGlass}>
                  <div className="text-2xl font-bold mb-0.5" style={{ color: "#064e3b", fontFamily: "'Outfit',sans-serif" }}>{v}</div>
                  <div className="text-xs" style={{ color: "#4d7a68" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-xl" style={lightGlass}>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_,i) => <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#1a3d30" }}>
                "devvault replaced Notion, GitHub issues, and my scattered notes app. The knowledge graph alone is worth it."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full" style={{ background: "linear-gradient(135deg,#059669,#34d399)" }} />
                <div>
                  <div className="text-xs font-semibold" style={{ color: "#064e3b" }}>Sarah Chen</div>
                  <div className="text-[10px]" style={{ color: "#4d7a68" }}>Staff Engineer, Vercel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 3 — Dark Crimson · Full-bleed editorial · Fraunces + Jakarta Sans
// Giant staggered type, horizontal scrolling feature strip, stark contrast
// ─────────────────────────────────────────────────────────────────────────────

function Layout3() {
  const glass: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.07)",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(ellipse at 70% 0%, #1c0505 0%, #0d0608 50%, #070408 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#d4b8b8",
      }}
    >
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", top:"-20%", right:"-10%", width:"50vw", height:"50vw", background:"radial-gradient(circle,rgba(239,68,68,0.14) 0%,transparent 70%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"10%", left:"-5%", width:"35vw", height:"35vw", background:"radial-gradient(circle,rgba(251,146,60,0.08) 0%,transparent 70%)", filter:"blur(70px)" }} />
      </div>

      {/* Nav — minimal */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)" }}>
            <Terminal size={13} style={{ color:"#f87171" }} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color:"#fff5f5", letterSpacing:"0.12em", fontFamily:"'Geist Mono',monospace" }}>
            devvault
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs font-medium px-4 py-2 rounded transition-all" style={{ color:"#7a5a5a" }}>Sign in</button>
          <button className="text-xs font-semibold px-4 py-2 rounded" style={{ background:"rgba(239,68,68,0.15)", color:"#fca5a5", border:"1px solid rgba(239,68,68,0.25)" }}>
            Request access
          </button>
        </div>
      </nav>

      {/* HERO — editorial staggered type */}
      <section className="px-8 md:px-16 pt-10 pb-16 relative z-10">
        <div className="mb-4">
          <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color:"#dc2626", fontFamily:"'Geist Mono',monospace" }}>
            — developer knowledge OS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 mb-10">
          <h1
            className="md:col-span-10 text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ color:"#fff5f5", fontFamily:"'Fraunces',serif", fontStyle:"italic" }}
          >
            Think.
          </h1>
          <h1
            className="md:col-span-12 text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight md:pl-24"
            style={{ color:"#fff5f5", fontFamily:"'Fraunces',serif" }}
          >
            Code.
          </h1>
          <h1
            className="md:col-span-10 text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ background:"linear-gradient(135deg,#ef4444,#f97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontFamily:"'Fraunces',serif", fontStyle:"italic" }}
          >
            Remember.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-8">
          <p className="text-sm md:text-base leading-relaxed max-w-sm" style={{ color:"#7a5a5a" }}>
            Notes, snippets, bug reports, AI conversations, and a knowledge graph — one workspace that captures how you actually think.
          </p>
          <div className="flex items-center gap-3 md:ml-auto">
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold"
              style={{ background:"linear-gradient(135deg,#dc2626,#b91c1c)", color:"#fff", boxShadow:"0 0 30px rgba(220,38,38,0.35)" }}
            >
              Start free <ArrowRight size={14} />
            </button>
            <button
              className="px-7 py-3.5 rounded text-sm font-medium"
              style={{ ...glass, color:"#d4b8b8", borderRadius:"8px" }}
            >
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal feature strip */}
      <section className="relative z-10 border-t border-b overflow-hidden" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        <div className="flex overflow-x-auto gap-0 scrollbar-hide" style={{ scrollbarWidth:"none" }}>
          {[
            { icon: StickyNote, label:"Notes", sub:"Rich markdown", color:"#f87171" },
            { icon: Code2, label:"Snippets", sub:"80+ languages", color:"#fb923c" },
            { icon: Bug, label:"Bugs", sub:"Stack traces", color:"#fbbf24" },
            { icon: Sparkles, label:"AI Chat", sub:"Context-aware", color:"#f87171" },
            { icon: Network, label:"Graph", sub:"Live connections", color:"#fb923c" },
            { icon: BookOpen, label:"Docs", sub:"Auto-generated", color:"#fbbf24" },
          ].map(({ icon: Icon, label, sub, color }, i) => (
            <div
              key={label}
              className="flex-shrink-0 flex flex-col gap-2 px-8 py-6 cursor-pointer group transition-all"
              style={{ borderRight:"1px solid rgba(255,255,255,0.06)", minWidth:160 }}
            >
              <Icon size={18} style={{ color, opacity:0.8 }} />
              <div className="text-sm font-bold" style={{ color:"#fff5f5" }}>{label}</div>
              <div className="text-[11px]" style={{ color:"#7a5a5a", fontFamily:"'Geist Mono',monospace" }}>{sub}</div>
              {i < 3 && <div className="text-[10px] mt-1" style={{ color:"#dc2626" }}>included</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Content grid — editorial 2-col */}
      <section className="px-8 md:px-16 py-16 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI block — large */}
          <div
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{ ...glass, borderRadius:"20px", boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}
          >
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 90% 10%, rgba(239,68,68,0.1), transparent 60%)" }} />
            <div className="relative z-10">
              <Sparkles size={18} style={{ color:"#f87171", marginBottom:12 }} />
              <h2 className="text-xl font-bold mb-2" style={{ color:"#fff5f5", fontFamily:"'Fraunces',serif" }}>
                AI that knows your codebase
              </h2>
              <p className="text-xs leading-relaxed mb-5" style={{ color:"#7a5a5a" }}>
                Ask questions, get summaries, generate documentation — with full context from your notes and snippets.
              </p>
              <div className="space-y-2">
                {[
                  "Summarize last week's bug patterns",
                  "Where do I handle auth errors?",
                  "Generate docs for useCart hook",
                ].map((q) => (
                  <div
                    key={q}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] cursor-pointer group transition-all hover:border-red-900/50"
                    style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.06)", color:"#d4b8b8", fontFamily:"'Geist Mono',monospace" }}
                  >
                    <span style={{ color:"#ef4444", opacity:0.6 }}>›</span> {q}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graph block */}
          <div className="rounded-2xl p-7 relative overflow-hidden" style={{ ...glass, borderRadius:"20px" }}>
            <Network size={18} style={{ color:"#fb923c", marginBottom:12 }} />
            <h2 className="text-xl font-bold mb-2" style={{ color:"#fff5f5", fontFamily:"'Fraunces',serif" }}>
              Knowledge that connects itself
            </h2>
            <p className="text-xs leading-relaxed mb-5" style={{ color:"#7a5a5a" }}>
              Every note, snippet, and bug becomes a node. devvault builds the graph automatically.
            </p>
            <svg viewBox="0 0 280 150" style={{ width:"100%", opacity:0.8 }}>
              <defs>
                <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[[140,75],[60,35],[220,35],[40,110],[240,110],[140,15],[80,100],[200,100]].map(([x,y],i) => (
                <g key={i}>
                  {i > 0 && <line x1={140} y1={75} x2={x} y2={y} stroke="rgba(239,68,68,0.2)" strokeWidth={1} />}
                  <circle cx={x} cy={y} r={i===0?12:i<3?6:4} fill={i===0?"url(#glow3)":i<3?"rgba(251,146,60,0.4)":"rgba(239,68,68,0.25)"} />
                </g>
              ))}
            </svg>
            <div className="mt-2 text-[10px]" style={{ color:"#7a5a5a", fontFamily:"'Geist Mono',monospace" }}>
              247 nodes · 1,034 connections
            </div>
          </div>

          {/* Metrics row */}
          {[["12,000+","active developers"],["4.2M","notes & snippets stored"]].map(([val,label]) => (
            <div key={label} className="rounded-2xl px-7 py-6" style={{ ...glass, borderRadius:"20px" }}>
              <div className="text-4xl font-black mb-1" style={{ color:"#fff5f5", fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>{val}</div>
              <div className="text-xs" style={{ color:"#7a5a5a" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-8 md:px-16 py-16 relative z-10 border-t" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-1" style={{ color:"#fff5f5", fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>
              Ship with clarity.
            </h2>
            <p className="text-sm" style={{ color:"#7a5a5a" }}>Free forever on solo plan.</p>
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-3 rounded text-sm outline-none"
              style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#fff5f5", width:220, fontFamily:"'Plus Jakarta Sans',sans-serif" }}
            />
            <button
              className="px-6 py-3 rounded text-sm font-bold"
              style={{ background:"linear-gradient(135deg,#dc2626,#b91c1c)", color:"#fff", boxShadow:"0 0 20px rgba(220,38,38,0.35)" }}
            >
              <GitBranch size={12} className="inline mr-1.5" /> Join beta
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 4 — Light Amber · App-mockup-first · Bricolage Grotesque
// App preview is the hero; features flow below as a checklist + pill grid
// ─────────────────────────────────────────────────────────────────────────────

function Layout4() {
  const [activeTab, setActiveTab] = useState<"notes"|"snippets"|"graph">("notes");

  const lightGlass: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(217,119,6,0.15)",
    borderRadius: "16px",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(150deg,#fffbeb 0%,#fef3c7 50%,#fffbf0 100%)",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        color: "#44300a",
      }}
    >
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute",top:"-15%",right:"-5%",width:"45vw",height:"45vw",background:"radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%)",filter:"blur(60px)" }} />
        <div style={{ position:"absolute",bottom:"5%",left:"-5%",width:"40vw",height:"40vw",background:"radial-gradient(circle,rgba(132,204,22,0.1) 0%,transparent 70%)",filter:"blur(70px)" }} />
      </div>

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-50"
        style={{
          background:"rgba(255,251,235,0.88)",
          backdropFilter:"blur(20px)",
          WebkitBackdropFilter:"blur(20px)",
          borderBottom:"1px solid rgba(217,119,6,0.12)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)" }}>
            <Terminal size={13} color="#fff" />
          </div>
          <span className="font-extrabold tracking-tight" style={{ color:"#78350f" }}>devvault</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold" style={{ color:"#92400e" }}>
          {["Features","Graph","AI","Pricing"].map((n) => (
            <a key={n} href="#" className="hover:text-amber-600 transition-colors">{n}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs font-semibold px-3 py-2 rounded-lg" style={{ color:"#92400e" }}>Sign in</button>
          <button className="text-xs font-bold px-4 py-2 rounded-lg" style={{ background:"#d97706", color:"#fff" }}>
            Get started →
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Top headline — compact */}
        <div className="pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold mb-4" style={{ background:"rgba(217,119,6,0.12)", color:"#d97706", border:"1px solid rgba(217,119,6,0.2)", fontFamily:"'JetBrains Mono',monospace" }}>
            <Activity size={9} /> 12,000+ developers
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3" style={{ color:"#78350f" }}>
            The developer workspace
            <br />
            <span style={{ background:"linear-gradient(135deg,#d97706,#84cc16)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              that remembers everything.
            </span>
          </h1>
          <p className="text-sm max-w-lg mx-auto mb-6" style={{ color:"#92400e" }}>
            Notes, snippets, bugs, AI assistant, and a knowledge graph — frictionless, fast, and always in sync with how you think.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold"
              style={{ background:"linear-gradient(135deg,#d97706,#b45309)", color:"#fff", boxShadow:"0 4px 24px rgba(217,119,6,0.35)" }}
            >
              Start free <ArrowRight size={14} />
            </button>
            <button
              className="px-7 py-3 rounded-xl text-sm font-semibold"
              style={{ background:"rgba(217,119,6,0.1)", color:"#d97706", border:"1px solid rgba(217,119,6,0.2)" }}
            >
              Watch demo
            </button>
          </div>
        </div>

        {/* APP MOCKUP — the hero */}
        <div
          className="rounded-2xl overflow-hidden mb-12 relative"
          style={{
            ...lightGlass,
            boxShadow:"0 24px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(217,119,6,0.15)",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom:"1px solid rgba(217,119,6,0.1)", background:"rgba(255,255,255,0.5)" }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#ff5f57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#febc2e" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background:"#28c840" }} />
            <div className="flex-1 mx-3">
              <div className="mx-auto w-48 rounded px-3 py-1 text-[10px] text-center" style={{ background:"rgba(217,119,6,0.08)", color:"#92400e", fontFamily:"'JetBrains Mono',monospace" }}>
                app.devvault.io
              </div>
            </div>
          </div>

          {/* App layout */}
          <div className="flex" style={{ minHeight:300 }}>
            {/* Sidebar */}
            <div className="w-44 shrink-0 p-3 flex flex-col gap-1" style={{ borderRight:"1px solid rgba(217,119,6,0.1)", background:"rgba(255,255,255,0.4)" }}>
              <div className="text-[10px] font-bold px-2 mb-1" style={{ color:"#d97706", fontFamily:"'JetBrains Mono',monospace" }}>WORKSPACE</div>
              {[
                { icon:StickyNote, label:"Notes", count:"24", active: activeTab === "notes" },
                { icon:Code2, label:"Snippets", count:"87", active: activeTab === "snippets" },
                { icon:Bug, label:"Bugs", count:"6" },
                { icon:Sparkles, label:"AI Chat" },
                { icon:Network, label:"Graph", active: activeTab === "graph" },
              ].map(({ icon:Icon, label, count, active }) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === "Notes") setActiveTab("notes");
                    else if (label === "Snippets") setActiveTab("snippets");
                    else if (label === "Graph") setActiveTab("graph");
                  }}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-left w-full transition-all"
                  style={{
                    background: active ? "rgba(217,119,6,0.12)" : "transparent",
                    color: active ? "#d97706" : "#92400e",
                  }}
                >
                  <Icon size={12} />
                  <span className="text-xs flex-1">{label}</span>
                  {count && (
                    <span className="text-[10px] px-1.5 rounded" style={{ background:"rgba(217,119,6,0.15)", color:"#d97706" }}>{count}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Main panel */}
            <div className="flex-1 p-5 overflow-hidden">
              {activeTab === "notes" && (
                <div>
                  <div className="text-xs font-bold mb-3" style={{ color:"#78350f" }}>Recent Notes</div>
                  <div className="space-y-2">
                    {[
                      { title:"API Rate Limiting Strategies", tags:["performance","api"], date:"today" },
                      { title:"useDebounce hook pattern", tags:["react","hooks"], date:"2d ago" },
                      { title:"Database index gotchas", tags:["postgres","perf"], date:"5d ago" },
                    ].map(({ title, tags, date }) => (
                      <div key={title} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer" style={{ background:"rgba(255,255,255,0.6)", border:"1px solid rgba(217,119,6,0.1)" }}>
                        <StickyNote size={13} style={{ color:"#d97706", flexShrink:0 }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate" style={{ color:"#78350f" }}>{title}</div>
                          <div className="flex gap-1 mt-0.5">
                            {tags.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background:"rgba(217,119,6,0.1)", color:"#d97706" }}>{t}</span>)}
                          </div>
                        </div>
                        <span className="text-[10px] shrink-0" style={{ color:"#92400e", fontFamily:"'JetBrains Mono',monospace" }}>{date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "snippets" && (
                <div>
                  <div className="text-xs font-bold mb-3" style={{ color:"#78350f" }}>Snippet Vault</div>
                  <div
                    className="rounded-xl p-4 text-[11px] leading-loose"
                    style={{ background:"rgba(255,255,255,0.5)", border:"1px solid rgba(217,119,6,0.12)", fontFamily:"'JetBrains Mono',monospace", color:"#92400e" }}
                  >
                    <span style={{ color:"#d97706" }}>import</span> {"{ useState, useEffect }"} <span style={{ color:"#d97706" }}>from</span> <span style={{ color:"#84cc16" }}>"react"</span>
                    <br /><br />
                    <span style={{ color:"#d97706" }}>export function</span>{" "}
                    <span style={{ color:"#b45309" }}>useDebounce</span>
                    {"<T>(value: T, delay: number) {"}
                    <br />
                    &nbsp;&nbsp;<span style={{ color:"#d97706" }}>const</span> [debounced, set] = <span style={{ color:"#b45309" }}>useState</span>{"(value)"}
                    <br />
                    {"}"}
                  </div>
                </div>
              )}
              {activeTab === "graph" && (
                <div>
                  <div className="text-xs font-bold mb-3" style={{ color:"#78350f" }}>Knowledge Graph</div>
                  <svg viewBox="0 0 320 180" style={{ width:"100%" }}>
                    {[[160,90],[70,45],[250,45],[50,130],[270,130],[160,15],[100,120],[220,120]].map(([x,y],i) => (
                      <g key={i}>
                        {i > 0 && <line x1={160} y1={90} x2={x} y2={y} stroke="rgba(217,119,6,0.2)" strokeWidth={1.5} />}
                        <circle cx={x} cy={y} r={i===0?12:i<3?7:5} fill={i===0?"rgba(217,119,6,0.7)":i<3?"rgba(217,119,6,0.3)":"rgba(132,204,22,0.35)"} />
                      </g>
                    ))}
                  </svg>
                  <div className="text-[10px] mt-1" style={{ color:"#92400e", fontFamily:"'JetBrains Mono',monospace" }}>247 nodes · 1,034 connections</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features — checklist style + pill grid hybrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-16">
          {/* Left: checklist */}
          <div>
            <h2 className="text-2xl font-extrabold mb-6" style={{ color:"#78350f" }}>
              Everything you need,<br />nothing you don't.
            </h2>
            <div className="space-y-3">
              {[
                ["Smart Notes", "Rich markdown, auto-tagging, bi-directional links"],
                ["Snippet Vault", "80+ languages, instant search, team sharing"],
                ["Bug Tracker", "Stack traces, severity, status flows"],
                ["AI Assistant", "Context from your notes, code, and graph"],
                ["Knowledge Graph", "Auto-built connections, visual exploration"],
                ["Offline-first", "Fully local, syncs when you're back online"],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background:"rgba(217,119,6,0.15)" }}>
                    <Check size={11} style={{ color:"#d97706" }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color:"#78350f" }}>{title}</div>
                    <div className="text-xs mt-0.5" style={{ color:"#92400e" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats + CTA */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {[["12k+","Developers"],["4.2M","Notes stored"],["99.9%","Uptime"],["<50ms","Latency"]].map(([val,label]) => (
                <div key={label} className="p-4 rounded-xl" style={lightGlass}>
                  <div className="text-2xl font-extrabold mb-0.5" style={{ color:"#78350f" }}>{val}</div>
                  <div className="text-xs" style={{ color:"#92400e" }}>{label}</div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl" style={lightGlass}>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_,i)=><Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color:"#44300a" }}>
                "devvault replaced four tools for me. The AI that actually understands my codebase is the real killer feature."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full" style={{ background:"linear-gradient(135deg,#f59e0b,#84cc16)" }} />
                <div>
                  <div className="text-xs font-bold" style={{ color:"#78350f" }}>Marcus Osei</div>
                  <div className="text-[10px]" style={{ color:"#92400e" }}>Senior SWE, Linear</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl" style={lightGlass}>
              <div className="text-sm font-bold mb-3" style={{ color:"#78350f" }}>Join the private beta</div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                  style={{ background:"rgba(255,255,255,0.7)", border:"1px solid rgba(217,119,6,0.2)", color:"#78350f" }}
                />
                <button
                  className="px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ background:"#d97706", color:"#fff" }}
                >
                  Join
                </button>
              </div>
              <div className="flex gap-3 mt-3">
                {["Free forever","No credit card","Cancel anytime"].map((t) => (
                  <span key={t} className="flex items-center gap-1 text-[10px]" style={{ color:"#92400e" }}>
                    <Check size={9} style={{ color:"#d97706" }} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — Variant switcher
// ─────────────────────────────────────────────────────────────────────────────

const VARIANTS = [
  { id:0, label:"01", name:"Midnight Indigo", color:"#7c3aed", dark:true, Component:Layout1 },
  { id:1, label:"02", name:"Emerald Light", color:"#059669", dark:false, Component:Layout2 },
  { id:2, label:"03", name:"Crimson Noir", color:"#dc2626", dark:true, Component:Layout3 },
  { id:3, label:"04", name:"Solar Amber", color:"#d97706", dark:false, Component:Layout4 },
];

export default function App() {
  const [active, setActive] = useState(0);
  const { Component } = VARIANTS[active];

  return (
    <div style={{ background:"#000", minHeight:"100vh" }}>
      {/* Switcher */}
      <div
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-center gap-1.5 py-2.5 px-4"
        style={{
          background:"rgba(0,0,0,0.9)",
          backdropFilter:"blur(16px)",
          WebkitBackdropFilter:"blur(16px)",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-[10px] text-white/25 mr-2 font-mono hidden sm:block tracking-widest uppercase">Layout</span>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200"
            style={{
              background: active === v.id ? "rgba(255,255,255,0.1)" : "transparent",
              color: active === v.id ? "#fff" : "rgba(255,255,255,0.35)",
              border: `1px solid ${active === v.id ? "rgba(255,255,255,0.15)" : "transparent"}`,
              fontFamily:"'JetBrains Mono',monospace",
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background:v.color }} />
            <span className="hidden sm:inline">{v.name}</span>
            <span className="sm:hidden">{v.label}</span>
            {!v.dark && (
              <span className="hidden sm:inline text-[9px] px-1 py-0.5 rounded" style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)" }}>
                light
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="pt-[44px]">
        <Component />
      </div>
    </div>
  );
}
