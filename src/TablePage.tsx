import { getCoreRowModel, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, } from "@dnd-kit/sortable";
import { TableTemplate } from "./Templates/TableTemplate";
// import datas from "../db.json";
import "./index.css";
import useTable from "./useTable"; 


export const TablePage = () => {
    
    const {
        datas,
        searchdata,
        setSearchdata,
        setCell,
        columns,
        columnOrder,
        pinnedColumns,
        handleFileUpload,
        exportToData,
        handleRowReorder,
        handleDragEnd
    } = useTable();
 
        
    

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
                    onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchdata(e.target.value)}
                    onEdit={(cell) => setCell({ rowIndex: cell.row.index, columnId: cell.column.id })}
                    onRowReorder={handleRowReorder}
                    handleFileUpload={handleFileUpload}
                    exportToData = {exportToData}
                    
                />
            </SortableContext>
        </DndContext>
    );
};
