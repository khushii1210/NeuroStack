import { useEffect, useRef } from 'react';
import { FileText, Bot } from 'lucide-react';

function WindowChrome({ title }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '12px 16px', borderBottom: '1px solid #1E293B',
    }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffb4ab' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3cddc7' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ddb7ff' }} />
      <span style={{ marginLeft: 10, fontSize: 12, color: '#8c909f', fontFamily: 'JetBrains Mono, monospace' }}>{title}</span>
    </div>
  );
}

function NotesCard() {
  return (
    <div style={{
      background: '#171f33', borderRadius: 16,
      border: '1px solid #1E293B', overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      width: 320,
    }}>
      <WindowChrome title="notes.md" />
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <FileText style={{ width: 14, height: 14, color: '#adc6ff', marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ color: '#dae2fd', fontSize: 13, fontWeight: 700, margin: 0 }}>JWT Authentication Flow</p>
            <p style={{ color: '#8c909f', fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
              Tokens expire in 7d. Store in httpOnly cookie...
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {['auth', 'security'].map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 4,
              border: '1px solid rgba(173,198,255,0.2)',
              color: '#adc6ff', background: 'rgba(173,198,255,0.1)',
              fontFamily: 'JetBrains Mono, monospace',
            }}>{tag}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #1E293B', paddingTop: 10 }}>
          {['React useCallback patterns', 'PostgreSQL indexing tips', 'API rate limiting'].map(note => (
            <div key={note} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#424754', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#8c909f' }}>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GraphCard() {
  const nodes = [
    { label: 'React',      x: 46,  y: 32,  color: '#adc6ff' },
    { label: 'JWT',        x: 136, y: 22,  color: '#ffb4ab' },
    { label: 'Auth',       x: 218, y: 50,  color: '#3cddc7' },
    { label: 'PostgreSQL', x: 142, y: 88,  color: '#ddb7ff' },
    { label: 'Hooks',      x: 46,  y: 88,  color: '#adc6ff' },
  ];
  const edges = [
    [46,32,136,22],[136,22,218,50],[218,50,142,88],[46,32,46,88],[136,22,142,88],
  ];
  return (
    <div style={{
      background: '#171f33', borderRadius: 16,
      border: '1px solid #1E293B', overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      width: 380,
    }}>
      <WindowChrome title="knowledge-graph" />
      <div style={{ padding: '12px 16px 16px', background: '#060e20' }}>
        <svg width="100%" height="120" viewBox="0 0 270 115">
          {edges.map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#1E293B" strokeWidth="1.5" />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="18"
                fill="transparent" stroke={n.color} strokeOpacity="0.4" strokeWidth="1.5" />
              <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fill={n.color} fontWeight="600" fontFamily="JetBrains Mono, monospace">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function AICard() {
  return (
    <div style={{
      background: '#171f33', borderRadius: 16,
      border: '1px solid #1E293B', overflow: 'hidden',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      width: 290,
    }}>
      <WindowChrome title="ai-assistant" />
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <div style={{
            fontSize: 11, color: '#002e6a', padding: '8px 14px',
            borderRadius: 10, maxWidth: '85%', fontWeight: 600,
            background: '#adc6ff',
          }}>
            Explain my JWT auth notes
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#2d3449', border: '1px solid #424754',
          }}>
            <Bot style={{ width: 13, height: 13, color: '#ddb7ff' }} />
          </div>
          <div style={{
            fontSize: 11, color: '#c2c6d6', padding: '10px 14px', borderRadius: 10,
            flex: 1, border: '1px solid #1E293B',
            lineHeight: 1.65, background: '#0b1326',
          }}>
            JWT tokens expire in 7 days, stored in httpOnly cookies. Refresh token pattern handles silent renewal...
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductWindows() {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = [
      { el: card1Ref.current, depth: 0.05 },
      { el: card2Ref.current, depth: 0.08 },
      { el: card3Ref.current, depth: 0.12 },
    ];

    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      cards.forEach(({ el, depth }) => {
        if (!el) return;
        const moveX = (cx - e.clientX) * depth;
        const moveY = (cy - e.clientY) * depth;
        const rotateX = (e.clientY / window.innerHeight - 0.5) * 10;
        const rotateY = (e.clientX / window.innerWidth - 0.5) * 10;
        el.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Card 1 — Notes — top left of right section */}
      <div
        ref={card1Ref}
        style={{
          position: 'absolute',
          top: '12%', left: '5%',
          opacity: 0.85,
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
      >
        <NotesCard />
      </div>

      {/* Card 2 — Graph — center right */}
      <div
        ref={card2Ref}
        style={{
          position: 'absolute',
          top: '42%', right: '2%',
          opacity: 0.65,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        <GraphCard />
      </div>

      {/* Card 3 — AI — bottom left of right section */}
      <div
        ref={card3Ref}
        style={{
          position: 'absolute',
          bottom: '10%', left: '12%',
          opacity: 0.9,
          transition: 'transform 0.08s ease-out',
          willChange: 'transform',
        }}
      >
        <AICard />
      </div>
    </div>
  );
}
