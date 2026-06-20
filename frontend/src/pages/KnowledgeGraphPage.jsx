import { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow, Background, Controls,
  addEdge, useNodesState, useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Trash2, X, Save, Sparkles } from 'lucide-react';
import { getGraph, createNode, createEdge, deleteNode, deleteEdge, updateNodePosition } from '../api/graph';
import { generateGraph } from '../api/ai';
import NodeDetailPanel from '../components/NodeDetailPanel';

const CATEGORIES = ['concept', 'language', 'framework', 'tool', 'database', 'other'];

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
  accent:        '#f87171',
};

function KnowledgeGraphPage() {
  const [search, setSearch] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rawNodes, setRawNodes] = useState([]);
  const [rawEdges, setRawEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({ label: '', category: 'concept', description: '' });

  const buildFlowNodes = (dbNodes) => dbNodes.map((n, i) => ({
    id: String(n.id),
    data: { label: n.label },
    // use saved position if non-zero, otherwise fall back to grid layout
    position: (n.x || n.y)
      ? { x: n.x, y: n.y }
      : { x: 100 + (i % 4) * 200, y: 100 + Math.floor(i / 4) * 150 },
    style: {
      background: '#110202',
      border: `1.5px solid ${CATEGORY_COLORS[n.category]}`,
      borderRadius: 14,
      color: '#fff5f5',
      padding: '10px 18px',
      fontSize: 13,
      boxShadow: `0 0 0 1px ${CATEGORY_COLORS[n.category]}20`,
    },
  }));

  const buildFlowEdges = (dbEdges) => dbEdges.map(e => ({
    id: String(e.id),
    source: String(e.fromNodeId),
    target: String(e.toNodeId),
    style: { stroke: 'rgba(100,116,139,0.5)' },
  }));

  const fetchGraph = async () => {
    try {
      const res = await getGraph();
      const { nodes: dbNodes, edges: dbEdges } = res.data;
      setRawNodes(dbNodes);
      setRawEdges(dbEdges);
      setNodes(buildFlowNodes(dbNodes));
      setEdges(buildFlowEdges(dbEdges));
    } catch {
      setError('Failed to load graph');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGraph()
      .then(res => {
        const { nodes: dbNodes, edges: dbEdges } = res.data;
        setRawNodes(dbNodes);
        setRawEdges(dbEdges);
        setNodes(buildFlowNodes(dbNodes));
        setEdges(buildFlowEdges(dbEdges));
      })
      .catch(() => setError('Failed to load graph'))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNode = async () => {
    const label = form.label.trim();
  
    if (!label) return;
  
    // Prevent duplicates
    if (
      rawNodes.some(
        n => n.label.toLowerCase() === label.toLowerCase()
      )
    ) {
      setError('Node already exists');
      return;
    }
  
    try {
      setError('');

      await createNode({
        label,
        category: form.category,
        description: form.description,
      });

      await fetchGraph();

      setCreating(false);
      setForm({ label: '', category: 'concept', description: '' });
    } catch {
      setError('Failed to create node');
    }
  };

  const handleDeleteNode = async (nodeId) => {
    try {
      await deleteNode(nodeId);
      setNodes(prev => prev.filter(n => n.id !== String(nodeId)));
      setEdges(prev => prev.filter(e => e.source !== String(nodeId) && e.target !== String(nodeId)));
    } catch {
      setError('Failed to delete node');
    }

    setRawNodes(prev =>
      prev.filter(n => n.id !== nodeId)
    );
    
    setRawEdges(prev =>
      prev.filter(
        e =>
          e.fromNodeId !== nodeId &&
          e.toNodeId !== nodeId
      )
    );
  };

  const handleGenerateWithAI = async () => {
    if (!confirm('This will analyze your notes and snippets to create a knowledge graph. Continue?')) return;
    setGenerating(true);
    try {
      // get the real max Y from current canvas nodes
      const canvasMaxY = nodes.length > 0 ? Math.max(...nodes.map(n => n.position.y)) : 0;

    const res = await generateGraph(canvasMaxY);
      setRawNodes(prev => [...prev, ...res.data.nodes]);
      setRawEdges(prev => [...prev, ...res.data.edges]);
      await fetchGraph(); // refresh to show new nodes
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate graph');
    } finally {
      setGenerating(false);
    }
  };

  // when user connects two nodes by dragging
  const onConnect = useCallback(async (connection) => {
    try {
      const res = await createEdge({
        fromNodeId: parseInt(connection.source),
        toNodeId: parseInt(connection.target),
      });
      const e = res.data;
      setEdges(prev => addEdge({
        ...connection,
        id: String(e.id),
        style: { stroke: 'rgba(100,116,139,0.5)' },
      }, prev));
    } catch {
      setError('Failed to create connection');
    }
  }, [setEdges]);

  // save position when user finishes dragging a node
  const onNodeDragStop = useCallback((_event, node) => {
    updateNodePosition(parseInt(node.id), node.position.x, node.position.y).catch(() => {});
  }, []);

  const handleDeleteEdge = async (edgeId) => {
    try {
      await deleteEdge(edgeId);
  
      setEdges(prev =>
        prev.filter(e => e.id !== String(edgeId))
      );
    } catch {
      setError('Failed to delete connection');
    }
  };

  const onNodeClick = useCallback((_event, node) => {
    setSelectedNodeId(parseInt(node.id));
  }, []);  

  return (
    <div style={{ padding: '40px 48px 48px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 20,
        flexShrink: 0,
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
            Knowledge Graph
          </h1>
          <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0' }}>
            {rawNodes.length} nodes · {rawEdges.length} connections — drag between nodes to connect
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleGenerateWithAI}
            disabled={generating}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(135deg, #dc2626, #fb923c)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              fontFamily: 'monospace',
              cursor: generating ? 'not-allowed' : 'pointer',
              opacity: generating ? 0.5 : 1,
              flexShrink: 0,
            }}
          >
            <Sparkles size={16} />
            {generating ? 'Analyzing Notes...' : 'Generate Knowledge Map'}
          </button>
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
            Add Node
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          marginBottom: 8,
          padding: '14px 18px',
          borderRadius: 10,
          fontSize: 14,
          color: '#ffb4ab',
          background: 'rgba(255,100,100,0.08)',
          border: '1px solid rgba(255,100,100,0.25)',
          flexShrink: 0,
        }}>
          {error}
        </div>
      )}

      {/* Create form */}
      {creating && (
        <div style={{
          background: S.surface,
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: 16,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexShrink: 0,
          flexWrap: 'wrap',
        }}>
          <input
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
            placeholder="Knowledge node..."
            autoFocus
            style={{
              flex: 1,
              minWidth: 160,
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${S.border}`,
              color: S.text,
              fontSize: 15,
              outline: 'none',
              padding: '0 0 10px',
              fontFamily: 'inherit',
            }}
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${S.border}`,
              color: S.text,
              fontSize: 13,
              outline: 'none',
              fontFamily: 'inherit',
            }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description (optional)..."
            style={{
              flex: 1,
              minWidth: 200,
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${S.border}`,
              color: S.text,
              fontSize: 14,
              outline: 'none',
              padding: '0 0 10px',
              fontFamily: 'inherit',
            }}
          />

          <button
            type="button"
            onClick={handleCreateNode}
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
            <Save size={15} /> Add
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
            <X size={15} /> Cancel
          </button>
        </div>
      )}

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search nodes..."
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: 10,
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${S.border}`,
          color: S.text,
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          flexShrink: 0,
        }}
      />

      {/* Node list for deletion */}
      {rawNodes.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
          {rawNodes
            .filter(n => n.label.toLowerCase().includes(search.toLowerCase()))
            .map(n => (
              <span
                key={n.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  padding: '4px 12px',
                  borderRadius: 20,
                  border: `1px solid ${CATEGORY_COLORS[n.category]}60`,
                  color: CATEGORY_COLORS[n.category],
                  fontFamily: 'monospace',
                }}
              >
                {n.label}
                <button
                  type="button"
                  onClick={() => handleDeleteNode(n.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex' }}
                  onMouseOver={e => { e.currentTarget.style.color = '#f87171'; }}
                  onMouseOut={e => { e.currentTarget.style.color = CATEGORY_COLORS[n.category]; }}
                >
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
        </div>
      )}

      {/* React Flow canvas */}
      {loading ? (
        <p style={{ color: S.dim, fontSize: 14, fontFamily: 'monospace' }}>Loading graph...</p>
      ) : (
        <div
          style={{
            flex: 1,
            minHeight: 384,
            borderRadius: 16,
            overflow: 'hidden',
            background: '#070408',
            border: `1px solid ${S.border}`,
            position: 'relative',   // add this
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            onEdgeClick={(event, edge) => {
              event.stopPropagation();
              if (window.confirm('Delete connection?')) {
                handleDeleteEdge(edge.id);
              }
            }}
          >
            <Background color="rgba(255,255,255,0.06)" gap={28} size={1} />
            <Controls style={{ background: '#110202', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10 }} />
          </ReactFlow>

          {/* Node detail side panel */}
          <NodeDetailPanel
            nodeId={selectedNodeId}
            onClose={() => setSelectedNodeId(null)}
            onNodeUpdated={fetchGraph}
          />
        </div>
      )}
    </div>
  );
}

export default KnowledgeGraphPage;
