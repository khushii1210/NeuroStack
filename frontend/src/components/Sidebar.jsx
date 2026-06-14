import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Code2, Bug,
  Network, Bot, Settings, Zap, LogOut,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import axios from '../api/axios';

const NAV_ITEMS = [
  { label: 'WORKSPACE', links: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', activeColor: '#adc6ff' },
  ]},
  { label: 'TOOLS', links: [
    { to: '/notes', icon: FileText, label: 'Notes', activeColor: '#3cddc7' },
    { to: '/snippets', icon: Code2, label: 'Snippets', activeColor: '#ddb7ff' },
    { to: '/bugs', icon: Bug, label: 'Bug Journal', activeColor: '#ffb4ab' },
    { to: '/graph', icon: Network, label: 'Knowledge Graph', activeColor: '#adc6ff' },
    { to: '/ai', icon: Bot, label: 'AI Assistant', activeColor: '#ddb7ff' },
  ]},
  { label: 'SYSTEM', links: [
    { to: '/settings', icon: Settings, label: 'Settings', activeColor: '#8c909f' },
  ]},
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      height: '100vh',
      width: 252,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      background: '#0b1326',
      borderRight: '1px solid #1E293B',
    }}>
      <div style={{ padding: '24px 22px 20px', borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #9fc2fb, #51c3f8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Zap style={{ width: 16, height: 16, color: '#fff' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#adc6ff',
              margin: 0,
            }}>
              NeuroStack
            </h1>
            <p style={{
              fontSize: 10,
              color: '#475569',
              margin: '2px 0 0',
              letterSpacing: '0.12em',
              fontFamily: 'monospace',
            }}>
              DEV OS
            </p>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        {NAV_ITEMS.map((section) => (
          <div key={section.label} style={{ marginBottom: 24 }}>
            <p style={{
              fontSize: 9,
              color: '#475569',
              letterSpacing: '0.18em',
              fontWeight: 600,
              padding: '0 12px',
              marginBottom: 8,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}>
              {section.label}
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {section.links.map(({ to, icon: Icon, label, activeColor }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/dashboard'}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 10,
                      fontSize: 13,
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      background: isActive ? 'rgba(173,198,255,0.08)' : 'transparent',
                      border: isActive ? '1px solid rgba(173,198,255,0.15)' : '1px solid transparent',
                      color: isActive ? '#dae2fd' : '#8c909f',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon style={{
                          width: 16,
                          height: 16,
                          flexShrink: 0,
                          color: isActive ? activeColor : '#64748b',
                        }} />
                        <span>{label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div style={{ padding: '18px 20px', borderTop: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #9fc2fb, #51c3f8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#002e6a',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: '#dae2fd',
              fontSize: 13,
              fontWeight: 500,
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {user?.name}
            </p>
            <p style={{
              color: '#475569',
              fontSize: 11,
              margin: '2px 0 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 8,
              color: '#64748b',
              transition: 'color 0.15s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#ffb4ab'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#64748b'; }}
          >
            <LogOut style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
