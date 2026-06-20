import { List, Columns2, LayoutGrid } from 'lucide-react';

const OPTIONS = [
  { id: 'list', icon: List, label: 'List view' },
  { id: 'double', icon: Columns2, label: '2 columns' },
  { id: 'triple', icon: LayoutGrid, label: '3 columns' },
];

function LayoutToggle({ layout, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}
      role="group"
      aria-label="Change layout"
    >
      {OPTIONS.map(({ id, icon: Icon, label }) => {
        const active = layout === id;
        return (
          <button
            key={id}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={() => onChange(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 8,
              border: active ? '1px solid rgba(239,68,68,0.25)' : '1px solid transparent',
              background: active ? 'rgba(239,68,68,0.12)' : 'transparent',
              color: active ? '#fca5a5' : '#7a5a5a',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseOver={(e) => {
              if (!active) e.currentTarget.style.color = '#d4b8b8';
            }}
            onMouseOut={(e) => {
              if (!active) e.currentTarget.style.color = '#7a5a5a';
            }}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}

export default LayoutToggle;
