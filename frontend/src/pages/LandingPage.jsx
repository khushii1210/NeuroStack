import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { C } from '../components/landing/tokens';
import HeroSection  from '../components/landing/HeroSection';
import FeaturesList from '../components/landing/FeaturesList';
import AppMockup    from '../components/landing/AppMockup';
import ContentGrid  from '../components/landing/ContentGrid';
import FooterCTA    from '../components/landing/FooterCTA';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: C.bg,
      minHeight: '100vh',
      color: C.textMid,
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* background blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(239,68,68,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: '35vw', height: '35vw',
          background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
      </div>

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 64px', height: 64,
        background: 'rgba(7,4,8,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <div style={{
            width: 30, height: 30, borderRadius: 6, flexShrink: 0,
            background: C.crimsonSoft,
            border: `1px solid ${C.crimsonBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Terminal size={13} style={{ color: '#f87171' }} />
          </div>
          <span style={{
            fontWeight: 700, fontSize: 14,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: C.text, fontFamily: C.mono,
          }}>
            NeuroStack
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none', border: 'none',
              color: C.textDim, fontSize: 13, cursor: 'pointer',
              padding: '10px 16px', borderRadius: 6,
              transition: 'color 0.15s',
            }}
            onMouseOver={e => e.currentTarget.style.color = C.textMid}
            onMouseOut={e => e.currentTarget.style.color = C.textDim}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '9px 20px', borderRadius: 6,
              background: C.crimsonSoft,
              border: `1px solid ${C.crimsonBorder}`,
              color: '#fca5a5', fontWeight: 600, fontSize: 13,
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
            onMouseOut={e => e.currentTarget.style.background = C.crimsonSoft}
          >
            Request access
          </button>
        </div>
      </nav>

      <HeroSection />
      <FeaturesList />
      <AppMockup />
      <ContentGrid />
      <FooterCTA />

    </div>
  );
}
