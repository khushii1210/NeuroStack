import { useState, useEffect } from 'react';
import { Plus, Bug, Save, X, Trash2, AlertTriangle, Clock, CheckCircle2, Tag } from 'lucide-react';
import { getBugs, createBug, updateBug, deleteBug } from '../api/bugs';
import LayoutToggle from '../components/LayoutToggle';
import { useLayoutView, getLayoutContainerStyle, getLayoutVisibility } from '../hooks/useLayoutView';

const S = {
  surface: '#0b1326',
  border: '#1E293B',
  text: '#dae2fd',
  muted: '#8c909f',
  dim: '#475569',
  accent: '#adc6ff',
  coral: '#ffb4ab',
  orange: '#fb923c',
};

const SEV_STYLES = {
  low: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80', dot: '#4ade80' },
  medium: { bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.25)', color: '#facc15', dot: '#facc15' },
  high: { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.25)', color: '#fb923c', dot: '#fb923c' },
  critical: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.25)', color: '#f87171', dot: '#f87171' },
};

const STATUS_STYLES = {
  open: { icon: AlertTriangle, color: '#f87171', label: 'Open' },
  in_progress: { icon: Clock, color: '#facc15', label: 'In Progress' },
  resolved: { icon: CheckCircle2, color: '#4ade80', label: 'Resolved' },
};

const TAG_STYLES = [
  { bg: 'rgba(255,180,171,0.12)', border: 'rgba(255,180,171,0.25)', color: '#ffb4ab' },
  { bg: 'rgba(173,198,255,0.12)', border: 'rgba(173,198,255,0.25)', color: '#adc6ff' },
  { bg: 'rgba(221,183,255,0.12)', border: 'rgba(221,183,255,0.25)', color: '#ddb7ff' },
  { bg: 'rgba(60,221,199,0.12)', border: 'rgba(60,221,199,0.25)', color: '#3cddc7' },
];

const STATUS_ORDER = ['open', 'in_progress', 'resolved'];

const selectStyle = {
  padding: '10px 14px',
  borderRadius: 10,
  background: '#020617',
  border: '1px solid #1E293B',
  color: '#dae2fd',
  fontSize: 13,
  outline: 'none',
  fontFamily: 'inherit',
  textTransform: 'capitalize',
};

function severityBadgeStyle(severity) {
  const c = SEV_STYLES[severity] || SEV_STYLES.medium;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 10,
    padding: '3px 10px',
    borderRadius: 20,
    fontFamily: 'monospace',
    textTransform: 'capitalize',
    background: c.bg,
    border: `1px solid ${c.border}`,
    color: c.color,
  };
}

