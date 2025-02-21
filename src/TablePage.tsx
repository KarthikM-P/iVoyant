import { useState, useMemo, useEffect } from "react";
import { getCoreRowModel, createColumnHelper, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TableTemplate } from "./Templates/TableTemplate";
// import datas from "../db.json";
import "./index.css";
import { TableHeader } from "./Organisms/TableHeader";
import * as xlsx from "xlsx";

export const TablePage = () => {
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
        console.log("File upload triggered", e.target.files);
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = xlsx.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(sheet);
            

            
            if (jsonData.length > 0) {
                setDatas(jsonData);
            }
        };
        
        if (e.target.files.length > 0) {
            reader.readAsBinaryString(e.target.files[0]);
        }
    };

    
    useEffect(() => {
        setColumnOrder([...new Set(datas.flatMap((item) => Object.keys(item)))]);
    }, [datas]);  


    const exportToExcel = () => {
        const ws = xlsx.utils.json_to_sheet(savedData);  
        const wb = xlsx.utils.book_new(); 
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");  
        
        xlsx.writeFile(wb, "table_data.xlsx");
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

    const table = useReactTable({
        data: datas, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: searchdata,
            columnPinning: pinnedColumns,
        },
        onGlobalFilterChange: setSearchdata,
    });
    console.log("Table Data:", datas);  

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columnOrder}>
                <TableTemplate
                    table={table}
                    searchdata={searchdata}
                    onSearchChange={(e) => setSearchdata(e.target.value)}
                    onEdit={(cell) => setCell({ rowIndex: cell.row.index, columnId: cell.column.id })}
                    onRowReorder={handleRowReorder}
                    handleFileUpload={handleFileUpload}
                    exportToExcel = {exportToExcel}
                    
                />
            </SortableContext>
        </DndContext>
    );
};
