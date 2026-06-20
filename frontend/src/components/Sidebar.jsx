import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Code2, Bug,
  Network, Bot, Settings, Terminal, LogOut,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import axios from '../api/axios';

const NAV_ITEMS = [
  { label: 'WORKSPACE', links: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ]},
  { label: 'TOOLS', links: [
    { to: '/notes',    icon: FileText, label: 'Notes'           },
    { to: '/snippets', icon: Code2,    label: 'Snippets'        },
    { to: '/bugs',     icon: Bug,      label: 'Bug Journal'     },
    { to: '/graph',    icon: Network,  label: 'Knowledge Graph' },
    { to: '/ai',       icon: Bot,      label: 'AI Assistant'    },
  ]},
  { label: 'SYSTEM', links: [
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]},
];

const S = {
  bg:           '#110202',
  border:       '#2d0a0a',
  text:         '#fff5f5',
  textMid:      '#d4b8b8',
  textDim:      '#7a5a5a',
  crimson:      '#dc2626',
  crimsonLight: '#f87171',
  crimsonSoft:  'rgba(239,68,68,0.12)',
  crimsonBorder:'rgba(239,68,68,0.25)',
  mono:         "'Geist Mono', monospace",
};

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
      height: '100vh', width: 252,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      background: S.bg,
      borderRight: `1px solid rgba(255,255,255,0.08)`,
    }}>

      {/* Logo */}
      <div style={{ padding: '24px 22px 20px', borderBottom: `1px solid #2d0a0a` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: S.crimsonSoft,
            border: `1px solid ${S.crimsonBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Terminal style={{ width: 15, height: 15, color: S.crimsonLight }} />
          </div>
          <div>
            <h1 style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: S.text, margin: 0,
              fontFamily: S.mono,
            }}>
              NeuroStack
            </h1>
            <p style={{
              fontSize: 9, color: S.textDim, margin: '2px 0 0',
              letterSpacing: '0.12em', fontFamily: S.mono,
            }}>
              DEV OS
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        {NAV_ITEMS.map((section) => (
          <div key={section.label} style={{ marginBottom: 24 }}>
            <p style={{
              fontSize: 9, color: S.textDim, letterSpacing: '0.18em',
              fontWeight: 600, padding: '0 12px', marginBottom: 8,
              textTransform: 'uppercase', fontFamily: S.mono,
            }}>
              {section.label}
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.links.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/dashboard'}
                    style={({ isActive }) => ({
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', borderRadius: 8,
                      fontSize: 13, textDecoration: 'none',
                      transition: 'all 0.15s',
                      background: isActive ? S.crimsonSoft : 'transparent',
                      border: `1px solid ${isActive ? S.crimsonBorder : 'transparent'}`,
                      color: isActive ? '#fca5a5' : S.textDim,
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon style={{
                          width: 15, height: 15, flexShrink: 0,
                          color: isActive ? S.crimsonLight : S.textDim,
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

      {/* User */}
      <div style={{ padding: '16px 18px', borderTop: `1px solid #2d0a0a` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: S.crimsonSoft,
            border: `1px solid ${S.crimsonBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: S.crimsonLight, fontSize: 13, fontWeight: 700,
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: S.text, fontSize: 13, fontWeight: 500, margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.name}
            </p>
            <p style={{
              color: S.textDim, fontSize: 11, margin: '2px 0 0',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, borderRadius: 8, color: S.textDim,
              transition: 'color 0.15s',
            }}
            onMouseOver={e => e.currentTarget.style.color = S.crimsonLight}
            onMouseOut={e => e.currentTarget.style.color = S.textDim}
          >
            <LogOut style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
