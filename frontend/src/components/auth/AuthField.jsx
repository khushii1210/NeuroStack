function AuthField({ label, ...props }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{
        display: 'block',
        marginBottom: 10,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#64748b',
        fontFamily: 'monospace',
      }}>
        {label}
      </label>
      <input
        {...props}
        style={{
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
        }}
        onFocus={(e) => { e.target.style.borderColor = '#adc6ff'; }}
        onBlur={(e) => { e.target.style.borderColor = '#1E293B'; }}
      />
    </div>
  );
}

export default AuthField;
