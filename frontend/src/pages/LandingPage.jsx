import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Bot, Network, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import Orb from '../components/landing/Orb';
import PhysicsBalls from '../components/landing/PhysicsBalls';
import DecryptedText from '../components/landing/DecryptedText';
import GlowCard from '../components/landing/GlowCard';

// ─── CARD COMPONENTS ──────────────────────────────────────────────────────────

function NotesCard() {
  return (
    <div style={{
      background: '#171f33', borderRadius: 12,
      border: '1px solid #1E293B', padding: 24,
      boxShadow: '0 25px 50px rgba(0,0,0,0.6)', width: 320,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffb4ab' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3cddc7' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ddb7ff' }} />
        </div>
        <span style={{ fontSize: 12, color: '#8c909f', fontFamily: 'monospace' }}>notes.md</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
        <FileText style={{ width: 14, height: 14, color: '#adc6ff', marginTop: 2, flexShrink: 0 }} />
        <div>
          <p style={{ color: '#dae2fd', fontSize: 13, fontWeight: 700, margin: 0 }}>JWT Authentication Flow</p>
          <p style={{ color: '#8c909f', fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>Tokens expire in 7d. Store in httpOnly cookie...</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['auth', 'security'].map(tag => (
          <span key={tag} style={{
            fontSize: 10, padding: '2px 8px', borderRadius: 4,
            border: '1px solid rgba(173,198,255,0.2)',
            color: '#adc6ff', background: 'rgba(173,198,255,0.1)',
            fontFamily: 'monospace',
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function GraphCard() {
  const nodes = [
    { label: 'React', x: 46, y: 32, color: '#adc6ff' },
    { label: 'JWT', x: 136, y: 22, color: '#ffb4ab' },
    { label: 'Auth', x: 218, y: 50, color: '#3cddc7' },
    { label: 'PostgreSQL', x: 142, y: 90, color: '#ddb7ff' },
    { label: 'Hooks', x: 46, y: 90, color: '#adc6ff' },
  ];
  const edges = [[46,32,136,22],[136,22,218,50],[218,50,142,90],[46,32,46,90],[136,22,142,90]];
  return (
    <div style={{
      background: '#171f33', borderRadius: 12,
      border: '1px solid #1E293B',
      boxShadow: '0 25px 50px rgba(0,0,0,0.6)', width: 380,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 24px', borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffb4ab' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3cddc7' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ddb7ff' }} />
        </div>
        <span style={{ fontSize: 12, color: '#8c909f', fontFamily: 'monospace' }}>knowledge-graph</span>
      </div>
      <div style={{ background: '#000', padding: '16px 24px 24px', borderRadius: '0 0 12px 12px' }}>
        <svg width="100%" height="120" viewBox="0 0 270 110">
          {edges.map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E293B" strokeWidth="1.5" />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="18" fill="transparent" stroke={n.color} strokeOpacity="0.5" strokeWidth="1.5" />
              <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fill={n.color} fontWeight="600" fontFamily="monospace">{n.label}</text>
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
      background: '#171f33', borderRadius: 12,
      border: '1px solid #1E293B', padding: 24,
      boxShadow: '0 25px 50px rgba(0,0,0,0.6)', width: 290,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffb4ab' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3cddc7' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ddb7ff' }} />
        </div>
        <span style={{ fontSize: 12, color: '#8c909f', fontFamily: 'monospace' }}>ai-assistant</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <div style={{
          fontSize: 11, color: '#002e6a', padding: '10px 16px',
          borderRadius: 8, background: '#adc6ff', fontWeight: 600, maxWidth: '80%',
        }}>Explain my JWT auth notes</div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#2d3449', border: '1px solid #424754',
        }}>
          <Bot style={{ width: 12, height: 12, color: '#ddb7ff' }} />
        </div>
        <div style={{
          fontSize: 11, color: '#c2c6d6', padding: '12px 16px', borderRadius: 8,
          flex: 1, border: '1px solid #1E293B',
          lineHeight: 1.65, background: '#0b1326',
        }}>
          JWT tokens expire in 7 days, stored in httpOnly cookies. Refresh token handles silent renewal...
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();

  const headRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef  = useRef(null);
  const statRef = useRef(null);

  // refs for floating cards
  const c1 = useRef(null);
  const c2 = useRef(null);
  const c3 = useRef(null);

  useEffect(() => {
    // hero stagger in
    gsap.set([headRef.current, descRef.current, ctaRef.current, statRef.current], { opacity: 0, y: 32 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(headRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
      .to(descRef.current,  { opacity: 1, y: 0, duration: 0.7 }, 0.45)
      .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.6 }, 0.65)
      .to(statRef.current,  { opacity: 1, y: 0, duration: 0.6 }, 0.8);

    // mouse parallax on cards
    const depths = [
      { el: c1.current, depth: 0.05 },
      { el: c2.current, depth: 0.08 },
      { el: c3.current, depth: 0.12 },
    ];

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      depths.forEach(({ el, depth }) => {
        if (!el) return;
        const mx = (cx - e.clientX) * depth;
        const my = (cy - e.clientY) * depth;
        const rx = (e.clientY / window.innerHeight - 0.5) * 10;
        const ry = (e.clientX / window.innerWidth  - 0.5) * 10;
        el.style.transform = `translate(${mx}px, ${my}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#dae2fd', fontFamily: 'Geist, sans-serif', overflowX: 'hidden' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(11,19,38,0.7)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1E293B',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 56px', maxWidth: 1680, margin: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #9fc2fbff, #51c3f8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap style={{ width: 16, height: 16, color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.03em', color: '#adc6ff' }}>NeuroStack</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#8c909f', fontSize: 13, cursor: 'pointer', fontFamily: 'monospace' }}
              onMouseOver={e => e.target.style.color = '#adc6ff'}
              onMouseOut={e => e.target.style.color = '#8c909f'}>
              Sign In
            </button>
            <button onClick={() => navigate('/register')}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(0.97)'; e.currentTarget.style.opacity = '0.9'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
              style={{
                background: '#adc6ff', color: '#002e6a',
                fontWeight: 700, fontSize: 13,
                padding: '10px 24px', borderRadius: 8,
                border: 'none', cursor: 'pointer',
                transition: 'transform 0.15s, opacity 0.15s',
                fontFamily: 'monospace',
              }}>
              Create an Account
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <main style={{ position: 'relative', paddingTop: 56, minHeight: '100vh', overflow: 'hidden' }}>

        <div style={{
          position: 'absolute',
          top: '50%', left: '60%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          pointerEvents: 'none', zIndex: 0,
          opacity: 0.5,
        }}>
          <Orb hue={220} hoverIntensity={0.8} rotateOnHover={true} />
        </div>

        {/* grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '32px 32px', opacity: 0.3,
        }} />

        {/* floating cards container */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

          {/* Card 1 — Notes — top right */}
          <div ref={c1} style={{
            position: 'absolute', top: '18%', right: '10%',
            opacity: 0.85, transition: 'transform 0.12s ease-out', willChange: 'transform',
          }}>
            <NotesCard />
          </div>

          {/* Card 2 — Graph — middle, shifted left */}
          <div ref={c2} style={{
            position: 'absolute', top: '41%', right: '22%',
            opacity: 0.65, transition: 'transform 0.1s ease-out', willChange: 'transform',
          }}>
            <GraphCard />
          </div>

          {/* Card 3 — AI — lower right */}
          <div ref={c3} style={{
            position: 'absolute', top: '70%', right: '4%',
            opacity: 0.9, transition: 'transform 0.08s ease-out', willChange: 'transform',
          }}>
            <AICard />
          </div>
        </div>

        {/* hero text */}
        <div style={{ position: 'relative', zIndex: 10, padding: '56px 56px 64px', maxWidth: 1280, margin: '0 ' }}>
          <div style={{ maxWidth: 900 }}>

            <div ref={headRef}>
              <h1 style={{ margin: '0 0 12px 0', lineHeight: 1 }}>
                {/* "Your" small inline + "SECOND BRAIN" huge on same line */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4, flexWrap: 'nowrap' }}>
                  <span style={{ fontSize: 35, fontWeight: 500, color: '#dae2fd', letterSpacing: '-0.01em', flexShrink: 0 }}>Your</span>
                  <DecryptedText
                    text="SECOND BRAIN"
                    speed={40}
                    style={{
                      fontSize: 'clamp(40px, 5.5vw, 500px)',
                      fontWeight: 900, lineHeight: 0.95,
                      letterSpacing: '-0.04em', whiteSpace: 'nowrap',
                      WebkitTextStroke: '2px #a7f0f8ff',
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent',
                      display: 'inline-block',
                    }}
                  />
                </div>
                <div style={{ fontSize: 35, fontWeight: 500, color: '#dae2fd', letterSpacing: '-0.01em' }}>
                  for Building Software
                </div>
              </h1>
            </div>

            <p ref={descRef} style={{ color: '#8c909f', fontSize: 16, lineHeight: 1.7, margin: '0 0 24px 0', maxWidth: 520 }}>
              Capture notes. Save snippets. Track bugs. Visualize knowledge. Ask AI.{' '}
              <strong style={{ color: '#dae2fd' }}>Everything connected.</strong>
            </p>

            {/* physics balls — right after description */}
            <div style={{ maxWidth: 520, marginBottom: 32 }}>
              <PhysicsBalls />
            </div>

            <div ref={ctaRef} style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 56 }}>
              <button onClick={() => navigate('/register')}
                onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '18px 36px', borderRadius: 12,
                  background: '#adc6ff', color: '#002e6a',
                  fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}>
                Start Building <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FEATURES BENTO */}
      <section style={{ padding: '120px 56px', background: '#020617', position: 'relative' }}>

        {/* same grid background as hero */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '32px 32px', opacity: 0.3,
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em',
            marginBottom: 64, paddingLeft: 28,
            borderLeft: '4px solid #adc6ff', color: '#dae2fd',
          }}>Core Capabilities</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>

            {/* Large card */}
            <GlowCard style={{ gridColumn: 'span 2', padding: 44 }} glowColor="#00E5FF">
              <span style={{ color: '#3cddc7', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: 20 }}>ENGINEERING FIRST</span>
              <h3 style={{ fontSize: 24, fontWeight: 600, color: '#dae2fd', marginBottom: 20, letterSpacing: '-0.01em' }}>AI Knowledge Graph</h3>
              <p style={{ color: '#8c909f', fontSize: 14, lineHeight: 1.75, maxWidth: 420 }}>
                AI reads your notes and snippets, extracts key concepts, and builds a living knowledge graph automatically. Connections you didn't know existed.
              </p>
              <Network style={{ position: 'absolute', bottom: -20, right: -20, width: 180, height: 180, color: '#1E293B', opacity: 0.5 }} />
            </GlowCard>

            {/* Small card */}
           <GlowCard style={{ gridColumn: 'span 1', padding: 44 }} glowColor="#00E5FF">
              <div style={{ width: 48, height: 48, background: 'rgba(221,183,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                <Bot style={{ width: 24, height: 24, color: '#ddb7ff' }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#dae2fd', marginBottom: 16 }}>AI Assistant</h3>
              <p style={{ color: '#8c909f', fontSize: 13, lineHeight: 1.75 }}>Ask questions about your own knowledge base. Get answers grounded in your notes and snippets.</p>
            </GlowCard>

            {/* Small card */}
            <GlowCard style={{ gridColumn: 'span 1', padding: 44 }} glowColor="#00E5FF">
              <div style={{ width: 48, height: 48, background: 'rgba(60,221,199,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                <FileText style={{ width: 24, height: 24, color: '#3cddc7' }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#dae2fd', marginBottom: 16 }}>Smart Notes</h3>
              <p style={{ color: '#8c909f', fontSize: 13, lineHeight: 1.75 }}>Tag, search and organize developer notes. Markdown support with code blocks and syntax highlighting.</p>
            </GlowCard>

            {/* Large card */}
            <GlowCard style={{ gridColumn: 'span 2', padding: 44 }} glowColor="#00E5FF">
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 24, fontWeight: 600, color: '#dae2fd', marginBottom: 20, letterSpacing: '-0.01em' }}>Automated Bug Tracking</h3>
                <p style={{ color: '#8c909f', fontSize: 14, lineHeight: 1.75 }}>
                  Log bugs with stack traces, severity levels, and status tracking. Find patterns across your error history.
                </p>
              </div>
              <div style={{
                width: 240, flexShrink: 0,
                background: '#000', border: '1px solid #1E293B',
                borderRadius: 10, padding: 20, fontFamily: 'monospace', fontSize: 11,
              }}>
                <p style={{ color: '#ffb4ab', margin: '0 0 8px' }}>TypeError: undefined is not an object</p>
                <p style={{ color: '#8c909f', margin: '0 0 4px' }}>&gt; Suggested Fix from Brain:</p>
                <p style={{ color: '#3cddc7', margin: 0 }}>Apply optional chaining on user.profile</p>
              </div>
            </GlowCard>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#020617', borderTop: '1px solid #1E293B', padding: '48px 56px', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '32px 32px', opacity: 0.3,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1 }}>
          <span style={{ color: '#8c909f', fontSize: 12, fontFamily: 'monospace' }}>© 2026 NeuroStack — Your Second Brain</span>
        </div>
      </footer>

    </div>
  );
}
