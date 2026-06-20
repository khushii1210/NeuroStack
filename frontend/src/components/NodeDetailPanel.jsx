import { useEffect, useState } from 'react';
import { X, FileText, Code2, Bug, Network, Pencil, Check, Plus, Trash2 } from 'lucide-react';
import { getNodeDetail, updateNode } from '../api/graph';
import { getNotes, updateNote } from '../api/notes';
import { getSnippets, updateSnippet } from '../api/snippets';
import { getBugs, updateBug } from '../api/bugs';

const CATEGORY_COLORS = {
  concept:   '#00e5ff',
  language:  '#a78bfa',
  framework: '#f59e0b',
  tool:      '#10b981',
  database:  '#f97316',
  other:     '#94a3b8',
};

const S = {
  surface:       'rgba(255,255,255,0.06)',
  border:        'rgba(255,255,255,0.10)',
  text:          '#fff5f5',
  muted:         '#d4b8b8',
  dim:           '#7a5a5a',
};

export default function NodeDetailPanel({ nodeId, onClose, onNodeUpdated }) {
  const [node, setNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingDesc, setEditingDesc] = useState(false);
  const [description, setDescription] = useState('');

  // all user content for linking
  const [allNotes, setAllNotes] = useState([]);
  const [allSnippets, setAllSnippets] = useState([]);
  const [allBugs, setAllBugs] = useState([]);

  // which section is in "edit links" mode
  const [editingLinks, setEditingLinks] = useState(null); // 'notes' | 'snippets' | 'bugs'

  const loadNode = () => {
    if (!nodeId) return;
    setLoading(true);
    getNodeDetail(nodeId)
      .then(res => {
        setNode(res.data);
        setDescription(res.data.description || '');
      })
      .catch(() => setNode(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNode();
    // load all user content once for link editing
    getNotes().then(r => setAllNotes(r.data)).catch(() => {});
    getSnippets().then(r => setAllSnippets(r.data)).catch(() => {});
    getBugs().then(r => setAllBugs(r.data)).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  const handleSaveDescription = async () => {
    try {
      await updateNode(nodeId, { description });
      setNode(prev => ({ ...prev, description }));
      setEditingDesc(false);
      onNodeUpdated?.();
    } catch { /* fail silently */ }
  };

  // link an item to this node
  const handleLink = async (type, item) => {
    try {
      if (type === 'notes')    await updateNote(item.id, { title: item.title, content: item.content, tags: item.tags, nodeId });
      if (type === 'snippets') await updateSnippet(item.id, { title: item.title, code: item.code, language: item.language, description: item.description, tags: item.tags, nodeId });
      if (type === 'bugs')     await updateBug(item.id, { title: item.title, description: item.description, severity: item.severity, status: item.status, solution: item.solution, tags: item.tags, nodeId });
      loadNode();
    } catch (e) { console.error('Link failed', e); }
  };

  // unlink an item from this node
  const handleUnlink = async (type, item) => {
    try {
      if (type === 'notes')    await updateNote(item.id, { title: item.title, content: item.content, tags: item.tags, nodeId: null });
      if (type === 'snippets') await updateSnippet(item.id, { title: item.title, code: item.code, language: item.language, description: item.description, tags: item.tags, nodeId: null });
      if (type === 'bugs')     await updateBug(item.id, { title: item.title, description: item.description, severity: item.severity, status: item.status, solution: item.solution, tags: item.tags, nodeId: null });
      loadNode();
    } catch (e) { console.error('Unlink failed', e); }
  };

  if (!nodeId) return null;

  const color = node ? CATEGORY_COLORS[node.category] || CATEGORY_COLORS.other : '#94a3b8';

  const connectedNodes = node ? [
    ...node.edgesFrom.map(e => e.toNode),
    ...node.edgesTo.map(e => e.fromNode),
  ] : [];

  // items not yet linked to this node
  const linkedNoteIds    = new Set(node?.notes.map(n => n.id) || []);
  const linkedSnippetIds = new Set(node?.snippets.map(s => s.id) || []);
  const linkedBugIds     = new Set(node?.bugs.map(b => b.id) || []);

  const unlinkdNotes    = allNotes.filter(n => !linkedNoteIds.has(n.id));
  const unlinkdSnippets = allSnippets.filter(s => !linkedSnippetIds.has(s.id));
  const unlinkdBugs     = allBugs.filter(b => !linkedBugIds.has(b.id));

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 360,
      height: '100%',
      background: 'rgba(7,4,8,0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderLeft: `1px solid ${S.border}`,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: `1px solid ${S.border}`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        {loading ? (
          <p style={{ color: S.muted, fontSize: 14, margin: 0 }}>Loading...</p>
        ) : node ? (
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {node.category}
            </span>
            <h2 style={{ color: S.text, fontSize: 20, margin: '4px 0 0', fontWeight: 700 }}>
              {node.label}
            </h2>
          </div>
        ) : (
          <p style={{ color: '#f87171', fontSize: 14, margin: 0 }}>Failed to load node</p>
        )}
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.muted, padding: 4, flexShrink: 0 }}>
          <X size={18} />
        </button>
      </div>

      {node && (
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Description */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <SectionLabel>Description</SectionLabel>
              {!editingDesc && (
                <IconBtn onClick={() => setEditingDesc(true)}><Pencil size={13} /></IconBtn>
              )}
            </div>
            {editingDesc ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  autoFocus
                  rows={4}
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: `1px solid ${S.border}`,
                    borderRadius: 8, color: S.text, fontSize: 14, padding: '10px 12px',
                    outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <ActionBtn color={color} onClick={handleSaveDescription}><Check size={12} /> Save</ActionBtn>
                  <ActionBtn onClick={() => { setEditingDesc(false); setDescription(node.description || ''); }}>Cancel</ActionBtn>
                </div>
              </div>
            ) : (
              <p style={{ color: node.description ? S.text : S.dim, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                {node.description || 'No description yet. Click the edit icon to add one.'}
              </p>
            )}
          </section>

          {/* Notes */}
          <LinkSection
            icon={<FileText size={14} />}
            label="Notes"
            color={color}
            linked={node.notes}
            unlinked={unlinkdNotes}
            editing={editingLinks === 'notes'}
            onToggleEdit={() => setEditingLinks(prev => prev === 'notes' ? null : 'notes')}
            onLink={item => handleLink('notes', item)}
            onUnlink={item => handleUnlink('notes', item)}
            renderMeta={n => n.tags?.join(', ') || 'no tags'}
          />

          {/* Snippets */}
          <LinkSection
            icon={<Code2 size={14} />}
            label="Snippets"
            color={color}
            linked={node.snippets}
            unlinked={unlinkdSnippets}
            editing={editingLinks === 'snippets'}
            onToggleEdit={() => setEditingLinks(prev => prev === 'snippets' ? null : 'snippets')}
            onLink={item => handleLink('snippets', item)}
            onUnlink={item => handleUnlink('snippets', item)}
            renderMeta={s => s.language}
          />

          {/* Bugs */}
          <LinkSection
            icon={<Bug size={14} />}
            label="Bugs"
            color={color}
            linked={node.bugs}
            unlinked={unlinkdBugs}
            editing={editingLinks === 'bugs'}
            onToggleEdit={() => setEditingLinks(prev => prev === 'bugs' ? null : 'bugs')}
            onLink={item => handleLink('bugs', item)}
            onUnlink={item => handleUnlink('bugs', item)}
            renderMeta={b => `${b.severity} · ${b.status}`}
          />

          {/* Connected Nodes */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{ color }}><Network size={14} /></span>
              <SectionLabel>Connected Nodes</SectionLabel>
              <span style={{ fontSize: 11, color: S.dim, marginLeft: 'auto', fontFamily: 'monospace' }}>{connectedNodes.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {connectedNodes.length === 0
                ? <Empty />
                : connectedNodes.map(n => (
                  <Item key={n.id} title={n.label} meta={n.category} color={CATEGORY_COLORS[n.category]} />
                ))
              }
            </div>
          </section>

        </div>
      )}
    </div>
  );
}

