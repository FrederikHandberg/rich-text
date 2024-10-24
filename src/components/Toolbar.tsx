import React from 'react';
import { Bold, Italic, Underline, Table2, Type } from 'lucide-react';

interface ToolbarProps {
  onFormat: (command: string, value?: string) => void;
  onTableClick: () => void;
}

export function Toolbar({ onFormat, onTableClick }: ToolbarProps) {
  const handleFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFormat('fontSize', e.target.value);
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-4 flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onFormat('bold')}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Bold"
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => onFormat('italic')}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Italic"
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => onFormat('underline')}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Underline"
      >
        <Underline size={20} />
      </button>
      <div className="h-6 w-px bg-gray-300 mx-2" />
      <button
        onClick={onTableClick}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Insert Table"
      >
        <Table2 size={20} />
      </button>
      <div className="h-6 w-px bg-gray-300 mx-2" />
      <div className="flex items-center gap-2">
        <Type size={20} className="text-gray-600" />
        <select
          onChange={handleFontSize}
          className="border rounded p-1 text-sm"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>
      </div>
    </div>
  );
}