function BugJournalPage() {
  const [bugs, setBugs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', description: '', severity: 'medium',
    status: 'open', solution: '', tags: '',
  });
  const [layout, setLayout] = useLayoutView('bugs', 'list');

  useEffect(() => {
    if (selectedBug) {
      window.history.pushState({ detail: true }, '');
      const handler = () => setSelectedBug(null);
      window.addEventListener('popstate', handler);
      return () => window.removeEventListener('popstate', handler);
    }
  }, [selectedBug]);

  useEffect(() => { fetchBugs(); }, []);

  const fetchBugs = async () => {
    try {
      const res = await getBugs();
      setBugs(res.data);
    } catch {
      setError('Failed to load bugs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    try {
      const res = await createBug({
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      });
      setBugs([res.data, ...bugs]);
      setCreating(false);
      setForm({ title: '', description: '', severity: 'medium', status: 'open', solution: '', tags: '' });
      setError('');
    } catch {
      setError('Failed to create bug');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBug(id);
      setBugs(bugs.filter((b) => b.id !== id));
    } catch {
      setError('Failed to delete bug');
    }
  };

  const cycleStatus = async (bug) => {
    const next = STATUS_ORDER[(STATUS_ORDER.indexOf(bug.status) + 1) % STATUS_ORDER.length];
    try {
      const res = await updateBug(bug.id, { ...bug, status: next });
      setBugs(bugs.map((b) => (b.id === bug.id ? res.data : b)));
    } catch {
      setError('Failed to update status');
    }
  };

  const filtered = bugs.filter((b) => filter === 'all' || b.status === filter);

  const counts = {
    open: bugs.filter((b) => b.status === 'open').length,
    in_progress: bugs.filter((b) => b.status === 'in_progress').length,
    resolved: bugs.filter((b) => b.status === 'resolved').length,
  };

  const visibility = getLayoutVisibility(layout);
  const cardPadding = layout === 'triple' ? '16px 18px' : layout === 'double' ? '20px 22px' : '24px 26px';

  // Detail view
  if (selectedBug) {
    const bug = bugs.find(b => b.id === selectedBug) || {};
    const sev = SEV_STYLES[bug.severity] || SEV_STYLES.medium;
    const stat = STATUS_STYLES[bug.status] || STATUS_STYLES.open;
    const StatIcon = stat.icon;
    return (
      <div style={{ padding: '40px 48px 48px', minHeight: '100vh' }}>
        <button
          type="button"
          onClick={() => setSelectedBug(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: S.muted, fontSize: 13, fontFamily: 'monospace',
            marginBottom: 32, padding: 0,
          }}
          onMouseOver={e => { e.currentTarget.style.color = S.text; }}
          onMouseOut={e => { e.currentTarget.style.color = S.muted; }}
        >
          ← Back to Bug Journal
        </button>
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ color: S.text, fontSize: 28, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.3 }}>
            {bug.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            <span style={severityBadgeStyle(bug.severity)}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: sev.dot }} />
              {bug.severity}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, padding: '3px 10px', borderRadius: 20, fontFamily: 'monospace', border: `1px solid ${S.border}`, color: stat.color }}>
              <StatIcon size={10} /> {stat.label}
            </span>
            {bug.tags?.map((tag, i) => {
              const ts = TAG_STYLES[i % TAG_STYLES.length];
              return (
                <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, padding: '3px 10px', borderRadius: 20, fontFamily: 'monospace', background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>
                  <Tag size={10} /> {tag}
                </span>
              );
            })}
          </div>
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: '28px 32px', marginBottom: 20 }}>
            <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
              {bug.description}
            </p>
          </div>
          {bug.solution && (
            <div style={{ background: '#020617', border: `1px solid ${S.border}`, borderRadius: 16, padding: '20px 24px' }}>
              <p style={{ color: S.dim, fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.08em', margin: '0 0 12px' }}>SOLUTION</p>
              <pre style={{ color: '#4ade80', fontSize: 13, fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {bug.solution}
              </pre>
            </div>
          )}
          <p style={{ color: S.dim, fontSize: 11, fontFamily: 'monospace', marginTop: 16 }}>
            Logged {new Date(bug.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  const filterTabs = [
    { key: 'all', label: `All (${bugs.length})` },
    { key: 'open', label: `Open (${counts.open})` },
    { key: 'in_progress', label: `In Progress (${counts.in_progress})` },
    { key: 'resolved', label: `Resolved (${counts.resolved})` },
  ];

  return (
    <div style={{ padding: '40px 48px 48px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 32,
        gap: 20,
      }}>
        <div>
          <p style={{
            color: S.muted,
            fontSize: 12,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: '0 0 8px',
          }}>
            Tools
          </p>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent" style={{ margin: 0 }}>
            Bug Journal
          </h1>
          <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0' }}>
            {counts.open} open · {counts.in_progress} in progress · {counts.resolved} resolved
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            borderRadius: 10,
            border: 'none',
            background: '#adc6ff',
            color: '#002e6a',
            fontWeight: 700,
            fontSize: 13,
            fontFamily: 'monospace',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Plus size={16} />
          Log Bug
        </button>
      </div>

      {error && (
        <div style={{
          marginBottom: 24,
          padding: '14px 18px',
          borderRadius: 10,
          fontSize: 14,
          color: S.coral,
          background: 'rgba(255,100,100,0.08)',
          border: '1px solid rgba(255,100,100,0.25)',
        }}>
          {error}
        </div>
      )}

      {/* Filter tabs + layout */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 28,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {filterTabs.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  border: active ? '1px solid rgba(255,180,171,0.35)' : `1px solid ${S.border}`,
                  background: active ? 'rgba(255,180,171,0.12)' : 'transparent',
                  color: active ? S.coral : S.dim,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <LayoutToggle layout={layout} onChange={setLayout} />
      </div>

      {/* Create form */}
      {creating && (
        <div style={{
          background: S.surface,
          border: '1px solid rgba(255,180,171,0.25)',
          borderRadius: 16,
          padding: '28px 30px',
          marginBottom: 28,
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        }}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Bug title..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${S.border}`,
              color: S.text,
              fontSize: 20,
              fontWeight: 600,
              outline: 'none',
              padding: '0 0 14px',
              marginBottom: 20,
              fontFamily: 'inherit',
            }}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What went wrong?"
            rows={3}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: S.muted,
              fontSize: 14,
              lineHeight: 1.7,
              outline: 'none',
              resize: 'vertical',
              marginBottom: 20,
              fontFamily: 'inherit',
            }}
          />
          <textarea
            value={form.solution}
            onChange={(e) => setForm({ ...form, solution: e.target.value })}
            placeholder="Solution or notes (optional)..."
            rows={4}
            style={{
              width: '100%',
              background: '#020617',
              border: `1px solid ${S.border}`,
              borderRadius: 10,
              color: '#4ade80',
              fontSize: 12,
              fontFamily: 'monospace',
              lineHeight: 1.6,
              outline: 'none',
              resize: 'vertical',
              padding: '16px 18px',
              marginBottom: 20,
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <select
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: e.target.value })}
              style={selectStyle}
            >
              {['low', 'medium', 'high', 'critical'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={selectStyle}
            >
              {['open', 'in_progress', 'resolved'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Tags (comma separated)"
              style={{
                flex: 1,
                minWidth: 200,
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${S.border}`,
                color: S.dim,
                fontSize: 13,
                fontFamily: 'monospace',
                outline: 'none',
                padding: '0 0 10px',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={handleCreate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 10,
                border: '1px solid rgba(255,180,171,0.35)',
                background: 'rgba(255,180,171,0.12)',
                color: S.coral,
                fontSize: 13,
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              <Save size={15} />
              Save Bug
            </button>
            <button
              type="button"
              onClick={() => setCreating(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 10,
                border: `1px solid ${S.border}`,
                background: 'transparent',
                color: S.muted,
                fontSize: 13,
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bug list */}
      {loading ? (
        <p style={{ color: S.dim, fontSize: 14, fontFamily: 'monospace' }}>Loading bugs...</p>
      ) : filtered.length === 0 ? (
        <div style={{
          background: S.surface,
          border: `1px solid ${S.border}`,
          borderRadius: 16,
          padding: '48px 32px',
          textAlign: 'center',
        }}>
          <Bug size={32} style={{ color: S.dim, marginBottom: 16 }} />
          <p style={{ color: S.muted, fontSize: 15, margin: 0 }}>No bugs found.</p>
          <p style={{ color: S.dim, fontSize: 13, margin: '8px 0 0' }}>
            Log your first bug to start building your debugging knowledge base.
          </p>
        </div>
      ) : (
        <div style={getLayoutContainerStyle(layout)}>
          {filtered.map((bug) => {
            const sev = SEV_STYLES[bug.severity] || SEV_STYLES.medium;
            const stat = STATUS_STYLES[bug.status] || STATUS_STYLES.open;
            const StatIcon = stat.icon;

            return (
              <div
                key={bug.id}
                style={{
                  background: S.surface,
                  border: `1px solid ${S.border}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                  transition: 'border-color 0.15s',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(255,180,171,0.2)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = S.border; }}
                onClick={() => setSelectedBug(bug.id)}
              >
                <div style={{ padding: cardPadding, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  {layout !== 'triple' && <Bug size={16} style={{ color: S.coral, flexShrink: 0, marginTop: 2 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ color: S.text, fontSize: layout === 'triple' ? 14 : 15, fontWeight: 600, margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: layout === 'triple' ? 'normal' : 'nowrap' }}>
                      {bug.title}
                    </h3>
                    {visibility.showDescription && bug.description && (
                      <p style={{ color: S.muted, fontSize: 13, lineHeight: 1.6, margin: '8px 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {bug.description}
                      </p>
                    )}
                    {visibility.showTags && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                        <span style={severityBadgeStyle(bug.severity)}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: sev.dot, flexShrink: 0 }} />
                          {bug.severity}
                        </span>
                        {bug.tags.map((tag, i) => {
                          const tagStyle = TAG_STYLES[i % TAG_STYLES.length];
                          return (
                            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, padding: '3px 10px', borderRadius: 20, fontFamily: 'monospace', background: tagStyle.bg, border: `1px solid ${tagStyle.border}`, color: tagStyle.color }}>
                              <Tag size={10} /> {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    {layout !== 'triple' && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); cycleStatus(bug); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'monospace', padding: '6px 12px', borderRadius: 8, border: `1px solid ${S.border}`, background: '#020617', color: stat.color, cursor: 'pointer' }}
                      >
                        <StatIcon size={13} /> {stat.label}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDelete(bug.id); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: S.dim }}
                      onMouseOver={(e) => { e.currentTarget.style.color = S.coral; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = S.dim; }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BugJournalPage;
