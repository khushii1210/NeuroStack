import { useEffect, useState } from 'react';
import { FileText, Code2, Bug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStats } from '../api/dashboard';
import useAuthStore from '../store/authStore';

const S = {
  bg: '#020617',
  surface: '#0b1326',
  surfaceAlt: '#171f33',
  border: '#1E293B',
  text: '#dae2fd',
  muted: '#8c909f',
  dim: '#475569',
  accent: '#adc6ff',
  cyan: '#3cddc7',
  purple: '#ddb7ff',
  coral: '#ffb4ab',
};

const SEV = {
  low: { bg: 'rgba(60,221,199,0.08)', border: 'rgba(60,221,199,0.25)', color: '#3cddc7' },
  medium: { bg: 'rgba(173,198,255,0.08)', border: 'rgba(173,198,255,0.25)', color: '#adc6ff' },
  high: { bg: 'rgba(255,180,171,0.08)', border: 'rgba(255,180,171,0.25)', color: '#ffb4ab' },
  critical: { bg: 'rgba(255,100,100,0.08)', border: 'rgba(255,100,100,0.25)', color: '#ffb4ab' },
};

function StatCard({ icon: Icon, label, value, sub, accentBg, accentColor }) {
  return (
    <div style={{
      background: S.surface,
      border: `1px solid ${S.border}`,
      borderRadius: 16,
      padding: '24px 26px',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: accentBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: `1px solid ${S.border}`,
      }}>
        <Icon style={{ width: 22, height: 22, color: accentColor }} />
      </div>
      <div>
        <p style={{
          color: S.muted,
          fontSize: 11,
          margin: 0,
          letterSpacing: '0.1em',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
        }}>
          {label}
        </p>
        <p style={{
          color: S.text,
          fontSize: 28,
          fontWeight: 700,
          margin: '6px 0 0',
          letterSpacing: '-0.02em',
        }}>
          {value}
        </p>
        {sub && (
          <p style={{ color: S.dim, fontSize: 12, margin: '4px 0 0' }}>{sub}</p>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, onViewAll, accentColor, children }) {
  return (
    <div style={{
      background: S.surface,
      border: `1px solid ${S.border}`,
      borderRadius: 16,
      padding: '24px 26px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      height: '100%',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <h3 style={{ color: S.text, fontSize: 15, fontWeight: 600, margin: 0 }}>{title}</h3>
        <button
          onClick={onViewAll}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: accentColor,
            fontSize: 12,
            fontFamily: 'monospace',
            padding: 0,
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
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '12px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        background: hovered ? 'rgba(173,198,255,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(173,198,255,0.12)' : 'transparent'}`,
        transition: 'all 0.15s',
        listStyle: 'none',
      }}
    >
      {children}
    </li>
  );
}

function EmptyState({ text }) {
  return <p style={{ color: S.dim, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{text}</p>;
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      padding: '40px 48px 48px',
      minHeight: '100vh',
      background: 'transparent',
    }}>
      <div style={{ marginBottom: 36 }}>
        <p style={{
          color: S.muted,
          fontSize: 12,
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 8px',
        }}>
          Workspace
        </p>
        <h1 style={{
          color: S.text,
          fontSize: 26,
          fontWeight: 700,
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Welcome back, {user?.name}
        </h1>
        <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0', lineHeight: 1.6 }}>
          Your knowledge at a glance
        </p>
      </div>

      {loading ? (
        <p style={{ color: S.dim, fontSize: 14, fontFamily: 'monospace' }}>Loading...</p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 28,
          }}>
            <StatCard
              icon={FileText}
              label="Total Notes"
              value={stats?.totalNotes ?? 0}
              accentBg="rgba(60,221,199,0.12)"
              accentColor={S.cyan}
            />
            <StatCard
              icon={Code2}
              label="Snippets"
              value={stats?.totalSnippets ?? 0}
              accentBg="rgba(221,183,255,0.12)"
              accentColor={S.purple}
            />
            <StatCard
              icon={Bug}
              label="Bugs"
              value={stats?.totalBugs ?? 0}
              sub={`${stats?.openBugs ?? 0} open · ${stats?.resolvedBugs ?? 0} resolved`}
              accentBg="rgba(255,180,171,0.12)"
              accentColor={S.coral}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            <SectionCard title="Recent Notes" onViewAll={() => navigate('/notes')} accentColor={S.cyan}>
              {!stats?.recentNotes?.length ? (
                <EmptyState text="No notes yet." />
              ) : (
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stats.recentNotes.map((note) => (
                    <ListItem key={note.id} onClick={() => navigate('/notes')}>
                      <FileText style={{ width: 15, height: 15, color: S.cyan, flexShrink: 0, marginTop: 2 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ color: S.text, fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {note.title}
                        </p>
                        {note.tags?.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 5 }}>
                            {note.tags.slice(0, 3).map(tag => (
                              <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(60,221,199,0.1)', border: '1px solid rgba(60,221,199,0.2)', color: S.cyan, fontFamily: 'monospace' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </ListItem>
                  ))}
                </ul>
              )}
            </SectionCard>

            <SectionCard title="Recent Snippets" onViewAll={() => navigate('/snippets')} accentColor={S.purple}>
              {!stats?.recentSnippets?.length ? (
                <EmptyState text="No snippets yet." />
              ) : (
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stats.recentSnippets.map((snippet) => (
                    <ListItem key={snippet.id} onClick={() => navigate('/snippets')}>
                      <Code2 style={{ width: 15, height: 15, color: S.purple, flexShrink: 0, marginTop: 2 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ color: S.text, fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {snippet.title}
                        </p>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 5 }}>
                          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(221,183,255,0.12)', border: '1px solid rgba(221,183,255,0.25)', color: S.purple, fontFamily: 'monospace' }}>
                            {snippet.language}
                          </span>
                          {snippet.tags?.slice(0, 2).map(tag => (
                            <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(221,183,255,0.08)', border: '1px solid rgba(221,183,255,0.15)', color: S.purple, fontFamily: 'monospace' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              )}
            </SectionCard>

            <SectionCard title="Open Bugs" onViewAll={() => navigate('/bugs')} accentColor={S.coral}>
              {!stats?.recentBugs?.length ? (
                <EmptyState text="No open bugs. Nice work!" />
              ) : (
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stats.recentBugs.map((bug) => {
                    const sev = SEV[bug.severity] || SEV.medium;
                    return (
                      <ListItem key={bug.id} onClick={() => navigate('/bugs')}>
                        <Bug style={{ width: 15, height: 15, color: S.coral, flexShrink: 0, marginTop: 2 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ color: S.text, fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {bug.title}
                          </p>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 5 }}>
                            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: sev.bg, border: `1px solid ${sev.border}`, color: sev.color, fontFamily: 'monospace', textTransform: 'uppercase' }}>
                              {bug.severity}
                            </span>
                            {bug.tags?.slice(0, 2).map(tag => (
                              <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(255,180,171,0.08)', border: '1px solid rgba(255,180,171,0.2)', color: S.coral, fontFamily: 'monospace' }}>
                                {tag}
                              </span>
                            ))}
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