function LinkSection({ icon, label, color, linked, unlinked, editing, onToggleEdit, onLink, onUnlink, renderMeta }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <span style={{ color }}>{icon}</span>
        <SectionLabel>{label}</SectionLabel>
        <span style={{ fontSize: 11, color: '#475569', marginLeft: 'auto', fontFamily: 'monospace' }}>{linked.length}</span>
        <IconBtn onClick={onToggleEdit} style={{ marginLeft: 4 }}>
          {editing ? <X size={13} /> : <Pencil size={13} />}
        </IconBtn>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {linked.length === 0 && !editing && <Empty />}
        {linked.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1 }}>
              {/* linked items — slightly brighter background */}
              <div style={{
                padding: '8px 12px', borderRadius: 8,
                background: 'rgba(239,68,68,0.06)',
                border: `1px solid ${color}40`,
                display: 'flex', flexDirection: 'column', gap: 3,
              }}>
                <span style={{ fontSize: 13, color: '#fff5f5', fontWeight: 500 }}>{item.title}</span>
                <span style={{ fontSize: 11, color, fontFamily: 'monospace' }}>{renderMeta(item)}</span>
              </div>
            </div>
            {editing && (
              <IconBtn onClick={() => onUnlink(item)} title="Unlink">
                <Trash2 size={13} style={{ color: '#f87171' }} />
              </IconBtn>
            )}
          </div>
        ))}

        {editing && unlinked.length > 0 && (
          <div style={{ marginTop: 6, borderTop: `1px solid ${S.border}`, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#7a5a5a', fontFamily: 'monospace' }}>Add link</span>
            {unlinked.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  {/* unlinked items — darker, dimmer */}
                  <div style={{
                    padding: '8px 12px', borderRadius: 8,
                    background: 'rgba(0,0,0,0.2)',
                    border: `1px solid ${S.border}`,
                    display: 'flex', flexDirection: 'column', gap: 3,
                    opacity: 0.65,
                  }}>
                    <span style={{ fontSize: 13, color: '#fff5f5', fontWeight: 500 }}>{item.title}</span>
                    <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>{renderMeta(item)}</span>
                  </div>
                </div>
                <IconBtn onClick={() => onLink(item)} title="Link">
                  <Plus size={13} style={{ color: '#10b981' }} />
                </IconBtn>
              </div>
            ))}
          </div>
        )}

        {editing && unlinked.length === 0 && linked.length > 0 && (
          <p style={{ fontSize: 12, color: '#475569', margin: '4px 0 0', fontFamily: 'monospace' }}>All linked</p>
        )}
      </div>
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{ fontSize: 12, color: '#8c909f', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {children}
    </span>
  );
}

function IconBtn({ onClick, children, title, style }) {
  return (
    <button onClick={onClick} title={title} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c909f', padding: 2, display: 'flex', ...style }}>
      {children}
    </button>
  );
}

function ActionBtn({ color, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 8,
        border: color ? `1px solid ${color}50` : '1px solid #1E293B',
        background: color ? `${color}15` : 'transparent',
        color: color || '#8c909f',
        fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function Item({ title, meta, color }) {
  return (
    <div style={{
      padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)',
      border: `1px solid ${S.border}`, display: 'flex', flexDirection: 'column', gap: 3,
    }}>
      <span style={{ fontSize: 13, color: '#fff5f5', fontWeight: 500 }}>{title}</span>
      <span style={{ fontSize: 11, color: color || '#475569', fontFamily: 'monospace' }}>{meta}</span>
    </div>
  );
}

function Empty() {
  return <p style={{ fontSize: 13, color: '#475569', margin: 0, fontFamily: 'monospace' }}>None linked yet</p>;
}
