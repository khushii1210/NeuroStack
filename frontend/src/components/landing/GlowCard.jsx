import { useRef, useCallback } from 'react';

export default function GlowCard({ children, style = {}, glowColor = '#adc6ff' }) {
  const cardRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.style.setProperty('--glow-opacity', '0.3');
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--glow-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': '0',
        '--glow-color': glowColor,
        position: 'relative',
        background: '#171f33',
        border: '1px solid #1E293B',
        borderRadius: 16,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* spotlight border glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 16,
        border: '1px solid transparent',
        backgroundImage: `
          radial-gradient(
            600px circle at var(--glow-x) var(--glow-y),
            ${glowColor}60,
            transparent 70%
          )
        `,
        backgroundOrigin: 'border-box',
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        maskComposite: 'exclude',
        opacity: 'var(--glow-opacity)',
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* inner spotlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(300px circle at var(--glow-x) var(--glow-y), ${glowColor}90, transparent 70%)`,
        opacity: 'var(--glow-opacity)',
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
