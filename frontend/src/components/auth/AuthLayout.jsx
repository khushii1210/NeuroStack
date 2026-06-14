import { Link } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';

function AuthLayout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      color: '#dae2fd',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.3,
        backgroundImage:
          'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 300,
        pointerEvents: 'none',
        filter: 'blur(40px)',
        background: 'radial-gradient(ellipse at center, rgba(173,198,255,0.07) 0%, transparent 70%)',
      }} />

      {/* Top-left: back + logo */}
      <header style={{
        position: 'relative',
        zIndex: 20,
        padding: '28px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 20,
      }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            color: '#8c909f',
            fontSize: 12,
            fontFamily: 'monospace',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #9fc2fb, #51c3f8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Zap size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: '#adc6ff' }}>
            NeuroStack
          </span>
        </Link>
      </header>

      {/* Centered form card */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px 40px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 460,
          borderRadius: 18,
          border: '1px solid #1E293B',
          background: '#0b1326',
          padding: '40px 44px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
