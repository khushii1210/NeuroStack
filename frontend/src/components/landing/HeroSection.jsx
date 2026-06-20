import { useEffect, useRef } from 'react';
import { StickyNote, Code2, Bug, Sparkles, Network, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { C } from './tokens';

const FEATURES = [
  { icon: StickyNote, label: 'Smart Notes'       },
  { icon: Code2,      label: 'Snippet Vault'      },
  { icon: Bug,        label: 'Bug Tracker'        },
  { icon: Sparkles,   label: 'AI Assistant'       },
  { icon: Network,    label: 'Knowledge Graph'    },
  { icon: Zap,        label: 'VS Code Extension'  },
];

export default function HeroSection() {
  const eyeRef  = useRef(null);
  const headRef = useRef(null);
  const subRef  = useRef(null);
  const featRef = useRef(null);

  useEffect(() => {
    const els = [eyeRef.current, headRef.current, subRef.current, featRef.current].filter(Boolean);
    gsap.set(els, { opacity: 0, y: 28 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(eyeRef.current,  { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .to(headRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.25)
      .to(subRef.current,  { opacity: 1, y: 0, duration: 0.7 }, 0.5)
      .to(featRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
  }, []);

  return (
    <section style={{
      padding: '48px 64px 80px',
      position: 'relative', zIndex: 10,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'start',
    }}>

      {/* LEFT — headline + description */}
      <div>
        <div ref={eyeRef}>
          <span style={{
            color: C.crimson, fontFamily: C.mono,
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            — developer knowledge OS
          </span>
        </div>

        <div ref={headRef} style={{ margin: '20px 0 0' }}>
          <div style={{
            fontSize: 'clamp(56px, 7.5vw, 104px)',
            fontWeight: 700, lineHeight: 0.93,
            letterSpacing: '-0.025em',
            color: C.text, fontStyle: 'italic',
          }}>
            Think.
          </div>
          <div style={{
            fontSize: 'clamp(56px, 7.5vw, 104px)',
            fontWeight: 700, lineHeight: 0.93,
            letterSpacing: '-0.025em',
            color: C.text,
            paddingLeft: '6vw',
          }}>
            Code.
          </div>
          <div style={{
            fontSize: 'clamp(56px, 7.5vw, 104px)',
            fontWeight: 700, lineHeight: 0.93,
            letterSpacing: '-0.025em',
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Remember.
          </div>
        </div>

        <p ref={subRef} style={{
          color: C.textDim, fontSize: 15, lineHeight: 1.8,
          maxWidth: 400, margin: '32px 0 0',
        }}>
          Notes, snippets, bug reports, AI conversations, and a knowledge graph — one workspace that captures how you actually think.
        </p>
      </div>

      {/* RIGHT — feature list, labels only */}
      <div ref={featRef} style={{ paddingTop: 8 }}>
        <p style={{
          fontSize: 11, color: C.textDim, fontFamily: C.mono,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          margin: '0 0 20px',
        }}>
          What's inside
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FEATURES.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 0',
                borderBottom: i < FEATURES.length - 1
                  ? '1px solid rgba(255,255,255,0.05)'
                  : 'none',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: C.crimsonSoft,
                border: `1px solid ${C.crimsonBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={14} style={{ color: C.crimsonLight }} />
              </div>
              <span style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
