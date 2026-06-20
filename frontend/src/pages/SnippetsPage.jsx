import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit3, Save, X, Code2, Copy, Check, Tag } from 'lucide-react';
import { getSnippets, createSnippet, updateSnippet, deleteSnippet } from '../api/snippets';
import LayoutToggle from '../components/LayoutToggle';
import { useLayoutView, getLayoutContainerStyle, getLayoutVisibility } from '../hooks/useLayoutView';

const S = {
  surface:       'rgba(255,255,255,0.06)',
  border:        'rgba(255,255,255,0.10)',
  text:          '#fff5f5',
  muted:         '#d4b8b8',
  dim:           '#7a5a5a',
  accent:        '#f87171',
  crimson:       '#dc2626',
  crimsonLight:  '#f87171',
  crimsonSoft:   'rgba(239,68,68,0.12)',
  crimsonBorder: 'rgba(239,68,68,0.25)',
  mono:          "'Geist Mono', monospace",
};

const TAG_STYLES = [
  { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.25)',  color: '#f87171' },
  { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.25)', color: '#fb923c' },
  { bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.25)', color: '#fbbf24' },
  { bg: 'rgba(255,255,255,0.08)',border: 'rgba(255,255,255,0.15)',color: '#d4b8b8' },
];

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: 10,
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.10)',
  color: '#fff5f5',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const LANGUAGES = ['javascript', 'typescript', 'python', 'sql', 'bash', 'css', 'go', 'other'];

const LANG_COLORS = {
  javascript: { bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.25)', color: '#facc15' },
  typescript: { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.25)', color: '#60a5fa' },
  python: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80' },
  sql: { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.25)', color: '#fb923c' },
  bash: { bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.25)', color: '#c084fc' },
  css: { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.25)', color: '#f472b6' },
  go: { bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.25)', color: '#22d3ee' },
  other: { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.25)', color: '#94a3b8' },
};

const selectStyle = {
  padding: '10px 14px',
  borderRadius: 10,
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.10)',
  color: '#fff5f5',
  fontSize: 13,
  outline: 'none',
  fontFamily: 'inherit',
};

