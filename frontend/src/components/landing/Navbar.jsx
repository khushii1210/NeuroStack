import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(5,8,22,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '97%',
        margin: '10px 20px',
        padding: '0 0px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap style={{ width: 16, height: 16, color: '#fff' }} />
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>
            NeuroStack
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              fontSize: 14, color: '#94A3B8', background: 'none',
              border: 'none', cursor: 'pointer', padding: '10px 20px',
            }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => e.target.style.color = '#94A3B8'}
          >
            Sign In
          </button>
          <motion.button
            onClick={() => navigate('/register')}
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(96,165,250,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontSize: 14, fontWeight: 600, color: '#fff',
              padding: '10px 24px', borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none', cursor: 'pointer',
            }}
          >
            Create an Account
          </motion.button>
        </div>

      </div>
    </motion.nav>
  );
}
