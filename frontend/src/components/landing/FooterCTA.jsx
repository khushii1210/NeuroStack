import { C } from './tokens';

export default function FooterCTA() {
  return (
    <footer style={{
      padding: '32px 64px',
      borderTop: `1px solid ${C.border}`,
      position: 'relative', zIndex: 10,
    }}>
      <span style={{ fontSize: 12, color: C.textDim, fontFamily: C.mono }}>
        © 2026 NeuroStack — Your Developer Second Brain
      </span>
    </footer>
  );
}
