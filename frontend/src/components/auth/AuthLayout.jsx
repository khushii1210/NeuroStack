import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 70% 0%, #1c0505 0%, #0d0608 50%, #070408 100%)',
      color: '#fff5f5',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
      display: 'flex', flexDirection: 'column',
    }}>

      {/* blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* header */}
      <header style={{
        position: 'relative', zIndex: 20,
        padding: '28px 40px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', gap: 20,
      }}>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: '#7a5a5a', fontSize: 12, fontFamily: "'Geist Mono', monospace",
          textDecoration: 'none', transition: 'color 0.15s',
        }}
          onMouseOver={e => e.currentTarget.style.color = '#d4b8b8'}
          onMouseOut={e => e.currentTarget.style.color = '#7a5a5a'}
        >
          <ArrowLeft size={13} /> Back to home
        </Link>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 30, height: 30, borderRadius: 6,
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Terminal size={14} style={{ color: '#f87171' }} />
          </div>
          <span style={{
            fontWeight: 700, fontSize: 13, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#fff5f5',
            fontFamily: "'Geist Mono', monospace",
          }}>
            NeuroStack
          </span>
        </Link>
      </header>

      {/* form card */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 32px 48px', position: 'relative', zIndex: 10,
      }}>
        <div style={{
          width: '100%', maxWidth: 460,
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '40px 44px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        }}>
          {children}
        </div>
      </main>
    </div>
  );
}
