import { useState } from 'react';
import { StickyNote, Code2, Bug, Sparkles, Network } from 'lucide-react';
import { C } from './tokens';

const NOTES = [
  { title: 'API Rate Limiting Strategies', tags: ['performance', 'api'],  date: 'today' },
  { title: 'useDebounce hook pattern',      tags: ['react', 'hooks'],     date: '2d ago' },
  { title: 'Database index gotchas',        tags: ['postgres', 'perf'],  date: '5d ago' },
];

const BUGS = [
  { title: 'JWT token not sent with requests', severity: 'resolved', date: '3d ago',  solution: 'Set withCredentials: true in axios config' },
  { title: 'useEffect infinite loop',          severity: 'resolved', date: '1w ago',  solution: 'Add dependency array to useEffect' },
  { title: 'CORS preflight failing on /auth',  severity: 'open',     date: '2w ago',  solution: '' },
];

const GRAPH_NODES = [
  [140, 80], [60, 35], [220, 35], [40, 115], [240, 115], [140, 15], [80, 105], [200, 105],
];

const NODE_LABELS = ['React', 'JWT', 'Auth', 'PostgreSQL', 'Hooks', 'Node.js', 'API', 'Prisma'];

export default function AppMockup() {
  const [activeTab, setActiveTab] = useState('notes');

  const sidebarItems = [
    { icon: StickyNote, label: 'Notes',    count: '24', tab: 'notes'    },
    { icon: Code2,      label: 'Snippets', count: '87', tab: 'snippets' },
    { icon: Bug,        label: 'Bugs',     count: '6',  tab: 'bugs'     },
    { icon: Sparkles,   label: 'AI Chat',  count: null, tab: 'ai'       },
    { icon: Network,    label: 'Graph',    count: null, tab: 'graph'    },
  ];

  const severityColor = (s) => s === 'resolved' ? '#4ade80' : '#f87171';

  return (
    <section style={{ padding: '0 64px 100px', position: 'relative', zIndex: 10 }}>
      <div style={{
        borderRadius: 20, overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
      }}>

        {/* window chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', padding: '12px 20px',
          borderBottom: `1px solid ${C.border}`,
          background: 'rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(bg => (
              <div key={bg} style={{ width: 11, height: 11, borderRadius: '50%', background: bg }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              padding: '4px 20px', borderRadius: 6,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${C.border}`,
              color: C.textDim, fontSize: 10, fontFamily: C.mono,
            }}>
              app.neurostack.io
            </div>
          </div>
        </div>

        {/* app body */}
        <div style={{ display: 'flex', minHeight: 360 }}>

          {/* sidebar */}
          <div style={{
            width: 180, flexShrink: 0, padding: 12,
            borderRight: `1px solid ${C.border}`,
            background: 'rgba(0,0,0,0.2)',
          }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              color: C.crimson, fontFamily: C.mono,
              padding: '4px 8px', marginBottom: 4,
            }}>
              WORKSPACE
            </p>
            {sidebarItems.map(({ icon: Icon, label, count, tab }) => {
              const active = tab === activeTab;
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    width: '100%', padding: '8px 10px', borderRadius: 8,
                    background: active ? C.crimsonSoft : 'transparent',
                    border: `1px solid ${active ? C.crimsonBorder : 'transparent'}`,
                    color: active ? '#fca5a5' : C.textDim,
                    fontSize: 12, cursor: 'pointer',
                    textAlign: 'left', marginBottom: 2,
                    transition: 'background 0.15s',
                  }}
                >
                  <Icon size={12} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {count && (
                    <span style={{
                      fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: C.crimsonSoft, color: C.crimsonLight,
                    }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* main panel */}
          <div style={{ flex: 1, padding: 24, overflow: 'hidden' }}>

            {/* NOTES */}
            {activeTab === 'notes' && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 16px' }}>
                  Recent Notes
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {NOTES.map(({ title, tags, date }) => (
                    <div key={title} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${C.border}`,
                      cursor: 'pointer', transition: 'background 0.15s',
                    }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                      <StickyNote size={13} style={{ color: '#f87171', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: 12, fontWeight: 600, color: C.text,
                          margin: '0 0 4px', overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {title}
                        </p>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {tags.map(t => (
                            <span key={t} style={{
                              fontSize: 9, padding: '2px 6px', borderRadius: 4,
                              background: C.crimsonSoft, color: '#fca5a5',
                            }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <span style={{ fontSize: 10, color: C.textDim, fontFamily: C.mono, flexShrink: 0 }}>
                        {date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SNIPPETS */}
            {activeTab === 'snippets' && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 16px' }}>
                  Snippet Vault
                </p>
                <div style={{
                  borderRadius: 10, padding: '16px 20px',
                  background: 'rgba(0,0,0,0.35)',
                  border: `1px solid ${C.border}`,
                  fontFamily: C.mono, fontSize: 12,
                  lineHeight: 1.85, color: C.textDim,
                }}>
                  <span style={{ color: '#f87171' }}>const</span> debounce = (fn, delay) =&gt; {'{'}<br />
                  &nbsp;&nbsp;<span style={{ color: '#fb923c' }}>let</span> timer;<br />
                  &nbsp;&nbsp;<span style={{ color: '#f87171' }}>return</span> (...args) ={'>'} {'{'}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;clearTimeout(timer);<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;timer = setTimeout(fn, delay);<br />
                  &nbsp;&nbsp;{'}'};<br />
                  {'}'};
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  {['react', 'hooks', 'utility'].map(t => (
                    <span key={t} style={{
                      fontSize: 10, padding: '3px 8px', borderRadius: 4,
                      background: C.crimsonSoft, color: '#fca5a5', fontFamily: C.mono,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* BUGS */}
            {activeTab === 'bugs' && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 16px' }}>
                  Bug Journal
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {BUGS.map(({ title, severity, date, solution }) => (
                    <div key={title} style={{
                      padding: '12px 14px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${C.border}`,
                      cursor: 'pointer', transition: 'background 0.15s',
                    }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: solution ? 6 : 0 }}>
                        <Bug size={12} style={{ color: '#f87171', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.text, flex: 1 }}>{title}</span>
                        <span style={{
                          fontSize: 9, padding: '2px 7px', borderRadius: 10,
                          background: `${severityColor(severity)}18`,
                          color: severityColor(severity),
                          fontFamily: C.mono, flexShrink: 0,
                        }}>{severity}</span>
                        <span style={{ fontSize: 10, color: C.textDim, fontFamily: C.mono, flexShrink: 0 }}>{date}</span>
                      </div>
                      {solution && (
                        <p style={{
                          fontSize: 11, color: C.textDim, margin: '0 0 0 20px',
                          lineHeight: 1.5, fontFamily: C.mono,
                        }}>
                          → {solution}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI CHAT */}
            {activeTab === 'ai' && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 16px' }}>
                  AI Assistant
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: 10,
                      background: C.crimsonSoft,
                      border: `1px solid ${C.crimsonBorder}`,
                      color: '#fca5a5', fontSize: 12, maxWidth: '75%',
                    }}>
                      Have I solved a JWT auth error before?
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${C.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Sparkles size={11} style={{ color: '#f87171' }} />
                    </div>
                    <div style={{
                      padding: '10px 14px', borderRadius: 10,
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${C.border}`,
                      color: C.textMid, fontSize: 12, lineHeight: 1.65, flex: 1,
                    }}>
                      Yes — logged 3 days ago. Cause: axios not sending credentials. Solution: set <span style={{ color: '#fca5a5', fontFamily: C.mono }}>withCredentials: true</span> in your axios instance config.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GRAPH */}
            {activeTab === 'graph' && (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>
                  Knowledge Graph
                </p>
                <svg viewBox="0 0 320 200" style={{ width: '100%', maxHeight: 220 }}>
                  <defs>
                    <radialGradient id="ng" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {GRAPH_NODES.slice(1).map(([x, y], i) => (
                    <line key={i} x1={140} y1={80} x2={x} y2={y}
                      stroke="rgba(239,68,68,0.25)" strokeWidth={1.2} />
                  ))}
                  {GRAPH_NODES.map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y}
                        r={i === 0 ? 16 : i < 3 ? 8 : 6}
                        fill={i === 0 ? 'url(#ng)' : i < 3 ? 'rgba(251,146,60,0.4)' : 'rgba(239,68,68,0.25)'}
                      />
                      <text
                        x={x} y={i === 0 ? y + 26 : y + 18}
                        textAnchor="middle"
                        fontSize={9}
                        fill={C.textDim}
                        fontFamily={C.mono}
                      >
                        {NODE_LABELS[i]}
                      </text>
                    </g>
                  ))}
                </svg>
                <p style={{ fontSize: 10, color: C.textDim, fontFamily: C.mono, marginTop: 4 }}>
                  124 nodes · 847 connections
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
