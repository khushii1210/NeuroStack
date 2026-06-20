import { Check } from 'lucide-react';
import { C } from './tokens';

const FEATURES = [
  {
    title: 'Smart Notes',
    desc: 'Write developer notes in rich markdown with code blocks, and bi-directional links. Every note connects to your knowledge graph automatically so nothing gets lost.',
  },
  {
    title: 'Snippet Vault',
    desc: 'Store reusable code snippets with full syntax highlighting. Search by tag, language, or title in milliseconds. Save directly from VS Code without switching context.',
  },
  {
    title: 'Bug Tracker',
    desc: 'Log bugs with descriptions, root causes, and solutions. Track severity and status from open to resolved. Over time, NeuroStack builds your personal debugging history so you never solve the same bug twice.',
  },
  {
    title: 'AI Assistant',
    desc: 'Ask questions grounded in your own notes, snippets, and bug history. The AI searches your knowledge base first before answering — so responses reference your actual work, not generic documentation.',
  },
  {
    title: 'Knowledge Graph',
    desc: 'Visualize how your notes, snippets, and bugs connect to each other. AI automatically extracts concepts and builds the graph from your content. Click any node to explore its linked knowledge.',
  },
  {
    title: 'VS Code Extension',
    desc: 'Highlight code or text, right-click, and save it directly to NeuroStack as a snippet, note, or bug — without leaving your editor. Captures file name, language, and timestamp automatically.',
  },
];

export default function FeaturesList() {
  return (
    <section style={{ padding: '100px 64px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: 680 }}>

        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 700, fontStyle: 'italic',
          color: C.text, lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 56px',
        }}>
          Everything you need,<br />nothing you don't.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FEATURES.map(({ title, desc }, i) => (
            <div
              key={title}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 20,
                padding: '28px 0',
                borderBottom: i < FEATURES.length - 1
                  ? '1px solid rgba(255,255,255,0.05)'
                  : 'none',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: C.crimsonSoft,
                border: `1px solid ${C.crimsonBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 3,
              }}>
                <Check size={13} style={{ color: C.crimsonLight }} />
              </div>
              <div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: '0 0 8px' }}>
                  {title}
                </p>
                <p style={{ color: C.textDim, fontSize: 13, margin: 0, lineHeight: 1.75 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
