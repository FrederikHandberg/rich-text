import React from 'react';

interface TableContextMenuProps {
  position: { x: number; y: number };
  onInsertRow: (position: 'before' | 'after') => void;
  onInsertColumn: (position: 'before' | 'after') => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
}

export function TableContextMenu({
  position,
  onInsertRow,
  onInsertColumn,
  onDeleteRow,
  onDeleteColumn,
}: TableContextMenuProps) {
  return (
    <div
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 context-menu"
      style={{ top: position.y, left: position.x }}
    >
      <button
        onClick={() => onInsertRow('before')}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
      >
        Insert Row Above
      </button>
      <button
        onClick={() => onInsertRow('after')}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
      >
        Insert Row Below
      </button>
      <button
        onClick={() => onInsertColumn('before')}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
      >
        Insert Column Left
      </button>
      <button
        onClick={() => onInsertColumn('after')}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
      >
        Insert Column Right
      </button>
      <div className="border-t border-gray-200 my-1" />
      <button
        onClick={onDeleteRow}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600"
      >
        Delete Row
      </button>
      <button
        onClick={onDeleteColumn}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600"
      >
        Delete Column
      </button>
    </div>
  );
}