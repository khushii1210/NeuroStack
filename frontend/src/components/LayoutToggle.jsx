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
        border: '1px solid #1E293B',
        background: '#0b1326',
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
              border: active ? '1px solid rgba(173,198,255,0.25)' : '1px solid transparent',
              background: active ? 'rgba(173,198,255,0.12)' : 'transparent',
              color: active ? '#adc6ff' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseOver={(e) => {
              if (!active) e.currentTarget.style.color = '#8c909f';
            }}
            onMouseOut={(e) => {
              if (!active) e.currentTarget.style.color = '#64748b';
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
