import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#0d0205',
      fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
    }}>
      <Sidebar />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        background: '#0d0205',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
