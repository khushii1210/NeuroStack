export const C = {
  bg:            'radial-gradient(ellipse at 72% 0%, #1c0505 0%, #0d0608 50%, #070408 100%)',
  surface:       'rgba(255,255,255,0.06)',
  surfaceHover:  'rgba(255,255,255,0.07)',
  border:        'rgba(255,255,255,0.10)',
  borderSoft:    'rgba(255,255,255,0.04)',
  crimson:       '#dc2626',
  crimsonLight:  '#f87171',
  crimsonSoft:   'rgba(239,68,68,0.12)',
  crimsonBorder: 'rgba(239,68,68,0.25)',
  crimsonGlow:   '0 0 30px rgba(220,38,38,0.35)',
  text:          '#fff5f5',
  textMid:       '#d4b8b8',
  textDim:       '#7a5a5a',
  mono:          "'Geist Mono', 'JetBrains Mono', monospace",
};

export const glass = {
  background:          C.surface,
  backdropFilter:      'blur(20px)',
  WebkitBackdropFilter:'blur(20px)',
  border:              `1px solid ${C.border}`,
};
