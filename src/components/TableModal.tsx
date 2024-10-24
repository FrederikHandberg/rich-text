import React from 'react';

interface TableModalProps {
  rows: number;
  cols: number;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  onClose: () => void;
  onInsert: () => void;
}

export function TableModal({ rows, cols, setRows, setCols, onClose, onInsert }: TableModalProps) {
  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 1 : Math.max(1, parseInt(e.target.value) || 1);
    setRows(value);
  };

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 1 : Math.max(1, parseInt(e.target.value) || 1);
    setCols(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Insert Table</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rows
            </label>
            <input
              type="number"
              min="1"
              value={rows}
              onChange={handleRowChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Columns
            </label>
            <input
              type="number"
              min="1"
              value={cols}
              onChange={handleColChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onInsert}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}