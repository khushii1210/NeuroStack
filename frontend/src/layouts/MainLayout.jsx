import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#020617',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <Sidebar />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        background: '#020617',
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
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
