import { Sparkles, Network } from 'lucide-react';
import { C, glass } from './tokens';

const GRAPH_NODES = [
  [140,75],[60,35],[220,35],[40,110],[240,110],[140,15],[80,100],[200,100],
];

export default function ContentGrid() {
  return (
    <section style={{ padding: '0 64px 100px', position: 'relative', zIndex: 10 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}>

        {/* AI block */}
        <div style={{
          ...glass, borderRadius: 20, padding: 32,
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 90% 10%, rgba(239,68,68,0.1), transparent 60%)',
          }} />
          <Sparkles size={18} style={{ color: '#f87171', marginBottom: 14 }} />
          <h3 style={{
            fontSize: 20, fontWeight: 700, fontStyle: 'italic',
            color: C.text, margin: '0 0 10px', letterSpacing: '-0.01em',
          }}>
            AI that knows your work
          </h3>
          <p style={{ fontSize: 13, color: C.textDim, lineHeight: 1.75, margin: '0 0 20px' }}>
            Ask questions grounded in your own notes, snippets, and bug history. Not generic answers — your answers.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Have I solved this JWT error before?',
              'Where do I handle auth errors?',
              "Summarize last week's bug patterns",
            ].map(q => (
              <div key={q} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 14px', borderRadius: 8, fontSize: 11,
                background: 'rgba(0,0,0,0.3)',
                border: `1px solid ${C.border}`,
                color: C.textMid, fontFamily: C.mono, cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = C.crimsonBorder}
                onMouseOut={e => e.currentTarget.style.borderColor = C.border}
              >
                <span style={{ color: '#ef4444', opacity: 0.7 }}>›</span> {q}
              </div>
            ))}
          </div>
        </div>

        {/* Graph block */}
        <div style={{ ...glass, borderRadius: 20, padding: 32, overflow: 'hidden' }}>
          <Network size={18} style={{ color: '#fb923c', marginBottom: 14 }} />
          <h3 style={{
            fontSize: 20, fontWeight: 700, fontStyle: 'italic',
            color: C.text, margin: '0 0 10px', letterSpacing: '-0.01em',
          }}>
            Knowledge that connects itself
          </h3>
          <p style={{ fontSize: 13, color: C.textDim, lineHeight: 1.75, margin: '0 0 16px' }}>
            Every note, snippet, and bug becomes a node. NeuroStack builds the graph automatically from your content.
          </p>
          <svg viewBox="0 0 280 150" style={{ width: '100%', opacity: 0.85 }}>
            <defs>
              <radialGradient id="cgg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>
            {GRAPH_NODES.slice(1).map(([x, y], i) => (
              <line key={i} x1={140} y1={75} x2={x} y2={y}
                stroke="rgba(239,68,68,0.2)" strokeWidth={1} />
            ))}
            {GRAPH_NODES.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y}
                r={i === 0 ? 12 : i < 3 ? 6 : 4}
                fill={i === 0 ? 'url(#cgg)' : i < 3 ? 'rgba(251,146,60,0.4)' : 'rgba(239,68,68,0.25)'}
              />
            ))}
          </svg>
          <p style={{ fontSize: 10, color: C.textDim, fontFamily: C.mono, marginTop: 6 }}>
            247 nodes · 1,034 connections
          </p>
        </div>

        {/* Metric blocks
        {[
          ['12,000+', 'developers building with NeuroStack'],
          ['4.2M',    'notes, snippets, and bugs stored'],
        ].map(([val, label]) => (
          <div key={label} style={{ ...glass, borderRadius: 20, padding: '28px 32px' }}>
            <div style={{
              fontSize: 48, fontWeight: 900, fontStyle: 'italic',
              color: C.text, letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              {val}
            </div>
            <div style={{ fontSize: 13, color: C.textDim, marginTop: 10 }}>{label}</div>
          </div>
        ))} */}

      </div>
    </section>
  );
}
