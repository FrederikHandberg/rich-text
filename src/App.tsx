import React, { useState, useRef, useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import { TableModal } from './components/TableModal';
import { TableContextMenu } from './components/TableContextMenu';

function App() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedCell, setSelectedCell] = useState<HTMLTableCellElement | null>(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  const formatDoc = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const insertTable = () => {
    if (rows < 1 || cols < 1) return;
    
    const table = document.createElement('table');
    table.className = 'border-collapse my-4 w-full';
    
    for (let i = 0; i < rows; i++) {
      const row = table.insertRow();
      for (let j = 0; j < cols; j++) {
        const cell = row.insertCell();
        cell.className = 'border border-gray-300 p-2';
        cell.textContent = 'Cell';
      }
    }

    const html = table.outerHTML;
    document.execCommand('insertHTML', false, html);
    setShowTableModal(false);
  };

  const handleContextMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const cell = target.closest('td');
    
    if (cell) {
      e.preventDefault();
      setSelectedCell(cell as HTMLTableCellElement);
      setContextMenuPosition({ x: e.pageX, y: e.pageY });
      setShowContextMenu(true);
    } else {
      setShowContextMenu(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (showContextMenu && !(e.target as HTMLElement).closest('.context-menu')) {
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      if (editor) {
        editor.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [showContextMenu]);

  const insertRow = (position: 'before' | 'after') => {
    if (!selectedCell) return;
    
    const table = selectedCell.closest('table');
    const currentRow = selectedCell.parentElement;
    if (!table || !currentRow) return;

    const newRow = table.insertRow(
      position === 'before' ? currentRow.rowIndex : currentRow.rowIndex + 1
    );

    const cellCount = currentRow.cells.length;
    for (let i = 0; i < cellCount; i++) {
      const newCell = newRow.insertCell();
      newCell.className = 'border border-gray-300 p-2';
      newCell.textContent = 'Cell';
    }

    setShowContextMenu(false);
  };

  const insertColumn = (position: 'before' | 'after') => {
    if (!selectedCell) return;
    
    const table = selectedCell.closest('table');
    if (!table) return;

    const columnIndex = selectedCell.cellIndex;
    const rows = table.rows;
    
    for (let i = 0; i < rows.length; i++) {
      const newCell = rows[i].insertCell(
        position === 'before' ? columnIndex : columnIndex + 1
      );
      newCell.className = 'border border-gray-300 p-2';
      newCell.textContent = 'Cell';
    }

    setShowContextMenu(false);
  };

  const deleteRow = () => {
    if (!selectedCell) return;
    const row = selectedCell.parentElement;
    if (row) {
      row.remove();
    }
    setShowContextMenu(false);
  };

  const deleteColumn = () => {
    if (!selectedCell) return;
    
    const table = selectedCell.closest('table');
    if (!table) return;

    const columnIndex = selectedCell.cellIndex;
    const rows = table.rows;
    
    for (let i = 0; i < rows.length; i++) {
      rows[i].deleteCell(columnIndex);
    }

    setShowContextMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <Toolbar
          onFormat={formatDoc}
          onTableClick={() => setShowTableModal(true)}
        />

        <div
          ref={editorRef}
          contentEditable
          className="min-h-[400px] p-6 focus:outline-none"
          suppressContentEditableWarning
        />

        {showTableModal && (
          <TableModal
            rows={rows}
            cols={cols}
            setRows={setRows}
            setCols={setCols}
            onClose={() => setShowTableModal(false)}
            onInsert={insertTable}
          />
        )}

        {showContextMenu && (
          <TableContextMenu
            position={contextMenuPosition}
            onInsertRow={insertRow}
            onInsertColumn={insertColumn}
            onDeleteRow={deleteRow}
            onDeleteColumn={deleteColumn}
          />
        )}
      </div>
    </div>
  );
}

export default App;