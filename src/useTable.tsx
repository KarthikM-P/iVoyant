/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { TableHeader } from './Organisms/TableHeader';
import * as xlsx from 'xlsx';
import { arrayMove } from '@dnd-kit/sortable';

interface TableData {
  [key: string]: any;
}

interface Cell {
  rowIndex: number | null;
  columnId: string | null;
}

interface PinnedColumns {
  left: string[];
  right: string[];
}

const useTable = () => {
  const columnHelper = createColumnHelper<TableData>();
  const [datas, setDatas] = useState<TableData[]>([]);
  const allKeys = useMemo(() => [...new Set(datas.flatMap((item) => Object.keys(item)))], [datas]);
  const [searchdata, setSearchdata] = useState<string>('');
  const [cell, setCell] = useState<Cell>({ rowIndex: null, columnId: null });
  const [columnOrder, setColumnOrder] = useState<string[]>(allKeys);
  const [pinnedColumns, setPinnedColumns] = useState<PinnedColumns>({ left: [], right: [] });
  const [openDropdownId, setOpenDropdownId] = useState<string | undefined>();
  const [savedData, setSavedData] = useState<TableData[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      if (file.type === 'application/json') {
        setDatas(JSON.parse(event.target?.result as string));
      } else {
        const workbook = xlsx.read(event.target?.result, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        setDatas(xlsx.utils.sheet_to_json(sheet));
      }
    };

    if (file.type === 'application/json') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    setColumnOrder([...new Set(datas.flatMap((item) => Object.keys(item)))]);
  }, [datas]);

  const exportToData = (format: 'json' | 'excel') => {
    if (datas.length === 0) {
      alert('No data to export!');
      return;
    }

    if (format === 'json') {
      const jsonData = JSON.stringify(datas, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'table_data.json';
      link.click();
    } else if (format === 'excel') {
      const ws = xlsx.utils.json_to_sheet(datas);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, 'table_data.xlsx');
    }
  };

  const columns = useMemo<ColumnDef<TableData>[]>(
    () =>
      columnOrder.map((key) =>
        columnHelper.accessor(key, {
          id: key,
          header: () => (
            <TableHeader
              id={key}
              label={key}
              isOpen={openDropdownId === key}
              onToggleDropdown={() => setOpenDropdownId((prev) => (prev === key ? undefined : key))}
              onAccending={() =>
                setDatas((prevDatas) =>
                  [...prevDatas].sort((a, b) => {
                    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                      return a[key] - b[key];
                    }
                    return String(a[key]).localeCompare(String(b[key]));
                  })
                )
              }
              onDecending={() =>
                setDatas((prevDatas) =>
                  [...prevDatas].sort((a, b) => {
                    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                      return b[key] - a[key];
                    }
                    return String(b[key]).localeCompare(String(a[key]));
                  })
                )
              }
              onPinLeft={() => pinColumn(key, 'left')}
              onPinRight={() => pinColumn(key, 'right')}
              onUnpin={() => pinColumn(key, 'none')}
            />
          ),
          cell: ({ getValue, row }) => {
            const isEditing = cell.rowIndex === row.index && cell.columnId === key;
            const value = getValue();
            return isEditing ? (
              <input
                type="text"
                value={String(value)} // Ensure the value passed is a string
                onChange={(e) => handleEdit(row.index, key, e.target.value)}
                onBlur={() => setCell({ rowIndex: null, columnId: null })}
                autoFocus
              />
            ) : (
              // Cast value to ReactNode to avoid 'unknown' type error
              <span onClick={() => setCell({ rowIndex: row.index, columnId: key })}>
                {value as React.ReactNode}
              </span>
            );
          },
        })
      ),
    [columnOrder, cell, datas, openDropdownId]
  );
  
  const handleEdit = (rowIndex: number, columnId: string, newValue: string) => {
    setDatas((prevDatas) => {
      const updatedData = [...prevDatas];
      updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: newValue };
      setSavedData(updatedData);
      return updatedData;
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldColIndex = columnOrder.indexOf(active.id);
    const newColIndex = columnOrder.indexOf(over.id);

    if (oldColIndex !== -1 && newColIndex !== -1) {
      const updatedColumnOrder = arrayMove(columnOrder, oldColIndex, newColIndex);
      setColumnOrder(updatedColumnOrder);

      setSavedData((prevData) => {
        const reorderedData = prevData.map((row) =>
          updatedColumnOrder.reduce(
            (acc, columnId) => ({ ...acc, [columnId]: row[columnId] }),
            {}
          )
        );
        return reorderedData;
      });
    }
  };

  const handleRowReorder = (oldIndex: number, newIndex: number) => {
    setDatas((prevDatas) => {
      const updatedData = [...prevDatas];
      const [movedRow] = updatedData.splice(oldIndex, 1);
      updatedData.splice(newIndex, 0, movedRow);
      setSavedData(updatedData);
      return updatedData;
    });
  };

  const pinColumn = (columnId: string, position: 'left' | 'right' | 'none') => {
    setPinnedColumns(({ left, right }) => {
      const newLeft = position === 'left' ? [...left, columnId] : left.filter((col) => col !== columnId);
      const newRight = position === 'right' ? [...right, columnId] : right.filter((col) => col !== columnId);
      return { left: newLeft, right: newRight };
    });
  };

  return {
    datas,
    setDatas,
    searchdata,
    setSearchdata,
    cell,
    columns,
    setCell,
    columnOrder,
    pinnedColumns,
    setPinnedColumns,
    openDropdownId,
    setOpenDropdownId,
    savedData,
    setSavedData,
    handleFileUpload,
    exportToData,
    handleRowReorder,
    handleDragEnd,
  };
};

export default useTable;
