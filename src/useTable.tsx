import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { TableHeader } from './Organisms/TableHeader';
import * as xlsx from "xlsx";
import { arrayMove } from '@dnd-kit/sortable';
const useTable = () => {
    const columnHelper = createColumnHelper();
    const [datas, setDatas] = useState([]);  
    const allKeys = [...new Set(datas.flatMap((item) => Object.keys(item)))];
    const [searchdata, setSearchdata] = useState("");
    const [cell, setCell] = useState({ rowIndex: null, columnId: null });
    const [columnOrder, setColumnOrder] = useState(allKeys);
    const [pinnedColumns, setPinnedColumns] = useState({ left: [], right: [] });
    const [openDropdownId, setOpenDropdownId] = useState();
    const [savedData, setSavedData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
    
        reader.onload = (event) => {
            if (file.type === "application/json") {
                    setDatas(JSON.parse(event.target.result));
                
            } else {
              
                const workbook = xlsx.read(event.target.result, { type: "binary" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                setDatas(xlsx.utils.sheet_to_json(sheet));
            }
        };
    
        if (file.type === "application/json") {
            reader.readAsText(file);
        } else {
            reader.readAsBinaryString(file);
        }
    };
    

    
    useEffect(() => {
        setColumnOrder([...new Set(datas.flatMap((item) => Object.keys(item)))]);
    }, [datas]);  


    const exportToData = (format) => {
        if (datas.length === 0) {
            alert("No data to export!");
            return;
        }
    
        if (format === "json") {
            
            const jsonData = JSON.stringify(datas, null, 2);
            const blob = new Blob([jsonData], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "table_data.json";
            link.click();

        } else if (format === "excel") {
            
            const ws = xlsx.utils.json_to_sheet(datas);
            const wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
            xlsx.writeFile(wb, "table_data.xlsx");
        }
    };
    
    
    const columns = useMemo(
        () =>
            columnOrder.map((key) =>
                columnHelper.accessor(key, {
                    id: key,
                    header: () => (
                        <TableHeader
                            id={key}
                            label={key}
                            isOpen={openDropdownId === key}
                            onToggleDropdown={() => setOpenDropdownId((prev) => (prev === key ? null : key))}
                            onPinLeft={() => pinColumn(key, "left")}
                            onPinRight={() => pinColumn(key, "right")}
                            onUnpin={() => pinColumn(key, "none")}
                        />
                    ),
                    cell: ({ getValue, row }) => {
                        const isEditing = cell.rowIndex === row.index && cell.columnId === key;
                        return isEditing ? (
                            <input
                                type="text"
                                value={getValue()}
                                onChange={(e) => handleEdit(row.index, key, e.target.value)}
                                onBlur={() => setCell({ rowIndex: null, columnId: null })}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => setCell({ rowIndex: row.index, columnId: key })}>
                                {getValue()}
                            </span>
                        );
                    },
                })
            ),
        [columnOrder, cell, datas, openDropdownId] 
    );

    const handleEdit = (rowIndex, columnId, newValue) => {
        setDatas((prevDatas) => {
            const updatedData = [...prevDatas];
            updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: newValue };
            setSavedData(updatedData);
            return updatedData;
        });
    };

    const handleDragEnd = (event) => {
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
                        (acc, columnId, idx) => ({ ...acc, [columnId]: row[columnId] }),
                        {}
                    )
                );
                return reorderedData;
            });
        }
    };
    
    const handleRowReorder = (oldIndex, newIndex) => {
        setDatas((prevDatas) => {
            const updatedData = [...prevDatas];
            const [movedRow] = updatedData.splice(oldIndex, 1); 
            updatedData.splice(newIndex, 0, movedRow); 
            setSavedData(updatedData);
            return updatedData;
        });
    };

    const pinColumn = (columnId, position) => {
        setPinnedColumns(({ left, right }) => {
            const newLeft = position === "left" ? [...left, columnId] : left.filter((col) => col !== columnId);
            const newRight = position === "right" ? [...right, columnId] : right.filter((col) => col !== columnId);
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
    handleDragEnd
  };
}

export default useTable