function langBadgeStyle(language) {
  const c = LANG_COLORS[language] || LANG_COLORS.other;
  return {
    display: 'inline-flex',
    alignItems: 'center',
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

function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', code: '', language: 'javascript', description: '', tags: '' });
  const [layout, setLayout] = useLayoutView('snippets', 'double');

  const fetchSnippets = async () => {
    try {
      const res = await getSnippets();
      setSnippets(res.data);
    } catch {
      setError('Failed to load snippets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSnippets(); }, []);

  useEffect(() => {
    if (!selectedSnippet) return;
    window.history.pushState({ detail: true }, '');
    const handler = () => setTimeout(() => setSelectedSnippet(null), 0);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [selectedSnippet]);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.code.trim()) return;
    try {
      const res = await createSnippet({
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      });
      setSnippets([res.data, ...snippets]);
      setCreating(false);
      setForm({ title: '', code: '', language: 'javascript', description: '', tags: '' });
      setError('');
    } catch {
      setError('Failed to create snippet');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateSnippet(id, {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      });
      setSnippets(snippets.map((s) => (s.id === id ? res.data : s)));
      setEditingId(null);
      setForm({ title: '', code: '', language: 'javascript', description: '', tags: '' });
      setError('');
    } catch {
      setError('Failed to update snippet');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSnippet(id);
      setSnippets(snippets.filter((s) => s.id !== id));
    } catch {
      setError('Failed to delete snippet');
    }
  };

  const startEdit = (snippet) => {
    setEditingId(snippet.id);
    setForm({
      title: snippet.title,
      code: snippet.code,
      language: snippet.language,
      description: snippet.description,
      tags: snippet.tags.join(', '),
    });
  };

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const visibility = getLayoutVisibility(layout);

  const cardPadding = layout === 'triple' ? '16px 18px' : layout === 'double' ? '20px 22px' : '24px 26px';

  // Detail view
  if (selectedSnippet) {
    const snippet = snippets.find(s => s.id === selectedSnippet) || {};
    const lc = LANG_COLORS[snippet.language] || LANG_COLORS.other;
    return (
      <div style={{ padding: '40px 48px 48px', minHeight: '100vh' }}>
        <button
          type="button"
          onClick={() => setSelectedSnippet(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: S.muted, fontSize: 13, fontFamily: 'monospace',
            marginBottom: 32, padding: 0,
          }}
          onMouseOver={e => { e.currentTarget.style.color = S.text; }}
          onMouseOut={e => { e.currentTarget.style.color = S.muted; }}
        >
          ← Back to Snippets
        </button>
        <div style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h1 style={{ color: S.text, fontSize: 28, fontWeight: 700, margin: 0 }}>{snippet.title}</h1>
            <span style={langBadgeStyle(snippet.language)}>{snippet.language}</span>
          </div>
          {snippet.description && (
            <p style={{ color: S.muted, fontSize: 14, margin: '0 0 16px', lineHeight: 1.6 }}>{snippet.description}</p>
          )}
          {snippet.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {snippet.tags.map((tag, i) => {
                const ts = TAG_STYLES[i % TAG_STYLES.length];
                return (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, padding: '3px 10px', borderRadius: 20, fontFamily: 'monospace', background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>
                    <Tag size={10} /> {tag}
                  </span>
                );
              })}
            </div>
          )}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${S.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: `1px solid ${S.border}` }}>
              <span style={{ color: lc.color, fontSize: 11, fontFamily: 'monospace' }}>{snippet.language}</span>
              <button
                type="button"
                onClick={() => handleCopy(snippet.id, snippet.code)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: S.dim, fontSize: 12, fontFamily: 'monospace' }}
                onMouseOver={e => { e.currentTarget.style.color = S.crimsonLight; }}
                onMouseOut={e => { e.currentTarget.style.color = S.dim; }}
              >
                {copiedId === snippet.id ? <Check size={14} style={{ color: '#4ade80' }} /> : <Copy size={14} />}
                {copiedId === snippet.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre style={{ color: '#4ade80', fontSize: 13, fontFamily: 'monospace', margin: 0, padding: '24px 24px', overflowX: 'auto', lineHeight: 1.7, whiteSpace: 'pre' }}>
              {snippet.code}
            </pre>
          </div>
          <p style={{ color: S.dim, fontSize: 11, fontFamily: 'monospace', marginTop: 16 }}>
            Saved {new Date(snippet.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

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
            Snippets
          </h1>
          <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0' }}>
            {snippets.length} {snippets.length === 1 ? 'snippet' : 'snippets'} saved
          </p>
        </div>
        <button
          onClick={() => {
            setCreating(true);
            setForm({ title: '', code: '', language: 'javascript', description: '', tags: '' });
            setEditingId(null);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            fontFamily: 'monospace',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Plus size={16} />
          New Snippet
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

      {/* Search + layout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: S.dim,
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets..."
            style={{ ...inputStyle, paddingLeft: 44 }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(239,68,68,0.4)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; }}
          />
        </div>
        <LayoutToggle layout={layout} onChange={setLayout} />
      </div>

      {/* Create form */}
      {creating && (
        <div style={{
          background: S.surface,
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: 16,
          padding: '28px 30px',
          marginBottom: 28,
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-end' }}>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Snippet title..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${S.border}`,
                color: S.text,
                fontSize: 20,
                fontWeight: 600,
                outline: 'none',
                padding: '0 0 14px',
                fontFamily: 'inherit',
              }}
            />
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              style={selectStyle}
            >
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short description..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${S.border}`,
              color: S.muted,
              fontSize: 14,
              outline: 'none',
              padding: '0 0 14px',
              marginBottom: 20,
              fontFamily: 'inherit',
            }}
          />
          <textarea
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="Paste your code here..."
            rows={8}
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.3)',
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
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="Tags (comma separated)"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderTop: `1px solid ${S.border}`,
              color: S.dim,
              fontSize: 13,
              fontFamily: 'monospace',
              outline: 'none',
              padding: '16px 0 0',
              marginBottom: 24,
            }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleCreate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 10,
                border: '1px solid rgba(239,68,68,0.35)',
                background: 'rgba(239,68,68,0.12)',
                color: '#f87171',
                fontSize: 13,
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              <Save size={15} />
              Save
            </button>
            <button
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

      {/* Snippets grid */}
      {loading ? (
        <p style={{ color: S.dim, fontSize: 14, fontFamily: 'monospace' }}>Loading snippets...</p>
      ) : filtered.length === 0 ? (
        <div style={{
          background: S.surface,
          border: `1px solid ${S.border}`,
          borderRadius: 16,
          padding: '48px 32px',
          textAlign: 'center',
        }}>
          <Code2 size={32} style={{ color: S.dim, marginBottom: 16 }} />
          <p style={{ color: S.muted, fontSize: 15, margin: 0 }}>No snippets found.</p>
          <p style={{ color: S.dim, fontSize: 13, margin: '8px 0 0' }}>
            Save your first code snippet to build your reusable library.
          </p>
        </div>
      ) : (
        <div style={getLayoutContainerStyle(layout)}>
          {filtered.map((snippet) => (
            <div
              key={snippet.id}
              style={{
                background: S.surface,
                border: `1px solid ${S.border}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                transition: 'border-color 0.15s',
                cursor: editingId === snippet.id ? 'default' : 'pointer',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = S.border; }}
              onClick={() => { if (editingId !== snippet.id) setSelectedSnippet(snippet.id); }}
            >
              {editingId === snippet.id ? (
                <div style={{ padding: cardPadding }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-end' }}>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        borderBottom: `1px solid ${S.border}`,
                        color: S.text,
                        fontWeight: 600,
                        outline: 'none',
                        padding: '0 0 10px',
                        fontFamily: 'inherit',
                      }}
                    />
                    <select
                      value={form.language}
                      onChange={(e) => setForm({ ...form, language: e.target.value })}
                      style={{ ...selectStyle, padding: '8px 12px', fontSize: 12 }}
                    >
                      {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <textarea
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    rows={6}
                    style={{
                      width: '100%',
                      background: '#020617',
                      border: `1px solid ${S.border}`,
                      borderRadius: 10,
                      color: '#4ade80',
                      fontSize: 12,
                      fontFamily: 'monospace',
                      outline: 'none',
                      resize: 'none',
                      padding: '14px 16px',
                      marginBottom: 14,
                      boxSizing: 'border-box',
                    }}
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => handleUpdate(snippet.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 14px',
                        borderRadius: 8,
                        border: '1px solid rgba(239,68,68,0.35)',
                        background: 'rgba(239,68,68,0.12)',
                        color: S.crimsonLight,
                        fontSize: 12,
                        fontFamily: 'monospace',
                        cursor: 'pointer',
                      }}
                    >
                      <Save size={13} />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 14px',
                        borderRadius: 8,
                        border: `1px solid ${S.border}`,
                        background: 'transparent',
                        color: S.muted,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      <X size={13} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{
                    padding: cardPadding,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                    borderBottom: visibility.showCode ? `1px solid ${S.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, minWidth: 0, flex: 1 }}>
                      {layout !== 'triple' && <Code2 size={16} style={{ color: S.crimsonLight, flexShrink: 0, marginTop: 2 }} />}
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h3 style={{
                          color: S.text,
                          fontSize: layout === 'triple' ? 14 : 15,
                          fontWeight: 600,
                          margin: 0,
                          lineHeight: 1.4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: layout === 'triple' ? 'normal' : 'nowrap',
                        }}>
                          {snippet.title}
                        </h3>
                        {visibility.showDescription && snippet.description && (
                          <p style={{
                            color: S.muted,
                            fontSize: 13,
                            lineHeight: 1.6,
                            margin: '8px 0 0',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {snippet.description}
                          </p>
                        )}
                        {visibility.showTags && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                            <span style={langBadgeStyle(snippet.language)}>{snippet.language}</span>
                            {snippet.tags.map((tag, i) => {
                              const tagStyle = TAG_STYLES[i % TAG_STYLES.length];
                              return (
                                <span
                                  key={tag}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    fontSize: 10,
                                    padding: '3px 10px',
                                    borderRadius: 20,
                                    fontFamily: 'monospace',
                                    background: tagStyle.bg,
                                    border: `1px solid ${tagStyle.border}`,
                                    color: tagStyle.color,
                                  }}
                                >
                                  <Tag size={10} />
                                  {tag}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleCopy(snippet.id, snippet.code); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: S.dim }}
                        onMouseOver={(e) => { e.currentTarget.style.color = S.crimsonLight; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = S.dim; }}
                      >
                        {copiedId === snippet.id ? <Check size={15} style={{ color: '#4ade80' }} /> : <Copy size={15} />}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); startEdit(snippet); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: S.dim }}
                        onMouseOver={(e) => { e.currentTarget.style.color = '#3cddc7'; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = S.dim; }}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDelete(snippet.id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: S.dim }}
                        onMouseOver={(e) => { e.currentTarget.style.color = S.coral; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = S.dim; }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  {visibility.showCode && (
                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      padding: '16px 20px',
                      maxHeight: 192,
                      overflow: 'auto',
                    }}>
                      <pre style={{
                        color: '#4ade80',
                        fontSize: 12,
                        fontFamily: 'monospace',
                        margin: 0,
                        whiteSpace: 'pre',
                      }}>
                        {snippet.code}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SnippetsPage;
