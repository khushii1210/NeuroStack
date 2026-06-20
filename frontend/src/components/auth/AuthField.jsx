export default function AuthField({ label, ...props }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block', marginBottom: 8,
        fontSize: 11, fontWeight: 500,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: '#7a5a5a', fontFamily: "'Geist Mono', monospace",
      }}>
        {label}
      </label>
      <input
        {...props}
        style={{
          width: '100%', padding: '13px 16px', borderRadius: 8,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#fff5f5', fontSize: 14, outline: 'none',
          boxSizing: 'border-box', fontFamily: 'inherit',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(239,68,68,0.6)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
      />
    </div>
  );
}
