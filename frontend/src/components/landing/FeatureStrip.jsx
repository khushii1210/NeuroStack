import { StickyNote, Code2, Bug, Sparkles, Network } from 'lucide-react';
import { C } from './tokens';

const ITEMS = [
  { icon: StickyNote, label: 'Notes',    sub: 'Rich markdown',   color: '#f87171' },
  { icon: Code2,      label: 'Snippets', sub: '80+ languages',   color: '#fb923c' },
  { icon: Bug,        label: 'Bugs',     sub: 'Stack traces',    color: '#fbbf24' },
  { icon: Sparkles,   label: 'AI Chat',  sub: 'Context-aware',   color: '#f87171' },
  { icon: Network,    label: 'Graph',    sub: 'Live connections', color: '#fb923c' },
];

export default function FeatureStrip() {
  return (
    <section style={{
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      position: 'relative', zIndex: 10,
      overflowX: 'auto', scrollbarWidth: 'none',
    }}>
      <div style={{ display: 'flex', minWidth: 'max-content' }}>
        {ITEMS.map(({ icon: Icon, label, sub, color }, i) => (
          <div
            key={label}
            style={{
              display: 'flex', flexDirection: 'column', gap: 8,
              padding: '24px 48px',
              borderRight: i < ITEMS.length - 1 ? `1px solid ${C.border}` : 'none',
              cursor: 'default',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <Icon size={18} style={{ color, opacity: 0.85 }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{label}</span>
            <span style={{ fontSize: 11, color: C.textDim, fontFamily: C.mono }}>{sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
