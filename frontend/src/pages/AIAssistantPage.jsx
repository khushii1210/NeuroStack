import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw, Copy, Check } from 'lucide-react';
import { sendMessage, getChatHistory, clearChatHistory } from '../api/ai';

const S = {
  surface:       'rgba(255,255,255,0.06)',
  border:        'rgba(255,255,255,0.10)',
  text:          '#fff5f5',
  muted:         '#d4b8b8',
  dim:           '#7a5a5a',
};

const SUGGESTIONS = [
  'Explain async/await vs Promises',
  'How do I fix a race condition?',
  'Best practices for React performance',
  'Write a debounce function',
  'SQL query optimization tips',
];

const INITIAL_MSG = {
  id: '0',
  role: 'assistant',
  content: "Hi! I'm your coding assistant. Ask me anything — debugging, code explanations, architecture, best practices.",
};

function formatContent(content) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
      return (
        <pre key={i} style={{
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${S.border}`,
          borderRadius: 10,
          padding: '12px 14px',
          margin: '8px 0',
          color: '#4ade80',
          fontSize: 12,
          fontFamily: 'monospace',
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}>
          {code}
        </pre>
      );
    }
    return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
  });
}

function AIAssistantPage() {
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    getChatHistory().then(res => {
      if (res.data.length > 0) {
        setMessages([
          INITIAL_MSG,
          ...res.data.map(m => ({ id: String(m.id), role: m.role, content: m.content })),
        ]);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const content = text || input.trim();
    if (!content || loading) return;
    setInput('');

    const userMsg = { id: Date.now().toString(), role: 'user', content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const history = updatedMessages.slice(1).map(m => ({ role: m.role, content: m.content }));
      const res = await sendMessage(content, history.slice(0, -1));
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.data.reply,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I ran into an error. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{
      padding: '40px 48px 32px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
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
          <h1
            className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
            style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <Sparkles size={24} style={{ color: '#f87171', flexShrink: 0 }} />
            AI Assistant
          </h1>
          <p style={{ color: S.muted, fontSize: 15, margin: '10px 0 0' }}>
            Powered by Gemini
          </p>
        </div>
        <button
          type="button"
          onClick={() => { clearChatHistory().catch(() => {}); setMessages([INITIAL_MSG]); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            borderRadius: 10,
            border: `1px solid ${S.border}`,
            background: 'transparent',
            color: S.muted,
            fontSize: 13,
            fontFamily: 'monospace',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onMouseOver={e => { e.currentTarget.style.color = S.text; }}
          onMouseOut={e => { e.currentTarget.style.color = S.muted; }}
        >
          <RotateCcw size={14} /> New Chat
        </button>
      </div>

      {/* Suggestions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => handleSend(s)}
            style={{
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 20,
              border: `1px solid ${S.border}`,
              background: 'transparent',
              color: S.dim,
              fontFamily: 'monospace',
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
            onMouseOut={e => { e.currentTarget.style.color = S.dim; e.currentTarget.style.borderColor = S.border; }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minHeight: 0,
        paddingRight: 4,
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            gap: 12,
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
          }}>
            {/* Avatar */}
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: msg.role === 'assistant'
                ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                : 'linear-gradient(135deg, #fb923c, #c2410c)',
            }}>
              {msg.role === 'assistant'
                ? <Bot size={16} style={{ color: '#fff' }} />
                : <User size={16} style={{ color: '#fff' }} />}
            </div>

            {/* Bubble + copy */}
            <div style={{
              maxWidth: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                borderRadius: 12,
                padding: '12px 16px',
                fontSize: 14,
                lineHeight: 1.65,
                background: msg.role === 'assistant'
                  ? S.surface
                  : 'rgba(251,146,60,0.08)',
                border: msg.role === 'assistant'
                  ? `1px solid ${S.border}`
                  : '1px solid rgba(251,146,60,0.2)',
                color: S.text,
              }}>
                {formatContent(msg.content)}
              </div>
              {msg.role === 'assistant' && (
                <button
                  type="button"
                  onClick={() => handleCopy(msg.id, msg.content)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 2px',
                    color: copiedId === msg.id ? '#4ade80' : S.dim,
                    display: 'flex',
                  }}
                >
                  {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
            }}>
              <Bot size={16} style={{ color: '#fff' }} />
            </div>
            <div style={{
              background: S.surface,
              border: `1px solid ${S.border}`,
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: '#f87171',
                  display: 'inline-block',
                  animation: 'bounce 0.6s infinite',
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          gap: 12,
          background: S.surface,
          border: `1px solid ${S.border}`,
          borderRadius: 14,
          padding: '12px 16px',
          transition: 'border-color 0.15s',
        }}
        onFocusCapture={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
        onBlurCapture={e => { e.currentTarget.style.borderColor = S.border; }}
      >
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask about code, bugs, concepts... (Enter to send, Shift+Enter for newline)"
          rows={2}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: S.text,
            fontSize: 14,
            fontFamily: 'inherit',
            lineHeight: 1.6,
          }}
        />
        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          style={{
            alignSelf: 'flex-end',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: '#fff',
            fontSize: 13,
            fontFamily: 'monospace',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: (!input.trim() || loading) ? 0.4 : 1,
          }}
        >
          <Send size={15} /> Send
        </button>
      </div>
    </div>
  );
}

export default AIAssistantPage;
