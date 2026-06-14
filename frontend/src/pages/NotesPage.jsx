import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit3, Save, X, FileText, Tag } from 'lucide-react';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes';
import LayoutToggle from '../components/LayoutToggle';
import { useLayoutView, getLayoutContainerStyle, getLayoutVisibility } from '../hooks/useLayoutView';
const S = {
  surface: '#0b1326',
  border: '#1E293B',
  text: '#dae2fd',
  muted: '#8c909f',
  dim: '#475569',
  accent: '#adc6ff',
  cyan: '#3cddc7',
  purple: '#ddb7ff',
  coral: '#ffb4ab',
};

const TAG_STYLES = [
  { bg: 'rgba(60,221,199,0.12)', border: 'rgba(60,221,199,0.25)', color: '#3cddc7' },
  { bg: 'rgba(221,183,255,0.12)', border: 'rgba(221,183,255,0.25)', color: '#ddb7ff' },
  { bg: 'rgba(173,198,255,0.12)', border: 'rgba(173,198,255,0.25)', color: '#adc6ff' },
  { bg: 'rgba(255,180,171,0.12)', border: 'rgba(255,180,171,0.25)', color: '#ffb4ab' },
];

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: 10,
  background: '#020617',
  border: '1px solid #1E293B',
  color: '#dae2fd',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const [layout, setLayout] = useLayoutView('notes', 'double');

  // push a history entry when opening detail so browser back closes it
  useEffect(() => {
    if (selectedNote) {
      window.history.pushState({ detail: true }, '');
      const handler = () => setSelectedNote(null);
      window.addEventListener('popstate', handler);
      return () => window.removeEventListener('popstate', handler);
    }
  }, [selectedNote]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    try {
      const res = await createNote({
        title: form.title,
        content: form.content,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setNotes([res.data, ...notes]);
      setCreating(false);
      setForm({ title: '', content: '', tags: '' });
      setError('');
    } catch {
      setError('Failed to create note');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateNote(id, {
        title: form.title,
        content: form.content,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setNotes(notes.map((n) => (n.id === id ? res.data : n)));
      setEditingId(null);
      setForm({ title: '', content: '', tags: '' });
      setError('');
    } catch {
      setError('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch {
      setError('Failed to delete note');
    }
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const visibility = getLayoutVisibility(layout);

  // Detail view
  if (selectedNote) {
    const note = notes.find(n => n.id === selectedNote) || {};
    return (
      <div style={{ padding: '40px 48px 48px', minHeight: '100vh' }}>
        <button
          type="button"
          onClick={() => setSelectedNote(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: S.muted, fontSize: 13, fontFamily: 'monospace',
            marginBottom: 32, padding: 0,
          }}
          onMouseOver={e => { e.currentTarget.style.color = S.text; }}
          onMouseOut={e => { e.currentTarget.style.color = S.muted; }}
        >
          ← Back to Notes
        </button>
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ color: S.text, fontSize: 28, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.3 }}>
            {note.title}
          </h1>
          {note.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {note.tags.map((tag, i) => {
                const ts = TAG_STYLES[i % TAG_STYLES.length];
                return (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, padding: '3px 10px', borderRadius: 20, fontFamily: 'monospace', background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>
                    <Tag size={10} /> {tag}
                  </span>
                );
              })}
            </div>
          )}
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 16, padding: '32px 36px' }}>
            <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
              {note.content}
            </p>
          </div>
          <p style={{ color: S.dim, fontSize: 11, fontFamily: 'monospace', marginTop: 16 }}>
            Last updated {new Date(note.updatedAt).toLocaleDateString()}
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent" style={{ margin: 0 }}>
            Notes
          </h1>
          <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0' }}>
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} in your memory archive
          </p>
        </div>
        <button
          onClick={() => {
            setCreating(true);
            setForm({ title: '', content: '', tags: '' });
            setEditingId(null);
          }}
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
          New Note
        </button>
      </div>

      {error && (
        <div style={{
          marginBottom: 24,
          padding: '14px 18px',
          borderRadius: 10,
          fontSize: 14,
          color: '#ffb4ab',
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
            placeholder="Search notes..."
            style={{ ...inputStyle, paddingLeft: 44 }}
            onFocus={(e) => { e.target.style.borderColor = '#adc6ff'; }}
            onBlur={(e) => { e.target.style.borderColor = '#1E293B'; }}
          />
        </div>
        <LayoutToggle layout={layout} onChange={setLayout} />
      </div>

      {/* Create form */}
      {creating && (
        <div style={{
          background: S.surface,
          border: '1px solid rgba(60,221,199,0.25)',
          borderRadius: 16,
          padding: '28px 30px',
          marginBottom: 28,
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        }}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Note title..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #1E293B',
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
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write your note..."
            rows={6}
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
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="Tags (comma separated: react, hooks, performance)"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderTop: '1px solid #1E293B',
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
                border: '1px solid rgba(60,221,199,0.35)',
                background: 'rgba(60,221,199,0.12)',
                color: S.cyan,
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

      {/* Notes grid */}
      {loading ? (
        <p style={{ color: S.dim, fontSize: 14, fontFamily: 'monospace' }}>Loading notes...</p>
      ) : filtered.length === 0 ? (
        <div style={{
          background: S.surface,
          border: `1px solid ${S.border}`,
          borderRadius: 16,
          padding: '48px 32px',
          textAlign: 'center',
        }}>
          <FileText size={32} style={{ color: S.dim, marginBottom: 16 }} />
          <p style={{ color: S.muted, fontSize: 15, margin: 0 }}>No notes found.</p>
          <p style={{ color: S.dim, fontSize: 13, margin: '8px 0 0' }}>
            Create your first note to start building your memory archive.
          </p>
        </div>
      ) : (
        <div style={getLayoutContainerStyle(layout)}>
          {filtered.map((note) => (
            <div
              key={note.id}
              style={{
                background: S.surface,
                border: `1px solid ${S.border}`,
                borderRadius: 16,
                padding: layout === 'triple' ? '16px 18px' : layout === 'double' ? '20px 22px' : '24px 26px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                transition: 'border-color 0.15s',
                cursor: editingId === note.id ? 'default' : 'pointer',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(173,198,255,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = S.border; }}
              onClick={() => { if (editingId !== note.id) setSelectedNote(note.id); }}
            >
              {editingId === note.id ? (
                <div>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${S.border}`,
                      color: S.text,
                      fontWeight: 600,
                      outline: 'none',
                      padding: '0 0 10px',
                      marginBottom: 14,
                      fontFamily: 'inherit',
                    }}
                  />
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: S.muted,
                      fontSize: 13,
                      lineHeight: 1.6,
                      outline: 'none',
                      resize: 'none',
                      marginBottom: 14,
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Tags..."
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: S.dim,
                      fontSize: 12,
                      fontFamily: 'monospace',
                      outline: 'none',
                      marginBottom: 16,
                    }}
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => handleUpdate(note.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 14px',
                        borderRadius: 8,
                        border: '1px solid rgba(60,221,199,0.35)',
                        background: 'rgba(60,221,199,0.12)',
                        color: S.cyan,
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
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: visibility.showDescription || visibility.showTags ? 16 : 0,
                    gap: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      {layout !== 'triple' && <FileText size={16} style={{ color: S.cyan, flexShrink: 0 }} />}
                      <h3 style={{
                        color: S.text,
                        fontSize: layout === 'triple' ? 14 : 15,
                        fontWeight: 600,
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: layout === 'triple' ? 'normal' : 'nowrap',
                        lineHeight: 1.4,
                      }}>
                        {note.title}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); startEdit(note); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 6,
                          color: S.dim,
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.color = S.cyan; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = S.dim; }}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 6,
                          color: S.dim,
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.color = S.coral; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = S.dim; }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  {visibility.showDescription && note.content && (
                    <p style={{
                      color: S.muted,
                      fontSize: 13,
                      lineHeight: 1.6,
                      margin: visibility.showTags ? '0 0 14px' : 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      whiteSpace: 'pre-line',
                    }}>
                      {note.content}
                    </p>
                  )}
                  {((visibility.showTags && note.tags.length > 0) || visibility.showMeta) && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}>
                      {visibility.showTags && note.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {note.tags.map((tag, i) => {
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
                      {visibility.showMeta && (
                        <span style={{
                          color: S.dim,
                          fontSize: 11,
                          fontFamily: 'monospace',
                          flexShrink: 0,
                          marginLeft: 'auto',
                        }}>
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                      )}
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

export default NotesPage;
