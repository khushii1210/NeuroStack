import { useState, useEffect } from 'react';

export const LAYOUT_MODES = ['list', 'double', 'triple'];

export function getLayoutVisibility(layout) {
  return {
    showDescription: layout === 'list',
    showTags: layout !== 'triple',
    showMeta: layout === 'list',
    showCode: layout === 'list',
  };
}

export function getLayoutContainerStyle(layout) {
  switch (layout) {
    case 'list':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      };
    case 'double':
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 20,
      };
    case 'triple':
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 20,
      };
    default:
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      };
  }
}

export function useLayoutView(storageKey, defaultLayout = 'double') {
  const [layout, setLayout] = useState(() => {
    try {
      const saved = localStorage.getItem(`neurostack-layout-${storageKey}`);
      return LAYOUT_MODES.includes(saved) ? saved : defaultLayout;
    } catch {
      return defaultLayout;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`neurostack-layout-${storageKey}`, layout);
    } catch {
      // ignore
    }
  }, [layout, storageKey]);

  return [layout, setLayout];
}
