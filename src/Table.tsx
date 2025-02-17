import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TableHeader from "./TableHeader.tsx";
import TableBody from "./TableBody";

const Table = ({ data, columns, searchData, cell, setCell, handleEdit, handleDragEnd }) => {
    const table = useReactTable({
        data,
        columns: columns.map((key) => ({
            id: key,
            accessorKey: key,
            header: key,
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
        })),
        getCoreRowModel: getCoreRowModel(),
        state: { globalFilter: searchData }
    });

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columns}>
                <table className="custom-table">
                    <TableHeader table={table} />
                    <TableBody table={table} />
                </table>
            </SortableContext>
        </DndContext>
    );
};

export default Table;
