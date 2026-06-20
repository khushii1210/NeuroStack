import { useEffect, useState } from 'react';
import { FileText, Code2, Bug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStats } from '../api/dashboard';
import useAuthStore from '../store/authStore';

const S = {
  surface:  'rgba(255,255,255,0.06)',
  border:   'rgba(255,255,255,0.10)',
  text:          '#fff5f5',
  textDim:       '#7a5a5a',
  mono:          "'Geist Mono', monospace",
  crimsonLight:  '#f87171',
};

const SEV_COLOR = {
  low:      '#4ade80',
  medium:   '#fbbf24',
  high:     '#fb923c',
  critical: '#f87171',
};

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div style={{
      background: S.surface,
      border: `1px solid ${S.border}`,
      borderRadius: 14,
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: `${color}18`,
        border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: 20, height: 20, color }} />
      </div>
      <div>
        <p style={{
          color: S.textDim, fontSize: 10, margin: 0,
          letterSpacing: '0.1em', fontFamily: S.mono, textTransform: 'uppercase',
        }}>
          {label}
        </p>
        <p style={{
          color: S.text, fontSize: 26, fontWeight: 700,
          margin: '4px 0 0', letterSpacing: '-0.02em',
        }}>
          {value}
        </p>
        {sub && <p style={{ color: S.textDim, fontSize: 11, margin: '3px 0 0' }}>{sub}</p>}
      </div>
    </div>
  );
}

function SectionCard({ title, onViewAll, children }) {
  return (
    <div style={{
      background: S.surface,
      border: `1px solid ${S.border}`,
      borderRadius: 14,
      padding: '22px 24px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 18,
      }}>
        <h3 style={{ color: S.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{title}</h3>
        <button
          onClick={onViewAll}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: S.crimsonLight, fontSize: 11, fontFamily: S.mono, padding: 0,
          }}
        >
          View all →
        </button>
      </div>
      {children}
    </div>
  );
}

function ListItem({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <li
      onClick={onClick}
      onMouseOver={() => setHov(true)}
      onMouseOut={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '10px 12px', borderRadius: 8,
        cursor: 'pointer', listStyle: 'none',
        background: hov ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov ? 'rgba(239,68,68,0.15)' : 'transparent'}`,
        transition: 'all 0.15s',
      }}
    >
      {children}
    </li>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      fontSize: 10, padding: '2px 7px', borderRadius: 4,
      background: `${color}15`,
      border: `1px solid ${color}30`,
      color, fontFamily: S.mono,
    }}>
      {children}
    </span>
  );
}

function Empty({ text }) {
  return <p style={{ color: S.textDim, fontSize: 13, margin: 0 }}>{text}</p>;
}

export default function DashboardPage() {
  const user = useAuthStore(s => s.user);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(r => setStats(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '40px 48px 48px', minHeight: '100vh' }}>

      {/* header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          color: S.textDim, fontSize: 10, fontFamily: S.mono,
          letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px',
        }}>
          Workspace
        </p>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent" style={{ margin: 0 }}>
          Welcome back, {user?.name}
        </h1>
        <p style={{ color: S.textDim, fontSize: 14, margin: '8px 0 0' }}>
          Your knowledge at a glance
        </p>
      </div>

      {loading ? (
        <p style={{ color: S.textDim, fontSize: 13, fontFamily: S.mono }}>Loading...</p>
      ) : (
        <>
          {/* stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
            <StatCard icon={FileText} label="Total Notes"  value={stats?.totalNotes ?? 0}   color="#f87171" />
            <StatCard icon={Code2}    label="Snippets"     value={stats?.totalSnippets ?? 0} color="#fb923c" />
            <StatCard
              icon={Bug} label="Bugs" value={stats?.totalBugs ?? 0}
              sub={`${stats?.openBugs ?? 0} open · ${stats?.resolvedBugs ?? 0} resolved`}
              color="#fbbf24"
            />
          </div>

          {/* section cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>

            {/* notes */}
            <SectionCard title="Recent Notes" onViewAll={() => navigate('/notes')}>
              {!stats?.recentNotes?.length ? <Empty text="No notes yet." /> : (
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {stats.recentNotes.map(n => (
                    <ListItem key={n.id} onClick={() => navigate('/notes')}>
                      <FileText style={{ width: 14, height: 14, color: '#f87171', flexShrink: 0, marginTop: 2 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{
                          color: S.text, fontSize: 12, fontWeight: 500,
                          margin: '0 0 4px', overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {n.title}
                        </p>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {n.tags?.slice(0, 3).map(t => <Tag key={t} color="#f87171">{t}</Tag>)}
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              )}
            </SectionCard>

            {/* snippets */}
            <SectionCard title="Recent Snippets" onViewAll={() => navigate('/snippets')}>
              {!stats?.recentSnippets?.length ? <Empty text="No snippets yet." /> : (
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {stats.recentSnippets.map(s => (
                    <ListItem key={s.id} onClick={() => navigate('/snippets')}>
                      <Code2 style={{ width: 14, height: 14, color: '#fb923c', flexShrink: 0, marginTop: 2 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{
                          color: S.text, fontSize: 12, fontWeight: 500,
                          margin: '0 0 4px', overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {s.title}
                        </p>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          <Tag color="#fb923c">{s.language}</Tag>
                          {s.tags?.slice(0, 2).map(t => <Tag key={t} color="#fb923c">{t}</Tag>)}
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              )}
            </SectionCard>

            {/* bugs */}
            <SectionCard title="Open Bugs" onViewAll={() => navigate('/bugs')}>
              {!stats?.recentBugs?.length ? <Empty text="No open bugs. Nice work!" /> : (
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {stats.recentBugs.map(b => {
                    const c = SEV_COLOR[b.severity] || '#fbbf24';
                    return (
                      <ListItem key={b.id} onClick={() => navigate('/bugs')}>
                        <Bug style={{ width: 14, height: 14, color: '#fbbf24', flexShrink: 0, marginTop: 2 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{
                            color: S.text, fontSize: 12, fontWeight: 500,
                            margin: '0 0 4px', overflow: 'hidden',
                            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {b.title}
                          </p>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            <Tag color={c}>{b.severity}</Tag>
                            {b.tags?.slice(0, 2).map(t => <Tag key={t} color={c}>{t}</Tag>)}
                          </div>
                        </div>
                      </ListItem>
                    );
                  })}
                </ul>
              )}
            </SectionCard>

          </div>
        </>
      )}
    </div>
  );
}
