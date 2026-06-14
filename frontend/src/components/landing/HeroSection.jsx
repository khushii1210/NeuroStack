import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { gsap } from 'gsap';
import ProductWindows from './ProductWindows';

export default function HeroSection() {
  const navigate = useNavigate();
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.set([headlineRef.current, descRef.current, ctaRef.current, statsRef.current], {
      opacity: 0, y: 30,
    });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
      .to(descRef.current,     { opacity: 1, y: 0, duration: 0.7 }, 0.45)
      .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.6 }, 0.65)
      .to(statsRef.current,    { opacity: 1, y: 0, duration: 0.6 }, 0.8);
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      paddingTop: 64,
    }}>

      {/* grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(to right, rgba(30,41,59,0.5) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(30,41,59,0.5) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.4,
      }} />

      {/* ambient glow right side */}
      <div style={{
        position: 'absolute', right: '5%', top: '30%',
        width: '50%', height: '60%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.08) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
      }}>

        {/* LEFT — hero text */}
        <div style={{
          width: '50%',
          padding: '80px 0 80px 60px',
          flexShrink: 0,
        }}>

          <div ref={headlineRef}>
            <h1 style={{
              fontSize: 'clamp(56px, 7vw, 96px)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: '#dae2fd',
              margin: '0 0 32px 0',
            }}>
              <span style={{ display: 'block' }}>Your</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #adc6ff 0%, #ddb7ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Second Brain
              </span>
              <span style={{ display: 'block' }}>for Building Software</span>
            </h1>
          </div>

          <p ref={descRef} style={{
            color: '#8c909f',
            fontSize: 16, lineHeight: 1.7,
            margin: '0 0 48px 0',
            maxWidth: 480,
          }}>
            Capture notes. Save snippets. Track bugs.
            Visualize knowledge. Ask AI.{' '}
            <strong style={{ color: '#dae2fd' }}>Everything connected.</strong>
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: 16, marginBottom: 80 }}>
            <button
              onClick={() => navigate('/register')}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '16px 32px', borderRadius: 12,
                background: '#adc6ff',
                color: '#002e6a',
                fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
            >
              Start Building
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>

            <button
              onMouseOver={e => { e.currentTarget.style.background = '#31394d'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#171f33'; }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '16px 32px', borderRadius: 12,
                background: '#171f33',
                border: '1px solid #1E293B',
                color: '#dae2fd',
                fontWeight: 700, fontSize: 14,
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.2s',
              }}
            >
              <Play style={{ width: 16, height: 16 }} />
              Watch Demo
            </button>
          </div>

          <div ref={statsRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)',
            gap: '0 48px',
            width: 'fit-content',
          }}>
            {[
              { value: '12k+', label: 'DEVELOPERS' },
              { value: '2M+',  label: 'NOTES CREATED' },
              { value: '98%',  label: 'SATISFACTION' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ color: '#dae2fd', fontWeight: 600, fontSize: 32, margin: 0, letterSpacing: '-0.02em' }}>
                  {stat.value}
                </p>
                <p style={{ color: '#8c909f', fontSize: 12, marginTop: 4, letterSpacing: '0.1em' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT — floating cards */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '55%', height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
        }}>
          <ProductWindows />
        </div>

      </div>
    </section>
  );
}
